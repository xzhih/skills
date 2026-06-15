#!/usr/bin/env python3
"""Generate images via the codex-compatible Responses API (`image_generation` tool).

Supports two auth modes, auto-detected:

  Mode A (API Key)          : OPENAI_API_KEY env set -> POST {base}/v1/responses
  Mode B (ChatGPT login)    : ~/.codex/auth.json auth_mode=chatgpt
                              -> POST https://chatgpt.com/backend-api/codex/responses (SSE)

Stdlib only (urllib) so it runs anywhere without pip installs.

Examples:
  python generate.py --prompt "a cute cat on a windowsill" --out cat.png
  python generate.py --prompt "4k landscape" --size 3840x2160 --out hero.png
  python generate.py --prompt "logo" --format webp --n 2 --out logo.webp
  python generate.py --prompt "edit this" --input-image ref.png --out edited.png
"""
from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import sys
import time
import uuid
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path

# ChatGPT-login (mode B) constants — observed from codex.
CHATGPT_URL = "https://chatgpt.com/backend-api/codex/responses"
OAUTH_TOKEN_URL = "https://auth.openai.com/oauth/token"
OAUTH_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann"
AUTH_PATH = Path.home() / ".codex" / "auth.json"
CONFIG_PATH = Path.home() / ".codex" / "config.toml"
# A codex-style UA is not required by the server, but keeps us looking like a
# normal client (lowers the chance of edge-case bot filtering).
USER_AGENT = "codex-tui/0.137.0 (Mac OS 26.4.1; arm64) Apple_Terminal/470 (codex-tui; 0.137.0)"
INSTRUCTIONS = (
    "You are a helpful assistant. When asked to create or edit an image, "
    "call the image_generation tool."
)

# gpt-image-2 size constraints (client-side pre-check to save a round-trip;
# the server validates authoritatively too).
MAX_EDGE = 3840
MIN_PIXELS = 655_360
MAX_PIXELS = 8_294_400
MAX_RATIO = 3.0


def die(msg: str, code: int = 1):
    print(f"Error: {msg}", file=sys.stderr)
    raise SystemExit(code)


# --------------------------------------------------------------------------- #
# Credential resolution
# --------------------------------------------------------------------------- #
def responses_url(base_url: str, assume_v1: bool) -> str:
    """Build the /responses endpoint from a base URL.

    - already ends in /responses          -> use as-is
    - ends in /v1                          -> append /responses
    - assume_v1 (OpenAI-style env)         -> append /v1/responses
    - otherwise (codex custom provider)    -> append /responses   (matches codex)
    """
    base = base_url.rstrip("/")
    if base.endswith("/responses"):
        return base
    if base.endswith("/v1"):
        return base + "/responses"
    return base + ("/v1/responses" if assume_v1 else "/responses")


def read_codex_provider() -> dict | None:
    """Read the active [model_providers.<model_provider>] block from config.toml.

    Returns {"base_url", "token", "name"} when it has a base_url and a usable
    bearer token (experimental_bearer_token, or env_key pointing at a set env var).
    """
    if not CONFIG_PATH.exists():
        return None
    text = CONFIG_PATH.read_text()
    try:
        import tomllib
        cfg = tomllib.loads(text)
        active = cfg.get("model_provider")
        prov = (cfg.get("model_providers") or {}).get(active) if active else None
    except Exception:
        prov = _toml_fallback_provider(text)
        active = prov.get("_name") if prov else None
    if not prov:
        return None
    base_url = prov.get("base_url")
    if not base_url:
        return None
    token = prov.get("experimental_bearer_token")
    if not token and prov.get("env_key"):
        token = os.getenv(prov["env_key"])
    if not token:
        return None
    return {"base_url": base_url, "token": token, "name": prov.get("name", active)}


