---
name: development-workflows
description: "Use when a development task needs workflow routing: continuing from handoff or coordination docs, choosing an owner workflow skill, splitting work into batches of lanes, reviewing returned lane handoffs, or handling declared doc-governed project state. Do not use for ordinary single-thread coding, routine PR/code review, or normal docs edits."
---

# Development Workflows

Route complex development work to the right focused skill without making the user repeat project rules or manually relay agent work. This skill is the entry point; it does not replace the focused workflows.

## Critical Overrides

Follow `references/critical-overrides.md` for global rules about source truth, claims, documentation hygiene, autonomy, and user escalation. When a user delegates a project goal, also follow `references/autonomous-progression.md`. When subagents, model-diverse review, or external agents may be used, follow `references/agent-model-profile.md`.

## Router Only

Use this skill to decide the workflow sequence, then load the focused skill that owns the current step.

Do not implement code, rewrite docs, dispatch agents, or merge lanes from this router alone. Route and coordinate.

## Autonomous Progression

When the user gives a broad development objective, continue into the next focused skill instead of stopping at routing advice. The main thread owns the loop: restore context, pressure-test only when useful, dispatch safe lanes, review returned work, request repairs, verify, and continue with the next safe batch.

Ask the user only for true user decisions defined in `references/autonomous-progression.md`. Do not ask the user to choose ordinary internal sequencing, copy prompts between agents, or approve every safe batch.

## Default Sequence

For complex project work, prefer this sequence:

```text
project-context
  -> discussion-workflows when boundaries or decisions are unclear
  -> agent-grilling when goals, branches, execution paths, or user-style questions need agent-mediated brainstorming
  -> doc-driven-workflows when its invocation gate permits it and source-of-truth docs may drift
  -> parallel-lane-orchestration when work can be split into lanes
  -> integration-review when lanes return
  -> multi-agent-orchestration only when higher-intensity Spec/Eval, adversarial review, external-agent policy, or repeated repair is needed
```

Skip steps that are not needed. Do not turn a small task into ceremony.

## Focused Skills

### `project-context`

Load [project-context](../project-context/SKILL.md) before planning, delegation, integration, or doc updates in a project that has handoff, coordination, spec, or discussion docs.

Use it to recover:

- authoritative project instructions
- active handoff and coordination docs
- confirmed, draft, open, overlap, and blocked decisions
- active, review, blocked, or merged lanes
- package manager and verification conventions
- high-collision files, APIs, docs, and evidence surfaces

### `discussion-workflows`

Load [discussion-workflows](../discussion-workflows/SKILL.md) when the current blocker is a decision, boundary, responsibility split, complexity placement, or drift in a long discussion.

Use it before lane generation when scope is still ambiguous.

### `doc-driven-workflows`

Load [doc-driven-workflows](../doc-driven-workflows/SKILL.md) only when its invocation gate permits it: the user asks for doc-driven work, project guidance requires doc maintenance, or declared source-of-truth docs may drift.

Use it to prevent documentation sprawl, stale claims, duplicate fact homes, or open questions leaking into confirmed docs.

### `agent-grilling`

Load [agent-grilling](../agent-grilling/SKILL.md) when the goal, architecture branch, lane decomposition, execution path, or brainstorming question backlog needs bounded agent exploration before planning or dispatch.

Use it to produce agent-answered questions, decision candidates, safe assumptions, and true user questions without entering full Spec/Eval orchestration.

### `parallel-lane-orchestration`

Load [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md) when the user wants batched lane work, subagent dispatch, or handoff prompts for multiple independent slices.

Use it only after project context has been restored and lane ownership boundaries are clear enough to avoid collisions.

### `integration-review`

Load [integration-review](../integration-review/SKILL.md) when worker lanes return, review branches need normalization, evidence needs checking, or the user asks for the next safe batch.

Use it before selecting, dispatching, or reporting the next safe batch.

### `multi-agent-orchestration`

Load [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md) only after explicit activation or when an existing active multi-agent workflow already owns the task.

Do not use it merely because a task is large if `parallel-lane-orchestration` plus normal review is enough.

## Routing Patterns

```text
"Where are we / continue from handoff"
  -> project-context -> discussion-workflows if decisions need recap

"Split work into subagents / give the first batch / dispatch directly when possible"
  -> project-context -> discussion-workflows if boundaries are unclear -> parallel-lane-orchestration

"These lanes came back"
  -> project-context -> integration-review -> doc-driven-workflows if docs/coordination need maintenance

"Docs are becoming a mess / sync docs with code"
  -> project-context -> doc-driven-workflows

"Have agents debate the architecture / grill the plan"
  -> project-context -> agent-grilling

"Run full Spec/Eval with repeated agent review-repair"
  -> project-context -> agent-grilling if target is unclear -> multi-agent-orchestration after explicit activation
```

## Output

When routing only, return:

```text
Current owner skill:
Why:
Required context to restore:
Next action:
What not to do yet:
```

When the next step can proceed without user input, continue into that focused skill instead of stopping at a recommendation.
