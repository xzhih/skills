# Review And Convergence

Use this reference for Level 2+ audits, Level 3 bounded review-repair convergence, final verification review, review contracts, findings ledgers, and stop/pause decisions.

## Contents

- Level Boundary
- Review Contract
- Reviewer Challenge
- Finding Standard
- Findings Ledger
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
- a major finding changes goal, boundary, plan, verification, or result-correctness judgment
- reviewers disagree on target correctness or result correctness
- a repair exposes a new blocker or major issue
- verification fails or contradicts the claimed result
- repair changes enough scope that fresh review is required
- external side effects or high-risk domains make one audit insufficient

## Review Contract

Every review round needs an explicit review contract. For Level 1 it can be inline. For Level 2+ persist it when review state must survive:

```text
docs/multi-agent-orchestration/reviews/<YYYY-MM-DD>-<slug>-review-contract.md
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

## Reviewer Challenge

Reviewer angles are focus areas, not blinders.

Reviewers should:

- reconstruct the goal from source materials, not only from the main agent's summary
- check whether goal, plan, evidence, assumptions, or review contract may be wrong
- report evidence-backed blocker or major issues even if they fall outside the assigned angle
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
docs/multi-agent-orchestration/reviews/
```

Suggested file:

```text
docs/multi-agent-orchestration/reviews/<YYYY-MM-DD>-<slug>-findings.md
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

## Stop Conditions

Stop by evidence, not round count.

Stop when:

- verification from the goal contract passes
- latest required fresh reviewer finds no evidence-backed blocker or major issue
- accepted blocker and major findings are fixed and rechecked
- rejected findings include clear reasons tied to the goal contract or boundary
- deferred findings are minor, out of scope, or waiting on a human decision
- required artifacts are updated
- final evidence proves the outcome

Continue when:

- any evidence-backed blocker or major finding remains open
- a fresh reviewer finds a new evidence-backed blocker or major issue
- verification fails or contradicts the claimed result
- repair changes the plan, boundary, or artifact enough that fresh review is required

Minor findings do not block stopping unless they affect target correctness, result correctness, or an explicit goal boundary.

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
