---
name: steady-coding
description: Use when non-trivial software engineering or an engineering completion claim involves implementation, debugging, refactoring, migration, architecture, technical planning, code review, material assumptions, scope pressure, or unverified evidence. Skip for trivial mechanical edits and pure factual explanation.
---

# Steady Coding

Move fast. Stay grounded. Keep it reviewable.

## Purpose

Use this method independently or beside specialized skills. Human owns
product direction and final architecture. Visible assumptions, path, evidence,
and adversarial checkpoints activate the reasoning and expose drift; empty
headings or methodology narration do not count.

Priority:

```text
correctness/safety -> user goal and constraints -> source evidence
-> reviewability/reversibility -> scope discipline/simplicity
-> performance/extensibility when current requirements earn them -> elegance
```

## Operating Loop

```text
Define Success -> Inspect Reality -> Surface Assumptions / Push Back
-> Choose and State the Path -> Make the Smallest Correct Move
-> Verify -> Adversarially Review -> Report and Stop
```

Contract:

1. Define success without reframing away explicit constraints.
2. Inspect controlling code, tests, runtime, data, config, docs, and diff before
   committing to a dependency, behavior, or fix.
3. Surface uncertainty only when it can change direction, correctness,
   verification, or risk. Ask on material/irreversible choices; state local
   reversible choices as working assumptions.
4. For ambiguous, multi-step, architectural, or multi-file work, state one short
   evidence-backed plan; keep simple work direct.
5. Make the smallest correct change without speculative requirements, adjacent
   cleanup, or a more fragile local design.
6. Match verification to the changed surface. Never claim an unrun check passed.
7. Before completion, name the most plausible miss, evidence checked, and action.
8. Report observed outcome and residual risk, then stop.

## Conditional References

Read only applicable references:

- For material architecture/dependency/API/data/security/destructive/irreversible
  decisions, read
  [decision-boundaries.md](references/decision-boundaries.md).
- Before debugging, changing a timeout/retry/suppression/test expectation, or
  accepting a temporary workaround/release mitigation, read
  [debugging-and-mitigation.md](references/debugging-and-mitigation.md).
- Before a refactor/migration, compatibility change, architectural abstraction
  (interface/factory/registry/service/wrapper), new dependency/configuration
  surface, speculative extensibility, or broad cleanup, read
  [change-scope-and-design.md](references/change-scope-and-design.md).
- When verification is non-obvious, no harness exists, invariants matter, or a
  completion/review claim has a coverage boundary, read
  [verification-and-reporting.md](references/verification-and-reporting.md).

## Visible Checkpoints

Omit empty checkpoints. Before inspection, name only sources
to inspect and decisions they must settle; do not invent an implementation
contract.

```text
ASSUMPTIONS:
- Blocking: [material decision evidence cannot safely resolve]
- Working: [local reversible choice and why it is safe]

PLAN:
1. [inspection/change] — [why]
2. [inspection/change] — [why]
3. [verification] — [what it proves]
-> Executing unless you redirect.

ADVERSARIAL CHECK:
- Most plausible miss: [specific failure or invalid assumption]
- Evidence checked: [source, diff, test, log, invariant]
- Action: [fixed, verified, rejected with evidence, or residual risk]
```

Every item must change a decision, action, verification, or handoff. Announcing
the skill, restating the request, or filling a template is not compliance.

## Completion

Report outcome, fresh verification, adversarial check, and residual risk.
Missing source/diff or required current checks forces `STATUS: unverified`;
never echo `complete`, `done`, or `ready` from user/worker claims. Write `Not
run` with the reason, and stop when evidence reaches the requested state.
