# Coverage Trace

Use this reference when Requirements, Spec, Eval, Plan, lanes, review, or
handoff need to prove that work did not drop an important need.

## Core Idea

Coverage trace answers five questions:

```text
What need is being served?
What behavior satisfies it?
What check or evidence proves it?
What task owns the change?
What evidence closed it, blocked it, or deferred it?
```

The trace can be inline prose, bullets, a small table, or stable labels. Choose
the lightest form from `mode-gate.md`.

## Scaling

- Lightweight: one compact sentence or bullet is enough.
- Standard: use compact labels only where multiple items could be confused.
- Durable: keep the same labels across persisted artifacts.
- Multi-agent / Lane: include trace labels in worker packets and handoffs so
  the moderator can check coverage without relying on memory.

Do not introduce a prescribed numbering scheme. Labels are local handles for
clarity, not a workflow identity system.

## Promotion Rule

Do not move work to the next lifecycle gate when an important need, behavior,
check, or task has disappeared without explicit deferral, blocker, or scope
decision.

Do not mark a task, lane, or final result complete when a non-deferred trace
item has no owner, no evidence, or only a worker claim.
