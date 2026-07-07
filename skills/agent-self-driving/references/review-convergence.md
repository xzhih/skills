# Review And Convergence

Use this reference for Level 2+ audits, Level 3 bounded review-repair convergence, final verification review, review contracts, findings ledgers, and stop/pause decisions.

## Contents

- Level Boundary
- Review Contract
- Blackboard Rounds
- Round 1 Convergence Gate
- Reviewer Continuity
- Per-Task Review Gates
- Reviewer Challenge
- Finding Standard
- Findings Ledger
- Sign-Off
- Stop Conditions
- Pause Conditions

## Level Boundary

```text
Level 2 = multi-agent audit
Level 3 = bounded review-repair convergence
```

Use Level 2 when one audit pass plus targeted recheck can establish confidence.

Escalate to Level 3 when:

- a reviewer finds an evidence-backed blocker
- a major finding changes Spec, Eval, boundary, plan, verification, or result-correctness judgment
- reviewers disagree on target correctness or result correctness
- a repair exposes a new blocker or major issue
- verification fails or contradicts the claimed result
- repair changes enough scope that fresh review is required
- external side effects or high-risk domains make one audit insufficient

## Review Contract

Every review round needs an explicit review contract. For Level 1 it can be inline. For Level 2+ persist it when review state must survive:

```text
docs/agent-self-driving/reviews/<YYYY-MM-DD>-<slug>-review-contract.md
```

Use only fields that help:

```text
Review ID:
Intensity Level:
Review Phase:
Goal / Source Materials:
Findings Ledger:
Review Target:
Review Scope:
Reviewer Angle:
Required Checks:
Evidence Rules:
Output Format:
Stop/Pause Impact:
```

The contract must not encode the expected conclusion or force the reviewer to validate the main agent's framing.

## Blackboard Rounds

For Level 2+ judgment stages, use a blackboard protocol even when it stays in chat.

Round shape:

```text
round 1:
  Blind source-first review. Each reviewer sees the same whole artifact and
  authoritative source materials, but not other reviewers' conclusions or the
  moderator's preferred answer.

moderator synthesis:
  Normalize claims, evidence, conflicts, open questions, and candidate findings
  onto the blackboard.

round 1 convergence gate:
  Decide and record whether the blind results require adversarial convergence
  before any repair, implementation, or final decision.

round 2+:
  Adversarial review. Original reviewers receive the blackboard snapshot when
  session continuity is available, then challenge high-impact claims, weak
  evidence, omissions, contradictions, and unresolved questions.

convergence:
  The moderator promotes or rejects findings by evidence, updates Spec/Eval/Plan
  or repair tasks, and continues only while accepted blocker/major issues or
  material uncertainty remain.
```

Persist the blackboard as markdown when there are multiple rounds, the discussion affects Spec/Eval/Plan, handoff is likely, or the selected intensity is Level 3-4.

## Round 1 Convergence Gate

After blind reviewers return, the moderator must run this gate before accepting findings, repairing, implementing, or making a final decision from the synthesis.

Record one of:

```text
round_2_required:
  triggers:
  packet:
  reviewer_continuity:

round_2_skipped:
  reason:
  evidence_checked:
```

Round 2 adversarial review is required when any Round 1 output includes:

- an evidence-backed blocker
- a major finding affecting Spec, Eval, plan, boundary, freeze gate, milestone gate, task boundary, data model, verification, result correctness, or startability
- multiple reviewers reinforcing the same high-impact claim
- enough findings that deduplication, root-cause grouping, priority, or scope ownership is unclear
- an open question that affects implementation boundary, acceptance criteria, Eval quality, or whether work may start
- same-model or same-context agreement with weak evidence on a high-impact conclusion
- reviewer sign-off that conflicts with a preserved blocker or major finding

Round 2 may be skipped only when all are true:

- no blocker or major finding exists
- no open question affects Spec, Eval, plan, boundary, verification, result correctness, or startability
- remaining items are minor, deferred, or out of scope by the goal contract
- the moderator has compared evidence and source coverage against the review contract
- the skip reason is recorded

When Round 2 is required, send reviewers the blackboard snapshot and ask for:

```text
Challenge any blocker/major finding you think is unsupported, duplicated,
wrongly graded, or missing its root cause.
Identify merged root causes and which findings should survive.
Identify whether each surviving issue blocks startability, repair, verification,
or only future hardening.
Name any high-impact omission from the blackboard.
Give revised sign-off: no blocker / no major / remaining questions / evidence checked.
```

Do not start repair or implementation from a blind-review synthesis while `round_2_required` is open.

## Reviewer Continuity

Round 2 is adversarial only when reviewer continuity is preserved or the substitute is labeled honestly.

Default:

- keep Round 1 review agents open until the convergence gate decides whether rebuttal is needed
- record each reviewer's agent ID, session ID, model, role, and review angle when available
- send Round 2 packets back to the original Round 1 reviewer IDs or sessions using host send/resume or external resume when supported

If an original reviewer cannot be continued:

- record `fresh_proxy_rebuttal` and the reason
- give the proxy reviewer the blackboard plus the original reviewer's own output and the other reviewers' challenged claims
- do not describe proxy output as the original reviewer changing position or signing off
- resume any original reviewers that are still available, and use proxy reviewers only for missing perspectives

