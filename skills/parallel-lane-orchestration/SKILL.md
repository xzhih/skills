---
name: parallel-lane-orchestration
description: "Coordinate two or more independent lane workspaces or subagent lanes, lane handoff prompts, batch planning, collision control, direct worker dispatch, or next-batch selection after project context and boundaries are restored. Do not use for a single subagent review, ordinary research delegation, or routine code review."
---

# Parallel Lane Orchestration

Coordinate parallel development lanes while the main thread remains moderator. The purpose is to remove manual copy/paste handoffs without giving up control of scope, evidence, and integration.

## Required Preflight

Load [project-context](../project-context/SKILL.md) first. If lane boundaries are not clear, use [discussion-workflows](../discussion-workflows/SKILL.md) before dispatch.

Use [agent-grilling](../agent-grilling/SKILL.md) first when lane decomposition or execution path needs pressure testing. Use [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md) instead when the user explicitly asks for Spec/Eval delivery, external-agent policy, or repeated review-repair convergence.

Before dispatching model-selectable subagents, restore or create the Agent Model Profile from [development-workflows](../development-workflows/references/agent-model-profile.md). If no current profile exists and model choice matters, ask the user once for implementation and review model mix, then record it.

## Lane Rules

- The main thread owns batching, lane ids, collision checks, integration, and final claims.
- Dispatch only independent lanes with disjoint owned surfaces.
- Do not use this skill for one-off subagent review or research unless it is part of a lane batch.
- Prefer git worktrees for lane workspaces when the project is a Git repo, multiple lanes need filesystem isolation, branch-per-lane work is acceptable, and no project-declared lane mechanism conflicts.
- Prefer direct subagent dispatch when host tools are available and the user has authorized subagents.
- Fall back to handoff prompts only when subagents are unavailable or the user wants manual threads.
- Do not launch every possible lane. Send one safe batch, integrate it, then select and dispatch the next safe batch unless a true user decision is required.
- Do not combine feature discussion, implementation, hard-gate evidence, and final integration in one lane unless the task is tiny.
- Keep high-collision files, API contracts, migrations, shared components, and evidence packets single-owner per batch.
- Do not ask the user to pick lanes, choose batch size, or relay handoffs when source context and lane boundaries are enough for the moderator to decide.

## Batch Flow

```text
restore project context
  -> build or refresh lane registry
  -> identify candidate lanes
  -> reject overlapping lanes
  -> choose the first safe batch
  -> create or verify lane workspaces and base commits
  -> prepare lane packets
  -> dispatch callable subagents, or output handoff prompts only as fallback
  -> keep the main thread available for non-overlapping work
  -> collect handoffs
  -> route to integration-review
  -> continue with the next safe batch only after review
```

## Lane Packet

For each lane, include:

```text
Lane id:
Goal:
Lane workspace:
Branch:
Base branch:
Base commit:
Selected participant/model:
Authoritative docs to read:
Owned scope:
Excluded scope:
Allowed files/surfaces:
Forbidden files/surfaces:
Dependencies:
Implementation rules:
Derived quality gates:
Verification commands:
Evidence expectations:
Package-manager/artifact rules:
Handoff format:
Stop/blocker conditions:
Documentation impact policy:
What not to claim:
```

Read `references/lane-packets.md` for the full packet shape and worker return format. Read `references/operational-flow.md` before direct subagent dispatch or when lane registry state must persist.

## Dispatch Policy

When using subagents:

- If host subagent tools are not already visible, discover them before falling back to manual prompts.
- Spawn workers only for concrete, bounded, self-contained lanes.
- Tell workers they are not alone in the codebase and must not revert others' edits.
- Tell workers to edit only their assigned lane workspace and report exact changed files.
- Keep reviewer or worker identities explicit if a follow-up round may be needed.
- Do not wait repeatedly by reflex; while workers run, do non-overlapping moderator work.
- Do not prod, interrupt, or close active workers only because they are slow. Long lane execution is normal; stop them only for cancellation, wrong-task execution, boundary or safety risk, host failure, or after their result is no longer needed.

When outputting manual prompts:

- Make prompts copy-ready.
- Include all required reads and exclusions.
- Require structured handoff output.
- Preserve the same packet boundaries used for subagents.

## Output

For a new batch:

```text
Current state:
Safe parallel lanes:
Lanes intentionally delayed:
Collision risks:
Dispatched agents or fallback handoff prompts:
Integration checklist:
```

For no safe batch:

```text
Why parallelism is unsafe now:
Required boundary or integration step:
Next moderator action:
```
