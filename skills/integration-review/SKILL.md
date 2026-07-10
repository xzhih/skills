---
name: integration-review
description: "Use only when an active workflow routes here, to review returned lane/worktree handoffs with owned surfaces and lane evidence: scope, diffs, coverage, conflicts, lane status, integration verdicts, and next-batch eligibility. Do not use for ordinary PR/code review, debate/review agents finishing, or non-lane worker results."
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

- returned lane/worktree handoffs with owned surfaces
- scope, diff, evidence, coverage, conflict, and lane-status checks
- deciding ready-to-merge, performing authorized local integration, recording
  merged state, or returning repair/block/conflict/rejection/abandonment and the
  next safe batch

Use [agent-lanes](../agent-lanes/SKILL.md) for original lane split. Use
[project-context](../project-context/SKILL.md) first when lane state is stale.
Use [agent-runtime](../agent-runtime/SKILL.md) only when evidence work must
interact with, wait for, resume, or close an existing worker/session; local diff
and artifact inspection alone does not load runtime. Return all repair/follow-up
dispatch intents to `agent-lanes`; this skill starts no workers.
The main-thread moderator running this skill owns the actual
`ready-to-merge -> merged` integration transition.

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

Read [handoff-review.md](references/handoff-review.md) before normalizing any
returned lane or deciding next-batch eligibility.

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

Do not approve the next batch until current returned lanes are classified,
repaired, merged, blocked, or abandoned with reason.
Return an approved safe set to [agent-lanes](../agent-lanes/SKILL.md) for
dispatch; integration review owns eligibility, not worker dispatch.

## Actual Integration Gate

For each `ready-to-merge` lane, the main-thread moderator must:

1. Confirm the target workspace/branch, lane base, integration mechanism, and
   current collision assumptions.
2. Perform the authorized local merge, cherry-pick, patch application, or
   project-declared equivalent. If the mechanism cannot be determined safely,
   return a bounded integration action to the active controller and keep the
   lane `ready-to-merge`; do not release dependent work.
3. Inspect the resulting combined diff and classify any conflict or unexpected
   surface before continuing.
4. Run fresh post-integration verification matched to the combined changed
   surface, not only the worker workspace.
5. Record the integration command/action, target revision, resulting changed
   files, verification evidence, coverage updates, and registry transition.

Only step 5 may set `merged`. A clean lane diff or passing worker-local test is
not post-integration evidence. If integration exposes a defect, use
`repair-in-lane` or `conflict` and return the dispatch intent to `agent-lanes`.

## Output

Return the smallest useful batch state:

```text
Accepted:
Integrated:
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