def _toml_fallback_provider(text: str) -> dict | None:
    """Minimal parser for environments without tomllib (Python < 3.11)."""
    import re
    m = re.search(r'(?m)^\s*model_provider\s*=\s*"([^"]+)"', text)
    if not m:
        return None
    active = m.group(1)
    # grab the [model_providers.<active>] section body
    sec = re.search(
        r'(?ms)^\[model_providers\.' + re.escape(active) + r'\]\s*(.*?)(?=^\[|\Z)', text)
    if not sec:
        return None
    body = sec.group(1)

    def field(key):
        fm = re.search(r'(?m)^\s*' + key + r'\s*=\s*"([^"]*)"', body)
        return fm.group(1) if fm else None

    prov = {"_name": active}
    for k in ("base_url", "experimental_bearer_token", "env_key", "name"):
        v = field(k)
        if v:
            prov[k] = v
    return prov


def resolve_auth(requested: str) -> dict:
    """Resolve which path to use. Returns {mode, url?, token?, label}.

    Priority (auto): OPENAI_API_KEY env -> codex config.toml provider ->
    ChatGPT login (auth.json) -> OPENAI_API_KEY inside auth.json.
    """
    want = requested  # auto|apikey|chatgpt

    if want in ("auto", "apikey"):
        if os.getenv("OPENAI_API_KEY"):
            base = os.getenv("OPENAI_BASE_URL") or "https://api.openai.com"
            return {"mode": "apikey", "url": responses_url(base, assume_v1=True),
                    "token": os.environ["OPENAI_API_KEY"], "label": "env OPENAI_API_KEY"}
        prov = read_codex_provider()
        if prov:
            return {"mode": "apikey", "url": responses_url(prov["base_url"], assume_v1=False),
                    "token": prov["token"], "label": f"codex provider '{prov['name']}'"}
        if want == "apikey":
            die("mode apikey requested but no OPENAI_API_KEY env and no usable codex provider in config.toml")

    if want in ("auto", "chatgpt"):
        if AUTH_PATH.exists():
            try:
                data = json.loads(AUTH_PATH.read_text())
            except Exception:
                data = {}
            if data.get("auth_mode") == "chatgpt" and data.get("tokens", {}).get("access_token"):
                return {"mode": "chatgpt", "label": "ChatGPT login (auth.json)"}
            if data.get("OPENAI_API_KEY"):
                return {"mode": "apikey", "url": responses_url("https://api.openai.com", assume_v1=True),
                        "token": data["OPENAI_API_KEY"], "label": "auth.json OPENAI_API_KEY"}
        if want == "chatgpt":
            die("mode chatgpt requested but ~/.codex/auth.json has no chatgpt access_token")

    die(
        "No credentials found. Provide one of:\n"
        "  - OPENAI_API_KEY env var\n"
        "  - a codex custom provider in ~/.codex/config.toml (base_url + experimental_bearer_token)\n"
        "  - ChatGPT login in ~/.codex/auth.json (auth_mode=chatgpt)"
    )


# --------------------------------------------------------------------------- #
# Size validation (pre-check)
# --------------------------------------------------------------------------- #
def validate_size(size: str):
    if size == "auto":
        return
    try:
        w, h = (int(x) for x in size.lower().split("x"))
    except Exception:
        die(f"size must be 'auto' or WIDTHxHEIGHT, got {size!r}")
    edge = max(w, h)
    if edge > MAX_EDGE:
        die(f"size {size}: longest edge must be <= {MAX_EDGE}px")
    if w % 16 or h % 16:
        die(f"size {size}: width and height must both be divisible by 16")
    if edge / min(w, h) > MAX_RATIO:
        die(f"size {size}: long:short edge ratio must be <= {MAX_RATIO:g}:1")
    if not (MIN_PIXELS <= w * h <= MAX_PIXELS):
        die(f"size {size}: total pixels must be between {MIN_PIXELS:,} and {MAX_PIXELS:,}")


