---
name: agent-spec
description: "Use only when the user explicitly invokes $agent-spec, or when an active workflow routes here, and a governed Requirements Baseline is ready to become implementation behavior before Eval."
---

# Agent Spec

Convert a governed Requirements Baseline into implementation behavior. Own Spec only: do
not define detailed acceptance checks, write the plan, code, or dispatch lanes.

## Iron Law

```text
SPECIFY BEHAVIOR, NOT WISHFUL OUTCOMES.
```

Every behavior must trace to an implementation-eligible confirmed Baseline
requirement. Project evidence and user decisions may refine specification detail
inside that requirement; they never replace the Baseline as scope authority.
Preserve draft/open items only as upstream governance references.

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
the input is still a candidate, convergence is pending, or goal, users, flow, or
non-goals are still loose. Use
[agent-eval](../agent-eval/SKILL.md) when behavior is locked enough to prove.

## Depth (detailed, not empty)

Write **detailed and concrete** behavior—not a short slogan Spec and not padded
headings. Ready for review only when a skeptical implementer could build from
it without inventing product decisions. Apply mode-gate **Substance Rule**.

Minimum applicable obligations (omit irrelevant slots; never invent `N/A`
content merely to fill the shape):

```text
Goal / user-visible outcome
In scope / out of scope (non-goals)
Actors or users and primary flow(s)
Behaviors: observable accept/reject criteria per important behavior
Edge, empty, error, and permission/failure behavior where relevant
Constraints (tech, privacy, compatibility, perf if claimed)
Affected surfaces (UI, API, data, jobs, docs) at least named
Baseline requirement trace for each behavior; supporting evidence/decision trace
cannot replace it
Deferred governance references marked—never silent; draft/open candidates do
not enter Spec behavior
```

Thin Spec red flags (block Eval readiness; expand before review sign-off):

```text
- fewer behaviors than confirmed Baseline requirements without an explicit
  many-to-one trace proving all requirement semantics remain; any consolidation
  that removes, defers, or materially changes semantics must first return through
  Requirements and publish a new Baseline
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
read the Requirements Baseline and context
  -> identify behavior, boundaries, interfaces, and edge/error behavior
  -> resolve contested behavior with debate only when product tradeoffs need it
  -> preserve requirement-to-behavior trace at the selected weight
  -> expand until anti-thin bar passes (not until a template is filled)
  -> self-check ambiguity, contradiction, scope creep, and missing coverage
  -> draft Spec ready for review
  -> mandatory agent-review of the whole Spec
  -> repair and recheck accepted blocker/major findings (or reject with evidence)
  -> hand off to Eval only when the review gate is closed
```

Use [project-context](../project-context/SKILL.md) when existing behavior or
implementation surfaces matter. Use [agent-debate](../agent-debate/SKILL.md)
for contested product tradeoffs before or while drafting. After a reviewable
Spec draft exists, always use [agent-review](../agent-review/SKILL.md) on that
Spec before Eval.

If new evidence or a user decision would add behavior, remove a confirmed
requirement, defer it, or materially change scope, return to Requirements for an
updated Candidate Requirement Set, targeted convergence, and a new Baseline.
Spec cannot make that scope transition locally.

## Spec Review Gate (mandatory)

Do not move to Eval, claim Spec locked, or treat the Spec as implementation-
ready until one [agent-review](../agent-review/SKILL.md) pass has completed on
the **whole** Spec artifact.

Apply mode-gate **Review Weight**. The required pass covers the full Spec and is
independent of drafting. Lightweight defaults to one fresh inline reviewer;
additional/model-diverse reviewers require a risk, evidence, workflow, or user
condition rather than this gate alone.

Moderator owns the Spec draft through review. Close the gate only when:

- the review packet named the Spec as the artifact
- accepted blocker/major findings are fixed and rechecked, or rejected with evidence
- a true decision/dependency blocker keeps the gate paused, not deferred closed
- sign-off or equivalent “ready for Eval” outcome is recorded (inline is fine
  in Lightweight mode)

Skip only if the user explicitly waives Spec review for this artifact and the
waiver is recorded. The waiver does not dismiss already accepted findings or
the Eval Readiness Gate. Do not self-waive.

## Eval Readiness Gate

Move to Eval only when:

- the Spec Review Gate is closed (or explicitly user-waived)
- Depth (anti-thin) bar is met—not only "has headings"
- behavior is concrete enough to accept or reject without inventing product calls
- every confirmed Baseline requirement is covered; Spec has not deferred or
  removed one locally
- each behavior traces to an implementation-eligible confirmed Baseline requirement
- no draft/open candidate appears as Spec behavior or Eval-eligible scope
- non-goals prevent obvious scope expansion
- constraints and affected surfaces are named
- open questions are non-blocking or owned
- blocker/major review findings are fixed/rechecked or rejected with evidence

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/specs/<YYYY-MM-DD>-<slug>-spec.md`.
