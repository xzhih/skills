# Coverage Trace

Use this reference when Requirements, Spec, Eval, Plan, lanes, review, or
handoff need to prove that work did not drop an important need.

## Contract

Trace forward for omission and backward for surplus:

```text
forward: confirmed need -> behavior -> check -> task -> evidence
reverse: task/lane/artifact/harness -> confirmed behavior/check |
  in-scope source gap | dependency required to deliver them
```

For each element, answer `what does it serve?`, `who owns it?`, `what proves
it?`, and `what fails if removed?`. Setup/dependency tasks may lack visible
behavior, but must name the obligation they unblock. Remove or merge items with
no current reverse trace, or retain them only as proposed follow-up. Trace never
promotes draft, inactive conditional, or future candidates into current scope.

## Scaling

- Lightweight: one sentence or bullet.
- Standard: labels only where items could be confused.
- Durable: stable labels across persisted artifacts.
- Multi-agent / Lane: stable labels in packets and handoffs.

Use inline prose, bullets, a small table, or local labels. Do not impose a
numbering/identity system.

## Promotion Rule

Do not move work to the next lifecycle gate when an important need, behavior,
check, or task disappeared without an owned deferral, blocker, or scope decision.
Do not claim completion while a non-deferred item lacks an owner, evidence, or
has only a worker claim.
