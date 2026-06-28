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
npx skills add xzhih/skills --skill careful-coding codex-image-gen discussion-workflows doc-driven-workflows multi-agent-orchestration
```

## Skills

- `careful-coding`: careful implementation, debugging, refactoring, and reviewable code changes.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `discussion-workflows`: route product and architecture discussions through reference comparison, boundary clarification, complexity checks, and durable state capture.
- `doc-driven-workflows`: prevent documentation drift through explicit bootstrap and gated maintenance of source-backed docs, operation flows, call paths, and open-question ledgers.
- `multi-agent-orchestration`: run explicit long-task workflows with independent agents, bounded review-repair, and evidence-backed completion.

## Layout

```text
skills/
  careful-coding/
  codex-image-gen/
  discussion-workflows/
  doc-driven-workflows/
  multi-agent-orchestration/
```
