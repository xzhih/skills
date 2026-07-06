# Handoff Review

Use this reference when normalizing returned lane work.

## Claim Normalization

Convert each worker response into:

```text
lane:
status:
branch:
lane workspace:
base branch:
base commit:
participant/model:
touched files:
claimed changes:
non-covered scope:
derived quality gates:
verification:
evidence:
documentation impact:
conflicts:
artifact scan:
blocked reason:
moderator verdict:
```

## Evidence Classes

- `accepted`: fresh command or browser/DOM evidence matches the changed surface.
- `weak`: command exists but is too broad, too stale, unrelated, or incomplete.
- `blocked`: raw blocker is recorded and prevents a pass claim.
- `missing`: worker claimed completion without usable evidence.

## Verdicts

- `ready-to-merge`: scope is clean and evidence is sufficient.
- `repair-in-lane`: work is valuable but needs correction before merge.
- `blocked`: external condition or unresolved dependency prevents completion.
- `conflict`: changed surfaces collide with another lane or current mainline.
- `reject`: lane violates boundary enough that integration would be unsafe.

Workers should not claim `merged`. `merged` is a moderator state after an actual integration action.

## Diff And Evidence Checklist

When a lane has a git-backed workspace or branch, inspect evidence with commands adapted to the repository:

```sh
git -C <workspace> status --short
git -C <workspace> merge-base <base-branch> HEAD
git -C <workspace> diff --name-only <base-commit>...HEAD
git -C <workspace> diff --check <base-commit>...HEAD
git -C <workspace> diff --stat <base-commit>...HEAD
```

Then check:

- changed files are inside owned surfaces
- forbidden surfaces are untouched
- generated/package-manager artifacts follow project rules
- verification commands match the changed surface
- derived quality gates have matching evidence or are explicitly marked weak/missing
- evidence paths exist when cited
- browser/UI/Admin evidence is fresh when required
- documentation impact is classified
- stale-base risk is recorded if base commit is old or prerequisite lanes changed

If the moderator cannot inspect the lane workspace or reproduce enough evidence, classify evidence as `missing` or `weak`, not accepted.

## Next-Batch Checks

Before continuing with more work:

- Classify every returned lane.
- Merge, park, repair, block, conflict, or abandon current review lanes.
- Identify files and docs changed from actual diffs, not worker summaries.
- Recompute collision risks from the new state.
- Invalidate queued lanes whose assumptions, base commit, owned surfaces, or prerequisites changed.
- Delay lanes that depend on unmerged review work.
- Separate implementation lanes from hard-gate/evidence lanes when they would collide.
- Choose the next maximal safe set only after accepted lanes have a moderator verdict.
- Dispatch the safe set when callable subagents are available and no true user decision remains. Emit fallback prompts only when direct dispatch is unavailable or the user requested manual threads.
