# Operational Flow

Use this reference when dispatching workers directly, persisting lane state, or
dispatching a next batch approved by `integration-review`.

## Moderator Loop

```text
restore context
  -> registry + coordination owner + verified workspaces/base
  -> classify workers through agent-runtime -> dispatch + record sessions
  -> collect handoffs -> integration-review verdict/integration evidence
  -> consume registry + approved next set
  -> revalidate -> dispatch or true pause
```

Manual prompt output is the fallback, not the default, when a permitted runnable
dispatch surface exists.

## Direct Dispatch Procedure

1. Read `agent-runtime`; apply the selected class only and never scan for
   unrequested external surfaces.
2. After owned/forbidden surfaces are clear, create one worker per lane with a
   complete packet and record:

```text
lane / agent-session / worker class / governed participant-model:
workspace / branch / base branch-commit:
owned-forbidden surfaces / dispatch time / expected handoff:
```

3. The moderator owns shared coordination docs. Collect structured handoffs and
   route returned lanes to `integration-review`.

If no permitted runnable dispatch surface exists, emit manual prompts and mark
dispatch mode as `manual`.

## After Returned Work

`integration-review` owns classification, `ready_to_merge -> merged`,
post-integration evidence, and next-batch eligibility. Consume its registry and
approved set; never recompute from worker summaries or local evidence.

Continue by:

- dispatch approved next/repair lanes
- do non-overlapping cleanup/verification while workers run
- record blocked lanes and move around them when possible

Pause only for a true user decision: product/scope direction, privacy/cost/account
or external-agent authorization, destructive/public/production action, missing
credentials, or a user-defined limit.

## Lane Registry Shape

The moderator-owned registry should track:

```text
lane / status / agent-session / worker class / governed participant-model:
workspace / branch / base branch-commit:
owned-forbidden surfaces:
handoff-evidence paths / documentation impact:
moderator verdict / merge-repair state / next action:
```

## Lane States

```text
planned
active
review
ready_to_merge
repair_in_lane
blocked
conflict
merged
abandoned
```

Workers report only `review` or `blocked`; the moderator sets other states after
inspecting diffs/evidence.

Integration verdict mapping:

```text
ready-to-merge -> ready_to_merge
repair-in-lane -> repair_in_lane
blocked -> blocked
conflict -> conflict
rejected -> abandoned (reason: rejected)
abandoned -> abandoned
merged -> merged only after actual integration
```

`ready_to_merge -> merged` requires actual integration, resulting target/diff,
fresh verification, coverage update, and moderator registry evidence.

## Transitions

```text
planned -> active
active -> review | blocked
review -> ready_to_merge | repair_in_lane | blocked | conflict | abandoned
ready_to_merge -> merged
repair_in_lane -> active | blocked | abandoned
conflict -> repair_in_lane | abandoned
blocked -> active | abandoned
any state -> abandoned with reason
```

## Lane Workspace Contract

A workspace may be a worktree, branch checkout, fork, agent sandbox, or declared
isolation. Prefer project policy. Otherwise prefer a git worktree only when the
repo, host, branch policy, editable isolation need, and normal diff/merge flow
all support it:

Common setup shape:

```sh
git worktree add -b <lane-branch> <lane-workspace> <base-branch-or-commit>
```

Use a project-declared or clearly scoped non-colliding path. Do not force
worktrees over declared sandboxes/policy, for read-only work, or when one checkout
is safer.

Before dispatch:

- record base branch/commit and verify workspace identity/cleanliness
- apply declared rebase/merge policy
- mark stale-base risk after mainline/prerequisite changes

If base freshness is uncertain, delay dispatch or assign a repair/rebase lane explicitly.

## Approved Next-Batch Dispatch

Before dispatching a safe set returned by `integration-review`:

1. Confirm the verdict names the resolved returned lanes and approved safe set.
2. Recheck source/base/ownership/collisions plus each workspace, packet,
   owned/forbidden surfaces, and verification.
3. Keep high-collision docs, contracts, migrations, and evidence single-owner.
4. Classify through `agent-runtime`; dispatch the still-safe set or return stale
   assumptions to `integration-review`.
