#!/usr/bin/env python3
"""Remove a flat chroma-key background and write a PNG with alpha.

The recommended transparency workflow for gpt-image-2 is:
1. Generate the subject on a perfectly flat solid chroma-key background.
2. Convert that key color to alpha with this script.
3. Verify the output PNG contains an alpha channel.

Requires Pillow + NumPy:
  pip install pillow numpy
  uv pip install pillow numpy
"""
from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path


def die(msg: str):
    print(f"Error: {msg}", file=sys.stderr)
    raise SystemExit(1)


def load_deps():
    try:
        import numpy as np
        from PIL import Image, ImageFilter
    except ImportError:
        die("requires Pillow + NumPy. Install: pip install pillow numpy  (or: uv pip install pillow numpy)")
    return np, Image, ImageFilter


def parse_color(color: str):
    value = color.strip()
    if "," in value:
        parts = [p.strip() for p in value.split(",")]
        if len(parts) != 3:
            die(f"--key-color RGB form must be 'R,G,B', got {color!r}")
        try:
            rgb = tuple(int(p) for p in parts)
        except ValueError:
            die(f"invalid RGB color: {color!r}")
        if any(channel < 0 or channel > 255 for channel in rgb):
            die(f"RGB channels must be 0-255, got {color!r}")
        return rgb

    hex_value = value.lstrip("#")
    if len(hex_value) != 6:
        die(f"--key-color must be 6-digit hex or R,G,B, got {color!r}")
    try:
        return tuple(int(hex_value[i:i + 2], 16) for i in (0, 2, 4))
    except ValueError:
        die(f"invalid hex color: {color!r}")


def auto_key(np, rgb, mode: str):
    if mode == "corners":
        h, w, _ = rgb.shape
        sample = max(1, min(h, w, 10))
        pixels = np.concatenate([
            rgb[:sample, :sample, :].reshape(-1, 3),
            rgb[:sample, w - sample:, :].reshape(-1, 3),
            rgb[h - sample:, :sample, :].reshape(-1, 3),
            rgb[h - sample:, w - sample:, :].reshape(-1, 3),
        ])
    elif mode == "border":
        pixels = np.concatenate([
            rgb[0, :, :].reshape(-1, 3),
            rgb[-1, :, :].reshape(-1, 3),
            rgb[:, 0, :].reshape(-1, 3),
            rgb[:, -1, :].reshape(-1, 3),
        ])
    else:
        die("--auto-key must be one of none|corners|border")
    return tuple(int(v) for v in np.median(pixels, axis=0))


def resolve_key(args, np, rgb):
    if args.key is not None:
        if args.key == "auto":
            return auto_key(np, rgb, "border")
        return parse_color(args.key)
    if args.auto_key != "none":
        return auto_key(np, rgb, args.auto_key)
    return parse_color(args.key_color)


def thresholds(args):
    if args.transparent_threshold is not None:
        transparent = args.transparent_threshold
    elif args.tolerance is not None:
        transparent = args.tolerance
    else:
        transparent = 60.0

    if args.opaque_threshold is not None:
        opaque = args.opaque_threshold
    elif args.tolerance is not None:
        opaque = max(transparent + 1.0, args.tolerance * 2.0)
    else:
        opaque = 130.0

    if transparent >= opaque:
        die("--transparent-threshold must be smaller than --opaque-threshold")
    return float(transparent), float(opaque)


def build_alpha(np, dist, transparent, opaque, soft_matte):
    if soft_matte:
        return np.clip((dist - transparent) / (opaque - transparent), 0.0, 1.0)
    return (dist > transparent).astype(np.float32)


def refine_alpha(np, Image, ImageFilter, alpha, edge_contract, edge_feather):
    image = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    if edge_contract > 0:
        size = max(3, int(math.ceil(edge_contract)) * 2 + 1)
        image = image.filter(ImageFilter.MinFilter(size))
    if edge_feather > 0:
        image = image.filter(ImageFilter.GaussianBlur(radius=edge_feather))
    return np.asarray(image, dtype=np.float32) / 255.0


