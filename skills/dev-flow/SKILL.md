---
name: dev-flow
description: "Use when a development task needs workflow routing or lifecycle control: discussing requirements, locking Spec/Eval/Plan, executing the plan, reviewing and testing, repairing and rechecking, continuing from handoff or coordination docs, splitting work into batches of lanes, reviewing returned lane handoffs, or handling declared doc-governed project state. Do not use when one implementation, review, research, or docs skill can handle the whole request."
---

# Dev Flow

Route complex development work to the right focused skill without making the user repeat project rules or manually relay agent work. This skill is the entry point; it does not replace the focused workflows.

## Iron Law

```text
ROUTE TO THE OWNER; DO NOT IMPERSONATE THE OWNER.
```

This router may choose, sequence, and hand off to focused workflow skills. It must not quietly do their work from memory. If a focused skill owns the next action, load it before planning, dispatching, reviewing, documenting, or claiming completion.

## Quick Decision

Use this router when the current development task needs a workflow owner or sequence, especially across context recovery, discussion, doc drift, lane dispatch, returned lane review, multi-agent discussion, or multi-agent artifact review.

Do not use it when the leaf owner is already obvious:

- ordinary coding or debugging -> use the implementation workflow directly
- clear project-state restoration -> [project-context](../project-context/SKILL.md)
- clear discussion recap, boundary governance, drift control, or decision state capture -> [discussion-workflows](../discussion-workflows/SKILL.md)
- clear source-backed doc governance, code/docs synchronization, or doc-driven open-question ledger work -> [doc-driven-workflows](../doc-driven-workflows/SKILL.md)
- clear returned lane review -> [integration-review](../integration-review/SKILL.md)
- clear independent lane dispatch -> [agent-lanes](../agent-lanes/SKILL.md)
- explicit same-topic multi-agent debate -> [agent-debate](../agent-debate/SKILL.md)
- explicit multi-agent review of one artifact -> [agent-review](../agent-review/SKILL.md)
- explicit Spec/Eval delivery, external-agent policy, or repeated review-repair lifecycle -> [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md)

## Critical Overrides

Follow `references/critical-overrides.md` for global rules about source truth, claims, documentation hygiene, autonomy, and user escalation. When a user delegates a project goal, also follow `references/autonomous-progression.md`. When subagents, model-diverse review, or external agents may be used, follow `references/agent-model-profile.md`.

## Router Only

Use this skill to decide the workflow sequence, then load the focused skill that owns the current step.

Do not implement code, rewrite docs, dispatch agents, or merge lanes from this router alone. Route and coordinate.

If a leaf skill trigger is already obvious from the user request, use that focused skill directly. Use this router when the owner workflow is uncertain, when multiple workflow docs may be involved, or when the task needs a sequence across context, discussion, docs, lanes, integration, or heavier review.

## Autonomous Progression

When the user gives a broad development objective, continue into the next focused skill instead of stopping at routing advice. The main thread owns the loop: restore context, pressure-test only when useful, dispatch safe lanes, review returned work, request repairs, verify, and continue with the next safe batch.

Ask the user only for true user decisions defined in `references/autonomous-progression.md`. Do not ask the user to choose ordinary internal sequencing, copy prompts between agents, or approve every safe batch.

## Default Development Lifecycle

For non-trivial development work, use this lifecycle as the control spine:

```text
1. Discuss requirements
2. Lock Spec
3. Lock Eval
4. Write Plan
5. Execute Plan
6. Review + Test
7. Repair + Recheck
8. Close / Handoff
```

Start by identifying the current phase and the next missing gate. Do not jump
from requirements discussion to implementation unless the Spec, Eval, and Plan
are obvious enough for the task size.

### Phase Gates

Use the lightest artifact that makes the next phase safe:

| Phase | Exit gate |
| --- | --- |
| Discuss requirements | `confirmed / draft / open` are separated; user-visible goal, non-goals, product friction, and constraints are not mixed. |
| Lock Spec | Goal, scope, non-goals, user-visible behavior, constraints, and affected surfaces are explicit enough to review or implement. |
| Lock Eval | Acceptance checks, test points, manual checks, failure conditions, and evidence expectations define how to prove correctness. |
| Write Plan | Execution order, touched files/modules, risks, verification commands, and rollback or stop conditions are known. |
| Execute Plan | Changes are made within the plan boundary, with evidence for what changed and what was not changed. |
| Review + Test | Implementation is checked against Spec and Eval; tests or manual verification produce inspectable evidence. |
| Repair + Recheck | Accepted blocker/major findings are fixed and rechecked, rejected with evidence, deferred as non-blocking, or escalated as blocked. |
| Close / Handoff | Final state, evidence, residual risks, docs impact, and next owner are clear. |

