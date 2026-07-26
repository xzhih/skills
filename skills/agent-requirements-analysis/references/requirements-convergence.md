# Requirements Convergence and Baseline

Contract for Candidate Set convergence, pruning, gate evidence, blockers, and
Baseline qualification.

## Terms

| Concept | Governed term | Meaning |
| --- | --- | --- |
| What actually needs solving | `Core Problem` / `Core Need` | Actor, causal problem, evidence, desired outcome, and boundary |
| Remove branches that do not earn their scope | `Requirement Convergence` / `Scope Pruning` | Adversarially keep, modify, cut, defer, or leave candidates for user decision |
| Surviving behavior | `Core Version` | Behavior subset inside the governed Requirements Baseline: implementation-eligible confirmed `keep/modify` |
| Governed artifact | `Requirements Baseline` | Core Version plus evidence, decisions, pruning memory, visuals, and trace ready for Spec |

## Lifecycle

```text
Core Problem -> discovery -> Candidate Set -> convergence
-> keep/modify: Core Version | cut/defer: pruning ledger
| user-decision: pause if blocking -> Requirements Baseline
```

Discovery expands; convergence prunes.

## Core Problem Contract

```text
affected actor or customer:
problem / cause and evidence / desired outcome:
must-preserve constraints / explicit non-goal / success signal:
source / requirement state:
```

State the problem, not a preferred solution. Split independently evidenced Core
Problems or record an explicit scope decision.

## Candidate Requirement Set

The owner versions every material feature, rule, exception, or recovery path
from consumed discovery deltas or canonical discovery-skip evidence:

```text
candidate handle / tree path / feature or rule:
Core Problem contribution / source-state / actor-flow / value signal:
cost-complexity-risk-dependency / evidence gap or true decision:
```

Only the owner publishes the complete set; workers return deltas/snapshots.
Formulate only deeply enough to judge.

## Adversarial Convergence

Give every participant the same Core Problem, Candidate Set version, tree
handles, evidence, constraints, and decisions. Each evaluates every material
candidate against:

```text
core alignment | necessity now | evidence | user value | simpler substitute
complexity and maintenance | failure/security/privacy risk | dependencies
compatibility | release timing | effect on other surviving branches
```

Evidence outranks votes. Agents cannot cut or materially change a confirmed user
requirement/authoritative constraint; return that conflict as `user-decision`.
Rebut blocker/major disagreement until every candidate has one outcome and no
agent-answerable major remains.

## Outcome Semantics

Assign exactly one outcome to every material candidate:

| Outcome | Meaning | Final location |
| --- | --- | --- |
| `keep` | Candidate earns its scope unchanged | Requirements Baseline |
| `modify` | A smaller/safer formulation earns its scope | Modified baseline requirement plus pruning row |
| `cut` | Not needed for the Core Problem or does not earn current cost/risk | Scope Pruning Ledger and Convergence Map; never Core Version |
| `defer` | Potentially useful later, but explicitly non-blocking/future/out-of-scope | Pruning ledger with owner/reopen trigger, plus Convergence Map |
| `user-decision` | Authority, taste, priority, cost/privacy, or business direction must choose | Decision ledger and Convergence Map; pause if blocking |

`defer` is not unresolved: source/agent-answerable questions remain open work;
blocking user decisions prevent a Baseline.

When answered, replace `user-decision` with a final outcome and retain trace. A
materially changed candidate/branch requires targeted discovery/convergence.

## Visual / Markdown Contract

The tree owns analyzed branches/frontiers; the Convergence Map owns concise
outcomes; Feature Flow Packets own surviving product behavior; Markdown owns
evidence, rules, constraints, reasons, pruning memory, decisions, and reopen
triggers. Reuse handles. Keep every `modify/cut/defer/user-decision` visible;
routine `keep` may group. Cut/deferred nodes never enter Baseline behavior views.

## Scope Pruning Ledger

Include every `cut`, `defer`, material `modify`, and only non-obvious `keep`.

```text
| Candidate | Considered branch | Outcome | Why / evidence | Retained memory |
```

Retained memory is a protecting non-goal/constraint, surviving implication,
deferral owner plus observable reopen trigger, or `none`; never transcripts.

Every handle appears exactly once in Markdown as kept, modified plus pruning row,
cut/deferred row, or user-decision. The map may repeat it only visually.

## Gate Evidence and Evidence Closure

Gate Evidence separates execution, owner consumption, and governed result:

```text
gate: discovery | convergence
snapshot handle / producer-source:
execution_status: not_started | running | completed | interrupted | failed | unavailable | skipped
consumption_status: pending | consumed | not_applicable
gate_result: pending | passed | blocked
same-scope target / input or Candidate Set version:
material deltas or coverage / skip or blocker evidence:
```

Valid pass: `completed/consumed/passed`; valid skip:
`skipped/not_applicable/passed`. Unconsumed completion is
`completed/pending/pending`; consumed unresolved debate is
`completed/consumed/blocked`. Dispatch/running/interrupted never passes. Debate
evidence names the owner-assembled Candidate Set version.

Record phase state and blockers separately:

| Condition | Lifecycle state | Blocking reason |
| --- | --- | --- |
| Discovery is still running or answerable work remains | `discovery_pending` | none |
| Candidate Set assembly or convergence not_started/running/awaiting consumption | `convergence_pending` | none |
| Consumed convergence still has an agent-answerable blocker/major | `blocked` | `convergence_major` |
| A blocking true user decision remains | `blocked` | `user_decision` |
| Required source, access, worker capacity, or external capability is unavailable | `blocked` | `dependency` |

Blocking reasons are a set; record all. Use `baseline_ready` only after every
readiness condition passes.

Do not infer `convergence_major` from a pending candidate or evidence frontier:
the consumed snapshot must name a blocker/major. Otherwise source/agent-answerable
work is `discovery_pending`; unavailable required evidence is `blocked/dependency`.
While such a frontier controls an outcome, convergence is
`completed/consumed/pending`; resolve evidence, then reconverge that candidate.

Candidate views show available state; never invent outcomes or a Core Version.

```text
| Claim / node | Evidence or user invariant | Status | Frontier if unresolved |
```

`current/existing/reuse/unchanged/authoritative`, vendor capability, and runtime
behavior require inspected evidence, explicit user invariant, or `frontier`.

Every unresolved row names one stable handle also shown as `frontier:open` in the
tree and ledger. Prose `open`, a draft, or grouped parent does not close trace.

## Requirements Baseline

Call an artifact `Requirements Baseline` only when:

- Core Problem is evidence-backed; discovery covered affected dimensions
- discovery and convergence Gate Evidence passed normally or by eligible skip
- every candidate has one outcome; modified/retained implications reconcile
- cut branches are absent from Core Version, Baseline tree, inventory, packets
- all Baseline behavior is confirmed and implementation-eligible
- blocking decisions and high-impact source/agent frontiers are closed
- visual, evidence-consistency, coverage, and Spec-readiness gates pass

Before that point call it `Requirements Candidate`, record its lifecycle state,
and retain all applicable blocking reasons.

Core Version is the smallest eligible confirmed `keep/modify` set. Draft/open and
governance stay in ledgers, never flows. Persist an ID when another owner needs
stable trace; name snapshots/coverage, not candidate replay or arguments.
