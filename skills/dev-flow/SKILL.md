---
name: dev-flow
description: "Use when the user explicitly invokes $dev-flow, or an already-loaded controller needs development lifecycle routing across multiple gates, resume/handoff state, or unclear ownership. Do not use for ordinary implementation or a single known leaf task."
---

# Dev Flow

Route lifecycle to one loaded owner and continue. Own phase selection and
closeout, not leaf work.

```text
SELECT -> LOAD -> CONTINUE.
```

## Route

Use for explicit `$dev-flow` or uncertain ownership across gates, recovery,
lanes, integration, or closeout. Route an explicit single-leaf request straight
to its leaf.

| Need or state | Owner |
|---|---|
| Restore uncertain persisted state | [project-context](../project-context/SKILL.md) |
| Shape requirements | [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md) |
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

1. When continuation, handoff, persisted artifacts, or returned work makes
   lifecycle state uncertain, first read and run `project-context`.
2. From source, choose the lightest mode, first missing gate, and one owner.
3. Read that child's `SKILL.md` completely, then its conditionally required refs.
4. Act unless a true user decision blocks; return here only for the next gate,
   state update, or evidence-backed close/handoff.

An owner label is not a transition. Report unavailable children; never make the
user dispatch internal workflows.

## Active Controller

With active `agent-self-driving`, use `leaf-route-only`: retain the controller,
load a leaf, and return evidence. Never restart, nest, or route back into it.
Enter only after explicit `$agent-self-driving` invocation when none is active.

## Gates and Weight

```text
requirements -> Spec -> Eval -> Plan -> execute -> review/test -> repair/recheck -> close
requirement -> behavior -> check -> task -> evidence
```

Start at the first source-evident missing gate. `Lightweight` uses compact chat
trace and direct execution; `Standard` separates confusable gates; `Durable`
persists recovery state; `Lane` adds ownership, collision, and integration.

Child contracts own gates: Spec and Plan retain mandatory whole-artifact review;
Lightweight makes it compact, not optional. Implementation verification and
repair belong to `steady-coding`.

Apply [mode-gate.md](references/mode-gate.md) before shaping artifacts. Read
[coverage-trace.md](references/coverage-trace.md) for confusable trace items,
persistence, lanes, handoff, or close; read
[task-checkboxes.md](references/task-checkboxes.md) when Plan/lane/handoff state
tracks execution. Read [critical-overrides.md](references/critical-overrides.md)
before persisted writes, parallel dispatch/integration, completion claims, or
authorization/user-decision boundaries. Read
[artifact-layout.md](references/artifact-layout.md) only when artifacts must
persist for risk, handoff, multi-agent continuity, or recovery.

## Complete, Pause, or Hand Off

Mark `complete` only from source-matched status, current checks, rechecked
repairs, no unresolved accepted blocker/major, and every required trace item
completed or validly deferred after its owning artifact was updated.

Use `paused` when a true user decision, unavailable required dependency,
authorization boundary, missing access, or unavailable verification prevents a
safe next action. Record the raw blocker evidence, owner, effect, and exact
resume condition; never present paused work as complete.

Persist a handoff only when recovery or another thread/owner needs it. Otherwise
load the next owner and continue.
