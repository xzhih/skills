---
name: integration-review
description: "Review returned parallel-lane worker handoffs: scope, diffs, evidence, conflicts, lane status, coordination updates, and next safe batch selection. Use when a previous parallel-lane batch returns. Do not use for ordinary PR/code review or general branch integration."
---

# Integration Review

Turn worker handoffs into reliable project state. Agent reports are claims until the moderator checks scope, diff, evidence, and collision risk.

## Required Preflight

Load [project-context](../project-context/SKILL.md) first so review uses the current handoff, coordination, and source-of-truth docs.

If returned work changes source-of-truth docs or could make them stale, use [doc-driven-workflows](../doc-driven-workflows/SKILL.md) for drift decisions.

If findings require adversarial review-repair or a larger Spec/Eval correction, escalate to [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md).

## Review Flow

1. Normalize each worker handoff:
   - lane id
   - lane workspace and branch
   - participant/model actually used when known
   - worker status: `review` or `blocked`
   - touched files
   - claimed implementation
   - explicit non-covered scope
   - derived quality gates from formulation or lane packet
   - verification commands and results
   - evidence paths or blocker errors
   - package-manager artifact scan
   - conflict notes

2. Inspect the actual diff for each lane before accepting claims.
   Use the checklist in `references/handoff-review.md` when a lane workspace or branch is available.

3. Check scope:
   - owned surfaces were changed
   - excluded surfaces were not changed
   - shared contracts, migrations, docs, and evidence packets did not collide
   - package manager and generated artifacts follow project rules

4. Check evidence:
   - tests or typechecks are fresh enough for the changed surface
   - derived quality gates were checked against code, DOM, browser evidence, screenshots, or other relevant proof
   - UI/Admin/browser evidence exists when required
   - `git diff --check` or equivalent whitespace check ran
   - blocked evidence records the raw blocker instead of claiming pass

5. Decide moderator state:
   - ready-to-merge
   - repair-in-lane
   - blocked
   - conflict
   - rejected
   - abandoned
   - merged only after an actual integration action

6. Update coordination docs only when project rules require it and the source of truth is clear. Shared coordination docs are moderator-owned by default.

7. Continue to the next safe batch only after current returned lanes are classified, repaired, merged, blocked, or deliberately deferred.

## Merge Discipline

- Do not merge a lane just because the worker says it is done.
- Do not claim final hard-gate pass from stale or missing evidence.
- Do not hide browser attach failures, flaky tests, package-manager artifact leaks, or merge conflicts.
- Keep blocked lanes honest: they may preserve useful evidence but cannot be counted as pass.
- Preserve user or other-agent work. Do not revert unrelated changes to make a lane clean.

## Output

Use this structure:

```text
Batch review:
Accepted lanes:
Blocked lanes:
Repair-needed lanes:
Conflicts:
Evidence accepted:
Evidence missing or weak:
Derived gates passed or failed:
Coordination/doc updates:
Next safe batch dispatched or selected:
Lanes that must wait:
```

Read `references/handoff-review.md` for detailed normalization and next-batch checks. Route back to [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md) when the next safe batch can proceed without a true user decision.
