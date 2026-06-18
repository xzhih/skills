---
name: codex-image-gen
description: >-
  Use when the user wants to generate, render, or edit raster images such as
  photos, illustrations, product mockups, icons, hero images, textures, concept
  art, or wallpapers through the codex-compatible Images API by default, with a
  Responses API `image_generation` compatibility path. Trigger on requests like "make me a logo", "generate
  a hero image", "render a 4k wallpaper", "create a product mockup", or "edit
  this photo's background", even if the user does not name an API. Use when
  credentials are available through OPENAI_API_KEY, codex provider config, or a
  ChatGPT login; the bundled Node script auto-detects auth mode, refreshes OAuth
  tokens, parses SSE, validates image size, and saves outputs.
---

# Codex Image Generation

Generate or edit images via the direct Images API by default (gpt-image-2),
working with **two interchangeable auth modes**. The request body is identical
across modes for the default path; only the endpoint and auth headers differ — and
the bundled Node script hides all of that. Use `--api responses` only when you need
the Responses `image_generation` compatibility path. The Node script is standalone:
it does not fall back to Python or curl.

## When to use

- The user wants a brand-new bitmap image: photo, illustration, product/UI mockup,
  hero/banner, icon, texture, concept art, wallpaper.
- The user wants to edit or vary an existing image using it as a reference.
- The user has credentials available: `OPENAI_API_KEY`, **or** they're logged into
  codex with a ChatGPT account (`~/.codex/auth.json` with `auth_mode: chatgpt`).

Prefer real generation with this skill over SVG/HTML/CSS placeholders when the user
asked for a photo/render/illustration. For an icon/logo that should match an
existing repo's vector system, edit those vectors directly instead.

## The two auth modes (auto-detected)

| Mode | Trigger | Endpoint | Auth |
| --- | --- | --- | --- |
| **A. API Key (env)** | `OPENAI_API_KEY` env set | `{OPENAI_BASE_URL or api.openai.com}/v1/images/generations|edits` | `Authorization: Bearer <key>` |
| **A. API Key (codex provider)** | `~/.codex/config.toml` active `model_provider` has `base_url` + `experimental_bearer_token` (or `env_key`) | `{base_url}/images/generations|edits` | `Authorization: Bearer <token>` |
| **B. ChatGPT login** | `~/.codex/auth.json` `auth_mode=chatgpt` | `https://chatgpt.com/backend-api/codex/images/generations|edits` | OAuth `access_token` + `chatgpt-account-id` |

Auto-detect priority: **`OPENAI_API_KEY` env → codex config.toml custom provider →
ChatGPT login (`auth.json`)**. This mirrors codex itself: if you've pointed codex at
a custom provider, the script uses that same provider + token. You normally don't
need to think about which one — just run it. Force one with `--mode apikey|chatgpt`.

## How to run

Use the bundled Node script. It only needs Node 18+ (no npm install).

```bash
node scripts/generate.mjs --prompt "<description>" --out <path>
```

Common options:

```bash
# basic
node scripts/generate.mjs --prompt "a cute cat on a windowsill, soft light, no text" --out cat.png

# explicit resolution + format/compression
node scripts/generate.mjs --prompt "4k mountain landscape at dawn" --size 3840x2160 --format webp --output-compression 90 --out hero.webp

# multiple variants of one prompt
node scripts/generate.mjs --prompt "minimal coffee brand logo" --n 3 --out logo.png

# edit / use a reference image (repeatable)
node scripts/generate.mjs --prompt "replace background with warm sunset" --input-image photo.png --action edit --out edited.png

# force a mode if needed
node scripts/generate.mjs --prompt "..." --mode chatgpt --out out.png

# compatibility path (may not preserve 2K/4K under ChatGPT login)
node scripts/generate.mjs --prompt "..." --api responses --out out.png
```

The script prints a one-line JSON summary (mode, saved paths, returned size/quality,
elapsed). Report the saved path(s) back to the user.

## Parameters (real, tested limits)

These come from actually exercising the endpoint — trust them over guesses.

