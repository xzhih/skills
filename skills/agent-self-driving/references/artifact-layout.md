# Artifact Layout

Use this reference when the selected intensity requires durable state, continuity, auditability, or long-task handoff.

## Contents

- Default Layout
- Directory Meanings
- Parent Workflow Source Map
- State Update Rules
- Resume Order
- When To Persist
- Spec Contract Shape
- Eval Contract Shape
- Goal Contract Shape
- Evidence Closure Shape
- Status Checkpoint Shape
- File Naming
- Assumptions

## Default Layout

Runtime artifacts belong to the target project:

```text
docs/agent-self-driving/
  index.md
  blackboards/
  capabilities/
  discussions/
  agent-outputs/
  reviews/
  evidence/
  archive/
```

Do not store task runtime facts inside the installed skill or global memory unless explicitly asked.

This is an orchestration-state layout, not the default home for project truth.
When `dev-flow` and focused owner skills are active, Requirements, Spec, Eval,
Plan, lifecycle evidence, and handoffs belong under `docs/dev-flow/` or a
project-declared equivalent and are only linked from `index.md`. Create
`specs/`, `evals/`, `plans/`, `tasks/`, `goals/`, or `roadmaps/` here only as a
thin overlay, or when no parent workflow owns those artifacts.

If the target project is unclear, first resolve it from the current working directory, source materials, explicit user request, or existing repo context. Ask the user only when multiple plausible targets remain or choosing one would create external side effects or write into the wrong project.

## Directory Meanings

```text
index.md
  Current task index, source map, links to active parent workflow, Spec, Eval,
  goal, plan, task queue, blackboard, review, capability, and evidence files.

blackboards/
  Moderator-owned round state for multi-agent judgment: topic, artifact under
  review, claims, evidence, conflicts, open questions, decisions, and sign-offs.

capabilities/
  User-approved agent/model profile, selected participant checks, and external
  session mappings for this target project.

discussions/
  Execution preflight, imported formulation snapshots from `agent-grilling`,
  rationale, assumptions, conflicts, and decisions. Use blackboards/ for
  active adversarial round state when it needs persistence.

agent-outputs/
  Raw or summarized agent round outputs, external-agent session mappings, and
  per-agent handoff notes when auditability, rebuttal, or resume needs them.

reviews/
  Review contracts, findings ledgers, normalized reviewer findings, repair tracking, and recheck evidence.

evidence/
  Commands, screenshots, logs, deployment URLs, test results, source citations, and final proof.

archive/
  Completed, superseded, abandoned, or wrong-assumption orchestration state
  preserved for traceability only.
```

## Resume Order

When resuming a long task, restore state from artifacts before continuing:

```text
1. docs/agent-self-driving/index.md
2. active parent workflow source map, if present
3. `docs/dev-flow/index.md` and its active Requirements, Spec, Eval, Plan,
   evidence, and handoff links when present
4. focused owner artifacts from agent-requirements-analysis, agent-spec,
   agent-eval, agent-plan, agent-lanes, or integration-review when active
5. orchestration-owned Spec/Eval/goal/plan/task overlays only when this skill
   truly owns them
6. active task queue or lane coordination state when broad execution has started
7. active blackboard under blackboards/ when round state exists
8. findings ledger and review contract under reviews/
9. relevant raw agent output under agent-outputs/ when needed for rebuttal or handoff
10. latest evidence under evidence/
11. user-approved agent profile and external session ledger when assigning agents
```

Do not read `archive/` during normal resume. Read it only when the active index
links to it, a contradiction requires history, or the user asks for provenance.

Then decide exactly one state:

```text
complete:
  Evidence satisfies the goal contract and no blocker/major remains unresolved.

paused:
  A pause condition blocks safe progress.

in_progress:
  A next bounded action remains and no pause condition blocks it.
```

Do not resume from chat summary alone when durable artifacts exist.

If the restored state is `in_progress`, continue to the next bounded action in the same run. Do not convert the checkpoint into a user-facing "next step suggestion" unless a pause condition blocks safe progress.

## Parent Workflow Source Map

If another workflow owns the task-level source of truth, do not copy its Spec, Eval, plan, task queue, roadmap, goal, or status into this skill's artifacts. Link to it from `index.md` and keep this skill's internal state separate.

Use the smallest useful source map:

