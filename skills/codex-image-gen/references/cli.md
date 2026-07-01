# CLI Reference

Use these commands from the skill directory unless paths are absolute.

## Single Generate

```bash
node scripts/generate.mjs \
  --prompt "A clean product photo of a matte black water bottle on a white background. No text, no watermark." \
  --out build/bottle.png \
  --size 2048x2048 \
  --quality medium
```

Dry run:

```bash
node scripts/generate.mjs \
  --prompt "A clean black square centered on white, no text" \
  --out build/square.png \
  --size 1024x1024 \
  --dry-run
```

The dry-run output redacts image bytes and does not call the network.

## Long Prompt File

```bash
node scripts/generate.mjs \
  --prompt-file prompt.md \
  --out build/cover.png \
  --size 3840x2160 \
  --quality high \
  --dry-run
```

`--prompt` and `--prompt-file` are mutually exclusive. Prompt files are read as
UTF-8, trimmed at the ends, and otherwise preserved.

## Editing

```bash
node scripts/generate.mjs \
  --prompt "Change only the background to a warm studio gradient. Keep the subject, edges, pose, lighting, shadows, and all existing text unchanged." \
  --input-image source.png \
  --action edit \
  --out build/edited.png
```

Mask example:

```bash
node scripts/generate.mjs \
  --prompt "Replace only the masked area with a blue notebook. Keep all unmasked pixels unchanged." \
  --input-image source.png \
  --mask mask.png \
  --action edit \
  --api images \
  --mode apikey \
  --out build/masked-edit.png \
  --dry-run
```

The CLI rejects `--mask` through ChatGPT/Codex private routes because support has
not been verified there.

## Batch JSONL

Each non-empty, non-comment line is one JSON object:

```jsonl
# jobs.jsonl
{"prompt":"Minimal blue square on white background, no text","out":"build/blue.png","size":"1024x1024","quality":"low"}
{"prompt":"Minimal orange square on white background, no text","out":"build/orange.png","size":"1024x1024","quality":"low"}
```

Run:

```bash
node scripts/generate_batch.mjs \
  --input jobs.jsonl \
  --concurrency 2 \
  --max-attempts 3
```

Global output directory:

```bash
node scripts/generate_batch.mjs \
  --input jobs.jsonl \
  --out-dir build/batch \
  --dry-run
```

When `--out-dir` is global, output files are named `job-<line>.png` unless the job
sets `output_stem`.

## Output And Overwrite

- `--out PATH`: exact file path for one image; multiple images become
  `name-1.ext`, `name-2.ext`.
- `--out-dir DIR`: output directory; files are named from `outputStem` or `image`.
- Existing files are rejected by default.
- Use `--force` to overwrite.

## Requested Versus Actual Size

The summary includes both:

- `requested_size`: what was sent to the provider.
- `actual_size`: what was parsed from the saved PNG/JPEG/WebP bytes.

If they differ, report the warning instead of saying the requested size succeeded.

## Downscale Copy

```bash
node scripts/generate.mjs \
  --prompt "A clean hero image, no text" \
  --out build/hero.png \
  --size 3840x2160 \
  --downscale-max-dim 1920 \
  --downscale-suffix -web
```

The original is preserved. A second file is created only when a local resizer is
available and the actual image exceeds the threshold.

## Alpha Verification

```bash
python3 - <<'PY'
from PIL import Image
img = Image.open("output.png")
print(img.mode, "alpha" if "A" in img.mode else "no-alpha")
PY
```
