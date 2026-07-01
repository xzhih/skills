# Codex And ChatGPT Network Path

This skill can use the same local ChatGPT login that Codex uses. The private route
is useful when no API key is present, but it should be treated as best-effort
compatibility rather than a formal public API.

## Auth Files

ChatGPT login credentials live in:

```text
~/.codex/auth.json
```

The file may include:

- `auth_mode: "chatgpt"`
- `tokens.access_token`
- `tokens.refresh_token`
- `tokens.account_id`
- optional `OPENAI_API_KEY`

Do not print, commit, or copy tokens into docs, logs, prompts, or tests.

## Routes Used

Images path:

```text
https://chatgpt.com/backend-api/codex/images/generations
https://chatgpt.com/backend-api/codex/images/edits
```

Responses path:

```text
https://chatgpt.com/backend-api/codex/responses
```

The Responses path uses streamed SSE output with `stream: true` and `store: false`.

## Refresh

On a `401`, the CLI refreshes `access_token` once through:

```text
https://auth.openai.com/oauth/token
```

The refreshed token is written back to `~/.codex/auth.json`.

## Known Limitations

- Private routes may accept `size: "3840x2160"` but return a smaller image.
- Private routes may ignore `quality` tiers.
- Private mask support is not assumed.
- True transparent output is not promised.
- Headers and request shapes may change because this is not the stable public API.

Because of these limits, the CLI always reports actual saved dimensions and keeps
dry-run output token-free.
