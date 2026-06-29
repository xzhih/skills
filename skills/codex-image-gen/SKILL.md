---
name: codex-image-gen
description: Use when the user wants to generate, render, or edit raster images such as photos, illustrations, product mockups, icons, hero images, textures, concept art, wallpapers, transparent cutouts, or reference-based image edits through a codex-compatible image generation API.
---

# Codex Image Generation

Generate or edit images via the direct Images API by default (gpt-image-2),
working with **two interchangeable auth modes**. The request body is identical
across modes for the default path; only the endpoint and auth headers differ — and
the bundled Node script hides all of that. Use `--api responses` only when you need
the Responses `image_generation` compatibility path. The Node script is standalone:
it does not fall back to Python or curl.

## Core Contract

1. **Classify the ask.** Decide whether this is generation, edit, reference-guided generation, transparent cutout, or prompt help. Done when the output path, format, size, and source image roles are clear.
2. **Use the script.** Prefer `scripts/generate.mjs`; do not hand-roll HTTP unless debugging or porting. Done when the script prints its JSON summary and saved paths.
3. **Preserve intent in prompts.** Treat the user's prompt as the source of truth. Read `references/prompting.md` when the request is vague, quality-sensitive, or asks for prompt help, but use it as restraint guidance rather than a template to impose. Done when the final prompt keeps the user's exact requirements, adds only missing execution-critical constraints, and does not introduce a new concept, style, metaphor, layout, or text policy.
4. **Treat parameters as gates.** Bad size, transparent background, or unsupported format is a parameter problem; fix it rather than retrying blindly.
5. **Report evidence.** Return saved path(s), mode, size/format when known, and any limitation such as ChatGPT-login fixed quality or chroma-key transparency risk.

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

## Parameter Guardrails

Run `node scripts/generate.mjs --help` for the current flags. Read `references/api.md`
only when debugging the script, porting the request, or checking raw protocol details.

- `--size`: use `auto` or `WIDTHxHEIGHT`; longest edge must be at most 3840px, each edge divisible by 16, aspect ratio at most 3:1, and total pixels within the tested endpoint limits.
- `--quality`: works in API-key mode; ChatGPT-login mode ignores it and stays around medium quality.
- `--api`: use `images` by default for 2K/4K and quality-sensitive output; use `responses` only for compatibility.
- `--action`: use `edit` when input images are targets to modify; for style/reference-only images, keep generation semantics and label each image role in the prompt.
- `--n`: use for variants of the same prompt. For distinct assets, call the script once per asset.
- Transparency: `gpt-image-2` does not support `background: transparent`; use the chroma-key workflow below.

## Prompting

Quick version: lightly structure the prompt as scene/background → subject → details →
constraints → intended use only when that improves clarity. If the user already gave
a detailed prompt, preserve it and only normalize contradictions or missing execution
constraints. Use `No extra text, no watermark.` when required in-image text is present;
use `No text, no watermark.` only when the asset should contain no text. For edits,
restate invariants every time (`change only X; keep Y unchanged`); quote required
in-image text verbatim.

For vague requests, quality-sensitive output, or a known asset type, read
`references/prompting.md`. Its taxonomy and recipes are guardrails, not default
expansions. Do not turn a specific user prompt into a generic recipe, marketing
brief, or unrelated asset template.

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
