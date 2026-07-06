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
- `project-context`: restore authoritative project instructions, handoff docs, coordination state, decisions, verification conventions, and collision risks.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `development-workflows`: route document-led development work across context recovery, discussion, doc governance, lane orchestration, integration, and heavier multi-agent workflows.
- `discussion-workflows`: route product and architecture discussions through reference comparison, boundary clarification, complexity checks, and durable state capture.
- `doc-driven-workflows`: bootstrap and maintain source-backed architecture, tech-stack, domain, operation-flow, call-path, and open-question docs for single projects or multi-repo workspaces.
- `agent-grilling`: run agent-mediated brainstorming for unclear goals, branches, assumptions, and decomposition before planning or dispatch.
- `parallel-lane-orchestration`: split complex work into safe batches of subagent lane work with structured packets, direct dispatch, and controlled continuation.
- `integration-review`: review returned lanes, normalize claims, verify evidence, classify blockers, and continue to the next safe batch when possible.
- `multi-agent-orchestration`: run explicit long-task workflows with independent agents, bounded review-repair, and evidence-backed completion.

## Routing Guide

| If the work sounds like... | Prefer | Avoid |
| --- | --- | --- |
| Ordinary coding, debugging, refactoring, or reviewable implementation | `steady-coding` | Workflow orchestration unless the task actually needs it |
| Restoring a project's handoff, coordination, spec, lane, or source-of-truth state | `project-context` | Reading every doc tree by default |
| Choosing which workflow owner should handle a complex development task | `development-workflows` | Calling every workflow in sequence |
| A long or corrected discussion needs recap, boundary control, or durable decisions | `discussion-workflows` | Treating it as implementation planning too early |
| A fuzzy goal needs agent-answered formulation, assumptions, or lane pressure-testing | `agent-grilling` | `discussion-workflows` when the problem is still formulation, not recap |
| One focused reviewer, researcher, or fresh-eyes agent should inspect a bounded artifact or question | `multi-agent-orchestration` Level 1 | `parallel-lane-orchestration`, which is for two or more independent lanes |
| Two or more clear, independent work lanes can run safely | `parallel-lane-orchestration` | `multi-agent-orchestration` unless Spec/Eval, external agents, or review-repair are explicitly requested |
| Returned lane work needs evidence, scope, conflict, and blocker classification | `integration-review` | Trusting worker summaries without inspecting evidence |
| Explicit Spec/Eval delivery, model-diverse review, external-agent policy, or repeated review-repair | `multi-agent-orchestration` | Routine lane batching or lightweight goal/path pressure-testing |
| Source-backed architecture, operation-flow, call-path, or code/docs drift maintenance | `doc-driven-workflows` | Updating docs merely because docs exist |

Common ambiguous phrasing:

| User says... | Route first |
| --- | --- |
| "Ask agents to make this goal clear", "pressure-test the idea", "先问透" | `agent-grilling` |
| "Where did the discussion land?", "recap this thread", "先复盘" | `discussion-workflows` |
| "Get another agent to look", "fresh eyes", "one reviewer", "one researcher" | `multi-agent-orchestration` Level 1 |
| "Restore project state", "continue from handoff", "先恢复上下文" | `project-context` |
| "Sync code/docs", "code/docs synchronization", "docs may drift" | `doc-driven-workflows` |
| "Use two agents in parallel on two separate parts" | `parallel-lane-orchestration`, unless the user asks for Spec/Eval, adversarial review, repeated repair, or external-agent policy |
| "The lanes came back; decide what can merge" | `integration-review`, with `project-context` as preflight |

Use `agent-grilling` when the goal or questions are still being formulated. Use `discussion-workflows` when the goal already exists and the work is recap, boundary, responsibility, reference, or complexity convergence.

## Layout

```text
skills/
  steady-coding/
  project-context/
  codex-image-gen/
  development-workflows/
  discussion-workflows/
  doc-driven-workflows/
  agent-grilling/
  parallel-lane-orchestration/
  integration-review/
  multi-agent-orchestration/
```
