# Workflow Integration

Use this reference when another workflow, skill, plugin, host feature, or project convention may already own the task Spec, Eval, plan, roadmap, goal, task queue, or status.

## Contents

- Core Rule
- Ownership Types
- Source Map
- Private Orchestration State
- Promoted Updates
- Switching Parent Workflows
- Conflict Rules

## Core Rule

Maintain one active parent workflow for task-level source of truth.

```text
single active parent workflow
private orchestration state
promoted updates only
```

Do not hard-code particular workflow names or ecosystems. Treat any external workflow that owns task state the same way, whether it comes from another skill, plugin, host runtime, repository convention, or user-selected process.

When this skill is explicitly used as a long-task controller for a new project
or new requirement, the default parent workflow is `dev-flow` and its focused
owner skills:

```text
requirements -> agent-requirements-analysis
Spec -> agent-spec
Eval -> agent-eval
Plan -> agent-plan
parallel execution -> agent-lanes
returned-lane review -> integration-review
durable project source-of-truth docs -> doc-driven-workflows
```

`agent-self-driving` owns the automation loop, private blackboards,
agent-output ledgers, review convergence state, capability/session state, and
evidence links. It does not become a second source of truth for project
architecture, operation flows, call paths, product requirements, Spec, Eval, or
Plan when those owners are active.

## Ownership Types

Task-level state belongs to the active parent workflow when one exists:

```text
Spec
Eval
roadmap
plan
task queue
goal contract
task status
user-facing decisions
final handoff
```

This skill owns orchestration-internal state:

```text
user-approved agent profile
task packets
raw agent outputs
blackboard round state
review contracts
findings ledger
repair and recheck tracking
execution queue overlay when the parent workflow does not own one
status checkpoints
evidence collected for orchestration
```

If no parent workflow owns task-level state, first prefer routing to `dev-flow`
or the relevant focused owner. This skill may own task-level artifacts under
`docs/agent-self-driving/` only when no suitable parent exists, the user
explicitly wants orchestration-owned durable state, or continuity would otherwise
be lost.

## Source Map

When a parent workflow exists, keep a compact source map in `docs/agent-self-driving/index.md` instead of copying external documents:

```text
active_parent_workflow:
parent_spec:
parent_eval:
parent_roadmap:
parent_plan:
parent_task_queue:
parent_goal:
parent_status:
active_spec:
active_eval:
orchestration_goal:
active_blackboard:
active_task_queue:
active_findings_ledger:
latest_status_checkpoint:
latest_evidence:
last_promoted_update:
```

Use only fields that apply. The source map should answer where to read and where to write, not duplicate content.

## Private Orchestration State

Keep orchestration details local to this skill so external systems are not polluted by internal work:

- raw subagent or external-agent output
- moderator blackboard round state
- reviewer scratch notes
- rejected hypotheses
- intermediate task packets
- user-approved agent/model profile evidence
- detailed findings status and recheck tracking
- internal status checkpoints

External task documents should not become a transcript of agent coordination.

## Promoted Updates

Write to the parent workflow only through accepted, useful updates:

- accepted blocker or major findings that change task state
- goal, scope, boundary, or requirement corrections
- Eval or acceptance-quality corrections
- plan changes that affect execution
- task queue status or ownership changes that affect execution or handoff
- verification or deployment evidence needed by the parent workflow
- final handoff conclusions
- durable architecture, operation-flow, call-path, or doc-driven uncertainty
  updates only through `doc-driven-workflows`

Do not promote raw agent output, unaccepted findings, private reviewer disagreement, or low-value intermediate notes.

## Switching Parent Workflows

If the user later selects a different parent workflow:

1. Record the new active parent workflow in the source map.
2. Stop maintaining old task-level artifacts except as historical inputs.
3. Link old artifacts as prior context when useful.
4. Keep orchestration-internal ledgers, checkpoints, and evidence under this skill.
5. Promote future accepted updates only to the new parent workflow.

Do not maintain two competing Specs, Evals, plans, task queues, roadmaps, or goal contracts for the same active task.

## Conflict Rules

If parent workflow documents and orchestration state disagree:

- Parent workflow wins for user-facing task definition, unless evidence shows it is wrong.
- Findings ledger wins for unresolved accepted blocker or major review state.
- Evidence files win for what has actually been verified.
- Active task queue wins for current work item state; latest checkpoint is only a summary unless supported by queue, findings, and evidence.
- Source map wins for where future updates should go.

When evidence shows the parent workflow is wrong, promote a correction request or update through the parent workflow instead of silently forking a local plan.
