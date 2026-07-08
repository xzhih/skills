---
name: agent-spec
description: "Use only when the user explicitly invokes $agent-spec, or when an active workflow routes here, to convert governed requirements into implementation-ready Spec behavior with scope, non-goals, constraints, affected surfaces, interfaces, docs impact, and requirement coverage before Eval."
---

# Agent Spec

Convert governed requirements into implementation behavior. Own Spec only: do
not define detailed acceptance checks, write the plan, code, or dispatch lanes.

## Iron Law

```text
SPECIFY BEHAVIOR, NOT WISHFUL OUTCOMES.
```

Every behavior must trace to a requirement, project evidence, or explicit user
decision. Draft/open items stay marked and must not become implementation work.

## Shared Rules

Apply:

- [mode-gate.md](../dev-flow/references/mode-gate.md)
- [coverage-trace.md](../dev-flow/references/coverage-trace.md)

Return only what Eval or review needs. Do not print empty headings.

## Use For

- locking user-visible behavior and system boundaries
- naming scope, non-goals, constraints, affected surfaces, and docs impact
- turning requirements into behavior concrete enough to accept or reject

Use [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md) when
goal, users, flow, or non-goals are still loose. Use
[agent-eval](../agent-eval/SKILL.md) when behavior is locked enough to prove.

## Process

```text
read requirements and context
  -> identify behavior, boundaries, interfaces, and edge/error behavior
  -> resolve contested behavior with debate or review only when risk warrants
  -> preserve requirement-to-behavior trace at the selected weight
  -> self-check ambiguity, contradiction, scope creep, and missing coverage
  -> hand off to Eval only when ready
```

Use [project-context](../project-context/SKILL.md) when existing behavior or
implementation surfaces matter. Use [agent-debate](../agent-debate/SKILL.md)
for contested behavior or product tradeoffs. Use
[agent-review](../agent-review/SKILL.md) for high-impact Spec review.

## Eval Readiness Gate

Move to Eval only when:

- behavior is concrete enough to accept or reject
- every confirmed requirement is covered or explicitly deferred
- each behavior has a requirement source, project evidence, or user decision
- non-goals prevent obvious scope expansion
- constraints and affected surfaces are named
- open questions are non-blocking or owned
- blocker/major review findings are resolved, rejected with evidence, or deferred

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/specs/<YYYY-MM-DD>-<slug>-spec.md`.
