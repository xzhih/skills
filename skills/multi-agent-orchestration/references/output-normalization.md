# Output Normalization

Use this reference when integrating agent outputs into plans, ledgers, goals, evidence, decisions, or final handoff.

## Promotion Gate

Agent output is not automatically source of truth.

```text
Only evidence-backed, scoped, actionable items can change system state.
Everything else becomes follow-up work, an assumption, a hypothesis, or deferred context.
```

The main agent owns promotion. Preserve useful disagreement; do not silently merge contradictions.

## Normalized Item Types

```text
evidence:
  A source-backed fact, command result, artifact, log, screenshot, URL, file reference, or reproducible observation.

finding:
  A specific evidence-backed issue with severity, target, impact, scope, and next action.

hypothesis:
  A plausible but not-yet-proven concern or explanation.

proposal:
  A suggested plan, design, implementation path, product direction, or tradeoff.

gap:
  Missing information or uncertainty. Route through agent-first resolution before asking the user.

artifact:
  A produced file, document, patch, plan, roadmap, review, evidence package, or other deliverable.

decision_candidate:
  A recommendation that may become a decision after authority, evidence, constraints, and user boundaries are checked.
```

## Promotion Rules

Evidence can enter the evidence set only when:

- the source is clear
- the claim is reproducible or citable
- it relates to the target or verification boundary

A finding can enter the findings ledger only when:

- it is specific
- evidence is traceable
- impact is clear
- severity is judged
- scope is clear
- the next action is executable, or it is a real pause condition

A hypothesis can trigger investigation, but it must not force repair or plan changes until evidence supports it.

A proposal can enter the plan only when:

- it aligns with the user goal
- it respects constraints and boundaries
- material tradeoffs or risks are stated
- it is not contradicted by higher authority

A gap should route through:

```text
resolve_by_source
resolve_by_runtime
resolve_by_agent
resolve_by_assumption
ask_user
```

Use `ask_user` only for non-agent-decidable choices, authorization, cost, privacy, destructive/public actions, or critical product decisions.

An artifact can enter the artifact set only when:

- location or content is clear
- the main agent can inspect it
- it stays inside the assignment boundary
- verification is possible

A decision candidate becomes a decision only when supported by authority and evidence, or when it is a non-agent-decidable choice explicitly confirmed by the user.

## Conflict Handling

If an agent output conflicts with higher authority:

- preserve it as a conflict, hypothesis, or finding
- route it for rebuttal or recheck when it matters
- do not silently rewrite the plan or goal

If two agents disagree:

- compare their evidence first
- check whether they used the same source materials
- ask a fresh agent only when the conflict affects target correctness, result correctness, verification, or stop/pause decisions