# --------------------------------------------------------------------------- #
# Request body
# --------------------------------------------------------------------------- #
def build_body(args, stream: bool) -> dict:
    content = [{"type": "input_text", "text": args.prompt}]
    for img in args.input_image or []:
        p = Path(img)
        if not p.exists():
            die(f"input image not found: {p}")
        mime = mimetypes.guess_type(str(p))[0] or "image/png"
        b64 = base64.b64encode(p.read_bytes()).decode()
        content.append({"type": "input_image", "image_url": f"data:{mime};base64,{b64}"})

    # NOTE: the image_generation tool does not accept `n` (the ChatGPT backend
    # rejects tools[0].n). Multiple images are produced by looping the request.
    tool = {
        "type": "image_generation",
        "model": args.image_model,
        "size": args.size,
        "quality": args.quality,
        "output_format": args.format,
    }
    body = {
        "model": args.model,
        "instructions": INSTRUCTIONS,
        "input": [{"role": "user", "content": content}],
        "tools": [tool],
    }
    if stream:
        body["stream"] = True
        body["store"] = False
    return body


# --------------------------------------------------------------------------- #
# Mode A: API key (non-streaming JSON)
# --------------------------------------------------------------------------- #
def run_apikey(args, auth: dict) -> list[dict]:
    headers = {
        "Authorization": f"Bearer {auth['token']}",
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
    }
    body = build_body(args, stream=False)
    req = urllib.request.Request(auth["url"], data=json.dumps(body).encode(), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        die(f"[mode A] HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
    out = []
    for item in data.get("output", []):
        if item.get("type") == "image_generation_call" and item.get("result"):
            out.append(item)
    return out


# --------------------------------------------------------------------------- #
# Mode B: ChatGPT login (SSE), with token refresh on 401
# --------------------------------------------------------------------------- #
def load_tokens() -> dict:
    data = json.loads(AUTH_PATH.read_text())
    return data["tokens"]


def refresh_access_token() -> str:
    """Refresh the chatgpt access_token using the stored refresh_token; persist it."""
    data = json.loads(AUTH_PATH.read_text())
    refresh = data["tokens"].get("refresh_token")
    if not refresh:
        die("[mode B] access_token expired and no refresh_token available; re-login to codex.")
    form = urllib.parse.urlencode({
        "grant_type": "refresh_token",
        "refresh_token": refresh,
        "client_id": OAUTH_CLIENT_ID,
    }).encode()
    req = urllib.request.Request(
        OAUTH_TOKEN_URL, data=form,
        headers={"Content-Type": "application/x-www-form-urlencoded"}, method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            tok = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        die(f"[mode B] token refresh failed HTTP {e.code}: {e.read().decode('utf-8','replace')[:200]}")
    new_access = tok.get("access_token")
    if not new_access:
        die("[mode B] token refresh response missing access_token")
    data["tokens"]["access_token"] = new_access
    for k in ("id_token", "refresh_token"):
        if tok.get(k):
            data["tokens"][k] = tok[k]
    data["last_refresh"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    AUTH_PATH.write_text(json.dumps(data, indent=2))
    print("[mode B] refreshed access_token", file=sys.stderr)
    return new_access


def _chatgpt_headers(access_token: str, account_id: str) -> dict:
    return {
        "Authorization": f"Bearer {access_token}",
        "chatgpt-account-id": account_id,
        "OpenAI-Beta": "responses=experimental",
        "originator": "codex_cli_rs",
        "session_id": str(uuid.uuid4()),
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "User-Agent": USER_AGENT,
    }


def _parse_sse(resp) -> list[dict]:
    """Collect image_generation_call results from the SSE stream."""
    images: dict[int, dict] = {}
    buf = b""
    try:
        for raw in resp:
            buf += raw
            while b"\n" in buf:
                line, buf = buf.split(b"\n", 1)
                s = line.decode("utf-8", "replace").strip()
                if not s.startswith("data:"):
                    continue
                payload = s[5:].strip()
                if not payload or payload == "[DONE]":
                    continue
                try:
                    ev = json.loads(payload)
                except json.JSONDecodeError:
                    continue
                idx = ev.get("output_index", 0)
                slot = images.setdefault(idx, {})
                if ev.get("partial_image_b64"):
                    slot["result"] = ev["partial_image_b64"]
                for k in ("size", "quality", "output_format", "background"):
                    if ev.get(k) is not None:
                        slot[k] = ev[k]
                if ev.get("type") == "response.output_item.done":
                    item = ev.get("item", {})
                    if item.get("result"):
                        slot["result"] = item["result"]
                    for k in ("id", "size", "quality", "output_format", "background"):
                        if item.get(k) is not None:
                            slot[k] = item[k]
                if ev.get("type") == "response.failed":
                    err = ev.get("response", {}).get("error")
                    die(f"[mode B] generation failed: {json.dumps(err)[:300]}")
    except Exception:
        # Stream may close without a proper terminator; keep what we collected.
        pass
    return [s for s in images.values() if s.get("result")]


def run_chatgpt(args) -> list[dict]:
    tokens = load_tokens()
    access = tokens["access_token"]
    account_id = tokens["account_id"]
    body = json.dumps(build_body(args, stream=True)).encode()

    for attempt in (1, 2):
        req = urllib.request.Request(
            CHATGPT_URL, data=body, headers=_chatgpt_headers(access, account_id), method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=args.timeout) as resp:
                return _parse_sse(resp)
        except urllib.error.HTTPError as e:
            txt = e.read().decode("utf-8", "replace")
            if e.code == 401 and attempt == 1:
                access = refresh_access_token()
                continue
            die(f"[mode B] HTTP {e.code}: {txt[:300]}")
    return []


# --------------------------------------------------------------------------- #
# Save + main
# --------------------------------------------------------------------------- #
def save_images(images: list[dict], out: str, fmt: str) -> list[str]:
    if not images:
        die("no image returned")
    out_path = Path(out)
    ext = images[0].get("output_format", fmt)
    paths = []
    for i, img in enumerate(images):
        if len(images) == 1:
            p = out_path if out_path.suffix else out_path.with_suffix(f".{ext}")
        else:
            stem = out_path.stem or "image"
            p = out_path.with_name(f"{stem}-{i+1}.{ext}")
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(base64.b64decode(img["result"]))
        paths.append(str(p))
    return paths


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--prompt", required=True, help="image description")
    ap.add_argument("--out", default="output.png", help="output path (default output.png)")
    ap.add_argument("--size", default="1024x1024", help="WIDTHxHEIGHT or 'auto' (default 1024x1024)")
    ap.add_argument("--quality", default="low",
                    help="low|medium|high|auto (NOTE: ignored in mode B, fixed ~medium)")
    ap.add_argument("--format", default="png", choices=["png", "jpeg", "webp"], help="output format")
    ap.add_argument("--n", type=int, default=1, help="number of images (1-10)")
    ap.add_argument("--input-image", action="append",
                    help="reference/edit image path (repeatable)")
    ap.add_argument("--mode", default="auto", choices=["auto", "apikey", "chatgpt"],
                    help="auth mode (default auto-detect)")
    ap.add_argument("--model", default="gpt-5.5", help="responses model (default gpt-5.5)")
    ap.add_argument("--image-model", default="gpt-image-2", help="image model (default gpt-image-2)")
    ap.add_argument("--timeout", type=int, default=300, help="request timeout seconds")
    args = ap.parse_args()

    if not (1 <= args.n <= 10):
        die("--n must be between 1 and 10")
    validate_size(args.size)

    auth = resolve_auth(args.mode)
    mode = auth["mode"]
    print(f"[mode {mode}] via {auth['label']} — size={args.size} quality={args.quality} "
          f"format={args.format} n={args.n} ...", file=sys.stderr)
    started = time.time()

    def run(a):
        return run_chatgpt(a) if mode == "chatgpt" else run_apikey(a, auth)

    images: list[dict] = []
    for i in range(args.n):
        if args.n > 1:
            print(f"  image {i + 1}/{args.n} ...", file=sys.stderr)
        images.extend(run(args))
    paths = save_images(images, args.out, args.format)

    meta = images[0]
    print(json.dumps({
        "mode": mode,
        "saved": paths,
        "size": meta.get("size", args.size),
        "quality": meta.get("quality", args.quality),
        "output_format": meta.get("output_format", args.format),
        "elapsed_s": round(time.time() - started, 1),
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
