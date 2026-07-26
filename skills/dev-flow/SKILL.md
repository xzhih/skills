---
name: dev-flow
description: "Use for explicit $dev-flow or when a loaded controller needs lifecycle routing across gates, recovery/handoff state, or unclear ownership. Not for a known leaf task."
---

# Dev Flow

Own phase selection and closeout; the selected leaf owns its work.

```text
SELECT -> LOAD -> CONTINUE.
```

## Route

Use for explicit `$dev-flow` or uncertain ownership across gates, recovery,
lanes, integration, or closeout. Route a known single-leaf request directly.

| Need or state | Owner |
|---|---|
| Restore uncertain persisted state | [project-context](../project-context/SKILL.md) |
| Discover, converge, and baseline requirements | [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md) |
| Lock behavior | [agent-spec](../agent-spec/SKILL.md) |
| Define acceptance evidence | [agent-eval](../agent-eval/SKILL.md) |
| Build tasks or lane candidates | [agent-plan](../agent-plan/SKILL.md) |
| Implement, verify, repair, recheck | [steady-coding](../steady-coding/SKILL.md) |
| Review one artifact or result | [agent-review](../agent-review/SKILL.md) |
| Resolve same-topic disagreement | [agent-debate](../agent-debate/SKILL.md) |
| Dispatch independent lanes | [agent-lanes](../agent-lanes/SKILL.md) |
| Classify returned lanes / next batch | [integration-review](../integration-review/SKILL.md) |
| Govern a decision discussion | [discussion-workflows](../discussion-workflows/SKILL.md) |
| Maintain durable technical truth | [doc-driven-workflows](../doc-driven-workflows/SKILL.md) |
| Enter explicit long-task automation | [agent-self-driving](../agent-self-driving/SKILL.md) |
| Check capability, authorization, sessions | [agent-runtime](../agent-runtime/SKILL.md) |
| Close, pause, or hand off after evidence | `dev-flow` |

## Transition Contract

```text
discovery -> convergence -> Requirements -> Spec -> Eval -> Plan
-> execute -> review/test -> repair/recheck -> close
requirement -> behavior -> check -> task -> evidence
```

1. If persisted, returned, or handoff state is uncertain, run `project-context`.
2. From source, choose the lightest mode, first missing gate, and one owner.
3. Read that owner's complete `SKILL.md` and only its applicable references.
4. Act; return here only for the next gate or evidence-backed close/handoff.

An owner label is not a transition. Report unavailable children; never make the
user dispatch internal workflows. Ask only when a true user decision blocks.

## Improvement Intake

A selected `agent-improve` finding is evidence, not a passed gate. Recheck it,
route the first missing gate, and do not repeat the broad audit.

## Active Controller

With active `agent-self-driving`, retain it, load one leaf, and return evidence
(`leaf-route-only`). Never restart, nest, or route back into it. Enter it only
through explicit invocation when no controller is active.

## Weight and References

Start at the first source-evident missing gate. Apply
[mode-gate.md](references/mode-gate.md) before shaping artifacts. Child skills
own their gates; Lightweight compacts mandatory Spec/Plan review but does not
remove it. `steady-coding` owns implementation verification/repair. After an
accepted Plan, `agent-review` checks the result before close unless waived.

Load references only when their condition applies:

- [coverage-trace.md](references/coverage-trace.md): confusable trace,
  persistence, lanes, handoff, or close.
- [task-checkboxes.md](references/task-checkboxes.md): execution state in a
  Plan, lane registry, or handoff.
- [critical-overrides.md](references/critical-overrides.md): persisted writes,
  parallel dispatch/integration, completion claims, or authority boundaries.
- [artifact-layout.md](references/artifact-layout.md): persistence required for
  risk, handoff, multi-agent continuity, or recovery.

## Complete, Pause, or Hand Off

Mark `complete` only when source status and current checks match, repairs were
rechecked, no accepted blocker/major remains, and required trace is complete or
validly deferred in its owning artifact.

Use `paused` only for a true user decision, required unavailable dependency,
authorization/access boundary, or unavailable verification. Record evidence,
owner, effect, and exact resume condition; never present it as complete.

Persist a handoff only when recovery or another thread/owner needs it. Otherwise
load the next owner and continue.
