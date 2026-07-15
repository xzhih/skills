---
name: agent-grilling
description: "Use only when an active workflow routes here and a goal, requirement, design direction, plan boundary, or lane split may hide omitted actors, flows, edge cases, assumptions, dependencies, contradictions, risks, or second-order effects before downstream work. Do not use for review or returned-lane integration."
---

# Agent Grilling

Discover what the current formulation has not noticed. Expand the problem model,
trace high-impact gaps to their consequences, and return formulation or
requirement deltas. Grilling and challenge are core probes in this deep
investigation; the outcome is discovery, not a stress-test verdict or artifact
review.

## Iron Law

```text
NO HANDOFF WHILE A HIGH-IMPACT BLIND SPOT REMAINS UNSEARCHED OR UNDISPOSITIONED.
```

Resolve source- and agent-answerable gaps before asking the user. Escalate only
true decisions such as product direction, taste, priority, privacy/cost,
destructive/public action, account access, or unavailable user-owned facts.

## Use For

- clear-looking or fuzzy formulations with unexamined behavior or consequences
- requirements that need enrichment before Spec
- likely omitted actors, flows, states, permissions, data rules, or failure paths
- user feedback like "not usable", "hard to scan", or "feels wrong"
- cross-cutting changes, migrations, integrations, or risky lane boundaries

Use [agent-debate](../agent-debate/SKILL.md) to compare contested alternatives.
Use [agent-review](../agent-review/SKILL.md) to judge an existing artifact. Use
[agent-lanes](../agent-lanes/SKILL.md) only after boundaries are discoverably
clear.

When using agents for the pass, use
[agent-runtime](../agent-runtime/SKILL.md) for capability, authorization, and
session lifecycle.

## Method

```text
model the stated intent and current assumptions
  -> inspect source context that can constrain it
  -> sweep the affected dimensions for what is missing
  -> turn omissions into explicit gap questions
  -> grill high-impact gaps and proposed answers to causes and consequences
  -> resolve them from source, focused agents, or safe assumptions
  -> write the formulation and requirement deltas
  -> repeat for newly exposed high-impact gaps
  -> return deltas to the active calling owner
```

Sweep only affected dimensions, not a ceremonial checklist:

```text
actors and permissions | end-to-end flow and state transitions
data ownership and lifecycle | edge, failure, recovery, and abuse paths
compatibility and migration | dependencies and operations
success evidence | boundaries and non-goals
```

Treat the first plausible answer as the start of grilling, not the result. For
every high-impact candidate, establish:

```text
gap -> proposed answer -> why -> evidence -> underlying assumption or cause
    -> counterexample -> boundary -> failure or second-order effect
    -> resolver -> disposition -> requirement or decision delta
```

Allowed dispositions are `resolved from source`, `safe assumption`, `draft
requirement`, `constraint/risk/non-goal`, `true user decision`, or `deferred`
with reason and impact. Do not stop at a question list.

Example: “invite teammates” hides whether existing private notes become visible.
Tracing ownership and migration exposes a privacy failure; the requirement delta
is that migration must not broaden visibility and sharing needs an explicit move
or product decision.

## Output

Return the discovery delta, not a polished restatement:

```text
Discovery snapshot handle / same-scope target:
Enriched formulation:
Discovered gaps and dispositions:
New or changed requirements / decisions:
Candidate additions / changes:
Remaining true user decisions:
Next: active workflow owner
```

Return to the calling owner. For a Requirements call, that owner alone assembles
the Candidate Requirement Set. For a Plan or lane call, return formulation or
boundary deltas there; flag product-scope changes for Requirements routing.

If no material gap survives, name the dimensions and evidence inspected and say
that no delta was found; do not invent issues to prove value. Omit empty
headings. Read `references/formulation-grilling.md` for large, multi-surface, or
multi-round uncertainty.

## Red Flags

- Using grilling only to attack a proposal or produce a pass/fail verdict.
- Restating the input without identifying what changed.
- Listing generic risks without tying them to this formulation and its effects.
- Avoiding hard follow-up questions because the first answer sounds plausible.
- Stopping at a first-order consequence when it exposes another important gap.
- Returning questions without a resolver, disposition, and requirement impact.
- Asking the user before source- and agent-answerable gaps are exhausted.
- Inventing speculative gaps without a causal link or evidence need.
- Pruning a plausible branch before it is formulated enough for convergence.
- Publishing an authoritative Candidate Requirement Set instead of returning
  deltas to the calling owner.
- Calling discovered candidates the final Requirements Baseline.
