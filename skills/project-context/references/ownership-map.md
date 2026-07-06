# Ownership Map

Use this reference to avoid documentation sprawl when a project has multiple workflow doc roots.

## Default Fact Owners

These are common defaults, not required project structure. Use project-specific guidance and declared equivalents first. If a project lacks one of these roots, keep the fact in the active handoff, in-chat context packet, or the nearest declared owner until the user asks to create durable docs.

Use project-specific guidance when it exists. Otherwise default to:

```text
Task/current-state summary:
  docs/CURRENT-HANDOFF.md or the project handoff equivalent.

Lane status, active/review/blocked/merged state, ownership, collisions:
  docs/WORKTREE-COORDINATION.md or the project coordination equivalent.

Confirmed/draft/open/overlap/blocked decisions:
  docs/discussion-workflows/ and its index.

Implementation boundaries and excluded surfaces:
  docs/discussion-workflows/boundaries/ unless a formal spec owns them.

Architecture facts, operation flows, call paths, durable source-backed docs:
  docs/doc-driven-workflows/ or the declared doc-driven root.

Product/behavior contracts and acceptance criteria:
  docs/spec/ or the declared spec root.

Verification evidence, compliance, hard-gate proof:
  docs/spec-compliance/, docs/*/evidence/, or the declared evidence root.

Heavy multi-agent Spec/Eval plans, findings, task queues, raw outputs:
  docs/multi-agent-orchestration/ when that workflow is active.

Raw worker or subagent output:
  lane handoff, agent output folder, or chat transcript. It is a claim, not source of truth.

Open questions:
  discussion open-question ledger, doc-driven open-question ledger, or the active workflow's question ledger.
```

## Moderator-Only Shared Docs

By default, only the moderator updates:

- current handoff docs
- lane coordination docs
- source maps and ownership maps
- final evidence status
- confirmed architecture/source-of-truth docs

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

## Write Target Check

Before writing project docs, answer:

```text
What fact is being written?
Which document owns this fact?
Is this confirmed, draft, open, or blocked?
What evidence supports it?
What existing doc should link here instead of duplicating it?
```
