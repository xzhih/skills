---
name: agent-plan
description: "Use only for explicit $agent-plan or workflow-routed conversion of locked Spec and Eval into traced implementation tasks, dependencies, verification, evidence, risks, and lane candidates before execution."
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
necessary-and-sufficient, concrete work order for the selected scope envelope;
omit fields that do not change execution, review, or lane dispatch.

Plan only implementation-eligible confirmed behavior and its Eval checks.
Draft/open candidates remain upstream governance references and cannot become
tasks, lane packets, or execution scope.

Apply this admission contract before review:

```text
rebase(old/pending): inspect controlling source -> still required | satisfied |
  obsolete | conditional | proposed
activate(conditional): current only when its condition is true; otherwise record
  boundary/owner, never task/check/lane/blocker
forward trace: confirmed need -> behavior -> Eval -> task -> evidence
reverse trace: task/lane/artifact/harness -> confirmed behavior/Eval |
  in-scope source gap | required delivery dependency
surface: source/locked artifact -> owned file/module/interface
no invented surface: a plausible filename/API/service is still invented; unknown ->
  bounded discovery or startability blocker; dependent work stays unstartable
verification: attach to its deliverable or final gate; standalone only when the
  evidence artifact is itself a confirmed deliverable
lane: disjoint ownership AND critical-path gain > coordination/integration cost
prune: remove/merge anything without reverse trace; protect required correctness,
  security, accessibility, compatibility, migration, data-safety, and ops evidence
```

The source snapshot detects drift after acceptance; it never replaces
planning-time rebase. Each admitted checkbox task must name a deliverable,
owned surface (or bounded discovery), trace, `verify -> expected`, and stop
condition. Also record dependencies/collisions, exclusions, earned lanes, and
risks that change order, batching, or verification.

After accepted review, append this to a persisted or handed-off Plan:

```text
Source revision: required commit or equivalent immutable ID
Planned at: optional timestamp
In-scope snapshot: clean, or staged/unstaged/untracked content hashes by path
Before execution: compare current revision/content; update and re-review if
  drift affects behavior, scope, compatibility, or verification
```

Snapshot implementation scope, not the Plan file. Unrelated out-of-scope changes
do not block.

Reject before review or execution:

```text
section-label/placeholder task | missing or invented surface/API | missing verify/stop
uncovered non-deferred Eval | multi-surface mega-task | needless task splitting
unrebased pending work | inactive/proposed work as current | untraced surplus
```

## Process

1. Read locked Spec/Eval and current controlling source; rebase old/pending
   claims. Use
   [project-context](../project-context/SKILL.md) to restore project structure,
   verification commands, and collision risks.
2. Build checkbox tasks around testable deliverables; apply the admission
   contract and record dependencies, shared surfaces, exclusions, and risks.
3. Route missing acceptance evidence to [agent-eval](../agent-eval/SKILL.md).
   Keep draft/open candidates upstream.
4. Prune, then mark only earned lanes; keep the rest serial.
5. Send the whole Plan to an independent
   [agent-review](../agent-review/SKILL.md), repair and recheck accepted
   blocker/major findings, then capture the source snapshot when needed.
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
sufficient; add reviewers only for risk, evidence, workflow, or user need. The
moderator owns the draft. Only the user may grant an artifact-scoped waiver.

Close review only after the packet names the Plan, accepted blocker/major
findings are repaired and rechecked or rejected with evidence, and sign-off is
recorded. A real decision/dependency blocker pauses the gate; deferral does not
close it. Move to execution only when:

```text
review closed/waived
admission contract passed; every non-deferred requirement/behavior/Eval covered
fresh worker can execute and stop every task without guessing
dependencies/collisions explicit; lanes earned or kept serial
accepted blocker/major findings resolved
persisted/handoff Plan has its post-acceptance source snapshot
```

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/plans/<YYYY-MM-DD>-<slug>-plan.md`.
