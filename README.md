# xzhih skills

Personal Codex/agent skills published for installation with `npx skills`.

## Install

List available skills:

```sh
npx skills add xzhih/skills --list
```

Install all skills:

```sh
npx skills add xzhih/skills --all
```

Install selected skills:

```sh
npx skills add xzhih/skills --skill careful-coding codex-image-gen discussion-workflows
```

## Skills

- `careful-coding`: careful implementation, debugging, refactoring, and reviewable code changes.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `discussion-workflows`: route product and architecture discussions through reference comparison, boundary clarification, complexity checks, and durable state capture.

## Layout

```text
skills/
  careful-coding/
  codex-image-gen/
  discussion-workflows/
```
