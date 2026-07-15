---
name: agent-review
description: "Use only when the user explicitly invokes $agent-review, or when a loaded workflow routes here, for one focused reviewer or multiple agents to review the same artifact: Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result. Do not use for debate, lanes, or returned-lane integration."
---

# Agent Review

Review one concrete artifact or result. The moderator owns scope, normalization,
repair decisions, and final claims.

## Iron Law

```text
REVIEW THE SAME ARTIFACT BEFORE SHARDING FOLLOW-UP.
```

Do not split by section in Round 1. Every reviewer sees the whole artifact
unless a later targeted follow-up is justified.

## Use For

- one focused review or multi-agent review of Spec, Eval, Plan, design, diff,
  implementation, evidence, deployment, or final result
- model-diverse review when one framing may miss issues
- fresh recheck after repair

Use [agent-debate](../agent-debate/SKILL.md) for open product/requirements
debate. Use [integration-review](../integration-review/SKILL.md) for returned
lane status, conflicts, and next batches.

## Preflight

Before sending review work:

- identify artifact, goal, boundary, and evidence standard
- route every reviewer dispatched as a worker through
  [agent-runtime](../agent-runtime/SKILL.md); it classifies native-default,
  profile-governed, and external/session gates
- get authorization before sending content to external, paid, account-bound, or
  data-leaving reviewers

## Review Rules

- Use [mode-gate.md](../dev-flow/references/mode-gate.md) **Review Weight** for
  ceremony/intensity; do not make a mandatory owner gate optional or turn one
  focused review into multi-agent ceremony without another trigger.
- First round uses a reviewer independent of artifact drafting and is
  source-first. Keep it blind to other conclusions when risk matters.
- Reviewer agreement is not proof.
- Accept findings only with artifact/source evidence.
- Treat **hollowness as a defect**: vague goals, missing concrete detail,
  hollow checks, placeholder tasks, or gaps that force implementers to invent
  decisions are at least **major** (blocker if the next gate would rely on
  them). Prefer detailed-and-concrete over short-and-vague; reject long-and-empty
  the same way. See mode-gate Substance Rule.
- Use [review-convergence.md](references/review-convergence.md)
  for accepted blocker/major findings, evidence disputes, rebuttal, or their
  required fresh recheck—not for a minor-only focused recheck.
- Use [output-normalization.md](../agent-self-driving/references/output-normalization.md)
  before promoting agent output into findings or repair tasks.

## Implementation Against Plan

When reviewing implementation against an accepted Plan:

- read the Plan, full diff, changed files, and current verification
- map each meaningful change to a Plan task or a documented within-scope
  implementation deviation; reject changes that invalidate accepted behavior,
  ownership, compatibility, or verification
- independently check affected Plan/Eval checks and new test assertions
- return the normal sign-off, repair, or recheck; do not repair in the review role

## Packet Minimum

```text
Artifact
Goal
Boundary
Required checks
Evidence rules
Finding scale: blocker | major | minor | question | note
Sign-off options
Stop condition
```

## Output

Keep synthesis short:

```text
Accepted blocker/major:
Minor/deferred:
Rejected:
Evidence checked:
Repair or recheck:
Sign-off:
```

Omit empty headings.

## Red Flags

- Sharding before whole-artifact review.
- Treating agreement as proof.
- Accepting findings without evidence.
- Asking reviewers to invent the plan they should verify.
- Claiming sign-off while accepted blocker/major findings remain.