- **`--size`**: `auto` or `WIDTHxHEIGHT`. Validity rules (enforced both client- and
  server-side): longest edge ≤ 3840px; width and height each divisible by 16;
  long:short ratio ≤ 3:1; total pixels between 655,360 and 8,294,400. Verified
  working sizes: `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `2048x1152`,
  `2048x1536`, `3840x2160`, `2160x3840`. `auto` lets the model choose (returned
  e.g. `1122x1402` — note non-round dimensions).
- **`--quality`**: `low|medium|high|auto`.
  - Mode A: takes effect (low→cheaper/faster, high→slower/more detail).
  - **Mode B: ignored by the backend — quality is fixed at ~medium.** Don't promise
    quality tiers or build quality-based fallbacks when running under ChatGPT login.
- **`--format`**: `png` (default), `jpeg` (smaller, no transparency), `webp` (small,
  web-friendly). All three verified in both modes.
- **`--api`**: `images|responses` (default `images`). Use `images` for 2K/4K and
  high-quality output. `responses` is retained for compatibility; under ChatGPT
  login it may return reduced dimensions even when a 4K size is requested.
- **`--action`**: `auto|generate|edit` (default `auto`). Use `generate` to force a
  new image and `edit` when input images are meant to be modified.
- **`--background`**: `auto|opaque`. `transparent` is intentionally not exposed
  because `gpt-image-2` rejects it.
- **`--output-compression`**: `0–100` for `jpeg` / `webp` only.
- **`--partial-images`**: `0–3` streamed previews, only used by `--api responses`.
  The script never saves partial previews as final outputs; it waits for a completed
  `image_generation_call.result`.
- **`--moderation`**: `auto|low`.
- **`--n`**: 1–10. Produces variants of the same prompt by looping the request (the
  tool itself doesn't accept an `n` field). For several *distinct* assets, call the
  script once per asset instead of using `--n`.
- **Transparency**: gpt-image-2 does **not** support `background: transparent`.
  Use the chroma-key workflow below instead.

## Prompting

Quick version: structure the prompt as scene/background → subject → details →
constraints → intended use; always add `No text, no watermark.` to avoid garbled
text; for edits restate invariants every time (`change only X; keep Y unchanged`);
quote required in-image text verbatim.

For anything beyond a one-liner — vague requests, quality-sensitive output, or a
known asset type — read `references/prompting.md`. It has the augmentation rules, a
use-case taxonomy, and copy/paste recipes for product shots, UI mockups, logos,
infographics, edits, etc. Use it; don't guess at prompt structure.

## Transparent images

gpt-image-2 can't output transparency directly, so generate on a flat chroma-key
background and remove it locally:

1. Generate the subject on a solid key background (default `#00ff00`; use `#ff00ff`
   if the subject is green). Forbid shadows, gradients, reflections, and floor planes
   in the prompt — see the "transparent-ready subject" recipe in
   `references/prompting.md`.
   ```bash
   node scripts/generate.mjs --prompt "<subject> on a perfectly flat solid #00ff00 chroma-key background, no shadows, crisp edges, generous padding, no text" --out raw.png
   ```
2. Convert the key color to alpha (needs `pip install pillow numpy`):
   ```bash
   python scripts/remove_chroma_key.py --input raw.png --out cutout.png --despill
   ```
   `--key auto` samples the border; pass an explicit hex (`--key 00ff00`) if needed.
   Tune `--transparent-threshold` / `--opaque-threshold` for soft edges; add
   `--despill` to kill key-color fringe.
3. Validate the result has transparent corners and a clean subject edge.

This handles flat opaque subjects well. For genuinely hard transparency (hair, fur,
glass, smoke, soft shadows), tell the user chroma-keying may not be clean enough.

## Errors & retries

- `400 image_generation_user_error` (bad size, transparent background): a **parameter**
  error — fix the parameter, do **not** retry blindly.
- `401` in mode B: the `access_token` expired — the script auto-refreshes once via
  the stored `refresh_token` and retries. If it still fails, the user must re-login
  to codex.
- `429` / `500` / `502` / `503` / timeout: transient — retry with backoff (e.g. 1s,
  3s, 8s). In mode B, `429` may also mean the ChatGPT plan's usage limit is hit.
- Responses mode is slower (≈50–80s per image, first call can be ~90s cold). For
  UIs, run generation as an async task.

## Bundled files

- `scripts/generate.mjs` — the main entry point (Node 18+, no npm packages). Run it
  to generate/edit.
- `scripts/generate.py` — legacy Python implementation retained for now, not used as
  a fallback by `generate.mjs`.
- `scripts/remove_chroma_key.py` — chroma-key → alpha for the transparency workflow
  (needs Pillow + NumPy).
- `references/prompting.md` — prompt structure, use-case taxonomy, copy/paste recipes.
- `references/api.md` — raw HTTP shapes, headers, token refresh/exchange, error table.
  You rarely need it; the script covers the normal path.
