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
npx skills add xzhih/skills --skill steady-coding codex-image-gen development-workflows project-context discussion-workflows doc-driven-workflows agent-grilling parallel-lane-orchestration integration-review multi-agent-orchestration
```

## Skills

- `steady-coding`: stable, grounded implementation, debugging, refactoring, and reviewable code changes.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `development-workflows`: route document-led development work across context recovery, discussion, doc governance, lane orchestration, integration, and heavier multi-agent workflows.
- `project-context`: restore authoritative project instructions, handoff docs, coordination state, decisions, verification conventions, and collision risks.
- `discussion-workflows`: route product and architecture discussions through reference comparison, boundary clarification, complexity checks, and durable state capture.
- `doc-driven-workflows`: bootstrap and maintain source-backed architecture, tech-stack, domain, operation-flow, call-path, and open-question docs for single projects or multi-repo workspaces.
- `agent-grilling`: run agent-mediated brainstorming for unclear goals, branches, assumptions, and decomposition before planning or dispatch.
- `parallel-lane-orchestration`: split complex work into safe batches of subagent lane work with structured packets, direct dispatch, and controlled continuation.
- `integration-review`: review returned lanes, normalize claims, verify evidence, classify blockers, and continue to the next safe batch when possible.
- `multi-agent-orchestration`: run explicit long-task workflows with independent agents, bounded review-repair, and evidence-backed completion.

## Layout

```text
skills/
  steady-coding/
  codex-image-gen/
  development-workflows/
  project-context/
  discussion-workflows/
  doc-driven-workflows/
  agent-grilling/
  parallel-lane-orchestration/
  integration-review/
  multi-agent-orchestration/
```