```text
active_parent_workflow:
parent_requirements:
parent_spec:
parent_eval:
parent_roadmap:
parent_plan:
parent_task_queue:
parent_goal:
parent_status:
active_requirements:
active_spec:
active_eval:
active_plan:
orchestration_goal:
active_blackboard:
active_task_queue:
active_findings_ledger:
active_agent_outputs:
latest_status_checkpoint:
latest_evidence:
last_promoted_update:
```

If no parent workflow owns task state, this skill may own the task-level artifacts under its default layout.

When a parent workflow exists, `specs/`, `evals/`, `goals/`, `roadmaps/`, `plans/`, and `tasks/` should usually contain only a thin orchestration overlay or be omitted. Do not maintain duplicate active task documents.

When durable architecture, operation-flow, call-path, tech-stack, or
source-backed open-question docs are needed, do not create them here. Route to
`doc-driven-workflows` and link the resulting source-of-truth docs from
`index.md` or evidence files.

## State Update Rules

Update only the artifacts that own changed state. Do not churn every file on every step.

Required updates:

```text
after execution preflight:
  Record assumptions, active goal source, Spec/Eval state, and first major nodes
  in `discussions/` or the active parent workflow. Update `index.md` links when
  this skill owns or maps task state.

after blackboard rounds:
  Update the active blackboard with normalized claims, evidence, conflicts,
  open questions, decisions, and sign-offs. Do not paste raw reviewer
  transcripts unless auditability requires it.

after external-agent rounds:
  Record or refresh the external session ledger before using resume/continue
  flags again. Store raw outputs under `agent-outputs/` only when needed for
  auditability, rebuttal, handoff, or recovery; promote only normalized items
  into blackboards, reviews, plans, tasks, or evidence.

after Spec, Eval, goal, scope, roadmap, plan, parent workflow, or boundary changes:
  Update the owning artifact and the `index.md` source map in the same bounded
  action.

after each major node:
  Add useful evidence, update plan/checkpoint state, and refresh
  `latest_evidence` / `latest_status_checkpoint` links when durable state exists.

after task queue creation or task status changes:
  Update the active task queue with current status, ownership, evidence,
  linked findings, repair/recheck state, structural drift signals, review gate
  state, and next action. Do this before claiming a task is done.

after finding status changes:
  Update the findings ledger, resolution, and recheck evidence before treating
  blocker or major findings as closed.

after selected participant or authorization changes:
  Update the user-approved agent profile before assigning packets that depend on
  the new participant state.

before pause, complete, or handoff:
  Verify `index.md` points to the current parent workflow, Spec/Eval sources,
  goal, plan, active task queue, blackboard when active, external session
  ledger when active, findings ledger, latest evidence, and latest checkpoint.
```

## Archive Rules

Archive orchestration state when it is no longer active but should remain
traceable:

- completed self-driving runs
- abandoned or superseded blackboards
- raw agent outputs for a replaced review round
- old capability snapshots or external-agent ledgers
- evidence packages that no longer close the current Eval
- wrong-assumption task overlays

Move files under `archive/` using the same subfolder names when useful. Add:

```text
Archived: <YYYY-MM-DD>
Status: superseded | abandoned | obsolete | wrong-assumption | completed-history
Reason:
Replaced by:
Evidence:
Do not use as active truth because:
```

Update `index.md` so active fields point only to current state. Archived state
may be linked from an `Archived` section for provenance.

If host goal/task mode is active, keep host status and document status aligned at each checkpoint. If they disagree, evidence files win for what has actually been verified; repair the source map or host status before continuing.

## When To Persist

Persist artifacts when:

- Level 3 or Level 4 is selected
- multiple agents, rounds, or repairs need state tracking
- external-agent sessions or raw outputs must survive later rounds
- a blackboard discussion has multiple rounds or affects Spec, Eval, Plan, final quality, or handoff
- the task is long enough that conversation context may be lost
- findings need status, resolution, and recheck evidence
- deployment, publication, account, data, or external side effects require auditability
- the user asks for documentation or handoff

Avoid persistence when:

- the task is Level 0
- Level 1 has no real finding to track
- a schema exists but no state needs preserving
- the artifact would only restate obvious conversation state

For Level 4, "full staged artifacts" means complete traceability, not maximum length. A small website or document can use compact discussion, roadmap, plan, review, and evidence files when that is enough to preserve decisions and proof.

