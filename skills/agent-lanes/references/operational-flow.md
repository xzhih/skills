# Operational Flow

Use this reference when dispatching workers directly, persisting lane state, or
dispatching a next batch approved by `integration-review`.

## Contents

- Moderator Loop
- Direct Dispatch Procedure
- After Returned Work
- Lane Registry Shape
- Lane States
- Transitions
- Lane Workspace Contract
- Approved Next-Batch Dispatch

## Moderator Loop

```text
restore context
  -> build lane registry
  -> preclaim coordination ownership
  -> create or verify lane workspaces
  -> record base branch and base commit
  -> classify each worker through agent-runtime and dispatch when its gates pass
  -> record agent/session ids
  -> collect structured handoffs
  -> route handoffs to integration-review for diff/evidence verdicts
  -> let its main-thread moderator integrate ready lanes and record
     post-integration evidence
  -> receive the resulting registry state and approved next safe set, if any
  -> revalidate dispatch assumptions and dispatch or report a true pause
```

Manual prompt output is the fallback, not the default, when a permitted runnable
dispatch surface exists.

## Direct Dispatch Procedure

1. Read `agent-runtime`; native-default host workers need lifecycle handling but
   no profile, while named/model-selectable/external/session workers use their
   applicable gates. Do not scan for unrequested external surfaces.
2. Create one worker per lane only after owned and forbidden surfaces are clear.
3. Give each worker a complete lane packet.
4. Record dispatch metadata:

```text
lane_id:
agent_id/session_id:
worker class:
participant/model when governed or known:
lane_workspace:
branch:
base_branch:
base_commit:
owned surfaces:
forbidden surfaces:
dispatch time:
expected handoff:
```

5. Do not rely on workers to update shared coordination docs.
6. Collect structured handoffs from workers.
7. Route returned lanes to `integration-review`.

If no permitted runnable dispatch surface exists, emit manual prompts and mark
dispatch mode as `manual`.

## After Returned Work

`integration-review` owns returned-lane classification, the moderator-side
`ready_to_merge -> merged` transition, post-integration evidence, and next-batch
eligibility. This skill consumes its resulting registry state and dispatches
the approved safe set. Do not independently recompute eligibility from worker
summaries or mark a lane merged from worker-local evidence.

Continue by:

- dispatching the next safe set approved by the integration verdict
- dispatching repair lanes named by the integration verdict
- doing non-overlapping moderator cleanup or verification while lanes run
- recording blocked lanes honestly and moving around them when possible

Pause only for a true user decision: product direction, meaningful user-facing scope tradeoff, privacy/cost/account authorization, external-agent authorization, destructive/public/production action, missing credentials, or a user-defined limit.

## Lane Registry Shape

The moderator-owned registry should track:

```text
lane_id:
status:
agent/session:
worker class:
participant/model when governed or known:
lane_workspace:
branch:
base_branch:
base_commit:
owned surfaces:
forbidden surfaces:
handoff path:
evidence path:
documentation impact:
moderator verdict:
merge/repair state:
next action:
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

Workers may report only `review` or `blocked`. The moderator sets all other states after inspecting diffs and evidence.

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

The `ready_to_merge -> merged` transition requires the integration action,
resulting target state/diff, fresh post-integration verification, coverage
updates, and moderator registry evidence defined by `integration-review`.

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

A lane workspace may be a git worktree, a separate branch checkout, a forked workspace, an agent-provided sandbox, or another project-declared isolation mechanism. Prefer the project's declared lane mechanism when present.

When no project-specific mechanism is declared, prefer a git worktree if all of these are true:

- the project is a Git repository
- the lane needs editable filesystem isolation from other active work
- branch-per-lane development is acceptable for the project
- the host can create local directories and run Git commands
- the lane's expected changes can be reviewed and merged through normal Git diffs

Common setup shape:

```sh
git worktree add -b <lane-branch> <lane-workspace> <base-branch-or-commit>
```

Choose `<lane-workspace>` from project guidance when available. Otherwise use a clearly scoped local path that will not collide with source files or generated artifacts, such as a hidden worktree directory or a sibling workspace.

Do not force git worktrees when the project already provides agent sandboxes, when repository policy forbids extra worktrees, when the task only needs read-only review, or when a single checkout is safer for the current host.

Before dispatch:

- record the base branch and base commit
- verify the lane workspace path or identifier is correct
- if the workspace exists, inspect whether it is dirty before assigning it
- define rebase/merge policy from project guidance when present
- mark stale-base risk when mainline or prerequisite lanes changed since base commit

If base freshness is uncertain, delay dispatch or assign a repair/rebase lane explicitly.

## Approved Next-Batch Dispatch

Before dispatching a safe set returned by `integration-review`:

1. Confirm the verdict names the resolved returned lanes and approved safe set.
2. Check that no new source, base, ownership, or collision change invalidated it.
3. Recheck each approved lane's workspace, base commit, owned/forbidden surfaces,
   verification, and packet.
4. Keep high-collision docs, contracts, migrations, and evidence single-owner.
5. Classify workers through `agent-runtime`, dispatch the still-safe set, or
   return stale assumptions to `integration-review` for recomputation.
