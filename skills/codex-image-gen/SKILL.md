---
name: codex-image-gen
description: Use when the user wants to generate, render, batch-generate, or edit raster images such as photos, illustrations, product mockups, icons, hero images, textures, concept art, wallpapers, transparent cutouts, or reference-based image edits through a codex-compatible image generation API.
---

# Codex Image Generation

Use this skill for bitmap image generation and edits through the bundled Node CLI.
It is intentionally conservative about prompts: the user's prompt is the source of
truth, and the skill should not rewrite a detailed brief unless the user asks.

## When To Use

- Generate photos, illustrations, presentation covers, wallpapers, textures, icons,
  product renders, UI mockups, and other raster assets.
- Edit or vary an existing raster image with `--input-image`.
- Run multiple independent image jobs from a JSONL file.
- Produce transparent cutouts through a chroma-key post-process.
- Test custom sizes or 4K requests while reporting the actual saved dimensions.

Do not use this skill when the right output is repo-native SVG, HTML/CSS/canvas,
an existing icon system, or a vector/logo edit that should remain editable as code.

## Core Rules

1. Prefer `scripts/generate.mjs` for single generation or edit.
2. Prefer `scripts/generate_batch.mjs` for multiple independent jobs.
3. Use `--dry-run` before long, expensive, or ambiguous jobs.
4. Preserve the user's prompt. Add only missing execution-critical constraints.
5. If required text appears in the image, quote it exactly and use `No extra text,
   no watermark.` Do not add `No text`.
6. Requested size is not a guarantee. Always check the saved file summary for actual
   dimensions, especially for custom or 4K requests.
7. Do not promise true alpha through ChatGPT/Codex private routes.

## Single Generation

```bash
node scripts/generate.mjs \
  --prompt "A restrained editorial report cover, white background, clear title text: Quarterly Review" \
  --out build/report-cover.png \
  --size 2048x1152 \
  --quality medium \
  --force
```

Long prompts:

```bash
node scripts/generate.mjs \
  --prompt-file prompt.md \
  --out build/cover.png \
  --size 3840x2160 \
  --dry-run
```

The command prints a JSON result and per-file stderr summary. Report saved paths,
requested size, actual size, format, API path, and any size warning to the user.

## Editing

```bash
node scripts/generate.mjs \
  --prompt "Replace only the background. Keep the subject, edges, lighting, and all existing text unchanged." \
  --input-image input.png \
  --action edit \
  --out build/edited.png
```

Use `--mask` only with supported API-key images edit routes. The CLI rejects obvious
unsupported combinations before network calls. `--input-fidelity low|high|auto` is
only sent on the Responses image-generation path when explicitly requested.

For edits, restate invariants every time: what changes, what stays untouched, and
whether existing text must remain unchanged.

## Batch Generation

Create a JSONL file:

```jsonl
{"prompt":"Minimal blue square on white background, no text","out":"build/blue.png","size":"1024x1024","quality":"low"}
{"prompt":"Minimal orange square on white background, no text","out":"build/orange.png","size":"1024x1024","quality":"low"}
```

Run:

```bash
node scripts/generate_batch.mjs \
  --input jobs.jsonl \
  --concurrency 2 \
  --max-attempts 3 \
  --fail-fast
```

Use `--dry-run` to inspect resolved jobs without network calls.

## Transparent Backgrounds

For simple cutouts, generate on a perfectly flat key color and remove it locally:

```bash
node scripts/generate.mjs \
  --prompt "A ceramic mug centered on a perfectly flat solid #00ff00 chroma-key background, no shadows, no gradients, crisp edges, generous padding, no text" \
  --out build/mug-key.png

python3 scripts/remove_chroma_key.py \
  --input build/mug-key.png \
  --out build/mug-cutout.png \
  --auto-key border \
  --soft-matte \
  --spill-cleanup \
  --force
```

True model alpha should be used only when an API-key provider and model are known to
support transparent backgrounds. ChatGPT/Codex private routes may accept background
fields while still returning opaque or smaller images.

Verify alpha when transparency matters:

```bash
python3 - <<'PY'
from PIL import Image
img = Image.open("build/mug-cutout.png")
print(img.mode, "alpha" if "A" in img.mode else "no-alpha")
PY
```

## Sizes And 4K

`--size` accepts `auto` or `WIDTHxHEIGHT`. Guardrails:

- longest edge at most `3840`
- width and height divisible by `16`
- aspect ratio at most `3:1`
- total pixels from `655,360` to `8,294,400`

Known-valid requests include `2048x2048`, `2048x1152`, `2048x1536`,
`3840x2160`, and `2160x3840`. Provider paths can still return smaller images. The
CLI reports both requested and actual saved dimensions; treat mismatches as provider
behavior, not local success at the requested size.

## Auth And API Paths

Auto-detection order:

1. `OPENAI_API_KEY` with optional `OPENAI_BASE_URL`
2. active Codex provider in `~/.codex/config.toml`
3. ChatGPT login in `~/.codex/auth.json`

Use `--mode apikey|chatgpt` to force a path. Use `--api images` by default; use
`--api responses` for compatibility with Responses `image_generation`.

See:

- `references/cli.md` for command examples.
- `references/image-api.md` for capability boundaries.
- `references/codex-network.md` for ChatGPT/Codex route notes.
- `references/prompting.md` for conservative prompt guidance.
- `references/sample-prompts.md` for reusable prompt patterns.

## Troubleshooting

- `output already exists`: add `--force` or choose another path.
- `400 image_generation_user_error`: fix parameters such as size or background.
- `401` with ChatGPT mode: CLI refreshes once; if it still fails, re-login to Codex.
- `429`, `500`, `502`, `503`, timeout: retry with backoff or use batch
  `--max-attempts`.
- Actual size differs from requested size: report it honestly and choose another
  provider path if exact dimensions are required.
- Transparency edge looks dirty: rerun `remove_chroma_key.py` with `--soft-matte`,
  `--edge-feather`, `--edge-contract`, or `--spill-cleanup`.

## Bundled Files

- `scripts/generate.mjs` - single generate/edit CLI.
- `scripts/generate_batch.mjs` - JSONL batch CLI.
- `scripts/remove_chroma_key.py` - chroma-key to alpha PNG helper.
- `scripts/lib/` - shared CLI, auth, request, output, prompt, and metadata helpers.
- `references/` - CLI, API, network, prompting, and sample prompt references.