## Spec Contract Shape

Use this only when this skill truly owns target definition. Otherwise route to
`agent-spec` and link the owner artifact from `index.md`. The smallest shape
that makes the target reviewable is:

```text
Outcome:
Users / audience:
In scope:
Out of scope:
Constraints:
Interfaces / affected areas:
User-decided tradeoffs:
Open questions or default assumptions:
```

Spec is not complete when it only restates the user's words. It should make wrong-target work detectable before planning or implementation.

## Eval Contract Shape

Use this only when this skill truly owns Eval. Otherwise route to `agent-eval`
and link the owner artifact from `index.md`. Eval defines both completion and
quality:

```text
Completion criteria:
Quality criteria:
Evidence required:
Verification commands or artifacts:
Review gates:
Defect severity meanings:
Pass / fail decision rule:
```

Completion criteria answer "is it done?" Quality criteria answer "is it good enough?" Evidence required states what proof will close each criterion.

## Goal Contract Shape

Use this only when execution continuity needs a goal contract and no parent
workflow or host goal mode owns one. Use the smallest sufficient form:

```text
GOAL:
Spec:
Eval:
Verification:
Constraints:
Boundaries:
Default assumptions:
Iteration policy:
Stop when:
Pause if:
```

Create the goal contract after Spec, Eval, and execution preflight are clear enough. Do not use it as a container for open-ended product discovery.

If a default assumption lets execution proceed safely, record it in the goal contract or linked discussion with what would invalidate it. Do not ask the user to confirm ordinary assumptions that can be checked by source materials, runtime evidence, agents, or reversible implementation.

## Evidence Closure Shape

Use this shape when claiming a task, stage, or final result is done:

```text
Claim:
Criteria closed:
Evidence:
Verification run:
Reviewer / recheck status:
Remaining risks or deferred items:
Decision: pass | fail | paused
```

Evidence must be inspectable or reproducible by the moderator: commands, logs, diffs, screenshots, rendered artifacts, URLs, citations, or observed behavior. Agent reports may reference evidence, but they do not replace it.

## Status Checkpoint Shape

Record a compact checkpoint whenever a long task pauses, completes, hands off, or would otherwise be summarized while work remains:

```text
Status:
Active goal:
Active task queue:
Last completed action:
Latest evidence:
Open blocker/major findings:
Next bounded action:
Continue / pause / complete because:
Updated:
```

If `Status` is `in_progress`, the main agent should continue to the next bounded action instead of giving a final summary, unless a pause condition applies.

For user-facing handoffs, include `Next bounded action` only when pausing, handing off, or recording durable state. During active execution, use it as an internal bridge to the next tool call or agent assignment.

## File Naming

Use stable, dated, descriptive names:

```text
specs/<YYYY-MM-DD>-<slug>-spec.md
evals/<YYYY-MM-DD>-<slug>-eval.md
goals/<YYYY-MM-DD>-<slug>-goal.md
discussions/<YYYY-MM-DD>-<slug>-discussion.md
roadmaps/<YYYY-MM-DD>-<slug>-roadmap.md
plans/<YYYY-MM-DD>-<slug>-plan.md
tasks/<YYYY-MM-DD>-<slug>-queue.md
reviews/<YYYY-MM-DD>-<slug>-review-contract.md
reviews/<YYYY-MM-DD>-<slug>-findings.md
evidence/<YYYY-MM-DD>-<slug>-evidence.md
blackboards/<YYYY-MM-DD>-<slug>-blackboard.md
```

These names are valid only for orchestration-owned artifacts or thin overlays.
Do not create duplicate Spec/Eval/Plan/task documents here when `agent-spec`,
`agent-eval`, `agent-plan`, `agent-lanes`, a project handoff, or
`doc-driven-workflows` owns the corresponding fact.

Use one findings ledger per goal or major review boundary. Link to it from goal, plan, and evidence docs instead of duplicating finding state.

Raw reviewer transcripts should not be copied into findings ledgers or evidence files by default. If raw output must be retained for auditability, place it in a clearly marked private raw subfolder and link only normalized findings from the ledger.

## Assumptions

If proceeding by assumption, record:

```text
assumption:
why it is safe enough:
how to verify or revise it:
what would invalidate it:
```

If later evidence contradicts an assumption, pause, repair, route to `agent-grilling`, or revise Spec/Eval/Plan depending on severity.
