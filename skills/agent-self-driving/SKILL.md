---
name: agent-self-driving
description: "Use only when the user explicitly invokes $agent-self-driving, or an active self-driving controller already owns the task, for long-task automation that must keep lifecycle owners, agents, review/repair, evidence, and closure moving until completion or a true user decision. Do not use merely because work is large or for routine debate, review, lanes, or integration."
---

# Agent Self-Driving

Opt-in automation controller. The main thread remains moderator and owns final
claims.

```text
CONTROL -> DELEGATE -> VERIFY -> CONTINUE.
```

## Boundary

Activate only by explicit `$agent-self-driving`; otherwise this skill must
already be the active controller. Size alone never activates it.

The active instance is the sole controller. For software delivery, read and use
[dev-flow](../dev-flow/SKILL.md) as the parent lifecycle router. When it selects
a leaf, read that leaf `SKILL.md`, let it own the action, and return evidence to
this same controller. Never restart, nest, or route back into self-driving.

Self-driving owns only its orchestration overlay: controller status, bounded
next action, private blackboards, task packets/raw outputs, convergence/findings
state, and evidence pointers. Parent/leaf workflows own Requirements, Spec,
Eval, Plan, implementation, review, lanes, integration, docs truth, and
lifecycle handoff. `agent-runtime` owns participant/model profiles, capability,
authorization, and worker/external session truth; link those records, never copy
them into controller state.

Read [workflow-integration.md](references/workflow-integration.md) when another
workflow owns task state. Read [artifact-layout.md](references/artifact-layout.md)
only when continuity, risk, auditability, agents, or handoff requires persistence.

## Intensity and Shape

```text
0 main agent only
1 one focused pass
2 multi-agent audit
3 bounded review -> repair -> recheck
4 full delivery lifecycle
```

Start at the lowest sufficient level. Read
[lifecycle-intensity.md](references/lifecycle-intensity.md) when intensity is
unclear or Level 3-4 applies.

| Work shape | Owner |
|---|---|
| Same material / same question | [agent-debate](../agent-debate/SKILL.md) |
| One artifact or result | [agent-review](../agent-review/SKILL.md) |
| Disjoint owned surfaces | [agent-lanes](../agent-lanes/SKILL.md) |
| Returned lane handoffs | [integration-review](../integration-review/SKILL.md) |

## Runtime Gate

A host-native worker already exposed by the current runtime, with no participant
or model choice and no external boundary, uses `agent-runtime` for worker
lifecycle—including resume—but does not require a new model profile.

Before named/model-selectable participants, capability or authorization checks,
external/paid/account/data-leaving use, or worker/session continuity, read and
run [agent-runtime](../agent-runtime/SKILL.md). Runtime—not this controller—owns
consent and session decisions. For direct delegation outside `agent-review` or
`agent-lanes`, read [task-packets.md](references/task-packets.md).

## Converge and Continue

Start from source, treat agent output as claims, and normalize by scope,
evidence, severity, and action. Read
[output-normalization.md](references/output-normalization.md) for heterogeneous
outputs or conflicting findings; read
[review-convergence.md](../agent-review/references/review-convergence.md) for repeated review,
repair, rebuttal, or recheck.

Accepted blocker/major findings close only through evidence-backed repair or
rejection. A true pause condition keeps the finding and run open; it is not a
completion path. Persist only when the selected intensity needs recovery. If
status is `in_progress`, perform the next bounded action.
Pause only for a true user decision, unauthorized boundary, missing access, or
unavailable verification with no safe substitute. Claim `complete` only from
current owner evidence.
