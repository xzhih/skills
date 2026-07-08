---
name: agent-self-driving
description: "Use only when the user explicitly invokes $agent-self-driving, or an active self-driving workflow already owns the task, for long-task automation that should continue through dev-flow, agents, review/repair, lanes, external-agent policy, evidence, and closure until completion or a true user decision. Do not use for routine lanes."
---

# Agent Self-Driving

Opt-in controller for long-task automation. The main thread stays moderator: it
owns permissions, integration, evidence, and final claims.

## Iron Law

```text
MULTI-AGENT OUTPUT IS EVIDENCE INPUT, NOT A CONCLUSION.
```

Agreement is a signal. Verified evidence is the gate.

## Use Only For

- explicit `$agent-self-driving`
- broad delivery goals where the user expects continued progress to completion
- repeated review -> repair -> recheck loops
- model-diverse or adversarial review/repair
- external, paid, account-bound, editor, protocol, or data-leaving agents
- durable multi-agent state and evidence-backed closure

Use focused skills instead for routine debate, review, lanes, returned-lane
integration, or unclear formulation.

## First Move

```text
restore context
  -> use dev-flow as parent lifecycle when delivering software
  -> choose lowest sufficient intensity
  -> route focused work to debate/review/lanes/integration when possible
  -> dispatch agents only after capability and authorization gates
  -> continue until complete, blocked, or a true user decision remains
```

## Intensity

```text
0 main agent only
1 one focused review or research pass
2 multi-agent audit of one artifact/result
3 bounded review-repair convergence
4 full delivery lifecycle
```

Read `references/lifecycle-intensity.md` only when intensity is not obvious or
the work is Level 3-4.

## Agent Shape Gate

- Same topic, same material, same question -> [agent-debate](../agent-debate/SKILL.md)
- One concrete artifact/result -> [agent-review](../agent-review/SKILL.md)
- Disjoint owned surfaces -> [agent-lanes](../agent-lanes/SKILL.md)
- Returned lane handoffs -> [integration-review](../integration-review/SKILL.md)

Do not split a debate by section. Sections are prompts every reviewer inspects,
not ownership boundaries.

## Dispatch Gate

Before task-bearing dispatch, confirm:

```text
present -> runnable -> authenticated -> authorized_for_task -> suitable
```

For model-selectable, callable, session, or external agents, use
[agent-runtime](../agent-runtime/SKILL.md).
Ask before sending task content to external, paid, account-bound, editor,
protocol, networked, or data-leaving agents unless that exact use is already
authorized.

For direct task-bearing delegation that does not go through `agent-review` or
`agent-lanes`, read `references/task-packets.md` first.

## Convergence

- Start from source material, not the moderator's preferred answer.
- Normalize agent outputs by scope, evidence, severity, and next action.
- Fix or reject accepted blocker/major findings with evidence.
- Recheck until no accepted blocker/major remains, or a true pause condition
  exists.
- Do not create private orchestration docs unless continuity, auditability,
  external side effects, or Level 3-4 work requires it.

## Pause Conditions

Pause only for true user decisions: product direction, taste, priority,
privacy/cost, account access, destructive/public action, deployment target,
external-agent approval, missing credentials, or unavailable verification with
no safe substitute.

## Output

Keep status compact:

```text
Goal:
Intensity:
Current owner:
Evidence:
Open blocker or user decision:
Next action:
```

If status is `in_progress`, continue to the next bounded action instead of
stopping at a recommendation.
