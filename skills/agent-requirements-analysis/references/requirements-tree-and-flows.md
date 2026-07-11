# Requirement Search Trees and Feature Flows

Canonical contract for Requirement Search Tree traversal, Function Flow
Inventory, Feature Flow Packets, and Mermaid syntax. Candidate omits inventory
and packets; `baseline_ready` adds them. Diagrams never replace state, source,
rationale, or decisions.

## Requirement Search Tree

Use Mermaid `flowchart TD`, stable alphanumeric/underscore IDs, and quoted labels.
Use one diagram or a root overview plus same-ID subtrees covering every leaf.

Use one evolving Requirement Search Tree, not separate discovery and Baseline
trees. During discovery and convergence, it may contain every material candidate.
A blocked Candidate retains every unresolved frontier and its exact trace, even
when convergence has completed. Only when lifecycle reaches `baseline_ready`
does the Requirements owner transform the same tree into the Baseline tree:
remove `cut` behavior while preserving its handles in the Requirements
Convergence Map and Scope Pruning Ledger. Keep materially modified handles when
possible. Move draft/open or non-blocking deferred governance leaves to their
owning ledgers; they do not remain as Baseline behavior or become function flows.

Use these node states:

| State | Meaning | Next action |
| --- | --- | --- |
| `frontier` | Important question or claim still needs work | Inspect source, grill, debate, or split |
| `expanded` | Children now cover the parent's distinct branches | Revisit after children are dispositioned |
| `terminal` | Atomic requirement, constraint, non-goal, or scoped assumption is usable downstream | Record requirement state and trace |
| `user-decision` | Only user authority can select the branch | Record recommendation, impact, and blocking status; pause if blocking |
| `deferred` | A non-blocking/out-of-scope/future branch is postponed | Record reason, impact, and owner |

Tree invariant: each non-root node ID has exactly one incoming parent edge. Put shared
dependencies/cross-links only in the ledger; never draw the same node under two
parents. `terminal` closes search, not convergence outcome.

Preserve a compact ledger entry for every `frontier`, `user-decision`, and
`deferred` node, plus terminal leaves whose source or terminal reason is not
obvious from the diagram:

```text
node:
parent:
question or claim:
tree state: frontier | expanded | terminal | user-decision | deferred
requirement state: confirmed | draft | open
source or evidence:
disposition or terminal reason:
blocking: yes | no
children or cross-links:
requirement / decision / coverage trace:
```

## Traversal Loop

Best-first loop:

1. Seed `RT0` from the user-visible goal; add only affected dimensions.
2. Rank frontier by impact, uncertainty, and downstream reach.
3. Split composite nodes; grill unresolved high-impact nodes with path/evidence.
4. Resolve source-answerable nodes now. Unavailable consequential evidence stays
   `frontier`; `deferred` requires an explicit non-blocking rule.
5. Revisit parents for missing sibling/alternative/exception/second-order effect.
6. Apply terminal tests; scan the whole artifact for hidden evidence needs.
7. Stop when no high-impact agent/source-answerable frontier remains; blocking
   user decisions still pause handoff.

Depth is not a target. Branch only when a child can change behavior, scope,
ownership, risk, compatibility, or verification.

## Branch And Terminal Tests

Split a node when any answer is yes:

- Does it contain more than one actor, behavior, state, outcome, or decision?
- Do normal, alternate, error, recovery, misuse, or abuse paths differ?
- Are there mutually exclusive product choices or eligibility rules?
- Does data ownership, permission, migration, timing, or dependency behavior vary?
- Does one answer create a consequential downstream question?

A leaf may become `terminal` only when it is one of:

- an observable atomic requirement with source, state, outcome, and verification
  implication
- an evidence-backed constraint or explicit non-goal
- a reversible safe assumption with scope and invalidation condition

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
flow handle:
actor:
trigger / preconditions:
outcome:
requirement and tree trace:
packet / diagram mapping:
```

A packet may cover multiple rows only when all remain visible; otherwise split.
Attach atomic policies/validation to an owning flow.

## Feature Flow Packets

Create the smallest packet set covering every inventory row.

```text
Feature:
Purpose / user outcome:
Actors:
Trigger and preconditions:
Requirement and tree trace:
Covered flow handles:
Mermaid diagram:
Postconditions / invariants not visible in the diagram:
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

Scale the visual package by mode:

- `Lightweight`: smallest real tree, usually one packet.
- `Standard`: smallest coherent packet groups; ledger consequential leaves.
- `Durable/Lane`: stable handles and resumable ledger detail.

## Mermaid Conventions

- Prefer basic, widely supported syntax; avoid experimental shapes and raw HTML.
- Use safe alphanumeric/underscore IDs and quote human-readable node labels.
- Label decision edges with the condition or result.
- Show applicable main, alternate, error, and recovery paths; omit invented paths.
- Avoid lowercase `end` in flowcharts; use a safe ID such as `END_NODE` and a
  quoted label such as `"Finished"`.
- Candidate diagrams preserve `confirmed/draft/open`; Baseline behavior contains
  only implementation-eligible confirmed requirements.
- Validate Mermaid blocks with an available parser or renderer before handoff.
