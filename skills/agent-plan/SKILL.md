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

## Contract

Apply [mode-gate.md](../dev-flow/references/mode-gate.md),
[coverage-trace.md](../dev-flow/references/coverage-trace.md), and
[task-checkboxes.md](../dev-flow/references/task-checkboxes.md). Produce a
complete, concrete work order at the selected weight; omit fields that do not
change execution, review, or lane dispatch.

Plan only implementation-eligible confirmed behavior and its Eval checks.
Draft/open candidates remain upstream governance references and cannot become
tasks, lane packets, or execution scope.

Include every applicable obligation:

```text
Ordered checkbox tasks, each with:
  concrete deliverable
  owned files/modules/interfaces, or a bounded discovery task
  trace to Spec behavior and/or Eval check
  verify: command, test, or evidence path -> expected result
  stop/blocker condition
Dependencies and shared/high-collision surfaces
What not to change
Lane candidates only when surfaces are disjoint (or delayed with reason)
Risks that change order, batching, or verification
```

After the whole-Plan review is accepted, and before a persisted or handed-off
Plan moves to execution, append:

```text
Source revision: required commit or equivalent immutable ID
Planned at: optional timestamp
In-scope snapshot: clean, or staged/unstaged/untracked content hashes by path
Before execution: compare the current source revision and content with this snapshot;
  update and re-review the Plan if a difference affects behavior, scope,
  compatibility, or verification
```

Capture this after acceptance. Snapshot the implementation scope, not the Plan
file itself. Unrelated out-of-scope changes do not block.

Block review or execution when the Plan contains:

```text
tasks that only rename Spec sections, such as "do auth" or "do UI"
missing owned surfaces
"test later" or "manual" without a command, steps, and expected result
no task for an important Eval check without explicit deferral
one multi-surface mega-task where ownership or verification should split
placeholders such as "handle edge cases", "add validation", or "wire up"
```

Before review, ask whether a fresh worker can execute each task and know when
to stop. Add only the missing ownership, trace, verification, or boundary.

## Process

1. Read the locked Spec and Eval. Use
   [project-context](../project-context/SKILL.md) to restore project structure,
   verification commands, and collision risks.
2. Write checkbox tasks around testable deliverables and attach owned surfaces,
   trace, verification, evidence, dependencies, and stop conditions.
3. Route missing acceptance evidence to [agent-eval](../agent-eval/SKILL.md).
   Keep draft/open candidates upstream.
4. Mark only disjoint work as a safe lane candidate; delay shared surfaces.
5. Send the whole reviewable Plan to an independent
   [agent-review](../agent-review/SKILL.md), repair and recheck accepted
   blocker/major findings, then capture the accepted source snapshot when
   persistence or handoff requires it.
6. Hand accepted serial work to execution, or approved parallel work to
   [agent-lanes](../agent-lanes/SKILL.md).

Task shape:

```text
- [ ] <deliverable> - trace: <need/check>; verify: <command/evidence> -> <expected>; stop: <condition>
```

Execution may update task checkboxes with evidence. It must not rewrite the
accepted scope, tasks, or source snapshot. A source change that invalidates
behavior, scope, compatibility, or verification returns the Plan for update and
re-review.

## Review And Execution Gate

Require one independent whole-Plan review before claiming the Plan locked or
moving to execution/lanes. In Lightweight mode, one fresh inline reviewer is
sufficient; add reviewers only when risk, evidence, workflow, or the user
requires them. The moderator owns the draft through review. Close the gate when:

- the review packet named the Plan as the artifact
- accepted blocker/major findings are fixed and rechecked, or rejected with evidence
- a true decision/dependency blocker keeps the gate paused, not deferred closed
- sign-off or an equivalent ready-for-execution outcome is recorded

Only the user may waive review for this artifact; record the waiver, and retain
accepted findings and the readiness requirements below. Move to execution only
when:

- the review gate is closed or explicitly waived
- tasks are independently understandable and testable
- every non-deferred requirement/behavior/eval trace item is covered
- no draft/open candidate appears in tasks, lane candidates, or execution scope
- setup/dependency tasks explain why they lack direct coverage
- dependencies and shared surfaces are explicit
- verification and evidence requirements trace back to Eval
- file/module/interface ownership is specific enough for a fresh worker
- no placeholder tasks remain
- lane candidates have disjoint owned surfaces or are delayed
- accepted blocker/major findings are fixed and rechecked, or rejected with evidence
- a persisted or handed-off Plan has its post-acceptance source snapshot

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/plans/<YYYY-MM-DD>-<slug>-plan.md`.
