# Lifecycle And Intensity

Use this reference when the task needs intensity routing or Level 3-4 lifecycle structure. For formulation before execution, use `agent-grilling` and consume its snapshot here.

## Contents

- Core Boundary
- Intensity Router
- Levels
- Spec/Eval Delivery Spine
- Long-Task Continuity
- Goal Mode Integration
- Plan Execution Contract
- Bounded Iteration
- Level 4 Phase Shape
- Escalation Signals
- Level 4 Gates
- Artifact Expectations

## Core Boundary

```text
source inspection -> optional formulation -> requirements -> Spec -> Eval -> Plan -> goal contract when needed -> execution -> review/repair -> status checkpoint
```

In the current skill set, those phase artifacts are normally owned by:

```text
requirements: agent-requirements-analysis
Spec: agent-spec
Eval: agent-eval
Plan: agent-plan
parallel execution: agent-lanes
returned work: integration-review
durable project source-of-truth docs: doc-driven-workflows
```

This skill coordinates and persists orchestration state only where continuity,
review convergence, external-agent sessions, or evidence tracking require it.

Goal mode is an execution contract, not an open-ended discussion container. If execution reveals a major missing product, scope, architecture, deployment, or verification decision, pause and route to `agent-grilling` or the user as appropriate.

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

After selecting the initial level, follow the Agent Model Profile dispatch gate
when model-selectable subagents, model-diverse review, or external agents may be
used. Then proceed with the approved participant profile.

## Levels

```text
Level 0: no multi-agent
  Clear, low-risk, narrow, reversible work. Main agent self-checks.

Level 1: single review
  Small-to-medium work with some risk. One focused reviewer is enough.

Level 2: multi-agent audit
  Specs, Evals, plans, medium feature work, final quality review, cross-domain
  decisions, research conclusions, or work where same-model overfitting is
  plausible.

Level 3: bounded review-repair convergence
  Complex Spec/Eval/Plan work, architecture, high-risk work, significant
  refactors, repeated failures, or pre-release checks. Review -> repair ->
  fresh review -> continue only while evidence requires.

Level 4: full delivery lifecycle
  Broad outcome-to-delivery goals. May consume an `agent-grilling` snapshot,
  then includes Spec, Eval, roadmap,
  plan, goal contract, implementation or production, review,
  deployment/publication, evidence, and handoff.
```

Level 4 is not a verbosity mandate. Use compact owner artifacts when the
deliverable is small, as long as formulation, execution, review, external side
effects, and evidence remain traceable.

## Spec/Eval Delivery Spine

Use the focused owner skills as the main control surfaces:

```text
Requirements:
  Goal, users, flow, scope, non-goals, constraints, risks, confirmed/draft/open,
  and true user decisions.

Spec:
  Target, boundaries, users, constraints, non-goals, and user-decided tradeoffs.

Eval:
  Completion checks plus quality checks that prove the result is good enough.

Plan:
  Execution path that satisfies Spec and Eval, including verification,
  parallelization boundaries, and review strategy.
```

For Level 2+ judgment stages, review the same whole Spec, Eval, Plan, or final result before sharding into targeted follow-ups. Parallel implementation is appropriate only after the plan defines clear ownership, dependencies, interfaces, and verification.

## Long-Task Continuity

Long-task continuity is contract-driven, not chat-driven and not loop-driven.

For a well-specified heavy task, the main agent should keep moving until completion or pause. Completing a small operation does not justify stopping when the goal contract still has unfinished work.

For Level 3-4 work, maintain an explicit workflow status:

