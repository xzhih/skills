# Operational Flow

Use this reference when dispatching workers directly, persisting lane state, or computing the next batch.

## Contents

- Moderator Loop
- Long-Running Workers
- Direct Dispatch Procedure
- Autonomous Batch Continuation
- Lane Registry Shape
- Lane States
- Transitions
- Lane Workspace Contract
- Next Batch Algorithm

## Moderator Loop

```text
restore context
  -> build lane registry
  -> preclaim coordination ownership
  -> create or verify lane workspaces
  -> record base branch and base commit
  -> dispatch callable subagents when selected by the user profile and visible
  -> record agent/session ids
  -> collect structured handoffs
  -> inspect diffs and evidence
  -> update lane registry
  -> merge, repair, block, conflict, or abandon
  -> recompute next safe batch
  -> dispatch next safe batch or report true pause condition
```

Manual prompt output is the fallback, not the default, when callable subagent tools exist.

## Long-Running Workers

Do not treat a long-running worker as blocked only because it has not replied yet. Avoid repeated waits, progress pings, or close/interrupt actions.

While workers run:

- continue non-overlapping moderator work
- prepare integration or evidence checks
- inspect shared context that does not depend on worker output
- wait only when the next critical-path action requires the result

Interrupt or close a worker only when it is cancelled, clearly on the wrong task, violating scope or safety boundaries, reported failed by the host, or completed and no longer needed for continuity.

## Direct Dispatch Procedure

1. Confirm the user-approved host subagent surface is visible; do not scan for
   unapproved agent surfaces.
2. Create one worker per lane only after owned and forbidden surfaces are clear.
3. Give each worker a complete lane packet.
4. Record dispatch metadata:

```text
lane_id:
agent_id/session_id:
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

If no user-approved callable subagent surface is visible, emit manual prompts
and mark dispatch mode as `manual`.

## Autonomous Batch Continuation

After integration review, the moderator chooses the next safe action. Do not ask the user to pick the next batch when ownership, dependencies, and evidence can decide it.

Continue by:

- dispatching the next maximal safe set of independent lanes
- assigning repair lanes for valuable but incomplete work
- doing non-overlapping moderator cleanup or verification while lanes run
- recording blocked lanes honestly and moving around them when possible

Pause only for a true user decision: product direction, meaningful user-facing scope tradeoff, privacy/cost/account authorization, external-agent authorization, destructive/public/production action, missing credentials, or a user-defined limit.

## Lane Registry Shape

The moderator-owned registry should track:

```text
lane_id:
status:
agent/session:
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

## Next Batch Algorithm

Before continuing with another batch:

1. Classify every returned lane.
2. Merge, park, repair, block, or abandon current review lanes.
3. Recompute changed surfaces from actual diffs.
4. Invalidate queued lanes whose assumptions, base commit, or owned surfaces changed.
5. Delay lanes depending on unmerged review work.
6. Choose the maximal safe set with disjoint owned surfaces and verification paths.
7. Keep high-collision docs, contracts, migrations, and evidence packets single-owner.
8. Dispatch the next safe set when callable subagents are selected by the
   user-approved profile and visible, or emit fallback prompts when direct
   dispatch is unavailable or requested.
