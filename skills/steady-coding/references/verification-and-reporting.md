# Verification and Reporting

Read this when the verification strategy is non-obvious, no automated harness
exists, migration/performance/algorithm invariants matter, or a review/completion
claim has a coverage boundary.

## Iron Law

```text
NO CURRENT SOURCE/DIFF OR REQUIRED CURRENT CHECKS = STATUS: UNVERIFIED.
```

A user instruction, worker summary, stale result, or future CI cannot replace
that evidence or authorize a completion label.

## Match Evidence to the Work

```text
Bug fix:
  reproduce -> failing check -> cause-level fix -> targeted pass -> regression

Behavior change:
  failing or characterization check when practical -> implement -> targeted pass
  -> relevant regression

Refactor or migration:
  characterize invariants/compatibility -> change -> verify the same invariants

Architecture, plan, or review:
  trace claims to source/diff/tests -> challenge assumptions -> separate evidence
  from inference

Performance or algorithm work:
  verify an obviously correct baseline -> measure -> optimize -> keep behavior
  checks green

Trivial mechanical edit:
  run the narrow formatter, parser, build, or static check that can catch mistakes
```

Tests are a loop condition, not a box to tick. Prefer real behavior over mocks
when practical. If no automated harness exists, define an observable manual
oracle before changing behavior and record what was actually checked.

Never imply a command, test, build, review, or behavior passed if it was not run
or observed. Stale evidence and future CI are not current verification.

When the user asks for `complete`, `done`, `ready`, or a clean handoff but the
source/diff or required current verification is unavailable, use this shape:

```text
STATUS: unverified
- Observed: [what is actually available]
- Missing evidence: [source/diff/checks not inspected or run]
- Required to close: [smallest evidence-producing next action]
```

Do not write `complete`, `done`, `ready`, or `handoff complete` elsewhere in
that response. The user's supplied status (“looks done”), a worker summary, and
future CI are claims, not completion evidence. Record `Not run` without turning
it into a pass.

## Adversarial Review

Before completion, challenge the current answer, plan, diff, or evidence:

- Which assumption would invalidate the result?
- What regression, edge case, security issue, or data-loss path could be hidden?
- Did the change solve the cause or suppress the symptom?
- Did a future possibility become an unrequested feature or abstraction?
- What is the lowest-confidence or least-covered surface?

Name one specific plausible miss, the evidence checked, and the resulting action.
“Looks good” is not an adversarial check. Act on the finding or report the
remaining risk; do not use self-review to stall after evidence is strong.

## Evidence-Bearing Report

```text
OUTCOME:
- [what changed or was concluded, and why]

VERIFICATION:
- [command or evidence] -> [observed result]

ADVERSARIAL CHECK:
- Most plausible miss: [specific failure or invalid assumption]
- Evidence checked: [source, test, diff, log, or invariant]
- Action: [fixed, verified, rejected with evidence, or retained as residual risk]

RESIDUAL RISK:
- [material uncertainty, blocker, or none found after the listed checks]
```

Write `Not run` and the reason when a check was not performed. Do not compress
the adversarial checkpoint into reassurance: a compatibility or coverage claim
must name the evidence that supports it and what remains outside that evidence.

Claim `complete` only when current evidence covers the requested success state.
Otherwise use the exact state: `paused`, `blocked`, `mitigated, not fixed`, or
`unverified`. Stop when the requested state is reached; keep optional work
separate.