```text
in_progress:
  Continue to the next bounded action.

paused:
  Stop because a pause condition blocks safe progress.

complete:
  Stop because Spec, Eval, and the goal contract are satisfied by evidence.
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

For Level 3-4 meaningful major nodes, announce the node with `目标`, `为什么先做`, and `这一步的效果`, then execute it. Use this as a focus and intent check, not as a permission request unless the node crosses a pause boundary. Do not use it for every command, small edit, routine verification, or minor repair.

## Goal Mode Integration

Use a host-native goal, task, or workflow mode when the current agent runtime provides one, host policy permits it, and user/system/developer authorization allows it for the selected Level 3 or Level 4 work.

If the host exposes an explicit goal interface, such as a create/update goal capability, start or update that goal after the execution contract is clear and permitted. Do not substitute a chat summary or status note for host goal mode when the capability is available and authorized.

Use host goal mode for execution continuity, not for open-ended formulation. Resolve open-ended formulation with `agent-grilling` before creating a goal contract. The sequence is:

```text
lock Spec/Eval/Plan -> create goal contract -> start or update host goal mode when permitted -> execute bounded actions -> checkpoint status
```

If the host has no goal mode, or the host goal mode is unavailable in the
current runtime, emulate continuity with the active parent workflow plus a thin
orchestration index under `docs/agent-self-driving/`. Restore owner
artifacts first, then private orchestration state.

## Plan Execution Contract

After Spec, Eval, and Plan are locked, translate broad execution into a queue of bounded tasks. The queue is the bridge between a good plan and long-running implementation.

Each queued task should have:

```text
objective
source context
scope and ownership
allowed writes or outputs
dependencies and integration point
verification
review gates
pause or blocker signals
linked findings or repair state
status
```

Default task states:

```text
queued
active
implemented_or_produced
self_checked
spec_reviewed
eval_reviewed
needs_repair
repairing
waiting_recheck
blocked
needs_context
needs_user_decision
done
```

Use `blocked`, `needs_context`, or `needs_user_decision` only when the next action cannot be chosen safely by source inspection, runtime evidence, agent review, or reversible assumption. Do not mark a task `done` while it has an accepted blocker or major finding that is not fixed and rechecked.

Link accepted blocker or major findings to the affected queue item, or to the Spec/Eval/Plan correction that must happen before the queue can continue.

Do not stop after one queued task if the goal remains `in_progress`. Record evidence and continue to the next queued task or independent task group. Parallel execution is appropriate only when ownership and integration boundaries are clear.

Structural degradation is a reason to refresh the plan before further patching. Treat repeated edits to the same file, expanding file responsibility, cross-boundary patches, or workaround accumulation as evidence to split ownership, extract structure, simplify interfaces, or return to Spec/Eval/Plan if the task boundary is wrong.

## Bounded Iteration

Do not use open-ended loop mode.

Continue only when at least one evidence-backed reason exists:

- a bounded work unit from the plan remains unfinished
- a task queue item is active, queued, under repair, or waiting for recheck
- an accepted blocker or major finding is linked to a queue item or plan correction that is not fixed and rechecked
- verification failed or is incomplete
- an accepted blocker or major finding remains open
- structural degradation shows the plan should be split, simplified, or corrected before more patches
- a repair changed enough scope to require fresh review
- evidence shows the Spec, Eval, goal contract, plan, or boundary is wrong and must route to `agent-grilling` or be revised before execution continues

Ordinary next-step uncertainty should be resolved through source materials, runtime evidence, a focused agent pass, or a reversible assumption. It is not a pause reason.

Stop when:

- Spec, Eval, and goal contract verification pass
- every required task is done, deferred as non-blocking, or recorded as blocked by a real pause condition
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
formulation snapshot:
  Consume `agent-grilling` output when target, constraints, users, risks,
  success criteria, or default assumptions were unclear.

spec:
  Lock the target, boundaries, non-goals, and user-decided tradeoffs, or pause
  for the user when those choices are not agent-decidable.

eval:
  Define completion and quality criteria before broad implementation planning.

strategy:
  Decide artifacts, delegation topology, review strategy, verification, and
  side-effect boundaries.

goal contract:
  Freeze execution scope only after Spec and Eval are clear enough.

execution or production:
  Implement, create, research, synthesize, or deploy through the task queue.

completion:
  Prove the result satisfies Spec and Eval with verification, review, evidence,
  and handoff.
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
- execution reveals the Spec, Eval, plan, or goal contract is wrong
- the user requests high confidence, multiple agents, external-agent review, or model diversity

Do not escalate just because a template exists, a ledger could be created, multiple agents are available, or a minor finding exists.

## Level 4 Gates

Formulation Gate:

```text
Proves the target is right.
Outputs execution preflight, Spec contract, open user decisions if any, roadmap
shape, and review strategy.
Escalates only non-agent-decidable decisions to the user.
```

Eval Gate:

```text
Proves the quality bar is usable.
Outputs Eval contract: completion checks, quality checks, evidence requirements,
defect severity meanings, pass/fail decision rule, and final review strategy.
```

Completion Gate:

```text
Proves the result satisfies Spec and Eval.
Outputs evidence closure: criteria closed, verification, review or recheck
status, deployment/publication evidence when relevant, quality judgment, and
final handoff.
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
  Compact blackboard, review contract, and findings ledger when review state
  must persist.

Level 3:
  Persist Spec/Eval/goal contract, blackboard, review contracts, findings
  ledger, plans, task queue, and evidence.

Level 4:
  Persist full staged owner artifacts and orchestration state: requirements,
  Spec, Eval, Plan, task queue, reviews, findings ledger, evidence, and final
  handoff. Prefer the focused owner locations; use
  `docs/agent-self-driving/` for blackboards, private agent outputs,
  review convergence state, evidence links, and a source map. Use
  `docs/dev-flow/capabilities/` for capability/session state.
```
