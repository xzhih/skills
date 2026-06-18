# Lifecycle And Intensity

Use this reference when the task needs intensity routing, Level 3-4 lifecycle structure, or a decision about formulation before execution.

## Contents

- Core Boundary
- Intensity Router
- Levels
- Long-Task Continuity
- Goal Mode Integration
- Bounded Iteration
- Level 4 Phase Shape
- Escalation Signals
- Level 4 Gates
- Artifact Expectations

## Core Boundary

```text
source inspection -> execution preflight -> multi-agent formulation -> finalized proposal / plan -> goal contract -> goal execution -> status checkpoint
```

Goal mode is an execution contract, not an open-ended discussion container. If execution reveals a major missing product, scope, architecture, deployment, or verification decision, pause and return to formulation.

Execution preflight is a short target check before durable writes or external side effects. It should restate the goal, scope, default assumptions, clear requirements, likely ambiguities, and execution plan. It is not a confirmation checkpoint unless a real pause condition appears.

## Intensity Router

Start at the lowest sufficient level. Escalate only when risk, ambiguity, scope, evidence, findings, side effects, or requested confidence requires it.

Routing inputs:

- goal clarity
- scope size and artifact count
- number of domains involved
- failure cost
- reversibility
- external side effects
- data, privacy, security, account, payment, or deployment impact
- required confidence
- verification availability
- reviewer findings
- user-requested intensity

## Levels

```text
Level 0: no multi-agent
  Clear, low-risk, narrow, reversible work. Main agent self-checks.

Level 1: single review
  Small-to-medium work with some risk. One focused reviewer is enough.

Level 2: multi-agent audit
  Specs, plans, medium feature work, cross-domain decisions, research conclusions,
  or work where same-model overfitting is plausible.

Level 3: bounded review-repair convergence
  Complex plans, architecture, high-risk work, significant refactors, repeated failures,
  or pre-release checks. Review -> repair -> fresh review -> continue only while evidence requires.

Level 4: full delivery lifecycle
  Broad outcome-to-delivery goals. Includes formulation, roadmap, plan, goal contract,
  implementation or production, review, deployment/publication, evidence, and handoff.
```

Level 4 is not a verbosity mandate. Use compact artifacts when the deliverable is small, as long as formulation, execution, review, external side effects, and evidence remain traceable.

## Long-Task Continuity

Long-task continuity is contract-driven, not chat-driven and not loop-driven.

For a well-specified heavy task, the main agent should keep moving until completion or pause. Completing a small operation does not justify stopping when the goal contract still has unfinished work.

For Level 3-4 work, maintain an explicit task status:

```text
in_progress:
  Continue to the next bounded action.

paused:
  Stop because a pause condition blocks safe progress.

complete:
  Stop because the goal contract is satisfied by evidence.
```

Every status checkpoint should preserve:

```text
current status
active goal contract
last completed bounded action
latest evidence
open blocker or major findings
next bounded action
why continue, pause, or complete
```

Do not turn an `in_progress` checkpoint into a final summary. Continue with the next bounded action unless a pause condition is met.

Do not ask the user to type "continue" for ordinary continuation. If the next step is implementation sequencing, review strategy, verification choice, agent assignment, or investigation inside the approved goal boundary, resolve it agent-first and proceed.

For user-visible major nodes, announce the node with `目标`, `为什么先做`, and `这一步的效果`, then execute it. Do not use that announcement as a permission request unless the node crosses a pause boundary.

## Goal Mode Integration

Use a host-native goal, task, or workflow mode when the current agent runtime provides one and the selected intensity is Level 3 or Level 4.

If the host exposes an explicit goal interface, such as a create/update goal capability, start or update that goal after the execution contract is clear. Do not substitute a chat summary or status note for host goal mode when the capability is available.

Use host goal mode for execution continuity, not for open-ended formulation. The sequence is:

```text
formulate target -> create goal contract -> start or update host goal mode -> execute bounded actions -> checkpoint status
```

If the host has no goal mode, or the host goal mode is unavailable in the current runtime, emulate continuity with durable project artifacts under `docs/multi-agent-orchestration/` and restore from them before continuing.

## Bounded Iteration

Do not use open-ended loop mode.

Continue only when at least one evidence-backed reason exists:

- a bounded work unit from the plan remains unfinished
- verification failed or is incomplete
- an accepted blocker or major finding remains open
- a repair changed enough scope to require fresh review
- evidence shows the goal contract, plan, or boundary is wrong and must return to formulation

Ordinary next-step uncertainty should be resolved through source materials, runtime evidence, a focused agent pass, or a reversible assumption. It is not a pause reason.

Stop when:

- the goal contract verification passes
- required artifacts and evidence are current
- no accepted blocker or major finding remains unresolved
- deferred findings are minor, out of scope, or explicitly moved to future work

After these conditions pass, complete the run. Additional installation, publication, broader real-world validation, or hardening is blocking only when it is part of the goal contract, the user changes the target, or evidence shows the contract cannot satisfy the user's target.

Pause when:

- authorization, credentials, capability, account access, cost approval, or required external systems are missing
- a non-agent-decidable product, scope, business, privacy, destructive, public, or production decision is required
- verification cannot run and no acceptable substitute exists
- the same blocker repeats without new evidence or a viable repair path
- budget, time, context, or user-defined limits are reached

## Level 4 Phase Shape

Use Level 4 for broad outcome-to-delivery work across domains, not only software projects. The deliverable may be code, a site, a document, a presentation, a research package, an operational plan, a product proposal, a deployed service, or another concrete outcome.

Keep the phases domain-neutral:

```text
formulation:
  Clarify target, constraints, users, risks, success criteria, and default assumptions through source-first agent passes and execution preflight.

strategy:
  Decide artifacts, delegation strategy, review strategy, verification, and side-effect boundaries.

goal contract:
  Freeze execution scope only after formulation is clear enough.

execution or production:
  Implement, create, research, synthesize, or deploy through bounded work units.

completion:
  Prove the result satisfies the target with verification, review, evidence, and handoff.
```

Do not ask the user for implementation mechanics, review strategy, or ordinary tradeoffs that agents can resolve. Ask only when the choice is non-agent-decidable or affects authorization, cost, privacy, destructive/public action, or a critical product/business decision.

If preflight surfaces only ordinary engineering uncertainty, proceed by agent-first resolution, runtime evidence, or a reversible assumption. If it surfaces target, scope, product behavior, account, deployment, privacy, cost, destructive, or public-action uncertainty, pause for the user.

## Escalation Signals

Escalate when:

- the task affects production, deployment, accounts, payments, user data, credentials, privacy, or security
- the task has external side effects such as push, deploy, send, publish, delete, migrate, purchase, or billing changes
- the request requires product, technical, and delivery decisions
- verification is unavailable, weak, or contradicted by evidence
- a reviewer finds an evidence-backed blocker or major issue
- reviewers disagree on target correctness or result correctness
- execution reveals the plan or goal contract is wrong
- the user requests high confidence, multiple agents, external-agent review, or model diversity

Do not escalate just because a template exists, a ledger could be created, multiple agents are available, or a minor finding exists.

## Level 4 Gates

Formulation Gate:

```text
Proves the target is right.
Outputs execution preflight, consolidated proposal, roadmap, plan, and review strategy.
Escalates only non-agent-decidable decisions to the user.
```

Completion Gate:

```text
Proves the result satisfies the target.
Outputs verification, review, deployment/publication evidence, and final handoff.
```

The completion gate is tied to the current deliverable. For a skill-creation task, the gate may be a valid skill package plus evidence that it can produce the intended artifact. For a deployment task, it may include publication evidence. Do not silently swap one gate for another during completion; if evidence shows the contract mismatches the user goal, return to formulation and record why.

Default to one top-level goal contract for Level 4. Split into staged goal contracts only when stages have hard boundaries, independent permissions, independent deliverables, or materially different risks.

Before external side effects such as push, deploy, send, publish, delete, migrate, purchase, or billing changes, confirm the target account, repo/project, branch/environment, and public/production boundary when those are not already explicit and safe.

## Artifact Expectations

```text
Level 0:
  No durable multi-agent artifacts.

Level 1:
  Usually no durable artifacts. Record findings only if a real issue needs tracking.

Level 2:
  Compact review contract and findings ledger when review state must persist.

Level 3:
  Persist goal contract, review contracts, findings ledger, plans, and evidence.

Level 4:
  Persist full staged artifacts: discussions, roadmap, plan, goal contract, reviews,
  findings ledger, deployment/publication evidence, and final handoff.
```
