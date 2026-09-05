# Image API Capability Notes

This file documents how `scripts/generate.mjs` maps local options to provider
paths. It is a practical compatibility note, not a guarantee that every provider
will honor every field.

## API Paths

| CLI path | Provider mode | Main use | Notes |
| --- | --- | --- | --- |
| `--api images --mode apikey` | API key or Codex provider | default generation, edits | Uses `/images/generations` or `/images/edits` JSON body used by this skill/provider path. |
| `--api images --mode chatgpt` | ChatGPT login | default generation, simple edits | Uses ChatGPT/Codex private image routes. Custom size may be accepted but returned smaller. |
| `--api responses --mode apikey` | API key or Codex provider | Responses compatibility | Uses `/responses` with `image_generation` tool. |
| `--api responses --mode chatgpt` | ChatGPT login | Codex-compatible fallback | Uses private streamed `/codex/responses`. |

## Field Support

| Field | Images | Responses | Notes |
| --- | --- | --- | --- |
| `prompt` | yes | yes | Never augmented by the CLI. |
| `size` | yes | yes | Request only; actual saved size must be inspected. |
| `quality` | yes | yes | ChatGPT private routes may ignore tiers. |
| `output_format` | yes | yes | `png`, `jpeg`, `webp`. |
| `output_compression` | jpeg/webp | jpeg/webp | Rejected for PNG by local parser. |
| `background` | provider-dependent | provider-dependent | `gpt-image-2` rejects `transparent`; use public Images API + `gpt-image-1.5` for native alpha. |
| `partial_images` | no | yes | Progress only; never save partial previews as final. |
| `input_image` | edit/reference | edit/reference | Data URLs are redacted in dry-run output. |
| `mask` | API-key images only | no | ChatGPT/Codex private mask support is not assumed. |
| `input_fidelity` | no | explicit only | Sent only on Responses when not `auto`. |

## Size Handling

Local validation allows:

- longest edge <= `3840`
- width and height divisible by `16`
- aspect ratio <= `3:1`
- total pixels in `[655360, 8294400]`

Known-valid requests include `2048x2048`, `2048x1152`, `2048x1536`,
`3840x2160`, and `2160x3840`.

The provider may still return a smaller image. The CLI reads actual dimensions
from the saved bytes and prints a warning when actual size differs from requested
size.

## Transparency

`gpt-image-2` does not support `background: transparent`. Native alpha requires
`--mode apikey --api images --image-model gpt-image-1.5 --background transparent`
with PNG or WebP output. That model only accepts `1024x1024`, `1536x1024`,
`1024x1536`, or `auto`.

For a 4K transparent delivery, use `gpt-image-2` at 4K against a flat chroma-key
background and then run `scripts/remove_chroma_key.py`. Do not use the private
ChatGPT/Codex route when native alpha or exact 4K output is required.

Only promise true alpha when all of these are true:

- API-key mode and the public Images API are used.
- The selected provider/model documents transparent output.
- The saved file is verified to contain alpha.

## Error Interpretation

| Error | Meaning | Action |
| --- | --- | --- |
| output already exists | local safety guard | use `--force` or a new path |
| bad size / 400 user error | request parameter problem | fix size or field; do not retry blindly |
| 401 | expired/missing auth | ChatGPT refreshes once; otherwise re-login or provide API key |
| 429 | rate or plan limit | retry with backoff or reduce concurrency |
| 500/502/503/timeout | transient upstream | retry with backoff |
| actual size mismatch | provider returned smaller image | report honestly; use another provider path if exact size matters |
