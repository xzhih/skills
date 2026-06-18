# Task Packets

Use this reference when creating prompts or assignments for subagents, external agents, bounded implementation agents, reviewers, researchers, synthesizers, or verifiers.

## Contents

- Principle
- Minimum Invariant
- Assignment Intent
- Non-Review Delegation Boundaries
- Context Exposure
- Optional Vocabulary
- Authority Hierarchy
- Anti-Ritualization

## Principle

Task packets are adaptive task contracts, not fixed templates.

```text
Give each agent enough context to be correct,
but not so much framing that it only validates the main agent's assumptions.
```

The main agent chooses packet shape at runtime. The skill provides invariants and vocabulary.

## Minimum Invariant

Every packet must answer these questions, either explicitly or through concise natural language:

```text
What should this agent do?
What source material is authoritative?
What is inside and outside scope?
What kind of output is useful?
What evidence or reasoning standard applies?
When should the agent stop or report a blocker?
```

## Assignment Intent

Choose intent before wording the packet:

```text
independent formulation:
  Build or challenge the target, requirements, risks, or plan from source materials.

artifact review:
  Review a spec, plan, diff, document, implementation, deployment, or evidence package.

finding rebuttal:
  Check whether a specific finding is valid, invalid, overstated, understated, or missing evidence.

fresh recheck:
  Re-review after a repair or plan update, preferably with a fresh context or different model.

bounded implementation:
  Produce or change a clearly owned artifact or work unit with explicit boundaries.

research / synthesis:
  Gather or integrate bounded information while preserving uncertainty and source quality.

verification:
  Check whether evidence proves the goal or contract is satisfied.
```

## Non-Review Delegation Boundaries

Subagents and external agents are not only reviewers. They can do bounded implementation, artifact production, research, synthesis, or verification when the work unit has clear ownership.

Safe delegation usually has:

- one owner per file, artifact, decision, or output boundary
- explicit dependencies and allowed write/output paths
- a clear integration point owned by the main agent
- verification that the main agent can run, inspect, cite, or reproduce
- no hidden peer-to-peer state required for correctness

Avoid multi-agent execution when:

- agents would edit the same files or make the same decision independently
- ownership boundaries are unclear
- outputs cannot be inspected or verified by the main agent
- integration cost is larger than the parallelism benefit
- external-agent cost, privacy, account, or authorization is unresolved

## Context Exposure

Choose exposure mode before wording the packet:

```text
source-first:
  Give original user goal and authoritative source materials before any main-agent summary.
  Use for independent formulation, high-risk review, and hallucination resistance.

artifact-focused:
  Give the artifact to inspect plus relevant goal, boundary, and verification criteria.
  Use for plan, spec, code, document, deployment, or evidence review.

finding-focused:
  Give one finding or conflict plus the source needed to validate it.
  Use for rebuttal, recheck, and resolving reviewer disagreement.

execution-focused:
  Give the exact work unit, allowed writes or outputs, dependencies, and verification expectation.
  Use for bounded implementation or artifact production.

synthesis-focused:
  Give multiple agent outputs and ask for consolidation without erasing unresolved disagreement.
  Use after independent passes exist, not as the first pass when independence matters.
```

## Optional Vocabulary

Use these only when they help the actual task:

- objective
- authoritative source materials
- scope and boundaries
- selected participant, model, or reasoning/profile constraint
- task type
- allowed work or review angle
- independence requirement
- evidence rules
- expected output shape
- stop or pause signal
- write/output boundaries
- privacy, cost, or external-agent constraints
- links to existing artifacts or ledgers
- known open questions or conflicts

## Authority Hierarchy

```text
user goal / explicit user constraints
  > authoritative source materials
  > repo/runtime/account/artifact evidence
  > approved plans, goals, ledgers, and prior decisions
  > agent summaries, hypotheses, and opinions
```

Let a subagent reject the main agent's summary when source materials contradict it.

## Anti-Ritualization

- Do not copy the full packet vocabulary into every assignment.
- Do not ask an agent to fill empty sections.
- Do not force the same packet shape across coding, product design, research, writing, deployment, or review work.
- Do not over-specify the expected conclusion.
- Do not hide true boundaries by saying "review everything".
- Do not give all prior discussion to a first-pass reviewer when a smaller source-grounded packet preserves more independence.
