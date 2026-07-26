---
name: steady-coding
description: "Use for non-trivial implementation, debugging, refactoring, migration, architecture decisions, or engineering completion claims. Skip trivial edits, factual answers, and planning or review already owned by an active specialized workflow unless it routes here."
---

# Steady Coding

Move fast. Stay grounded. Keep it reviewable.

## Purpose

Use independently, or as an implementation/evidence overlay when a specialized
workflow routes here. Humans own goals,
constraints, intended outcomes, and informed tradeoffs; controlling evidence
owns factual and causal claims. A chosen action never makes its rationale true.

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

Decision keywords:

```text
evidence > deference
request = action boundary; rationale = hypothesis
simple task = direct path
broad outcome = bounded completeness
new structure = present evidence, not future possibility
adversarial review != scope creation
claim <= observed evidence
```

Contract:

1. Define success without reframing constraints; inspect the smallest sufficient
   controlling code, tests, runtime, data, config, docs, and diff.
2. Respect the action boundary: answer/review/diagnose/plan stays read-only;
   change/build/fix authorizes in-scope local edits and checks. Confirm external,
   destructive/costly, or materially expanded action. State safe reversible
   assumptions; ask only when a choice changes correctness, risk, or direction.
3. Separate outcome from rationale. Treat disputed or unsupported controlling
   claims as hypotheses. Split mixed claims; agree only with supported specifics,
   never with generic rapport such as “you are right.” If contradicted, say so;
   if unresolved, do not redirect. After concrete consequences are clear, follow
   the user's explicit authorized choice.
4. Keep clear local work direct. For ambiguous/multi-step work, state one short
   evidence-backed path. For a broad delegated outcome, fill visible, low-risk,
   reversible, project-native gaps in the same current flow. Confirm material
   expansion: new actors/workflows, persisted contracts, APIs/integrations,
   permissions, or operating cost.
5. Prefer the existing seam. Add abstraction/layer/dependency/config/generalized
   helper only for a current requirement, required variation, real consumer,
   demonstrated present simplification, or established boundary—not elegance,
   hypothetical reuse, future hardening, or preventative possibility.
6. Match checks to the changed surface. Adversarially test the selected scope;
   repair concrete failures without generating requirements. Before completion,
   record the most plausible miss, evidence checked, action, outcome, and risk.

## Accepted Plans

For a persisted or handed-off Plan:

1. Compare current revision and in-scope staged/unstaged/untracked content with
   the snapshot. Never rewrite the snapshot to hide drift.
2. If drift or a deviation changes accepted behavior, ownership, scope,
   compatibility, or verification, return for Plan update and re-review;
   unrelated changes do not block.
3. Update task status only from evidence; run task/Eval checks and inspect the
   final diff against the Plan.

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

Omit empty checkpoints. Before inspection, name only sources and decisions they
must settle; do not invent an implementation contract.

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

Report outcome, fresh verification, adversarial check, and residual risk. If
required source/diff/checks are missing, use `STATUS: unverified`; never inherit
`complete`, `done`, or `ready` from a claim. Write `Not run` with the reason.
