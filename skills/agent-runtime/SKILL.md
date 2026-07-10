---
name: agent-runtime
description: "Use only as an internal dependency after another workflow has selected an agent-backed step and explicitly routes here for shared runtime gates. Do not use as a user-facing entry workflow."
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

## Dispatch Classes

Classify the selected step before loading gates. Apply the first matching class
in this order; classes are exclusive. A stronger boundary always wins over a
lighter participant-selection match:

```text
1. external/session:
   external, paid, account-bound, editor/protocol, data-leaving, or continuity
   for one of those surfaces -> profile + capability/authorization +
   lifecycle/session gates

2. profile-governed:
   otherwise named/model-selectable participant, requested model/provider
   diversity, or a claim dependent on participant/model assignment
   -> Agent Model Profile

3. native-default:
   otherwise fresh or resumed host-exposed worker with no participant/model
   choice or external boundary -> worker lifecycle only; no Agent Model Profile
```

Never classify an external, paid, account-bound, editor/protocol, or data-leaving
participant as `profile-governed` merely because it is also named or
model-selectable. Resuming a host-native worker does not by itself make that
worker `external/session`.

`callable` alone is not a profile trigger. Separate fresh native-default
sessions may support an independent-session claim, but never an unverified
model/provider-diversity claim.

## Required References

- Read [worker-lifecycle.md](references/worker-lifecycle.md) before
  dispatching, waiting on, resuming, closing, or re-dispatching any worker or
  external/session agent.
- Read [agent-model-profile.md](references/agent-model-profile.md) for a
  profile-governed or external/session dispatch, not for native-default alone.
- Read [capability-cache.md](references/capability-cache.md) when checking
  selected participants, candidate sets, capability state, authorization, or
  runnability.
- Read [external-agent-sessions.md](references/external-agent-sessions.md) when
  assigning external, shell, editor, or protocol agents across rounds, or when
  continuity for one of those session types matters.
- Read [opencode.md](references/opencode.md) before declaring OpenCode
  unavailable, checking an approved OpenCode provider/model, running
  `opencode`, or resuming an OpenCode session.

## Boundary

Do not use this skill to choose requirements, Spec, Eval, Plan, lane
decomposition, review findings, or implementation changes. Agent outputs remain
claims until the owning workflow normalizes and verifies them.

Short polling timeouts are runtime state, not failure evidence.
