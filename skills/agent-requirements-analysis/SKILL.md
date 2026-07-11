---
name: agent-requirements-analysis
description: "Use only when the user explicitly invokes $agent-requirements-analysis, or when an active workflow routes here, and a direction, new requirement, update, bug intent, or discussion result still needs discovery, convergence, scope pruning, or a governed Requirements Baseline before Spec."
---

# Agent Requirements Analysis

Produce the smallest coherent Requirements Baseline. Own Requirements only; do
not write Spec, Eval, Plan, code, or lane packets.

## Iron Law

```text
NO REQUIREMENTS BASELINE WITHOUT DISCOVERY, CONVERGENCE, AND EXPLICIT PRUNING.
```

Keep `confirmed / draft / open` distinct. Ask the user only for authority-owned
decisions: product direction, taste, priority, business policy, privacy/cost,
account access, destructive/public action, or unavailable user-owned facts.

## Required Contracts

Apply:

- [mode-gate.md](../dev-flow/references/mode-gate.md)
- [coverage-trace.md](../dev-flow/references/coverage-trace.md)
- [requirements-tree-and-flows.md](references/requirements-tree-and-flows.md)
- [requirements-convergence.md](references/requirements-convergence.md)

Before dispatch/wait, apply
[worker-lifecycle.md](../agent-runtime/references/worker-lifecycle.md): `bounded`
means scope, not duration; polling timeout is not worker timeout.

Use [project-context](../project-context/SKILL.md) for repository/system facts,
[discussion-workflows](../discussion-workflows/SKILL.md) for persisted discussion,
and [agent-spec](../agent-spec/SKILL.md) only after `baseline_ready`.

## Lifecycle

```text
Core Problem Contract
  -> Requirement Search Tree
  -> agent-grilling discovery
  -> Requirements owner assembles/version Candidate Requirement Set
  -> agent-debate convergence
  -> keep | modify | cut | defer | user-decision
  -> Core Version + Scope Pruning Ledger
  -> baseline_ready -> Spec
```

### Discovery Gate

For every non-trivial input, run or consume one current same-scope
[agent-grilling](../agent-grilling/SKILL.md) snapshot. A governed input may skip
only when source evidence already covers every affected dimension; record the
skip evidence. Send the Core Problem, constraints, assumptions, tree path, and
highest-value frontier. Integrate returned candidate additions/changes into the
tree; do not append raw grilling output.

### Convergence Gate

After discovery, assemble and version the Candidate Requirement Set. The
Requirements owner alone owns this complete set; discovery workers return
additions and changes. For every non-trivial requirements change, run or consume
one current same-scope [agent-debate](../agent-debate/SKILL.md) snapshot. Only a
single-behavior change with one material candidate and no consequential tradeoff
may use an evidence-backed skip. Apply the canonical outcome, authority,
coverage, and ledger semantics from `requirements-convergence.md`.

### Gate Evidence

Use the canonical Gate Evidence schema. Normal pass:
`completed / consumed / passed`; eligible skip:
`skipped / not_applicable / passed`. Execution, consumption, and gate result are
independent. An unpassed gate keeps the artifact a Requirements Candidate.

## Visual Contract

| Artifact | Required views |
| --- | --- |
| Requirements Candidate | One evolving Requirement Search Tree; Requirements Convergence Map with pending/blocked/available outcomes |
| Requirements Baseline | Candidate views plus Function Flow Inventory and Feature Flow Packets |

A Candidate requires only the first two views. Omit flow inventory/packets until
`baseline_ready`; state that unsettled behavior was not promoted. A Baseline
requires all four views.

Only implementation-eligible confirmed `keep`/`modify` behavior enters the Core
Version, Baseline tree, inventory, and packets. The Convergence Map shows concise
outcomes; Markdown owns detailed requirements, evidence, reasons, constraints,
and reopen triggers. Cut behavior remains only in the map and compact pruning
ledger, or as a retained non-goal/constraint.

## Output Contract

```text
Artifact type: Requirements Candidate | Requirements Baseline
Lifecycle state: discovery_pending | convergence_pending | blocked | baseline_ready
Blocking reasons: convergence_major | user_decision | dependency (zero or more)
Baseline ID / Candidate version:
Core Problem Contract:
Core Version (Baseline only):
Goal / actors / user-visible outcome:
In scope / non-goals:
Requirements Convergence Map (Mermaid):
Requirement Convergence Summary:
Scope Pruning Ledger:
Gate Evidence:
Evidence Closure Table:
Requirement Search Tree (Mermaid):
Tree frontier / disposition ledger:
Function Flow Inventory and diagram mapping (Baseline only):
Feature Flow Packets (Mermaid, Baseline only):
Constraints / risks:
Confirmed / Draft / Open:
True user decisions:
Coverage trace:
Spec readiness / next owner:
```

Omit irrelevant fields. Never omit gate results, consumed snapshots, applicable
skip evidence, blockers, or unresolved frontier handles. Candidate pending views
use explicit pending/blocked nodes and never invent outcomes or a Core Version.

Every unresolved Evidence Closure row names one exact `frontier` handle visible
in both the tree and frontier ledger. Words such as `current`, `existing`,
`reuse`, `unchanged`, or `authoritative` require source/runtime evidence, an
explicit user-confirmed invariant, or a blocking frontier.

## Spec Readiness Gate

Use `Requirements Baseline` and hand to Spec only when:

- lifecycle is `baseline_ready`; blocking reasons are empty
- Core Problem identifies actor, causal problem/evidence, outcome, constraints,
  non-goal, and success signal
- discovery and convergence each have `gate_result: passed`
- every material candidate has exactly one canonical outcome
- Mermaid/Markdown handles and outcomes agree
- Core Version contains only implementation-eligible confirmed `keep`/`modify`
  requirements
- every `cut`, `defer`, and material `modify` has the canonical compact memory;
  cut/deferred behavior is absent from Baseline flows
- no high-impact agent/source-answerable frontier remains
- every unresolved evidence claim uses the same explicit frontier handle across
  Evidence Closure, tree, and ledger
- every terminal leaf is atomic and source/state/trace-owned
- blocking user decisions are closed; non-blocking decisions and deferrals have
  reason, impact, owner, and applicable reopen trigger
- every material Baseline flow maps from confirmed requirement/tree handles to a
  readable Feature Flow Packet covering applicable main/alternate/error/recovery
- no draft/open candidate enters Core Version, Baseline behavior, or downstream
  implementation eligibility
- coverage trace satisfies the selected mode

Persist when needed at
`docs/dev-flow/requirements/<YYYY-MM-DD>-<slug>-requirements.md`.

## Red Flags

- Debating before discovery or calling a Candidate a Baseline.
- Treating dispatch, completion, or silence as a passed/failed gate without the
  canonical evidence state.
- Treating a feature request as the Core Problem.
- Keeping all discovered ideas, silently deleting cuts, or retaining transcripts.
- Publishing two trees instead of one evolving tree.
- Promoting draft/open or cut/deferred behavior into Baseline flows.
- Hiding source-answerable uncertainty outside an explicit frontier.
- Letting Mermaid and Markdown disagree or putting detailed arguments in Mermaid.