### Scale Rules

Do not make small work heavy:

```text
small task:
  one-line requirement -> combined Spec/Eval -> short plan -> implement -> verify

medium task:
  separate Spec, Eval, and Plan in reasoning or compact notes; review only risky gates

large task:
  explicit Spec, Eval, and Plan artifacts; consider agent-review for each gate

high-risk task:
  review Spec, Eval, Plan, implementation, and final result; use repair -> recheck
```

### Review And Documentation Gates

Review can happen before the end. Use [agent-review](../agent-review/SKILL.md)
for high-impact Spec, Eval, Plan, implementation, or final-result checks when a
single framing may miss issues.

Use [doc-driven-workflows](../doc-driven-workflows/SKILL.md) when a locked Spec,
accepted implementation, or review finding would make source-of-truth docs
mislead a future human or agent. Do not run doc governance only because docs
exist.

## Default Sequence

For complex project work, prefer this sequence:

```text
project-context
  -> discussion-workflows when boundaries or decisions are unclear
  -> agent-grilling when goals, branches, execution paths, or user-style questions need agent-mediated brainstorming
  -> lifecycle gate: Spec -> Eval -> Plan before non-trivial execution
  -> doc-driven-workflows when its invocation gate permits it and source-of-truth docs may drift
  -> agent-debate when same-topic debate is explicitly requested or selected by an active workflow
  -> agent-review when same-artifact review is explicitly requested or selected by an active workflow
  -> agent-lanes when work can be split into lanes
  -> integration-review when lanes return
  -> repair -> recheck until accepted blocker/major findings are resolved or explicitly deferred
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

### `agent-lanes`

Load [agent-lanes](../agent-lanes/SKILL.md) when the user wants batched lane work, subagent dispatch, or handoff prompts for multiple independent slices.

Use it only after project context has been restored and lane ownership boundaries are clear enough to avoid collisions.

`agent-lanes` is an orchestration shape, not an implementation method. Let
implementation skills trigger from each lane's actual task instead of binding
them here.

### `integration-review`

Load [integration-review](../integration-review/SKILL.md) when worker lanes return, review branches need normalization, evidence needs checking, or the user asks for the next safe batch.

Use it before selecting, dispatching, or reporting the next safe batch.

### `agent-debate`

Load [agent-debate](../agent-debate/SKILL.md) only when the
user explicitly invokes it, or an already-loaded workflow has selected same-topic
multi-agent debate for requirements, product friction, simplicity, necessity,
usability, user flow, tradeoffs, or decision clarity.

### `agent-review`

Load [agent-review](../agent-review/SKILL.md) only when the user
explicitly invokes it, or an already-loaded workflow has selected multi-agent
review of one Spec, Eval, plan, design, PR, diff, implementation, evidence
package, or final result.

### `multi-agent-orchestration`

Load [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md) only after explicit activation or when an existing active multi-agent workflow already owns the task and must choose across discussion, review, lanes, integration, external-agent policy, Spec/Eval, or repeated repair.

Do not use it merely because a task is large if `agent-lanes` plus normal review is enough.

## Routing Patterns

```text
"Where are we / continue from handoff"
  -> project-context -> discussion-workflows if decisions need recap

"Split work into subagents / give the first batch / dispatch directly when possible"
  -> project-context -> discussion-workflows if boundaries are unclear -> agent-lanes

"These lanes came back"
  -> project-context -> integration-review -> doc-driven-workflows if docs/coordination need maintenance

"Docs are becoming a mess / sync docs with code"
  -> project-context -> doc-driven-workflows

"Have agents debate the architecture / grill the plan"
  -> project-context -> agent-grilling

"Run full Spec/Eval with repeated agent review-repair"
  -> project-context -> agent-grilling if target is unclear -> multi-agent-orchestration after explicit activation

"Continue a non-trivial development goal"
  -> project-context -> identify lifecycle phase -> fill next missing Spec/Eval/Plan/Review/Test/Repair gate -> route to focused skill

"Let multiple agents debate whether this flow is too heavy and easy to use"
  -> project-context if persisted state matters -> agent-debate after explicit activation

"Have multiple agents review this Spec/Eval/plan"
  -> project-context if persisted state matters -> agent-review after explicit activation
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

## Red Flags

- Implementing, dispatching, reviewing, or editing docs from this router alone.
- Asking the user to choose internal workflow sequencing when the next owner is source-evident.
- Loading `multi-agent-orchestration` only because the task feels large.
- Loading explicit-entry multi-agent skills from ordinary mentions of agents, discussion, or review when no active workflow routed there.
- Treating a routing recommendation as a completed workflow step.
- Skipping `project-context` when the request depends on handoff, lanes, discussion state, or source-of-truth docs.
