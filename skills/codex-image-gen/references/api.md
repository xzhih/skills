# Responses API image generation — raw reference

Low-level details behind `scripts/generate.py`. Read this only when debugging the
script, porting the logic elsewhere, or constructing requests by hand. For normal
use, just call the script.

## Contents
- [Request body (both modes)](#request-body-both-modes)
- [Mode A: API Key](#mode-a-api-key)
- [Mode B: ChatGPT official login](#mode-b-chatgpt-official-login)
- [access_token refresh](#access_token-refresh)
- [Exchange ChatGPT login for an API key](#exchange-chatgpt-login-for-an-api-key)
- [Response shapes](#response-shapes)
- [Parameter rules (tested)](#parameter-rules-tested)
- [Headers: what's required](#headers-whats-required)
- [Errors](#errors)

## Request body (both modes)

The body is identical across modes. `instructions` is required; `input` must be a
list of message items. The `image_generation` tool does **not** accept an `n` field.

```json
{
  "model": "gpt-5.5",
  "instructions": "You are a helpful assistant. When asked to create or edit an image, call the image_generation tool.",
  "input": [
    {
      "role": "user",
      "content": [
        { "type": "input_text", "text": "Generate a small cute cat. No text, no watermark." }
      ]
    }
  ],
  "tools": [
    {
      "type": "image_generation",
      "model": "gpt-image-2",
      "size": "1024x1024",
      "quality": "low",
      "output_format": "png"
    }
  ]
}
```

For edits/references, append to `content`:
`{ "type": "input_image", "image_url": "data:image/png;base64,<...>" }`.

## Mode A: API Key

Two credential sources, both Bearer-token to a `/responses` endpoint, non-streaming
(single JSON response):

1. **Env var**: `OPENAI_API_KEY` (+ optional `OPENAI_BASE_URL`).
   URL: `${OPENAI_BASE_URL:-https://api.openai.com}/v1/responses`.
2. **Codex custom provider** in `~/.codex/config.toml`:

   ```toml
   model_provider = "code"
   [model_providers.code]
   wire_api = "responses"
   experimental_bearer_token = "sk-..."   # or env_key = "SOME_ENV_VAR"
   base_url = "http://host:port"
   ```

   The script reads the *active* `model_provider`'s block, takes `base_url` +
   `experimental_bearer_token` (or `env_key` → env var), and calls
   `{base_url}/responses` (codex does **not** insert `/v1`; if `base_url` already
   ends in `/v1` or `/responses` that's respected).

Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`.

## Mode B: ChatGPT official login

Credentials live in `~/.codex/auth.json`:

```json
{
  "auth_mode": "chatgpt",
  "OPENAI_API_KEY": null,
  "tokens": {
    "access_token": "eyJ...",   // JWT, short-lived → Authorization
    "account_id": "9df...",      // → chatgpt-account-id header
    "id_token": "eyJ...",        // → exchange for an API key (below)
    "refresh_token": "rt.1..."   // → refresh access_token
  }
}
```

- URL: `https://chatgpt.com/backend-api/codex/responses`
- Body **must** include `"stream": true` and `"store": false`.
- Response is `text/event-stream` (SSE) — parse `data:` lines.
- Headers:

```http
Authorization: Bearer <tokens.access_token>
chatgpt-account-id: <tokens.account_id>
OpenAI-Beta: responses=experimental
originator: codex_cli_rs
session_id: <uuid>
Content-Type: application/json
Accept: text/event-stream
```

## access_token refresh

`access_token` is short-lived. On `401`, refresh and retry once:

```http
POST https://auth.openai.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=<refresh_token>&client_id=app_EMoamEEZ73f0CkXaXp7hrann
```

The response contains a new `access_token` (and possibly `id_token` / `refresh_token`).
The script writes these back into `auth.json` and updates `last_refresh`.

## Exchange ChatGPT login for an API key

If you'd rather use mode A everywhere, mint a real API key from the ChatGPT login's
`id_token` (this is codex's "API key configured" mechanism):

```http
POST https://auth.openai.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&client_id=app_EMoamEEZ73f0CkXaXp7hrann
&subject_token=<id_token>
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&requested_token=openai-api-key
```

Then set the result as `OPENAI_API_KEY` and the script uses mode A.

## Response shapes

**Mode A (JSON):** image(s) under `output[]`:

```json
{ "output": [ { "type": "image_generation_call", "id": "ig_x", "result": "<b64>",
  "size": "1024x1024", "quality": "medium", "background": "opaque", "output_format": "png" } ] }
```

**Mode B (SSE):** relevant events per `output_index`:
- `response.image_generation_call.partial_image` → `partial_image_b64` (progressive;
  last one is full), plus `size`/`quality`/`output_format`/`background`.
- `response.output_item.done` → `item.result` (final b64) + metadata.
- `response.completed` / `response.failed` terminate the stream.

Accumulate the latest `result` per `output_index`; decode base64 to bytes.

## Parameter rules (tested)

`size`: `auto` or `WIDTHxHEIGHT` with all of:
- longest edge ≤ 3840px
- width and height each divisible by 16
- long:short ratio ≤ 3:1
- total pixels in [655,360 , 8,294,400]

Verified-working: `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `2048x1152`,
`2048x1536`, `3840x2160`, `2160x3840`. `auto` → model-chosen (saw `1122x1402`).

Verified rejections (`400 image_generation_user_error`):
- `512x512` → below minimum pixel budget
- `4096x4096` → longest edge must be ≤ 3840
- `1000x1000`, `3840x1080` → width/height must be divisible by 16

`quality`: `low|medium|high|auto`. **Mode B ignores it (fixed ~medium):** at
`1024x1024`, all four tiers returned `quality:medium` with near-identical file sizes
(1.49–1.54 MB) and no latency gradient. Mode A honors the tiers.

`output_format`: `png` / `jpeg` / `webp`, all verified both modes. At `1024x1024`,
same image ≈ png 1.5 MB, webp 0.95 MB, jpeg 0.11 MB. `webp` accepts
`output_compression` (0–100).

`background: transparent` is **not supported** by gpt-image-2.

## Headers: what's required

Tested by varying headers against the mode-B endpoint:

| Header | Required? | Notes |
| --- | --- | --- |
| `Authorization` | Yes | Bearer access_token; 401 if missing/expired |
| `chatgpt-account-id` | Yes | account routing |
| `Content-Type: application/json` | Yes | |
| `User-Agent` | No | any UA works (even Python's default); a codex-style UA is kept only to look like a normal client |
| `Cookie` | No | Bearer auth; the `__cf_bm` set-cookie is Cloudflare's, not needed |
| `OpenAI-Beta` / `originator` / `session_id` | Recommended | match codex behavior; works without but keep for robustness |

What gates *parameter support* is the request body + the two auth headers, validated
server-side — not UA or Cookie.

## Errors

| HTTP | Meaning | Action |
| --- | --- | --- |
| `400 image_generation_user_error` | bad size / transparent bg | fix parameter, don't retry |
| `400 invalid_request_error` | malformed body (e.g. `tools[0].n`, non-list input) | fix shape |
| `401` | mode B token expired / missing account header | refresh access_token, retry once; else re-login |
| `429` | rate limit (mode B: maybe plan usage cap) | backoff retry |
| `500/502/503` / timeout | transient upstream | backoff retry (1s/3s/8s) |
