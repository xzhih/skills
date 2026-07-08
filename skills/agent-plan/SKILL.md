---
name: agent-plan
description: "Use only when the user explicitly invokes $agent-plan, or when an active workflow routes here, to convert locked Spec and Eval into implementation tasks, coverage matrix, dependencies, files/interfaces, verification commands, evidence expectations, risks, stop conditions, and lane candidates before execution."
---

# Agent Plan

Turn locked Spec + Eval into executable work. Own Plan and lane candidates only:
do not execute the plan or dispatch lanes.

## Iron Law

```text
PLAN TASKS AROUND TESTABLE DELIVERABLES.
```

Each task needs a deliverable, owned surface, coverage trace, verification path,
expected evidence, and stop condition. Do not split merely by document section.

## Shared Rules

Apply:

- [mode-gate.md](../dev-flow/references/mode-gate.md)
- [coverage-trace.md](../dev-flow/references/coverage-trace.md)
- [task-checkboxes.md](../dev-flow/references/task-checkboxes.md)

Return only what execution, review, or lane dispatch needs. Do not print empty
headings. Do not confuse a short plan with a plan a worker can execute.

## Use For

- task decomposition and dependency ordering
- file/module/interface ownership
- verification commands and evidence expectations
- safe lane candidates and delayed lanes

Use [agent-eval](../agent-eval/SKILL.md) when acceptance evidence is missing.
Use [agent-lanes](../agent-lanes/SKILL.md) only after the plan is accepted, the
Plan Review Gate is closed, and the next action is parallel execution.

## Depth (detailed, not empty)

A Plan is a **concrete work order**: detailed enough for a fresh worker, not a
short restatement of the Spec and not a padded task list. Apply mode-gate
**Substance Rule**.

Minimum content (scale wording, not skip the slots):

```text
Ordered checkbox tasks, each with:
  concrete deliverable (not "implement feature")
  owned files/modules/interfaces (or explicit discovery task with stop)
  trace to Spec behavior and/or Eval check
  verify: command, test, or evidence path
  stop/blocker condition
Dependencies and shared/high-collision surfaces
What not to change
Lane candidates only when surfaces are disjoint (or delayed with reason)
Risks that change order, batching, or verification
```

Thin Plan red flags (block execution readiness):

```text
- tasks that only rename Spec sections ("do auth", "do UI")
- missing file/module ownership on implementation tasks
- verify: "test later" / "manual" with no named command or steps
- no coverage for an important Eval check without deferral
- one mega-task for multi-surface work that should be split
- placeholders: "handle edge cases", "add validation", "wire up"
- whole Plan is a handful of bullets for multi-behavior delivery
```

Self-check: **Could a fresh worker finish a task from the Plan line alone and
know when to stop?** If no, deepen.

## Process

```text
read locked Spec and Eval
  -> restore project structure and verification context
  -> map files, modules, interfaces, and collision risks
  -> write checkbox tasks around testable deliverables
  -> attach coverage trace, verification, evidence, and stop condition
  -> mark safe lane candidates and intentionally delayed work
  -> expand until anti-thin bar passes
  -> draft Plan ready for review
  -> mandatory agent-review of the whole Plan
  -> repair Plan from accepted blocker/major findings (or reject/defer with evidence)
  -> hand off to execution or lanes only when the review gate is closed
```

Task shape:

```text
- [ ] <deliverable> - trace: <need/check>; verify: <command/evidence>; stop: <condition>
```
## Plan Review Gate (mandatory)

Do not move to execution or lanes, claim Plan locked, or treat the Plan as
dispatch-ready until one [agent-review](../agent-review/SKILL.md) pass has
completed on the **whole** Plan artifact.

Review shape:

```text
Required: agent-review of the full Plan (not section-sharded Round 1).
Preferred when available and authorized:
  multi-agent / model-diverse reviewers on the same Plan.
Otherwise:
  one focused independent reviewer (or an independent review pass that is not
  the same drafting monologue without a distinct review step).
```

This gate is **not** automatically “many models.” `agent-review` supports one
focused reviewer **or** multiple agents; multi-model is preferred when distinct
approved models/participants are available, not a hard requirement when only
one reviewer path exists.

Moderator owns the Plan draft through review. Close the gate only when:

- the review packet named the Plan as the artifact
- accepted blocker/major findings are fixed in the Plan, rejected with evidence,
  or explicitly deferred with owner/risk
- no accepted blocker/major remains open without disposition
- sign-off or equivalent “ready for execution” outcome is recorded (inline is
  fine in Lightweight mode)

Skip only if the user explicitly waives Plan review for this artifact and the
waiver is recorded. Do not self-waive.

## Execution Readiness Gate

Move to execution only when:

- the Plan Review Gate is closed (or explicitly user-waived)
- Depth (anti-thin) bar is met—not only "has a task list"
- tasks are independently understandable and testable
- every non-deferred requirement/behavior/eval trace item is covered
- setup/dependency tasks explain why they lack direct coverage
- dependencies and shared surfaces are explicit
- verification and evidence requirements trace back to Eval
- file/module/interface ownership is specific enough for a fresh worker
- no placeholder tasks remain
- lane candidates have disjoint owned surfaces or are delayed
- blocker/major Plan review findings are resolved, rejected with evidence, or deferred

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/plans/<YYYY-MM-DD>-<slug>-plan.md`.
