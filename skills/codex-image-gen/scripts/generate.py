#!/usr/bin/env python3
"""Generate images via codex-compatible Images or Responses APIs.

Supports two auth modes, auto-detected:

  Mode A (API Key)          : OPENAI_API_KEY env set -> POST {base}/v1/images/...
  Mode B (ChatGPT login)    : ~/.codex/auth.json auth_mode=chatgpt
                              -> POST https://chatgpt.com/backend-api/codex/images/...

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
import http.client
import json
import mimetypes
import os
import shutil
import subprocess
import sys
import time
import tempfile
import uuid
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path

# ChatGPT-login (mode B) constants — observed from codex.
CHATGPT_CODEX_BASE = "https://chatgpt.com/backend-api/codex"
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


def images_base_url(base_url: str, assume_v1: bool) -> str:
    """Build the base URL that owns /images/generations and /images/edits."""
    base = base_url.rstrip("/")
    for suffix in ("/images/generations", "/images/edits"):
        if base.endswith(suffix):
            return base[: -len(suffix)]
    if base.endswith("/responses"):
        return base[: -len("/responses")]
    if base.endswith("/v1") or not assume_v1:
        return base
    return base + "/v1"


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
                    "images_base_url": images_base_url(base, assume_v1=True),
                    "token": os.environ["OPENAI_API_KEY"], "label": "env OPENAI_API_KEY"}
        prov = read_codex_provider()
        if prov:
            return {"mode": "apikey", "url": responses_url(prov["base_url"], assume_v1=False),
                    "images_base_url": images_base_url(prov["base_url"], assume_v1=False),
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
                        "images_base_url": images_base_url("https://api.openai.com", assume_v1=True),
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

    # NOTE: the image_generation tool does not accept `n` in Responses requests.
    # Multiple images are produced by looping the request.
    tool = {
        "type": "image_generation",
        "action": args.action,
        "model": args.image_model,
        "size": args.size,
        "quality": args.quality,
        "output_format": args.format,
    }
    if args.background:
        tool["background"] = args.background
    if args.output_compression is not None:
        tool["output_compression"] = args.output_compression
    if args.partial_images is not None:
        tool["partial_images"] = args.partial_images
    if args.moderation:
        tool["moderation"] = args.moderation

    body = {
        "model": args.model,
        "instructions": INSTRUCTIONS,
        "input": [{"type": "message", "role": "user", "content": content}],
        "tools": [tool],
        "tool_choice": {"type": "image_generation"},
    }
    if stream:
        body["stream"] = True
        body["store"] = False
    return body


def _input_images_as_data_urls(paths: list[str] | None) -> list[str]:
    images = []
    for img in paths or []:
        p = Path(img)
        if not p.exists():
            die(f"input image not found: {p}")
        mime = mimetypes.guess_type(str(p))[0] or "image/png"
        b64 = base64.b64encode(p.read_bytes()).decode()
        images.append(f"data:{mime};base64,{b64}")
    return images


def build_images_body(args) -> dict:
    action = images_action(args)
    body = {
        "model": args.image_model,
        "prompt": args.prompt,
        "n": 1,
        "size": args.size,
        "quality": args.quality,
        "output_format": args.format,
    }
    if args.background:
        body["background"] = args.background
    if args.output_compression is not None:
        body["output_compression"] = args.output_compression
    if args.moderation:
        body["moderation"] = args.moderation
    if action == "edit":
        body["images"] = [{"image_url": image_url} for image_url in _input_images_as_data_urls(args.input_image)]
    return body


def images_action(args) -> str:
    if args.action == "edit" or args.input_image:
        return "edit"
    return "generate"


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


def _result_from_images_item(item: dict, response: dict, request_body: dict) -> dict | None:
    image_b64 = item.get("b64_json")
    if not image_b64 and isinstance(item.get("url"), str):
        image_b64 = _fetch_image_as_b64(item["url"], request_body.get("_download_headers") or {})
    if not image_b64:
        return None
    return {
        "result": image_b64,
        "size": str(item.get("size") or response.get("size") or request_body.get("size") or ""),
        "quality": str(item.get("quality") or response.get("quality") or request_body.get("quality") or ""),
        "background": str(item.get("background") or response.get("background") or request_body.get("background") or ""),
        "output_format": str(item.get("output_format") or response.get("output_format") or request_body.get("output_format") or ""),
        "revised_prompt": str(item.get("revised_prompt") or ""),
    }


def _fetch_image_as_b64(url: str, headers: dict) -> str:
    if url.startswith("data:image/"):
        return url.split(",", 1)[1]
    if not (url.startswith("http://") or url.startswith("https://")):
        die("images endpoint returned unsupported image URL")
    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return base64.b64encode(resp.read()).decode()
    except urllib.error.HTTPError as e:
        die(f"image download failed HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")


def parse_images_response(data: dict, request_body: dict) -> list[dict]:
    if isinstance(data.get("error"), dict):
        die(f"images endpoint error: {json.dumps(data['error'], ensure_ascii=False)[:300]}")
    items = data.get("data")
    if not isinstance(items, list):
        die("images endpoint returned no data[]")
    out = []
    for item in items:
        if isinstance(item, dict):
            result = _result_from_images_item(item, data, request_body)
            if result:
                out.append(result)
    return out


def read_json_response(resp) -> dict:
    chunks = []
    try:
        while True:
            chunk = resp.read(1024 * 1024)
            if not chunk:
                break
            chunks.append(chunk)
    except http.client.IncompleteRead as exc:
        if exc.partial:
            chunks.append(exc.partial)
    raw = b"".join(chunks)
    try:
        return json.loads(raw.decode())
    except json.JSONDecodeError as exc:
        die(f"response body ended before complete JSON could be parsed: {exc}")


def _curl_quote(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def post_json_with_curl(url: str, headers: dict, body: dict, timeout: int) -> dict | None:
    """POST JSON with curl for large direct-Images responses.

    Python urllib has repeatedly returned truncated JSON for the codex/images
    endpoint in this environment, while curl reads the same response completely.
    """
    if not shutil.which("curl"):
        return None
    with tempfile.TemporaryDirectory(prefix="codex-image-gen-") as tmp:
        tmp_path = Path(tmp)
        body_path = tmp_path / "body.json"
        response_path = tmp_path / "response.json"
        config_path = tmp_path / "curl.conf"
        body_path.write_text(json.dumps(body, ensure_ascii=False), encoding="utf-8")
        lines = [
            f"url = {_curl_quote(url)}",
            'request = "POST"',
            f"max-time = {int(timeout)}",
            "silent",
            "show-error",
            "fail-with-body",
            f"output = {_curl_quote(str(response_path))}",
            f"data-binary = {_curl_quote('@' + str(body_path))}",
        ]
        for key, value in headers.items():
            lines.append(f"header = {_curl_quote(f'{key}: {value}')}")
        config_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        config_path.chmod(0o600)
        proc = subprocess.run(
            ["curl", "--config", str(config_path)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout + 30,
        )
        if proc.returncode != 0:
            body_text = response_path.read_text(encoding="utf-8", errors="replace") if response_path.exists() else ""
            die(f"curl images request failed ({proc.returncode}): {(proc.stderr or body_text)[:300]}")
        try:
            return json.loads(response_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            die(f"curl response was not complete JSON: {exc}")


def run_images_apikey(args, auth: dict) -> list[dict]:
    action = images_action(args)
    endpoint = "/images/edits" if action == "edit" else "/images/generations"
    url = auth["images_base_url"].rstrip("/") + endpoint
    headers = {
        "Authorization": f"Bearer {auth['token']}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": USER_AGENT,
    }
    body = build_images_body(args)
    data = post_json_with_curl(url, headers, body, args.timeout)
    if data is None:
        req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=args.timeout) as resp:
                data = read_json_response(resp)
        except urllib.error.HTTPError as e:
            die(f"[images/apikey] HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
    body["_download_headers"] = {"Authorization": f"Bearer {auth['token']}", "User-Agent": USER_AGENT}
    return parse_images_response(data, body)


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


def _chatgpt_images_headers(access_token: str, account_id: str) -> dict:
    return {
        "Authorization": f"Bearer {access_token}",
        "chatgpt-account-id": account_id,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Connection": "Keep-Alive",
        "originator": "codex-tui",
        "session_id": str(uuid.uuid4()),
        "x-client-request-id": str(uuid.uuid4()),
        "User-Agent": USER_AGENT,
    }


def _image_result_from_item(item: dict) -> dict | None:
    if item.get("type") != "image_generation_call" or not item.get("result"):
        return None
    return dict(item)


def _extract_image_results(output) -> list[dict]:
    if not isinstance(output, list):
        return []
    images = []
    for item in output:
        if isinstance(item, dict):
            result = _image_result_from_item(item)
            if result:
                images.append(result)
    return images


def _parse_sse(resp) -> list[dict]:
    """Collect final image_generation_call results from the SSE stream.

    Partial-image events are previews only. Saving them as final output can create
    files whose dimensions do not match the requested size, so only completed
    image_generation_call items are returned.
    """
    output_items_by_index: dict[int, dict] = {}
    output_items_fallback: list[dict] = []
    completed_output = None
    buf = b""
    stream_error = None
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
                event_type = ev.get("type")
                if event_type in {"error", "response.failed", "response.incomplete"}:
                    err = ev.get("error") or (ev.get("response") or {}).get("error")
                    die(f"[mode B] generation failed: {json.dumps(err, ensure_ascii=False)[:300]}")
                if event_type == "response.output_item.done":
                    item = ev.get("item", {})
                    if not isinstance(item, dict):
                        continue
                    idx = ev.get("output_index")
                    if isinstance(idx, int):
                        output_items_by_index[idx] = item
                    else:
                        output_items_fallback.append(item)
                elif event_type == "response.completed":
                    completed_output = (ev.get("response") or {}).get("output")
    except (http.client.IncompleteRead, TimeoutError, OSError) as exc:
        stream_error = exc

    if completed_output is not None:
        images = _extract_image_results(completed_output)
        if images:
            return images
    ordered = [output_items_by_index[i] for i in sorted(output_items_by_index)]
    ordered.extend(output_items_fallback)
    images = _extract_image_results(ordered)
    if images:
        return images
    if stream_error is not None:
        die(f"[mode B] SSE stream ended before final image: {stream_error!r}")
    return []


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


def run_images_chatgpt(args) -> list[dict]:
    tokens = load_tokens()
    access = tokens["access_token"]
    account_id = tokens["account_id"]
    action = images_action(args)
    endpoint = "/images/edits" if action == "edit" else "/images/generations"
    url = CHATGPT_CODEX_BASE + endpoint
    body_dict = build_images_body(args)
    body = json.dumps(body_dict).encode()

    for attempt in (1, 2):
        headers = _chatgpt_images_headers(access, account_id)
        try:
            data = post_json_with_curl(url, headers, body_dict, args.timeout)
            if data is None:
                req = urllib.request.Request(url, data=body, headers=headers, method="POST")
                with urllib.request.urlopen(req, timeout=args.timeout) as resp:
                    data = read_json_response(resp)
            body_dict["_download_headers"] = {
                "Authorization": f"Bearer {access}",
                "chatgpt-account-id": account_id,
                "User-Agent": USER_AGENT,
            }
            return parse_images_response(data, body_dict)
        except urllib.error.HTTPError as e:
            txt = e.read().decode("utf-8", "replace")
            if e.code == 401 and attempt == 1:
                access = refresh_access_token()
                continue
            die(f"[images/chatgpt] HTTP {e.code}: {txt[:300]}")
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
    ap.add_argument("--background", choices=["auto", "opaque"],
                    help="background handling for the image tool (gpt-image-2 does not support transparent)")
    ap.add_argument("--output-compression", type=int,
                    help="0-100 compression for jpeg/webp output")
    ap.add_argument("--partial-images", type=int, choices=[0, 1, 2, 3],
                    help="number of streamed partial previews to request (0-3)")
    ap.add_argument("--moderation", choices=["auto", "low"], help="image moderation level")
    ap.add_argument("--action", default="auto", choices=["auto", "generate", "edit"],
                    help="image tool action (default auto; use generate/edit to force behavior)")
    ap.add_argument("--n", type=int, default=1, help="number of images (1-10)")
    ap.add_argument("--input-image", action="append",
                    help="reference/edit image path (repeatable)")
    ap.add_argument("--api", default="images", choices=["images", "responses"],
                    help="API shape (default images for 2K/4K; responses kept for compatibility)")
    ap.add_argument("--mode", default="auto", choices=["auto", "apikey", "chatgpt"],
                    help="auth mode (default auto-detect)")
    ap.add_argument("--model", default="gpt-5.5", help="responses model (default gpt-5.5)")
    ap.add_argument("--image-model", default="gpt-image-2", help="image model (default gpt-image-2)")
    ap.add_argument("--timeout", type=int, default=300, help="request timeout seconds")
    args = ap.parse_args()

    if not (1 <= args.n <= 10):
        die("--n must be between 1 and 10")
    if args.output_compression is not None and not (0 <= args.output_compression <= 100):
        die("--output-compression must be between 0 and 100")
    if args.output_compression is not None and args.format == "png":
        die("--output-compression only applies to jpeg/webp output")
    validate_size(args.size)

    auth = resolve_auth(args.mode)
    mode = auth["mode"]
    print(f"[{args.api}/{mode}] via {auth['label']} — size={args.size} quality={args.quality} "
          f"format={args.format} n={args.n} ...", file=sys.stderr)
    started = time.time()

    def run(a):
        if a.api == "images":
            return run_images_chatgpt(a) if mode == "chatgpt" else run_images_apikey(a, auth)
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
        "api": args.api,
        "saved": paths,
        "size": meta.get("size", args.size),
        "quality": meta.get("quality", args.quality),
        "output_format": meta.get("output_format", args.format),
        "elapsed_s": round(time.time() - started, 1),
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