def cleanup_spill(np, rgb, key, alpha, strength):
    if strength <= 0:
        return rgb
    out = rgb.copy()
    key_index = int(np.argmax(key))
    others = [i for i in range(3) if i != key_index]
    cap = np.maximum(out[:, :, others[0]], out[:, :, others[1]])
    clamped = out.copy()
    clamped[:, :, key_index] = np.minimum(out[:, :, key_index], cap)
    edge_weight = np.clip(1.0 - alpha, 0.0, 1.0)[:, :, None]
    blend = np.clip(strength, 0.0, 1.0) * edge_weight
    return out * (1.0 - blend) + clamped * blend


def build_parser():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--input", required=True, help="source image with chroma-key background")
    parser.add_argument("--out", required=True, help="output PNG path")
    parser.add_argument("--key-color", default="00ff00", help="key color as hex or R,G,B when --auto-key none")
    parser.add_argument("--tolerance", type=float, default=None, help="sets transparent threshold when explicit thresholds are omitted")
    parser.add_argument("--auto-key", choices=["none", "corners", "border"], default="border",
                        help="estimate key color from corners or border (default border)")
    parser.add_argument("--soft-matte", action="store_true", help="use gradual alpha between transparent and opaque thresholds")
    parser.add_argument("--transparent-threshold", type=float, default=None,
                        help="RGB distance below which a pixel is transparent")
    parser.add_argument("--opaque-threshold", type=float, default=None,
                        help="RGB distance above which a pixel is opaque")
    parser.add_argument("--edge-feather", type=float, default=0.0, help="Gaussian blur radius for alpha edge")
    parser.add_argument("--edge-contract", type=float, default=0.0, help="contract the alpha edge before feathering")
    parser.add_argument("--spill-cleanup", action="store_true", help="reduce key-color fringe on edge pixels")
    parser.add_argument("--despill", nargs="?", const=1.0, default=0.0, type=float,
                        help="despill strength 0-1; bare --despill means 1.0")
    parser.add_argument("--force", action="store_true", help="overwrite output file")
    parser.add_argument("--key", default=None,
                        help="legacy alias: hex color or 'auto' for border sampling")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    np, Image, ImageFilter = load_deps()

    src = Path(args.input)
    if not src.exists():
        die(f"input not found: {src}")

    out = Path(args.out)
    if out.suffix.lower() != ".png":
        die("--out must end in .png; chroma-key output is always PNG with alpha")
    if out.exists() and not args.force:
        die(f"output already exists: {out} (use --force to overwrite)")
    out.parent.mkdir(parents=True, exist_ok=True)

    image = Image.open(src).convert("RGB")
    rgb = np.asarray(image, dtype=np.float32)
    key = resolve_key(args, np, rgb.astype(np.int32))
    transparent, opaque = thresholds(args)
    print(f"key color: #{key[0]:02x}{key[1]:02x}{key[2]:02x}", file=sys.stderr)

    dist = np.sqrt(((rgb - np.array(key, dtype=np.float32)) ** 2).sum(axis=2))
    alpha = build_alpha(np, dist, transparent, opaque, args.soft_matte)
    alpha = refine_alpha(np, Image, ImageFilter, alpha, args.edge_contract, args.edge_feather)

    strength = max(float(args.despill or 0.0), 1.0 if args.spill_cleanup else 0.0)
    out_rgb = cleanup_spill(np, rgb, key, alpha, strength)
    rgba = np.dstack([out_rgb.clip(0, 255).astype(np.uint8), (alpha * 255).astype(np.uint8)])
    Image.fromarray(rgba, "RGBA").save(out, format="PNG")

    transparent_frac = float((alpha < 0.01).mean())
    print(f"wrote {out} ({transparent_frac * 100:.0f}% transparent)", file=sys.stderr)
    if transparent_frac < 0.02:
        print("warning: almost nothing was removed; check --key-color, --auto-key, or thresholds", file=sys.stderr)
    elif transparent_frac > 0.95:
        print("warning: almost everything was removed; key color may match the subject", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
