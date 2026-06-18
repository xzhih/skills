# Workflow Integration

Use this reference when another workflow, skill, plugin, host feature, or project convention may already own the task spec, plan, roadmap, goal, or status.

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

## Ownership Types

Task-level state belongs to the active parent workflow when one exists:

```text
spec
roadmap
plan
goal contract
task status
user-facing decisions
final handoff
```

This skill owns orchestration-internal state:

```text
capability cache
task packets
raw agent outputs
review contracts
findings ledger
repair and recheck tracking
status checkpoints
evidence collected for orchestration
```

If no parent workflow owns task-level state, this skill may own both task-level artifacts and orchestration-internal state under `docs/multi-agent-orchestration/`.

## Source Map

When a parent workflow exists, keep a compact source map in `docs/multi-agent-orchestration/index.md` instead of copying external documents:

```text
active_parent_workflow:
parent_spec:
parent_roadmap:
parent_plan:
parent_goal:
parent_status:
orchestration_goal:
active_findings_ledger:
latest_status_checkpoint:
latest_evidence:
last_promoted_update:
```

Use only fields that apply. The source map should answer where to read and where to write, not duplicate content.

## Private Orchestration State

Keep orchestration details local to this skill so external systems are not polluted by internal work:

- raw subagent or external-agent output
- reviewer scratch notes
- rejected hypotheses
- intermediate task packets
- capability discovery evidence
- detailed findings status and recheck tracking
- internal status checkpoints

External task documents should not become a transcript of agent coordination.

## Promoted Updates

Write to the parent workflow only through accepted, useful updates:

- accepted blocker or major findings that change task state
- goal, scope, boundary, or requirement corrections
- plan changes that affect execution
- verification or deployment evidence needed by the parent workflow
- final handoff conclusions

Do not promote raw agent output, unaccepted findings, private reviewer disagreement, or low-value intermediate notes.

## Switching Parent Workflows

If the user later selects a different parent workflow:

1. Record the new active parent workflow in the source map.
2. Stop maintaining old task-level artifacts except as historical inputs.
3. Link old artifacts as prior context when useful.
4. Keep orchestration-internal ledgers, checkpoints, and evidence under this skill.
5. Promote future accepted updates only to the new parent workflow.

Do not maintain two competing specs, plans, roadmaps, or goal contracts for the same active task.

## Conflict Rules

If parent workflow documents and orchestration state disagree:

- Parent workflow wins for user-facing task definition, unless evidence shows it is wrong.
- Findings ledger wins for unresolved accepted blocker or major review state.
- Evidence files win for what has actually been verified.
- Source map wins for where future updates should go.

When evidence shows the parent workflow is wrong, promote a correction request or update through the parent workflow instead of silently forking a local plan.