Spawning new agents for Round 2 without recording this distinction is not same-reviewer adversarial review.

## Per-Task Review Gates

For Level 3-4 execution queues, task completion requires gates in order:

```text
implement or produce
self-check by worker or main agent
Spec compliance review
Eval/quality review
repair and fresh re-review when accepted issues exist
```

Spec compliance asks whether the task output satisfies the locked target, scope, boundaries, interfaces, and constraints. Eval/quality review asks whether it is good enough by the agreed quality bar.

Do not mark a task done while an accepted blocker or major issue remains open. Do not let implementer self-review replace independent review when the task risk, scope, or plan requires a fresh reviewer.

## Reviewer Challenge

Reviewer angles are focus areas, not blinders.

Reviewers should:

- reconstruct the goal from source materials, not only from the main agent's summary
- check whether Spec, Eval, plan, evidence, assumptions, or review contract may be wrong
- report evidence-backed blocker or major issues even if they fall outside the assigned angle
- challenge other reviewers' high-impact claims when the blackboard is provided
- identify weak evidence, unsupported consensus, missing tests, and quality gaps
- treat unsupported concerns as questions or hypotheses, not forced repairs
- report a contract defect if the review contract prevents surfacing a material problem

## Finding Standard

Findings must be evidence-backed and severity-graded:

```text
severity:
  blocker | major | minor | question | note

target:
  artifact, section, file, command, behavior, deployment, or decision

evidence:
  file/line, doc section, command output, log excerpt, reproduction step,
  screenshot, URL, or exact contract contradiction

impact:
  why this affects target correctness or result correctness

recommendation:
  root-cause fix, plan correction, verification step, or human decision needed

status:
  open | accepted | rejected | fixed | rechecked | deferred
```

Findings without clear evidence are hypotheses. They can trigger investigation, but they should not force repair.

## Findings Ledger

Use standalone ledgers under:

```text
docs/agent-self-driving/reviews/
```

Suggested file:

```text
docs/agent-self-driving/reviews/<YYYY-MM-DD>-<slug>-findings.md
```

Track enough to preserve convergence:

```text
id
round
reviewer
agent/model
review target
severity
evidence
impact
recommendation
status
resolution
rechecked_by
rechecked_evidence
```

Status transitions:

```text
open -> accepted -> fixed -> rechecked
open -> rejected
open -> deferred
question -> answered -> accepted/rejected/deferred
```

Accepted blocker and major findings stay visible until fixed and rechecked. Rejected findings need a reason tied to the goal, boundary, or evidence. Deferred findings must be minor, out of scope, blocked on a human decision, or explicitly moved to future work.

## Sign-Off

Reviewer sign-off is useful evidence, not the stop condition.

Ask for compact sign-off when a review round may be final:

```text
No blocker:
No major issue:
Remaining minor/question items:
Evidence checked:
Confidence:
```

If a reviewer signs off while preserving a blocker or major issue, treat the sign-off as invalid for convergence. If a reviewer preserves only minor issues or questions, the moderator decides whether they affect target correctness, Eval quality, result correctness, or the agreed boundary.

## Stop Conditions

Stop by evidence, not round count.

Stop when:

- verification from the Spec, Eval, and goal contract passes
- latest required fresh reviewer finds no evidence-backed blocker or major issue
- no accepted blocker or major finding remains open
- accepted blocker and major findings are fixed and rechecked when repair was required
- rejected findings include clear reasons tied to the goal contract or boundary
- open questions are answered, converted to safe assumptions, deferred as non-blocking, or escalated to the user
- deferred findings are minor, out of scope, or waiting on a human decision
- required artifacts are updated
- final evidence closure proves the outcome and records remaining risks or deferred items

Continue when:

- any evidence-backed blocker or major finding remains open
- blind review produced a required Round 2 gate that has not been completed or explicitly skipped with evidence
- a fresh reviewer finds a new evidence-backed blocker or major issue
- verification fails or contradicts the claimed result
- repair changes the Spec, Eval, plan, boundary, or artifact enough that fresh review is required

Minor findings do not block stopping unless they affect target correctness, Eval quality, result correctness, or an explicit goal boundary.

Do not stop merely because all reviewers agree. Agreement becomes useful only after the moderator compares evidence, checks conflicts, and verifies the artifact against Spec and Eval.

Do not reopen convergence only because of a new optional interpretation of "complete" after the agreed evidence passes. Treat new hardening, installation, publication, or broader validation as follow-up unless it was in the goal contract, the user changes the target, or it exposes a real defect in the contracted result.

## Pause Conditions

Pause if:

- a product, scope, business, brand, taste, or user-facing decision cannot be safely made by agents
- required credentials, permissions, accounts, or external systems are missing
- required subagent, model, or external agent is unavailable and no acceptable substitute exists
- external-agent use needs authorization
- reviewers disagree on a major decision and evidence cannot resolve it
- execution would exceed write, privacy, cost, account, or public-action boundaries
- verification cannot run
- time, cost, context, or token budget cap is hit
