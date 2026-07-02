# Task Packets

Use this reference when creating prompts or assignments for subagent or external-agent workers, bounded implementation agents, reviewers, researchers, synthesizers, or verifiers.

## Contents

- Principle
- Minimum Invariant
- Assignment Intent
- Delegation Topology
- Non-Review Delegation Boundaries
- Execution Queue Packets
- Context Exposure
- Moderator Blackboard
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
  Review a Spec, Eval, plan, diff, document, implementation, deployment, or evidence package.

finding rebuttal:
  Check whether a specific finding is valid, invalid, overstated, understated, or missing evidence.

fresh recheck:
  Re-review after a repair or plan update, preferably with a fresh context or different model.

bounded implementation:
  Produce or change a clearly owned artifact or work unit with explicit boundaries.

research / synthesis:
  Gather or integrate bounded information while preserving uncertainty and source quality.

verification:
  Check whether evidence proves the Spec, Eval, goal, or contract is satisfied.
```

## Delegation Topology

Choose the topology before writing packets:

```text
redundant judgment:
  Multiple agents review the same whole Spec, Eval, Plan, or final result
  independently. Use to reduce framing error and expose blind spots.

complementary lens review:
  Multiple agents review the same whole artifact with different focus areas.
  Use after or alongside redundant judgment when coverage matters.

partitioned implementation:
  Multiple agents implement different modules, files, artifacts, tests, or
  bounded work units. Use only after ownership boundaries are clear.
```

For Spec, Eval, Plan, and final quality review, prefer redundant or complementary same-artifact review. Do not shard the artifact by section before whole-artifact review unless the first round already happened and targeted follow-up is needed.

For implementation or artifact production, prefer partitioned execution with disjoint write ownership and explicit integration points.

## Non-Review Delegation Boundaries

Subagents and external agents are not only reviewers. They can do bounded implementation, artifact production, research, synthesis, or verification when the work unit has clear ownership.

Safe implementation delegation usually has:

- one owner per file, artifact, decision, or output boundary
- explicit dependencies and allowed write/output paths
- a clear integration point owned by the main agent
- verification that the main agent can run, inspect, cite, or reproduce
- no hidden peer-to-peer state required for correctness

These ownership rules protect writes. They do not prohibit multiple reviewers from examining the same artifact; overlapping review is often required for independent judgment.

Avoid multi-agent execution when:

- agents would edit the same files or make the same decision independently
- ownership boundaries are unclear
- outputs cannot be inspected or verified by the main agent
- integration cost is larger than the parallelism benefit
- external-agent cost, privacy, account, or authorization is unresolved

## Execution Queue Packets

After a Plan becomes an execution queue, each implementation or production packet should include the full task text plus curated context. Do not rely on a worker reading the whole plan, prior chat, or blackboard.

Minimum execution packet:

```text
task objective
authoritative sources or links
allowed writes or outputs
forbidden paths or decisions
dependencies, interface, or integration point
expected verification
review gates before done
linked findings or repair/recheck state
structure degradation watch
stop or pause signals
```

For parallel workers, make ownership disjoint in the packet itself. If two workers need the same file, decision, or artifact boundary, assign one owner or make the work sequential.

## Structure Degradation Watch

Implementation packets should make structural drift visible without turning every task into a refactor.

Pause the current task and refresh the plan when evidence shows:

- repeated edits concentrate in the same file or component
- a file's responsibility keeps expanding beyond its original task boundary
- patches cross ownership boundaries that the plan treated as separate
- local workarounds, fallbacks, or broad catches accumulate instead of fixing the root cause
- integration requires hidden peer-to-peer state between workers

The next action should be split ownership, extraction, interface simplification, or Spec/Eval/Plan correction before more patches are stacked.

## Context Exposure

Choose exposure mode before wording the packet:

```text
source-first:
  Give original user goal and authoritative source materials before any main-agent summary.
  Use for independent formulation, first-round Spec/Eval/Plan/final review,
  high-risk review, and hallucination resistance.

artifact-focused:
  Give the artifact to inspect plus relevant goal, boundary, and verification criteria.
  Use for Spec, Eval, plan, code, document, deployment, or evidence review.

finding-focused:
  Give one finding or conflict plus the source needed to validate it.
  Use for rebuttal, recheck, and resolving reviewer disagreement.

execution-focused:
  Give the exact work unit, allowed writes or outputs, dependencies, and verification expectation.
  Use for bounded implementation or artifact production.

synthesis-focused:
  Give multiple agent outputs and ask for consolidation without erasing unresolved disagreement.
  Use after independent passes exist, not as the first pass when independence matters.

blackboard-focused:
  Give the moderator-maintained blackboard snapshot plus a targeted challenge
  request. Use for second and later adversarial rounds.
```

For Level 2+ judgment stages, the first round should be blind, independent, and source-first. Do not include other reviewers' conclusions or the main agent's preferred answer. Later rounds may use blackboard-focused context so agents can challenge high-impact claims, weak evidence, omissions, and contradictions.

## Moderator Blackboard

Discussion and review agents do not write shared blackboards by default. The moderator owns the shared state, sends the needed context each round, collects outputs, normalizes them, and writes accepted updates.

Track only useful shared state:

```text
topic
artifact under review
round
claims
evidence
conflicts
open questions
accepted / rejected / unresolved findings
decisions
sign-offs
```

Agents may return their output in chat or write private round files when the environment supports safe disjoint writes. Only the moderator writes shared blackboard, Spec, Eval, Plan, findings, and decisions unless a task explicitly assigns different ownership.

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
  > approved Spec, Eval, plans, goals, ledgers, and prior decisions
  > agent summaries, hypotheses, and opinions
```

Let a subagent reject the main agent's summary when source materials contradict it.

## Anti-Ritualization

- Do not copy the full packet vocabulary into every assignment.
- Do not ask an agent to fill empty sections.
- Do not force the same packet shape across coding, product design, research, writing, deployment, or review work.
- Do not over-specify the expected conclusion.
- Do not split Spec, Eval, Plan, or final quality review by section before a whole-artifact review round.
- Do not treat same-model, same-context agreement as high-confidence consensus.
- Do not hide true boundaries by saying "review everything".
- Do not give all prior discussion to a first-pass reviewer when a smaller source-grounded packet preserves more independence.
- Do not let discussion agents concurrently edit the shared blackboard.
