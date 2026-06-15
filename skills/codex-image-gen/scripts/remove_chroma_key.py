#!/usr/bin/env python3
"""Remove a flat chroma-key background and write a PNG/WebP with alpha.

gpt-image-2 does not support transparent output, so the transparency workflow is:
generate the subject on a perfectly flat solid chroma-key background (default
#00ff00), then run this to convert the key color to alpha.

Requires Pillow + NumPy:  pip install pillow numpy   (or: uv pip install pillow numpy)

Approach: soft matte by distance from the key color in RGB. Pixels close to the key
become fully transparent, pixels far from it stay opaque, and a soft band between the
two thresholds gives antialiased edges. Optional despill neutralizes key-color bleed
on the subject's edges.

Examples:
  python remove_chroma_key.py --input raw.png --out cutout.png
  python remove_chroma_key.py --input raw.png --out cutout.png --key 00ff00 --despill
  python remove_chroma_key.py --input raw.png --out cutout.webp --key auto
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path


def die(msg: str):
    print(f"Error: {msg}", file=sys.stderr)
    raise SystemExit(1)


def load_deps():
    try:
        import numpy as np
        from PIL import Image
    except ImportError:
        die("requires Pillow + NumPy. Install: pip install pillow numpy")
    return np, Image


def parse_hex(color: str):
    c = color.lstrip("#")
    if len(c) != 6:
        die(f"--key must be 6-digit hex like 00ff00, got {color!r}")
    try:
        return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))
    except ValueError:
        die(f"invalid hex color: {color!r}")


def auto_key(np, rgb):
    """Estimate the key color as the median of the 1px border (the background frame)."""
    border = np.concatenate([
        rgb[0, :, :].reshape(-1, 3), rgb[-1, :, :].reshape(-1, 3),
        rgb[:, 0, :].reshape(-1, 3), rgb[:, -1, :].reshape(-1, 3),
    ])
    return tuple(int(v) for v in np.median(border, axis=0))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input", required=True, help="source image (chroma-key background)")
    ap.add_argument("--out", required=True, help="output path (.png or .webp)")
    ap.add_argument("--key", default="auto",
                    help="key color hex (e.g. 00ff00) or 'auto' to sample the border")
    ap.add_argument("--transparent-threshold", type=float, default=60.0,
                    help="RGB distance below which a pixel is fully transparent (default 60)")
    ap.add_argument("--opaque-threshold", type=float, default=130.0,
                    help="RGB distance above which a pixel is fully opaque (default 130)")
    ap.add_argument("--despill", action="store_true",
                    help="neutralize residual key-color tint on edges")
    args = ap.parse_args()

    if args.transparent_threshold >= args.opaque_threshold:
        die("--transparent-threshold must be smaller than --opaque-threshold")

    np, Image = load_deps()
    src = Path(args.input)
    if not src.exists():
        die(f"input not found: {src}")

    img = Image.open(src).convert("RGB")
    rgb = np.asarray(img, dtype=np.float32)

    key = auto_key(np, rgb.astype(np.int32)) if args.key == "auto" else parse_hex(args.key)
    print(f"key color: #{key[0]:02x}{key[1]:02x}{key[2]:02x}", file=sys.stderr)

    # Distance from key color per pixel.
    dist = np.sqrt(((rgb - np.array(key, dtype=np.float32)) ** 2).sum(axis=2))

    lo, hi = args.transparent_threshold, args.opaque_threshold
    alpha = np.clip((dist - lo) / (hi - lo), 0.0, 1.0)  # 0=transparent, 1=opaque

    out_rgb = rgb.copy()
    if args.despill:
        # Where the key is green-dominant, clamp the green channel toward the max of
        # the other two — removes the green fringe on antialiased edges.
        ki = int(np.argmax(key))
        others = [i for i in range(3) if i != ki]
        cap = np.maximum(out_rgb[:, :, others[0]], out_rgb[:, :, others[1]])
        spill = out_rgb[:, :, ki] > cap
        out_rgb[:, :, ki] = np.where(spill, cap, out_rgb[:, :, ki])

    rgba = np.dstack([
        out_rgb.astype(np.uint8),
        (alpha * 255).astype(np.uint8),
    ])
    result = Image.fromarray(rgba, "RGBA")

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    fmt = "WEBP" if out.suffix.lower() == ".webp" else "PNG"
    result.save(out, format=fmt)

    transparent_frac = float((alpha < 0.01).mean())
    print(f"wrote {out}  ({transparent_frac * 100:.0f}% transparent)", file=sys.stderr)
    if transparent_frac < 0.02:
        print("warning: almost nothing was removed — check --key or thresholds", file=sys.stderr)
    elif transparent_frac > 0.95:
        print("warning: almost everything was removed — key color may match the subject",
              file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
