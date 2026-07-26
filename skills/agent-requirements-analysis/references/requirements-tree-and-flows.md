# Requirement Search Trees and Feature Flows

Contract for the Requirement Search Tree and Baseline flow views. Candidate
omits inventory/packets; `baseline_ready` adds them. Diagrams never replace
state, source, rationale, or decisions.

## Requirement Search Tree

Use one evolving Mermaid `flowchart TD` with stable alphanumeric/underscore IDs
and quoted labels; large trees may use a same-ID overview plus subtrees. Candidate
keeps every material candidate and unresolved frontier. At `baseline_ready`,
transform that tree: remove `cut` behavior, keep its handles in map/ledger, retain
modified handles when possible, and move draft/open/deferred governance leaves
to their ledgers. They never become Baseline behavior or flows.

Use these node states:

| State | Meaning | Next action |
| --- | --- | --- |
| `frontier` | Important question or claim still needs work | Inspect source, grill, debate, or split |
| `expanded` | Children now cover the parent's distinct branches | Revisit after children are dispositioned |
| `terminal` | Atomic requirement, constraint, non-goal, or scoped assumption is usable downstream | Record requirement state and trace |
| `user-decision` | Only user authority can select the branch | Record recommendation, impact, and blocking status; pause if blocking |
| `deferred` | A non-blocking/out-of-scope/future branch is postponed | Record reason, impact, and owner |

Each non-root ID has one parent edge. Put shared dependencies/cross-links only in
the ledger. `terminal` closes search, not convergence.

Ledger every `frontier`, `user-decision`, `deferred`, and non-obvious terminal:

```text
node / parent:
claim / tree state / requirement state:
source or evidence / disposition / blocking:
children or cross-links / requirement-decision-coverage trace:
```

## Traversal Loop

Best-first loop:

1. Seed `RT0` from the user-visible goal; add only affected dimensions.
2. Rank by impact, uncertainty, and downstream reach; split composites and grill
   unresolved high-impact nodes with path/evidence.
3. Resolve source-answerable nodes now. Unavailable consequential evidence stays
   `frontier`; `deferred` requires an explicit non-blocking rule.
4. Revisit parents for missing alternatives/exceptions/effects; apply terminal
   tests and scan the artifact for hidden evidence needs.
5. Stop when no high-impact agent/source-answerable frontier remains; blocking
   user decisions still pause handoff.

Depth is not a target. Branch only when a child can change behavior, scope,
ownership, risk, compatibility, or verification.

## Branch And Terminal Tests

Split when a node combines actors/behaviors/states/outcomes/decisions; material
normal/alternate/error/recovery/misuse paths; exclusive choices/eligibility; or
varying ownership, permission, migration, timing, dependency, or downstream work.

`terminal` requires an observable atomic requirement with source/state/outcome
and verification implication; an evidence-backed constraint/non-goal; or a
reversible scoped assumption with an invalidation condition.

Unanswered `user-decision` and `deferred` never become `terminal`. After the
decision outcome is replaced: `keep/modify -> terminal:confirmed`; at
`baseline_ready`, `cut` leaves the tree for map/ledger memory and `defer` moves to
governance state/ledger. Uninspected current behavior stays `frontier`. Depth or
confidence is not terminal evidence.

## Function Flow Inventory

At `baseline_ready`, inventory distinct implementation-eligible confirmed flows.
Distinct actor, trigger, lifecycle/state, or outcome means a distinct flow. Omit
`cut/defer/draft/open`.

```text
flow handle / actor / trigger / preconditions / outcome:
requirement-tree trace / packet-diagram mapping:
```

A packet may cover multiple rows only when all remain visible; otherwise split.
Attach atomic policies/validation to an owning flow.

## Feature Flow Packets

Create the smallest packet set covering every inventory row.

```text
Feature / outcome / actors / trigger / preconditions:
requirement-tree trace / covered flows:
Mermaid diagram / hidden postconditions or invariants:
```

Choose one primary diagram per packet:

| Need | Mermaid diagram |
| --- | --- |
| User or operational decisions and branches | `flowchart LR` |
| Lifecycle and legal state transitions | `stateDiagram-v2` |
| Timing or responsibility across actors/systems | `sequenceDiagram` |

Use a second diagram only for missing material behavior; split beyond roughly
12–15 nodes or mixed goals. Show product behavior/state/responsibility, not API,
schema, persistence, queue, worker, or test mechanics.

Scale by mode: Lightweight uses the smallest real tree and usually one packet;
Standard uses coherent packet groups and consequential ledger leaves;
Durable/Lane adds stable handles and resumable detail.

## Mermaid Conventions

- Use basic syntax, safe IDs, quoted labels, and labeled decision edges; avoid
  experimental shapes and raw HTML.
- Show applicable main, alternate, error, and recovery paths; omit invented paths.
- Avoid lowercase `end`; use e.g. `END_NODE["Finished"]`.
- Candidate diagrams preserve `confirmed/draft/open`; Baseline behavior contains
  only implementation-eligible confirmed requirements.
- Validate Mermaid blocks with an available parser or renderer before handoff.
