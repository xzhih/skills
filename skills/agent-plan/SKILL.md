---
name: agent-plan
description: "Use only when the user explicitly invokes $agent-plan, or when an active workflow routes here, to convert locked Spec and Eval into T-* implementation tasks, coverage matrix, dependencies, files/interfaces, verification commands, evidence expectations, risks, stop conditions, and lane candidates before execution."
---

# Agent Plan

Turn Spec + Eval into an executable plan. This skill owns the plan artifact and
lane candidate design; it does not execute the plan or dispatch lanes by itself.

## Iron Law

```text
PLAN TASKS AROUND TESTABLE DELIVERABLES.
```

Each task should have a clear deliverable, owned surface, verification path, and
evidence expectation. Do not split work merely by document section.

## Coverage Chain

Plans must preserve the lifecycle trace:

```text
Requirement ID -> Behavior ID -> Eval ID -> Task ID -> Evidence
```

Use task IDs:

```text
T-001, T-002, ...
```

Each task lists the requirement IDs, behavior IDs, and Eval IDs it closes. A
task without coverage is allowed only for explicit setup, tooling, migration, or
cleanup that another covered task depends on. A requirement, behavior, or Eval
item with no task is a plan blocker unless explicitly deferred.

## Task Detail Standard

For medium, large, high-risk, multi-agent, or lane-dispatched work, each task
must include:

```text
Task ID:
Goal:
Coverage IDs:
Files / modules:
Interfaces consumed:
Interfaces produced:
Implementation notes:
Verification commands:
Expected evidence:
Stop/blocker conditions:
```

Use exact file paths and commands when source context is available. If exact
paths are unknowable before implementation, name the discovery step and the
evidence required before coding. Do not write placeholders such as TBD, TODO,
"add validation", "handle edge cases", or "write tests" without concrete checks.

## Use For

- implementation plans after Spec and Eval are ready
- task decomposition and dependency ordering
- identifying safe parallel lane candidates
- defining verification commands and evidence expectations for workers
- preparing execution handoff for direct implementation or `agent-lanes`

Use [agent-eval](../agent-eval/SKILL.md) when acceptance evidence is missing.
Use [agent-lanes](../agent-lanes/SKILL.md) when the accepted plan has safe
parallel lane candidates and execution should begin.

## Internal Flows

- Use [project-context](../project-context/SKILL.md) to inspect code structure,
  conventions, package manager, tests, and high-collision surfaces.
- Use [agent-debate](../agent-debate/SKILL.md) when decomposition, sequencing,
  lane safety, or complexity placement is contested.
- Use [agent-review](../agent-review/SKILL.md) for high-impact Plan review before
  execution.
- Use [agent-lanes](../agent-lanes/SKILL.md) only after the plan is accepted and
  the next action is parallel execution.
- Use [doc-driven-workflows](../doc-driven-workflows/SKILL.md) when the plan will
  alter source-of-truth docs.

## Persistence Boundary

This skill owns the Plan artifact and lane candidates for the active workflow.
Do not create a parallel task/plan doc root when a parent workflow, project plan
root, lane coordination file, or source map already owns it. If persistence is
needed, update the declared owner. By default, use
`docs/dev-flow/plans/<YYYY-MM-DD>-<slug>-plan.md` and update
`docs/dev-flow/index.md`.

Follow [artifact-layout.md](../dev-flow/references/artifact-layout.md) for the
lifecycle artifact boundary and durable doc-truth ownership.

## Workflow

```text
read locked Spec and Eval
  -> restore project structure and verification context
  -> map implementation surfaces
  -> decompose into testable tasks
  -> assign task IDs and map each task to Requirement/Behavior/Eval IDs
  -> identify dependencies and collision risks
  -> self-review for missing coverage, placeholders, vague tasks, and interface mismatch
  -> mark lane candidates and delayed lanes
  -> review plan when risk warrants it
  -> hand off to execution or agent-lanes
```

## Output Contract

```text
Plan:
Source Spec:
Source Eval:
Execution strategy:
Coverage matrix:
Tasks:
Dependencies:
Touched files / modules:
Interfaces:
Verification commands:
Evidence required:
Lane candidates:
Lanes intentionally delayed:
Collision risks:
Docs impact:
Stop conditions:
Plan self-review:
Review status:
Execution readiness: ready | not_ready
Next owner:
```

## Execution Readiness Gate

Move to execution only when:

- tasks are independently understandable and testable
- every non-deferred Requirement/Behavior/Eval ID is covered by at least one
  task
- every task has coverage IDs or an explicit setup/dependency rationale
- dependencies and shared surfaces are explicit
- verification and evidence requirements trace back to Eval
- file/module ownership, interfaces, verification commands, and expected
  evidence are specific enough for a worker with no surrounding context
- no placeholders or vague implementation instructions remain
- lane candidates have disjoint owned surfaces, or are intentionally delayed
- blocker/major Plan review findings are resolved, rejected with evidence, or
  deferred as non-blocking
