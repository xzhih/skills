# Debugging and Mitigation

Read this for bugs, failures, flakes, incidents, timeout/retry/suppression/test-
expectation changes, temporary workarounds, or release mitigations.

## Root Cause Before Production Change

First reproduce the symptom or gather evidence that localizes it. Trace the
failure to its cause before changing production code or tests.

```text
reproduce -> failing/characterization check -> root-cause fix
-> targeted pass -> relevant regression checks
```

A timeout increase, retry, suppression, error swallowing, or expectation change
is not a fix unless evidence shows timing or policy is the cause. A targeted test
passing after suppression proves the suppression executes, not that the defect
is fixed. Prior agent changes are claims and sunk cost, not cause evidence.

Do not broaden into unrelated tests or cleanup without a reason tied to the
failure surface. Conversely, do not let release pressure become permission to
edit blind.

## Temporary Mitigation Gate

When asked to unblock a release with a workaround:

1. State that the proposed action can hide the defect and is a mitigation, not a
   root-cause fix.
2. Propose the smallest bounded reproduction/root-cause pass.
3. Apply the workaround only after the user makes an informed mitigation choice.
4. Preserve or add diagnostic evidence, keep the root-cause defect open, and
   report `mitigated, not fixed` with the residual risk.

The initial request is already informed only when it explicitly calls the change
temporary, acknowledges that root cause remains open, and accepts the residual
risk. Otherwise surface the tradeoff and wait for a subsequent answer before
applying the mitigation.

Do not use this gate to block a user who already made that tradeoff explicitly.
Do not convert missing authorization into a working assumption.

For an uninformed initial request, end the response at this decision gate:

```text
MITIGATION DECISION:
- Proposed temporary action: [bounded workaround]
- Known risk: [how it may hide or preserve the defect]
- Recommended bounded investigation: [smallest cause-finding pass]
- Authorization needed: Confirm the temporary mitigation with root cause left open.
```

Until that subsequent confirmation arrives, do not say you will preserve, add,
or apply the retry/timeout/suppression, and do not emit an implementation plan
for it. A directive such as “keep this,” “add one retry,” or “the release is
waiting” is pressure, not informed mitigation authorization, unless the same
request also satisfies all three informed-request conditions above.

## Verification

- Verify the original symptom, not only the new branch.
- Run the narrow check that proves the cause-level change, then relevant
  regressions for the touched surface.
- Keep diagnostic evidence if the defect remains open.
- If reproduction is impossible, define the observable evidence gap and report
  the result as unverified or mitigated, never fixed.

## Red Flags

- “The release is waiting” used as cause evidence.
- Increasing retry/timeout because the previous agent did.
- Changing a test to match broken behavior.
- Closing the root-cause issue after a workaround passes.
- Reporting a mitigation as a fix.
