---
name: agent-runtime
description: "Internal only: use after a workflow routes an agent-backed step here for worker lifecycle, participant/model, capability, authorization, and session gates."
---

# Agent Runtime

Shared capability gate for a worker already selected by a lifecycle owner. It
checks participation, runnability, authorization, model claims, and session
continuity; it does not choose workflow, topology, lanes, or implementation.

## Iron Law

```text
AUTHORIZATION, RUNNABILITY, AND SUITABILITY ARE SEPARATE GATES.
```

Keep `visible`, `installed`, `authenticated`, `authorized`, `runnable`, and
`suitable` separate. Host subagents and shell/external agents are distinct
invocation surfaces.

## Dispatch Classes

Classify before loading gates; first match wins and classes are exclusive:

```text
1. external/session:
   external, paid, account-bound, editor/protocol, data-leaving, or its
   continuity -> profile + capability/authorization + lifecycle/session

2. profile-governed:
   otherwise named/model-selectable participant, requested model/provider
   diversity, or assignment-dependent claim -> Agent Model Profile

3. native-default:
   otherwise fresh/resumed host worker with no participant/model choice or
   external boundary -> worker lifecycle only; no profile
```

Stronger external/session boundaries win. Native resume alone is not external;
`callable` alone is not profile-governed. Separate native sessions may support
independence, never unverified model/provider diversity.

## Required References

- Read [worker-lifecycle.md](references/worker-lifecycle.md) before
  dispatch/wait/resume/close/re-dispatch.
- [agent-model-profile.md](references/agent-model-profile.md): profile-governed
  or external/session, never native-default alone.
- [capability-cache.md](references/capability-cache.md): candidate/participant,
  capability, authorization, or runnability checks.
- [external-agent-sessions.md](references/external-agent-sessions.md): external,
  shell, editor, or protocol assignment/continuity across rounds.
- [opencode.md](references/opencode.md): before declaring OpenCode unavailable,
  checking its provider/model, running it, or resuming its session.

## Boundary

Do not choose requirements, Spec, Eval, Plan, lane decomposition, findings, or
implementation. Worker output remains a claim until its owner verifies it.
Polling timeout is runtime state, not failure or an execution deadline; follow
`worker-lifecycle.md`.
