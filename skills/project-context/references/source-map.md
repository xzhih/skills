# Source Map

Use this reference when a project has many docs and the correct restore order is unclear.

## Known Profile Examples

These paths are examples and common conventions, not required project structure. Prefer paths declared by project guidance. If no equivalent exists and the current task can proceed with code/repo evidence, keep the context packet lightweight.

## Common Source Roles

- `AGENTS.md`: repository rules, tool conventions, package manager rules, test expectations, forbidden actions.
- `docs/CURRENT-HANDOFF.md`: current project state, recent decisions, active plan, next intended work.
- `docs/WORKTREE-COORDINATION.md`: lane ownership, active/review/blocked/merged branches, collision surfaces.
- `docs/discussion-workflows/index.md`: decision index for confirmed, draft, open, overlap, and blocked discussion records.
- `docs/discussion-workflows/boundaries/`: implementation boundaries and excluded surfaces.
- `docs/discussion-workflows/references/`: source-backed assessments, comparison matrices, or analysis artifacts.
- `docs/dev-flow/`: lifecycle artifacts for Requirements, Spec, Eval, Plan,
  evidence, and handoffs.
- `docs/agent-runtime/`: agent/model profiles, selected participants,
  capability checks, and external-agent session ledgers.
- `docs/spec/`: target behavior, product contracts, or implementation specs when a project declares this root.
- `docs/spec-compliance/`: evidence that implementation matches specs when a project declares this root.
- `docs/agent-self-driving/`: private orchestration state, source maps,
  blackboards, findings, evidence links, and agent-output records for heavier
  workflows.
- `docs/doc-driven-workflows/`: architecture, operation-flow, call-path, and open-question source-of-truth docs when the project uses doc-driven governance.

## Restore Heuristic

Read indexes first, then only referenced detail docs. If an index and a detail doc disagree, inspect timestamps, git history, and current code before deciding which is authoritative.

When a project has no formal docs, create a short in-chat context packet from code, README, package manifests, tests, and git state. Do not bootstrap docs unless the user explicitly asks or project guidance requires it.

When several docs could own the same fact, use `ownership-map.md` before writing or promoting anything.
