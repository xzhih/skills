---
name: agent-lanes
description: "Use only when the user explicitly invokes $agent-lanes, or when an active workflow routes here, to coordinate the initial or integration-approved dispatch of two or more independent lane/worktree/subagent tasks with owned surfaces, collision checks, coverage trace, handoff packets, and direct dispatch. Do not use for debate, review, returned-lane integration, or next-batch eligibility."
---

# Agent Lanes

Coordinate parallel work while the main thread remains moderator. This skill
owns lane batching and packets, not implementation method.

## Iron Law

```text
NO LANE DISPATCH WITHOUT OWNED SURFACES AND A COLLISION CHECK.
```

## Shared Rules

Use [mode-gate.md](../dev-flow/references/mode-gate.md),
[coverage-trace.md](../dev-flow/references/coverage-trace.md), and
[task-checkboxes.md](../dev-flow/references/task-checkboxes.md). Use
[agent-runtime](../agent-runtime/SKILL.md) for every dispatched worker's class,
lifecycle, and applicable profile/authorization/session gates. Lane implementation is
Multi-agent / Lane mode.

## Use For

- independent implementation or investigation lanes
- subagent/worktree/manual handoff packets
- first safe batch and dispatch of a next batch approved by integration review
- collision control for shared files, APIs, migrations, docs, or evidence

Do not use for same-topic debate, same-artifact review, one-off research, or
returned lane review. Use [integration-review](../integration-review/SKILL.md)
when workers return.

## Dispatch Gate

Before dispatch:

- restore relevant project context
- each lane has owned scope and excluded scope
- shared/high-collision surfaces have one owner
- coverage trace and task checkboxes are assigned when provided by the plan
- verification and evidence expectations are clear
- integration path and blocker rules are clear
- dispatched workers pass the applicable `agent-runtime` class and lifecycle

If boundaries are unclear, route to [agent-grilling](../agent-grilling/SKILL.md)
or [discussion-workflows](../discussion-workflows/SKILL.md) first.

## Batch Rule

Dispatch the first safe batch, not every possible lane. Returned work and
next-batch eligibility belong to [integration-review](../integration-review/SKILL.md);
dispatch a later batch only after its verdict returns an approved safe set.

Prefer worktrees when filesystem isolation is useful and compatible with the
project. Use manual prompts only when no permitted runnable dispatch surface
exists or the user requests them.

## Packet Minimum

Each lane packet needs:

```text
Goal
Owned / excluded scope
Allowed / forbidden files
Coverage trace and task checkboxes owned by the lane
Verification and evidence
Stop/blocker conditions
Handoff format
What not to claim
```

Read `references/lane-packets.md` only when preparing detailed packets.
Read [operational-flow.md](references/operational-flow.md) before direct worker
dispatch, persisted lane/workspace state, or dispatching an integration-approved
next batch.

## Output

For dispatch:

```text
Safe lanes:
Delayed lanes:
Collision risks:
Dispatched or handoff prompts:
Integration check:
```

For no safe batch:

```text
Why unsafe:
Required boundary step:
Next moderator action:
```

Omit empty headings.

## Red Flags

- Dispatching all possible work at once.
- Sharing high-collision surfaces across active lanes.
- Treating categories as lane ownership.
- Asking the user to relay prompts when a permitted runnable dispatch surface exists.
- Starting next batch before returned lanes are reviewed.
