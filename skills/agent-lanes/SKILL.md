---
name: agent-lanes
description: "Use only when the user explicitly invokes $agent-lanes, or when an active workflow routes here, to coordinate two or more independent lane/worktree/subagent tasks with owned surfaces, collision checks, coverage IDs, handoff prompts, direct dispatch, or next-batch selection. Do not use for debate, review, or returned-lane integration."
---

# Agent Lanes

Coordinate parallel development lanes while the main thread remains moderator. The purpose is to remove manual copy/paste handoffs without giving up control of scope, evidence, and integration.

This skill is an orchestration shape, not an implementation method. Let
implementation skills trigger from each lane's actual task instead of binding
them here.

## Iron Law

```text
NO LANE DISPATCH WITHOUT OWNED SURFACES AND A COLLISION CHECK.
```

Parallelism is safe only when each lane has an owned scope, excluded scope, allowed/forbidden surfaces, verification expectations, and a known integration path. If those are unclear, route to formulation or discussion before dispatch.

## Quick Decision

Use this skill when the next useful action is to coordinate two or more independent implementation or investigation lanes with clear ownership boundaries.

Use it for:

- parallel subagent/worktree lanes over disjoint files, modules, docs, or evidence surfaces
- lane packet creation, direct dispatch, or manual handoff prompts
- first safe batch selection and next-batch selection after review
- collision control around high-risk shared files, contracts, migrations, docs, or evidence

Do not use it for:

- one-off review or research delegation
- same-topic debate where every agent should inspect the same material, question, or product/requirements tradeoff
- same-artifact review where every agent should inspect the same Spec, Eval, plan, PR, diff, implementation, evidence package, or final result
- returned lane review; use [integration-review](../integration-review/SKILL.md)
- unclear goals or risky lane decomposition; use [agent-grilling](../agent-grilling/SKILL.md) first
- explicit Spec/Eval, adversarial review-repair, external-agent policy, or model-diverse convergence; use [agent-self-driving](../agent-self-driving/SKILL.md)

## Required Preflight

Load [project-context](../project-context/SKILL.md) first. If lane boundaries are not clear, use [discussion-workflows](../discussion-workflows/SKILL.md) before dispatch.

Use [agent-grilling](../agent-grilling/SKILL.md) first when lane decomposition or execution path needs pressure testing. Use [agent-debate](../agent-debate/SKILL.md) instead for same-topic debate about requirements, simplicity, necessity, usability, product friction, or user flow. Use [agent-review](../agent-review/SKILL.md) instead for same-artifact review. Use [agent-self-driving](../agent-self-driving/SKILL.md) when the user explicitly asks for Spec/Eval delivery, external-agent policy, or repeated review-repair convergence.

Before dispatching model-selectable subagents, run the dispatch gate in [agent-model-profile.md](../dev-flow/references/agent-model-profile.md). Do not call `spawn_agent`, start an external agent, or emit task-bearing lane packets before that gate is satisfied.

## Internal Flows

Handle lane lifecycle inside this skill:

- Use [project-context](../project-context/SKILL.md) as the context gate when
  handoff, coordination, or source-of-truth state matters.
- Use [discussion-workflows](../discussion-workflows/SKILL.md) internally when
  lane boundaries are still ambiguous after context recovery.
- Use [integration-review](../integration-review/SKILL.md) internally when
  workers return, evidence must be checked, conflicts appear, or the next safe
  batch must be selected.

## Lane Rules

- The main thread owns batching, lane ids, collision checks, integration, and final claims.
- Dispatch only independent lanes with disjoint owned surfaces.
- Preserve the coverage chain from the accepted plan. Each lane must list the
  Requirement/Behavior/Eval/Task IDs it owns and the evidence it must return.
- If all agents need the same source material and same question, stop and route to `agent-debate` or `agent-review`; categories are not lane ownership.
- Do not use this skill for one-off subagent review or research unless it is part of a lane batch.
- Prefer git worktrees for lane workspaces when the project is a Git repo, multiple lanes need filesystem isolation, branch-per-lane work is acceptable, and no project-declared lane mechanism conflicts.
- Prefer direct subagent dispatch only when the user has approved a matching
  Agent Model Profile and the named subagent surface is already available.
- Fall back to handoff prompts when the user requests manual threads or the
  approved subagent surface is not available.
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
Coverage IDs:
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
Non-skippable requirements:
Package-manager/artifact rules:
Handoff format:
Stop/blocker conditions:
Documentation impact policy:
What not to claim:
```

Read `references/lane-packets.md` for the full packet shape and worker return format. Read `references/operational-flow.md` before direct subagent dispatch or when lane registry state must persist.

## Dispatch Policy

When using subagents:

- Do not auto-discover host subagent tools. Use the user-approved profile and
  already visible tools; otherwise follow the Agent Model Profile gate or emit
  manual prompts.
- Use the Agent Model Profile for implementation/review model and identity
  rules.
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
Coverage assigned:
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

## Red Flags

- Dispatching "all possible" lanes instead of the first safe batch.
- Sharing high-collision files, migrations, contracts, or evidence packets across active lanes.
- Asking the user to relay handoff prompts when a user-approved callable
  subagent profile is available and authorized.
- Treating a one-off research/review request as a lane batch.
- Starting the next batch before returned lanes are reviewed.
