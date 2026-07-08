---
name: integration-review
description: "Use only when an active workflow routes here, to review returned lane handoffs: scope, diffs, evidence, coverage closure, conflicts, lane status, coordination updates, and next safe batch. Use when lanes came back or agents finished. Do not use for ordinary PR/code review."
---

# Integration Review

Turn returned lane handoffs into reliable project state. This is not ordinary
PR review.

## Iron Law

```text
NO ACCEPTED LANE WITHOUT DIFF AND EVIDENCE REVIEW.
```

Worker summaries are claims until checked against changed files, scope, fresh
verification, and collision risk.

## Use For

- returned lane or worker handoffs
- scope, diff, evidence, coverage, conflict, and lane-status checks
- deciding ready-to-merge, repair-in-lane, blocked, conflict, rejected,
  abandoned, or next safe batch

Use [agent-lanes](../agent-lanes/SKILL.md) for original lane split. Use
[project-context](../project-context/SKILL.md) first when lane state is stale.
Use [agent-runtime](../agent-runtime/SKILL.md) before closing, resuming,
repairing in lane, or starting callable/external follow-up workers.

## Check

For each returned lane:

- normalize status, workspace, branch, touched files, claims, coverage, checkbox
  updates, verification, evidence, blockers, conflicts
- inspect actual diff before accepting the claim
- verify changed files stay inside owned surfaces
- check forbidden/shared surfaces and generated/package artifacts
- match verification to changed surfaces
- require evidence for `[x]` checkboxes and completed coverage
- keep `[!]` / `[-]` reasons for blocked or deferred work
- route doc drift to [doc-driven-workflows](../doc-driven-workflows/SKILL.md)
  only when source-of-truth docs may mislead

Read `references/handoff-review.md` only when detailed normalization or
next-batch checks are needed.

## Verdicts

```text
ready-to-merge
repair-in-lane
blocked
conflict
rejected
abandoned
merged only after actual integration
```

Do not start the next batch until current returned lanes are classified,
repaired, merged, blocked, or deliberately deferred.

## Output

Return the smallest useful batch state:

```text
Accepted:
Needs repair:
Blocked/conflict:
Evidence:
Coverage still open:
Next batch:
```

Omit empty headings.

## Red Flags

- Accepting a lane from narrative alone.
- Counting stale, missing, partial, or blocked verification as pass.
- Ignoring touched files outside owned scope.
- Updating coordination docs from worker claims without source checks.
- Starting next batch before current lanes are classified.
