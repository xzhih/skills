---
name: agent-spec
description: "Use only when the user explicitly invokes $agent-spec, or when an active workflow routes here, and a governed Requirements Baseline is ready to become implementation behavior before Eval."
---

# Agent Spec

Convert a governed Requirements Baseline into implementation behavior. Own Spec
only; leave acceptance checks, planning, code, and lane dispatch downstream.

## Iron Law

```text
SPECIFY BEHAVIOR, NOT WISHFUL OUTCOMES.
```

Every behavior must trace to an implementation-eligible confirmed Baseline
requirement. Project evidence and user decisions may refine specification detail
inside that requirement; they never replace the Baseline as scope authority.
Preserve draft/open items only as upstream governance references.

## Contract

Apply [mode-gate.md](../dev-flow/references/mode-gate.md) and
[coverage-trace.md](../dev-flow/references/coverage-trace.md). Produce a
complete, concrete artifact at the selected weight; omit fields that do not
change implementation or review.

Include every applicable obligation:

```text
Goal / user-visible outcome
In scope / out of scope (non-goals)
Actors or users and primary flow(s)
Observable behavior per important requirement
Edge, empty, error, and permission/failure behavior where relevant
Technical, privacy, compatibility, and measured performance constraints
Affected UI, API, data, job, and documentation surfaces
Baseline requirement trace for each behavior
Deferred governance references, without promoting draft/open candidates
```

Block review or Eval handoff when behavior remains ambiguous, including:

```text
goal words such as "fast", "clear", or "secure" without observable behavior
"as appropriate", "handle properly", or "etc." as the only detail
missing edge/error/empty behavior for a flow that can fail or be empty
missing non-goals where scope could expand
fewer behaviors than confirmed requirements without an explicit many-to-one
  trace that preserves every requirement semantic
```

Before review, ask whether two implementers could ship the same behavior from
the Spec. Add only the detail needed to make that answer yes.

## Process

1. Read the Baseline and the smallest relevant project context.
2. Specify behavior, boundaries, interfaces, failure paths, and trace.
3. Route unresolved scope or loose requirements to
   [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md), and
   contested product tradeoffs to [agent-debate](../agent-debate/SKILL.md).
4. Check ambiguity, contradiction, scope creep, and missing coverage.
5. Send the whole reviewable Spec to an independent
   [agent-review](../agent-review/SKILL.md), repair and recheck accepted
   blocker/major findings, then hand the locked Spec to
   [agent-eval](../agent-eval/SKILL.md).

If new evidence or a user decision would add behavior, remove a confirmed
requirement, defer it, or materially change scope, return to Requirements for an
updated Candidate Requirement Set, targeted convergence, and a new Baseline.
Spec cannot make that scope transition locally.

## Review And Eval Gate

Require one independent whole-Spec review before claiming the Spec locked or
moving to Eval. In Lightweight mode, one fresh inline reviewer is sufficient;
add reviewers only when risk, evidence, workflow, or the user requires them.
The moderator owns the draft through review. Close the gate when:

- the review packet named the Spec as the artifact
- accepted blocker/major findings are fixed and rechecked, or rejected with evidence
- a true decision/dependency blocker keeps the gate paused, not deferred closed
- sign-off or an equivalent ready-for-Eval outcome is recorded

Only the user may waive review for this artifact; record the waiver, and retain
accepted findings and the readiness requirements below. Move to Eval only when:

- the review gate is closed or explicitly waived
- behavior is concrete enough to accept or reject without inventing product calls
- every confirmed Baseline requirement is covered and traced
- no draft/open candidate appears as Spec behavior or Eval-eligible scope
- non-goals prevent obvious scope expansion
- constraints and affected surfaces are named
- open questions are non-blocking or owned
- accepted blocker/major findings are fixed and rechecked, or rejected with evidence

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/specs/<YYYY-MM-DD>-<slug>-spec.md`.
