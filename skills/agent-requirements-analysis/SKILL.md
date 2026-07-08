---
name: agent-requirements-analysis
description: "Use only when the user explicitly invokes $agent-requirements-analysis, or when an active workflow routes here, to turn a direction, new requirement, update, bug intent, or discussion result into Requirements with question backlog, resolver matrix, scope, non-goals, risks, confirmed/draft/open state, and coverage trace before Spec."
---

# Agent Requirements Analysis

Turn a direction into requirements clear enough for Spec. Own requirements only:
do not write Spec, Eval, Plan, code, or lane packets.

## Iron Law

```text
DO NOT TURN DRAFT OR OPEN REQUIREMENTS INTO SPEC.
```

Separate `confirmed / draft / open`. Preserve user corrections. Ask the user
only for true user decisions: taste, priority, business direction, privacy/cost,
account access, destructive/public action, or information unavailable from the
workspace.

## Shared Rules

Apply:

- [mode-gate.md](../dev-flow/references/mode-gate.md)
- [coverage-trace.md](../dev-flow/references/coverage-trace.md)

Return only what the next owner needs. Do not print empty headings.

## Use For

- new project or feature direction before Spec
- bug/update intent where goal, scope, or non-goals are unclear
- user flow, product friction, constraints, risks, or complexity placement
- deciding which questions are agent-answerable vs true user decisions

Use [agent-spec](../agent-spec/SKILL.md) when requirements are already clear
enough to specify behavior. Use [agent-debate](../agent-debate/SKILL.md) when
the main work is same-topic disagreement, not requirements production.

## Process

```text
restore context if needed
  -> collect direction, constraints, and non-goals
  -> classify questions: context | grilling | debate | true user decision
  -> resolve agent-answerable questions before interrupting the user
  -> preserve coverage trace at the selected weight
  -> synthesize confirmed / draft / open
  -> hand off to Spec only when ready
```

Use [project-context](../project-context/SKILL.md) when project state matters.
Use [agent-grilling](../agent-grilling/SKILL.md) for hidden gaps and assumptions.
Use [agent-debate](../agent-debate/SKILL.md) for contested product or complexity
tradeoffs. Use [discussion-workflows](../discussion-workflows/SKILL.md) when
discussion state must persist.

## Spec Readiness Gate

Move to Spec only when:

- goal and user-visible outcome are explicit
- scope and non-goals are separated
- constraints and important risks are known
- agent-answerable questions have been resolved or explicitly deferred
- remaining open questions are non-blocking or true user decisions
- no draft requirement is treated as confirmed
- coverage trace is sufficient for the selected mode

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/requirements/<YYYY-MM-DD>-<slug>-requirements.md`.
