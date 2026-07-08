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

Return only what Eval or review needs. Do not print empty headings. Do not
confuse "no empty headings" with "write a thin Spec."

## Use For

- locking user-visible behavior and system boundaries
- naming scope, non-goals, constraints, affected surfaces, and docs impact
- turning requirements into behavior concrete enough to accept or reject

Use [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md) when
goal, users, flow, or non-goals are still loose. Use
[agent-eval](../agent-eval/SKILL.md) when behavior is locked enough to prove.

## Depth (detailed, not empty)

Write **detailed and concrete** behavior—not a short slogan Spec and not padded
headings. Ready for review only when a skeptical implementer could build from
it without inventing product decisions. Apply mode-gate **Substance Rule**.

Minimum content (scale wording, not skip the slots):

```text
Goal / user-visible outcome
In scope / out of scope (non-goals)
Actors or users and primary flow(s)
Behaviors: observable accept/reject criteria per important behavior
Edge, empty, error, and permission/failure behavior where relevant
Constraints (tech, privacy, compatibility, perf if claimed)
Affected surfaces (UI, API, data, jobs, docs) at least named
Requirement (or evidence/user-decision) trace for each behavior
Open/deferred items marked—never silent
```

Thin Spec red flags (block Eval readiness; expand before review sign-off):

```text
- fewer behaviors than confirmed requirements without explicit merge/defer
- behaviors that are goals ("fast", "clear", "secure") not observables
- no edge/error/empty path when the flow can fail or be empty
- non-goals missing while scope could obviously expand
- "as appropriate" / "handle properly" / "etc." as the only detail
- whole Spec fits a handful of vague bullets for multi-behavior work
```

Self-check before calling the draft reviewable: **Would two implementers ship
the same behavior from this text alone?** If no, deepen.

## Process

```text
read requirements and context
  -> identify behavior, boundaries, interfaces, and edge/error behavior
  -> resolve contested behavior with debate only when product tradeoffs need it
  -> preserve requirement-to-behavior trace at the selected weight
  -> expand until anti-thin bar passes (not until a template is filled)
  -> self-check ambiguity, contradiction, scope creep, and missing coverage
  -> draft Spec ready for review
  -> mandatory agent-review of the whole Spec
  -> repair Spec from accepted blocker/major findings (or reject/defer with evidence)
  -> hand off to Eval only when the review gate is closed
```

Use [project-context](../project-context/SKILL.md) when existing behavior or
implementation surfaces matter. Use [agent-debate](../agent-debate/SKILL.md)
for contested product tradeoffs before or while drafting. After a reviewable
Spec draft exists, always use [agent-review](../agent-review/SKILL.md) on that
Spec before Eval.

## Spec Review Gate (mandatory)

Do not move to Eval, claim Spec locked, or treat the Spec as implementation-
ready until one [agent-review](../agent-review/SKILL.md) pass has completed on
the **whole** Spec artifact.

Review shape:

```text
Required: agent-review of the full Spec (not section-sharded Round 1).
Preferred when available and authorized:
  multi-agent / model-diverse reviewers on the same Spec.
Otherwise:
  one focused independent reviewer (or an independent review pass that is not
  the same drafting monologue without a distinct review step).
```

This gate is **not** automatically “many models.” `agent-review` supports one
focused reviewer **or** multiple agents; multi-model is preferred when distinct
approved models/participants are available, not a hard requirement when only
one reviewer path exists.

Moderator owns the Spec draft through review. Close the gate only when:

- the review packet named the Spec as the artifact
- accepted blocker/major findings are fixed in the Spec, rejected with evidence,
  or explicitly deferred with owner/risk
- no accepted blocker/major remains open without disposition
- sign-off or equivalent “ready for Eval” outcome is recorded (inline is fine
  in Lightweight mode)

Skip only if the user explicitly waives Spec review for this artifact and the
waiver is recorded. Do not self-waive.

## Eval Readiness Gate

Move to Eval only when:

- the Spec Review Gate is closed (or explicitly user-waived)
- Depth (anti-thin) bar is met—not only "has headings"
- behavior is concrete enough to accept or reject without inventing product calls
- every confirmed requirement is covered or explicitly deferred
- each behavior has a requirement source, project evidence, or user decision
- non-goals prevent obvious scope expansion
- constraints and affected surfaces are named
- open questions are non-blocking or owned
- blocker/major review findings are resolved, rejected with evidence, or deferred

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/specs/<YYYY-MM-DD>-<slug>-spec.md`.
