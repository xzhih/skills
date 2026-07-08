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
headings.

## Use For

- task decomposition and dependency ordering
- file/module/interface ownership
- verification commands and evidence expectations
- safe lane candidates and delayed lanes

Use [agent-eval](../agent-eval/SKILL.md) when acceptance evidence is missing.
Use [agent-lanes](../agent-lanes/SKILL.md) only after the plan is accepted and
the next action is parallel execution.

## Process

```text
read locked Spec and Eval
  -> restore project structure and verification context
  -> map files, modules, interfaces, and collision risks
  -> write checkbox tasks around testable deliverables
  -> attach coverage trace, verification, evidence, and stop condition
  -> mark safe lane candidates and intentionally delayed work
  -> review only when risk warrants
  -> hand off to execution or lanes only when ready
```

Task shape:

```text
- [ ] <deliverable> - trace: <need/check>; verify: <command/evidence>; stop: <condition>
```

## Execution Readiness Gate

Move to execution only when:

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
