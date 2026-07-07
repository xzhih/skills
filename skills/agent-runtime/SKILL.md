---
name: agent-runtime
description: "Use only when an active workflow routes here for host subagents, shell/editor/protocol/external agents, named reviewers or workers, model-selectable/model-diverse participants, Agent Model Profiles, capability checks, OpenCode, or external session continuity. Do not use as a user-facing entry workflow."
---

# Agent Runtime

Agent Runtime owns the common agent capability layer used by development
workflow skills. It decides who may participate, how selected agents are
checked, how external/session continuity works, and what can be claimed from
agent coverage. It does not decide the product workflow, review topology, lane
split, or implementation plan.

## Iron Law

```text
AUTHORIZATION, RUNNABILITY, AND SUITABILITY ARE SEPARATE GATES.
```

Do not collapse "visible", "installed", "authenticated", "authorized", and
"suitable" into one vague available/unavailable state. A host-visible subagent
surface and a shell agent such as OpenCode are different invocation surfaces.

## Use For

- Agent Model Profile creation, approval, reuse, and stale checks.
- User-declared candidate sets and selected participant records.
- Host subagent, shell agent, editor agent, protocol agent, external service, or
  model-selectable participant checks.
- External-agent consent, privacy/cost/account boundaries, and session ledgers.
- OpenCode runnability, model checks, command shape, and session continuity.
- Generic task-bearing packet requirements that must travel with selected
  participants.

Use lifecycle owner skills such as `dev-flow`, `agent-review`, `agent-debate`,
`agent-lanes`, and `agent-self-driving` to decide why agents are needed. Use
this skill to decide whether the chosen agents/models/tools are approved,
runnable, and recordable.

## Required References

- Read [agent-model-profile.md](references/agent-model-profile.md) before any
  multi-agent operation, named participant assignment, model-diverse review,
  external-agent use, review-repair loop, or claim of independent agent
  coverage.
- Read [capability-cache.md](references/capability-cache.md) when checking
  selected participants, candidate sets, capability state, authorization, or
  runnability.
- Read [external-agent-sessions.md](references/external-agent-sessions.md) when
  assigning external, shell, editor, or protocol agents across rounds, or when
  session continuity matters.
- Read [opencode.md](references/opencode.md) before declaring OpenCode
  unavailable, checking an approved OpenCode provider/model, running
  `opencode`, or resuming an OpenCode session.

## Boundary

Do not use this skill to choose requirements, Spec, Eval, Plan, lane
decomposition, review findings, or implementation changes. Agent outputs remain
claims until the owning workflow normalizes and verifies them.
