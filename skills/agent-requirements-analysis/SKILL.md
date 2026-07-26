---
name: agent-requirements-analysis
description: "Use only for explicit $agent-requirements-analysis or workflow-routed discovery, convergence, pruning, and Requirements Baseline formation before Spec."
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

## References

Always apply [mode-gate.md](../dev-flow/references/mode-gate.md) and
[coverage-trace.md](../dev-flow/references/coverage-trace.md). Read:

- [requirements-tree-and-flows.md](references/requirements-tree-and-flows.md)
  before editing the search tree or Baseline flow views.
- [requirements-convergence.md](references/requirements-convergence.md) once a
  Candidate Set is assembled, or when judging outcomes/gate/readiness.
- [worker-lifecycle.md](../agent-runtime/references/worker-lifecycle.md) before
  dispatch, wait, resume, or close. `bounded` is scope, not duration.

Route repository/system facts through [project-context](../project-context/SKILL.md),
persisted discussion through [discussion-workflows](../discussion-workflows/SKILL.md),
and hand off to [agent-spec](../agent-spec/SKILL.md) only at `baseline_ready`.

## Lifecycle

```text
Core Problem Contract
  -> Requirement Search Tree
  -> agent-grilling discovery
  -> Requirements owner assembles/version Candidate Requirement Set
  -> agent-debate convergence
  -> keep/modify -> Core Version
     cut/defer -> Scope Pruning Ledger
     user-decision -> pause if blocking
  -> baseline_ready -> Spec
```

### Discovery Gate

For each non-trivial input, run or consume one current same-scope
[agent-grilling](../agent-grilling/SKILL.md) snapshot. Skip only when source
evidence covers every affected dimension; record it. Send Core Problem,
constraints, assumptions, tree path, and highest-value frontier. Integrate only
candidate deltas, not raw output.

### Convergence Gate

The Requirements owner assembles and versions the complete Candidate Set;
workers return deltas. For each non-trivial change, run or consume one current
same-scope [agent-debate](../agent-debate/SKILL.md) snapshot. Skip only for one
behavior, one material candidate, and no consequential tradeoff. Apply the
canonical outcome, authority, evidence, and pruning rules from the reference.

### Gate Evidence

Gate Evidence keeps execution, consumption, and result independent. Valid pass:
`completed / consumed / passed`; valid skip:
`skipped / not_applicable / passed`. Any unpassed gate remains a Candidate.

## Visual Contract

| Artifact | Required views |
| --- | --- |
| Requirements Candidate | One evolving Requirement Search Tree; Requirements Convergence Map with pending/blocked/available outcomes |
| Requirements Baseline | Candidate views plus Function Flow Inventory and Feature Flow Packets |

A Candidate has only the first two views; never invent flows or Core Version.
A Baseline has all four. Only implementation-eligible confirmed `keep/modify`
enters Core Version, Baseline tree, inventory, and packets. Keep detailed rules,
evidence, reasons, constraints, and reopen triggers in Markdown; cut behavior
stays only in the map/ledger or as a retained non-goal/constraint.

## Output Contract

```text
Artifact / lifecycle state / blocking reasons / ID or version:
Core Problem Contract:
Core Version (Baseline only):
Goal / actors / user-visible outcome:
In scope / non-goals:
Convergence Map / summary / Scope Pruning Ledger:
Gate Evidence / Evidence Closure:
Requirement Search Tree / frontier ledger:
Function Flow Inventory / Feature Flow Packets (Baseline only):
Constraints / risks:
Confirmed / Draft / Open:
True user decisions:
Coverage trace / Spec readiness / next owner:
```

Omit irrelevant fields, never gate results, consumed snapshots, skip evidence,
blockers, or unresolved frontier handles. Pending views use explicit
pending/blocked nodes.

Every unresolved Evidence Closure row uses one exact `frontier` handle shared by
the tree and ledger. `current/existing/reuse/unchanged/authoritative` requires
source/runtime evidence, a user-confirmed invariant, or a blocking frontier.

## Spec Readiness Gate

Use `Requirements Baseline` and hand to Spec only when:

- state is `baseline_ready`, blockers are empty, and both gates passed
- Core Problem has actor, causal evidence, outcome, constraints, non-goal, and
  success signal
- every material candidate has one canonical outcome and visual/Markdown handles
  agree
- Core Version contains only confirmed, implementation-eligible `keep/modify`
- every `cut/defer/material modify` has compact memory; cut/deferred behavior is
  absent from Baseline flows
- no high-impact source/agent-answerable frontier remains; unresolved evidence
  shares one handle across closure table, tree, and ledger
- terminal leaves are atomic and source/state/trace-owned
- blocking user decisions are closed; non-blocking decisions/deferrals record
  reason, impact, owner, and applicable reopen trigger
- every material flow traces from confirmed requirement/tree handles to a
  readable packet covering applicable main/alternate/error/recovery
- draft/open candidates never enter Core Version, Baseline behavior, or
  implementation eligibility; coverage satisfies the selected mode

Persist when needed at
`docs/dev-flow/requirements/<YYYY-MM-DD>-<slug>-requirements.md`.

## Red Flags

- Debate before discovery; Candidate mislabeled Baseline.
- Dispatch/completion/silence treated as gate evidence.
- Feature request copied as Core Problem; all ideas kept or cuts silently lost.
- Two trees; draft/open/cut/deferred behavior in Baseline flows.
- Source-answerable uncertainty outside a frontier.
- Mermaid/Markdown disagreement or detailed argument inside Mermaid.
