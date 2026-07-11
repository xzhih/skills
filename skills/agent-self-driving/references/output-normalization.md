# Output Normalization

Use this reference when integrating agent outputs into plans, ledgers, goals, evidence, decisions, or final handoff.

## Contents

- Promotion Gate
- Normalized Item Types
- Promotion Rules
- Conflict Handling
- Consensus Handling

## Promotion Gate

Agent output is not automatically source of truth.

```text
Only evidence-backed, scoped, actionable items can change system state.
Everything else becomes follow-up work, an assumption, a hypothesis, or deferred context.
```

The main agent owns promotion. Preserve useful disagreement; do not silently merge contradictions.

Multi-agent output is not consensus. Consensus must be earned through adversarial comparison, evidence checking, and targeted rebuttal when the claim affects Spec, Eval, Plan, result correctness, or stop/pause decisions.

Completion claims are not evidence. A task, stage, or final result becomes complete only after the moderator checks fresh evidence such as diffs, command output, rendered artifacts, screenshots, logs, citations, deployment URLs, or reproduced behavior.

Agent reports can point to evidence, but they do not replace it. If the moderator cannot inspect or reproduce the proof, normalize the report as a claim, hypothesis, or gap.

Raw external-agent output is useful for auditability and rebuttal, but it is not shared state by itself. Store it separately when needed; promote only normalized evidence, findings, proposals, gaps, artifacts, or decision candidates.

When closing a task, stage, or run, use the evidence closure shape from `artifact-layout.md`: claim, criteria closed, evidence, verification run, reviewer/recheck status, remaining risks, and pass/fail/paused decision.

For output imported from `agent-grilling`, normalize the accepted snapshot as discovered gaps, requirement deltas, scoped assumptions, decision candidates, open questions, and downstream implications. Do not run formulation blind-spot discovery from this skill.

For Requirements convergence imported from `agent-debate`, normalize each
candidate to `keep`, `modify`, `cut`, `defer`, or `user-decision`. Promote only
the normalized outcomes and compact ledger rows to the active Requirements
owner. That owner alone decides what enters the Requirements Baseline. Do not
write owner artifacts or promote raw debate and duplicated arguments from the
self-driving overlay.

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

tradeoff:
  A consequence pair or comparison that clarifies why one path is better or worse than another.

assumption:
  A scoped default that can be used unless contradicted by evidence, authority, or user choice.

gap:
  Missing information or uncertainty. Route through agent-first resolution before asking the user.

artifact:
  A produced file, document, patch, plan, roadmap, review, evidence package, or other deliverable.

decision_candidate:
  A recommendation that may become a decision after authority, evidence, constraints, and user boundaries are checked.

implication:
  A consequence for Spec, Eval, Plan, task queue, verification, boundary, cost, privacy, or delivery risk.

pruning_decision:
  One candidate handle with a governed keep, modify, cut, defer, or
  user-decision outcome, evidence, and retained memory when applicable.
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
- it aligns with the locked Spec and Eval, or explains why they need revision
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
- do not silently rewrite the Spec, Eval, plan, or goal

If two agents disagree:

- compare their evidence first
- check whether they used the same source materials
- ask a fresh agent only when the conflict affects target correctness, Eval quality, result correctness, verification, or stop/pause decisions

## Consensus Handling

Treat agreement strength as evidence-weighted:

```text
weak agreement:
  Same model family, same context, same framing, or no evidence.

useful agreement:
  Independent first-round reviewers reach similar conclusions from source
  materials with traceable evidence.

stronger agreement:
  Different models, reasoning profiles, contexts, or review angles converge
  after adversarial challenge and evidence checks.
```

Do not promote a conclusion only because many agents repeated it. Promote the specific evidence, finding, proposal, or decision candidate that survives comparison.

Classify unresolved agent output as:

```text
accepted
rejected
unresolved
needs_source_check
needs_runtime_check
needs_agent_rebuttal
needs_user_decision
```
