# Ownership Map

Use this reference to avoid documentation sprawl when a project has multiple workflow doc roots.

## Contents

- Default Fact Owners
- Moderator-Only Shared Docs
- Promotion Rule
- Archive Rule
- Write Target Check

## Default Fact Owners

These are common defaults, not required project structure. Use project-specific guidance and declared equivalents first. If a project lacks one of these roots, keep the fact in the active handoff, in-chat context packet, or the nearest declared owner until the user asks to create durable docs.

Use project-specific guidance when it exists. Otherwise default to:

```text
Task/current-state summary:
  docs/CURRENT-HANDOFF.md or the project handoff equivalent.

Lane status, active/review/blocked/merged state, ownership, collisions:
  docs/WORKTREE-COORDINATION.md or the project coordination equivalent.

Confirmed/draft/open/overlap/blocked discussion decisions:
  docs/discussion-workflows/ and its index.

Implementation boundaries and excluded surfaces:
  docs/discussion-workflows/boundaries/ unless a formal spec owns them.

Architecture facts, operation flows, call paths, durable source-backed docs:
  docs/doc-driven-workflows/ or the declared doc-driven root.

Requirements analysis before Spec:
  docs/dev-flow/requirements/ or a declared requirements artifact. Do not bury
  requirements in orchestration raw output.

Product/behavior contracts:
  docs/dev-flow/specs/, docs/spec/, or the declared spec root.

Acceptance criteria and evidence standards:
  docs/dev-flow/evals/, docs/spec-compliance/, docs/*/evidence/, or the
  declared Eval/evidence root.

Implementation plan, task decomposition, lane candidates:
  docs/dev-flow/plans/, active handoff, or declared plan/task root.

Verification evidence, compliance, hard-gate proof:
  docs/dev-flow/evidence/, docs/spec-compliance/, docs/*/evidence/, or the
  declared evidence root.

Lifecycle source map, active phase, and handoff:
  docs/dev-flow/index.md and docs/dev-flow/handoffs/ unless project guidance
  declares an equivalent.

Heavy multi-agent blackboards, findings, private task overlays, capability
profiles, external-agent session ledgers, raw outputs, and orchestration
evidence links:
  docs/agent-self-driving/ when that workflow is active.

Long-task automation state:
  dev-flow and its focused owner skills own user-facing lifecycle artifacts;
  agent-self-driving owns the automation controller state and source map.

Raw worker or subagent output:
  lane handoff, agent output folder, or chat transcript. It is a claim, not source of truth.

Open questions:
  discussion open-question ledger, doc-driven open-question ledger, or the active workflow's question ledger.

Archived or superseded facts:
  the archive/ folder under the same owner root that owned the active fact.
  Archived files are trace history, not active source of truth.
```

## Moderator-Only Shared Docs

By default, only the moderator updates:

- current handoff docs
- lane coordination docs
- source maps and ownership maps
- final evidence status
- confirmed architecture/source-of-truth docs
- doc-driven architecture, operation-flow, call-path, tech-stack, and
  source-backed open-question docs

Workers may propose doc deltas, write lane-owned evidence, or update explicitly assigned non-overlapping docs. They should not casually update shared coordination or handoff files.

## Promotion Rule

A discussion item, agent output, or worker handoff becomes confirmed source-of-truth only when the moderator promotes it with:

```text
claim:
evidence:
owner doc:
affected anchors:
status: confirmed | draft | open | blocked
```

Do not promote draft, open, overlap, or blocked content into confirmed docs.

## Archive Rule

Archive under the same owner that owned the active fact:

```text
docs/dev-flow/archive/              lifecycle artifacts
docs/discussion-workflows/archive/  discussion boundaries and records
docs/doc-driven-workflows/archive/  durable docs and resolved/superseded ledgers
docs/agent-self-driving/archive/    private orchestration state
```

Archived content must include status, reason, replacement/current owner, and
why it is not active truth. Normal context recovery skips archive unless an
active artifact links it, history is needed to explain a change, or the user
asks for provenance.

## Write Target Check

Before writing project docs, answer:

```text
What fact is being written?
Which document owns this fact?
Is this confirmed, draft, open, or blocked?
What evidence supports it?
What existing doc should link here instead of duplicating it?
```

If the fact is durable architecture, operation flow, call path, tech stack,
project operating model, or source-backed uncertainty, route the write through
`doc-driven-workflows`. If the fact is raw or intermediate agent output, keep it
private to the active orchestration or lane record and promote only normalized,
evidence-backed conclusions.
