---
name: multi-agent-orchestration
description: Use when, and only when, the user explicitly requests multi-agent-orchestration, a Spec/Eval-driven multi-agent delivery workflow, multi-agent/subagent/external-agent orchestration, model-diverse or fresh-reviewer adversarial review, or repeated review-repair work.
---

# Multi-Agent Orchestration

## Overview

Run opt-in Spec/Eval-driven delivery workflows where independent agents help formulate the target, define quality, plan, implement, verify, and finish the task.

Multi-agent orchestration is the execution mechanism. The goal is not to make agents talk; it is to build the right Spec, build a useful Eval, execute efficiently, and keep repair moving until evidence proves completion, pause, or a required user decision.

The main agent is the moderator. It owns orchestration, blackboard state, permissions, integration, verification, and final accountability.

Core pattern:

```text
user goal and boundaries
  -> intensity decision
  -> capability cache, discovery, and consent as needed
  -> execution preflight after source inspection
  -> Spec draft from source inspection and user-agent discussion
  -> independent blind same-artifact Spec review
  -> moderator blackboard, adversarial synthesis, and evidence promotion
  -> locked Spec or required user decision
  -> Eval draft for completion and quality
  -> independent blind same-artifact Eval review
  -> Plan draft and same-artifact Plan review
  -> parallel execution map only after ownership boundaries are clear
  -> bounded implementation, integration, tests, and Eval evidence
  -> independent final quality review and repair loop
  -> status checkpoint: continue, pause, or complete
  -> evidence-backed handoff
```

## Explicit Activation

Use this skill only when the user actively asks for multi-agent-orchestration, a Spec/Eval-driven multi-agent workflow, multi-agent/subagent/external-agent orchestration, model-diverse or fresh-reviewer adversarial review, or repeated review-repair work.

Do not self-select this skill only because a task is broad, risky, ambiguous, long-running, likely to exceed context, or needs higher confidence. Without explicit user activation, use ordinary planning, review, verification, or direct execution instead.

If the user explicitly invokes this skill for a narrow, clear, low-risk task, choose Level 0: do the work directly, verify directly, and do not create durable multi-agent artifacts or use external agents.

## Intensity

Start at the lowest sufficient level and escalate only from risk, ambiguity, scope, weak evidence, findings, side effects, or requested confidence.

```text
Level 0:
  Main agent only. Clear, narrow, reversible, low-risk work.

Level 1:
  One focused review or inline reviewer prompt when a small task has some risk.

Level 2:
  Multi-agent judgment for Spec, Eval, Plan, medium work, final review,
  research conclusions, or cross-file/cross-domain decisions.

Level 3:
  Bounded adversarial review-repair convergence for complex, high-risk,
  repeatedly failing, or pre-release work.

Level 4:
  Full Spec/Eval delivery lifecycle: formulation, Spec, Eval, roadmap, plan,
  goal contract, execution or production, review, publication/deployment if
  relevant, evidence, and handoff.
```

For details, read `references/lifecycle-intensity.md`.

## Spec/Eval Delivery Spine

Use this workflow to turn fuzzy goals into deliverable outcomes:

- Spec defines the target, boundaries, users, constraints, and non-goals.
- Eval defines both completion and quality before broad implementation planning.
- Plan explains how to satisfy the locked Spec and Eval, including verification and parallelization.
- Implementation can be partitioned only after ownership, dependencies, interfaces, and verification are clear.
- Final review judges the complete result against Spec and Eval, not only against tests or summaries.

The workflow is domain-neutral but optimized for software-like delivery. For non-code work, map Spec to desired outcome and boundaries, Eval to acceptance rubrics or quality checks, Plan to production steps, Implementation to artifact creation, and Tests to citations, examples, rubrics, or other evidence.

Use light contract shapes for Spec, Eval, and evidence closure when the work must be reviewed, executed, resumed, or verified. They are minimum fields for thinking and handoff, not forms to fill mechanically.

## Lightweight Defaults

Prefer the lightest path that preserves correctness:

- Level 0: do the work directly, verify directly, and create no orchestration artifacts.
- Level 1: use one focused inline review when useful; record only real findings that need tracking.
- Level 2: run a compact audit with bounded packets and normalized findings; avoid durable artifacts unless review state must survive.
- Level 3-4: persist Spec, Eval, goal, plan, task queue, review, findings, and evidence artifacts because convergence, side effects, or handoff need continuity.

Do not create `docs/multi-agent-orchestration/` only because this skill was loaded. Create it only when the selected intensity, repeated review-repair, auditability, external side effects, or handoff requires durable state.

For Level 2+ judgment stages, use a blackboard protocol even when it stays in chat: track topic, claims, evidence, conflicts, open questions, decisions, and sign-offs. Persist a markdown blackboard when the discussion has multiple rounds, affects Spec/Eval/Plan, needs handoff, or runs at Level 3-4.

## Runtime Invariants

- Treat this as a Spec/Eval-driven delivery workflow first; multi-agent routing and lifecycle state are means, not the product.
- The main agent owns orchestration, blackboard state, permissions, integration, verification, and final accountability.
- Start from the user goal and authoritative source materials, not only from the main agent's current framing.
- Use the smallest sufficient orchestration for the selected intensity.
- Use agents to improve target correctness first, Eval quality second, then result correctness.
- Resolve ordinary uncertainty agent-first through source materials, runtime evidence, focused agents, adversarial discussion, safe research, or reversible assumptions.
- Ask the user only for non-agent-decidable choices, authorization, cost, privacy, destructive/public actions, critical product/business/brand/taste/user-facing decisions, or user-defined limits.
- Do not ask the user whether to continue, which internal work unit to do next, or how to sequence ordinary implementation, review, verification, or investigation inside a clear goal boundary.
- Treat host-native model-selectable subagents as first-class capabilities when available.
- Require explicit authorization before sending task content to external, editor, protocol, paid, account-bound, or data-leaving agents.
- Treat agent outputs as claims until normalized through the promotion gate; only evidence-backed, scoped, actionable items can change Spec, Eval, plans, findings ledgers, goals, or final decisions.
- Treat multi-agent agreement as a signal, not a conclusion. Consensus must be earned through adversarial comparison, evidence checking, and targeted rebuttal.
- Maintain one active parent workflow for task-level source of truth. If no parent workflow owns task state, this skill's artifact layout may own it.
- Stop by evidence and unresolved blocker/major status, not by review round count.
- Pause only when required authorization, capability, evidence, verification, external side-effect approval, budget, time, context, user-defined limits, or a non-agent-decidable decision is missing.

## Execution Preflight

Use execution preflight when the selected intensity and task risk justify it: Level 3-4 work, well-specified new projects, behavior-preserving refactors, and other non-trivial development, debugging, documentation, or design tasks inside this workflow.

Before the first write or external side effect, state briefly:

```text
Goal, scope, and default understanding in 1-3 sentences.
Clear requirements.
Possible ambiguities or highest-risk misunderstanding.
Execution plan or first major nodes.
```

Do enough source, repository, runtime, or requirement inspection first to avoid inventing the preflight. Do not modify durable outputs before the preflight unless the user explicitly requested immediate execution or the action is a reversible inspection.

If an ambiguity affects target, scope, product behavior, privacy/cost boundary, destructive/public action, account, deployment, or other non-agent-decidable decision, pause and ask the user. Otherwise record the default assumption and continue; do not make the user confirm ordinary implementation choices.

If the user explicitly asks for preflight or planning only, stop after the plan. Otherwise preflight is not a stopping point: create or update the Spec, Eval, plan, or goal contract when needed, then continue execution inside the stated boundaries.

## Major Node Announcement

For Level 3-4 work, announce meaningful major nodes before executing them:

```text
目标：xxx
为什么先做：
这一步的效果：
```

Use this to focus the current bounded action and expose intent to the user. Do not use it for every shell command, small edit, routine verification, or minor repair.

After announcing, execute without waiting unless a pause condition applies.

## Plan Execution Contract

For Level 3-4 work, after Spec, Eval, and Plan are locked, convert broad execution into an explicit task queue before implementation or production begins.

Each queue item should carry only what is needed to execute correctly:

```text
task objective
authoritative source context
scope, ownership, and allowed writes or outputs
dependencies, interfaces, or integration point
verification expectation
review gates
linked findings or repair state
structural drift signals
status
pause or blocker signals
```

Execution rules:

- Give each worker the exact task and curated context. Do not rely on workers reading the whole plan.
- Continue through the queue while the workflow status is `in_progress`; progress summaries and checkpoints are not stop points.
- Gate each task in this order: implement or produce, self-check, Spec compliance review, Eval/quality review, repair and re-review if needed.
- Do not claim a task, stage, or final result is complete without fresh verification evidence the moderator can inspect. Agent reports are claims until verified.
- Link accepted blocker or major findings back to the affected queue item, or to the Spec/Eval/Plan correction that must happen before the queue can continue.
- When verification fails, investigate the root cause before repair. Do not mask the issue with fallback behavior, broad catches, suppression, or graceful degradation unless the Spec/Eval explicitly requires it.
- If repeated edits concentrate in one file, a file's responsibility keeps expanding, or patches cross task boundaries, pause the current queue item and refresh the plan toward split ownership, extraction, or simplification before stacking more patches.
- Parallelize only across independent tasks with clear ownership and integration boundaries. Otherwise execute sequentially.

## Level 3-4 Delivery Loop

For Level 3-4 work, follow this loop until the run is `complete` or `paused`:

```text
1. Inspect authoritative sources, repo/runtime state, and existing workflow artifacts.
2. Run execution preflight for the current scope when it has not already been done.
3. Draft or update Spec; run independent blind same-artifact Spec review before locking it.
4. Draft or update Eval; run independent blind same-artifact Eval review before broad implementation planning.
5. Draft or update Plan; review the same whole Plan before locking execution boundaries.
6. Create or update the goal contract; use host goal/task mode only when host policy and user/system/developer authorization permit it.
7. Create or refresh the task queue when broad execution is starting.
8. Discover or refresh only the agent capabilities needed for the current phase, with consent boundaries respected.
9. Announce the next meaningful major node, then execute it.
10. Execute the next queued task or independent task group; delegate review, rebuttal, implementation, repair, synthesis, or verification packets when they improve correctness.
11. Normalize agent outputs through the promotion gate and update blackboard state when used.
12. Verify or review the current result against Spec, Eval, and the goal contract.
13. Update document state and checkpoint exactly one status: `in_progress`, `paused`, or `complete`.
14. If `in_progress`, immediately choose and run the next bounded action.
```

This loop is the default behavior for heavy use cases such as a well-specified new project, complete requirements document, high-risk release, or behavior-preserving refactor. A checkpoint is not a stopping point unless the status is `paused` or `complete`.

Each loop iteration is complete only when:

- the current source of truth reflects any changed goal, plan, finding, or status
- the active task queue reflects current task status, ownership, evidence, and next action when a queue is in use
- promoted agent output has evidence, scope, severity or decision impact, and a next action
- task gates are passed or the open blocker is recorded with the next repair/recheck step
- verification evidence has been run, captured, or explicitly identified as the pause blocker
- the next status is exactly one of `in_progress`, `paused`, or `complete`
- `in_progress` immediately maps to the next bounded action

Do not treat "agent replied", "all agents agreed", "review round finished", or "status was updated" as completion by itself.

## Autonomous Continuation

For heavy use cases such as a well-specified new project, a complete requirements document, or a behavior-preserving refactor, treat the user's activation as authorization to keep executing inside the stated Spec/Eval boundaries until the goal contract is satisfied or a real pause condition appears.

If status is `in_progress`, continue immediately with the next bounded action. A message like "next I recommend..." or "you can continue by..." is a failure mode unless it is paired with actual continuation in the same run.

For behavior-preserving refactors, the default next step is to preserve and prove invariants: identify current behavior, plan bounded changes, repair, run verification, and use fresh review when the change or evidence warrants it. Do not ask the user to pick ordinary refactor sequencing when the preservation goal and evidence can determine it.

For status definitions, stop rules, and pause rules, read `references/lifecycle-intensity.md`.

## Document State Maintenance

For Level 3-4 work with durable state, keep task documents current as execution advances. Do not wait until the final response to repair stale state.

Update the owning artifact in the same bounded action after execution preflight, Spec/Eval/goal/plan/roadmap/parent workflow/boundary changes, major nodes, finding status changes, capability or authorization changes, and before pause, completion, or handoff.

When host goal/task mode is active, keep host status and document status aligned at each checkpoint. If they disagree, resolve the conflict from evidence before continuing.

For detailed update rules, read `references/artifact-layout.md`.

## Capability And Consent

Before assigning agents, decide whether discovery is needed for the selected intensity.

- Level 0: no capability discovery.
- Level 1: check only the specific reviewer mechanism if needed.
- Level 2+: read cached capabilities first. If the cache is missing or insufficient, do the minimal safe or already-authorized discovery needed for the current audit.
- Level 3-4: refresh relevant capabilities when the cache is missing, stale, contradicted, or insufficient.

Capability cache belongs to the target project:

```text
docs/multi-agent-orchestration/capabilities/current-environment.md
```

Record only agent-like participants: host subagents, shell-callable agents, editor/protocol agents, agent services, or future participant surfaces that can accept delegated work and return independent reasoning, review, plan, implementation, synthesis, or verification evidence.

Generic tools, package managers, shells, scripts, and MCP task helpers are execution tools, not agent capabilities.

External-agent availability is not permission. Ask before sending task content to any external, paid, account-bound, editor, protocol, networked, or data-leaving agent unless the user already authorized that use.

For multi-round external agents, keep one explicit session per agent and record the session mapping before using resume or continue flags.

For capability details, read `references/capability-cache.md`. For external-agent sessions, `opencode`, resume flags, or multi-round external review, read `references/external-agent-sessions.md`.

## Workflow Integration

Before writing task-level artifacts, identify whether another workflow already owns the current Spec, Eval, plan, task queue, roadmap, goal, or task status.

- If yes, treat it as the active parent workflow. Do not create competing top-level Specs, Evals, plans, or task queues under this skill.
- If no, this skill may own the task-level artifacts under `docs/multi-agent-orchestration/`.
- Always keep private orchestration state under this skill: capability cache, task packets, agent outputs, review contracts, findings ledger, repair/recheck state, status checkpoints, and evidence.
- If the user later selects a different parent workflow, switch the active source of truth and stop maintaining the old task-level document except as history or a linked input.

For details, read `references/workflow-integration.md`.

## Delegation

Agents can formulate, review, rebut, recheck, implement bounded work, research, synthesize, produce artifacts, or verify evidence. Use implementation or artifact-production agents only when ownership boundaries are clean and the main agent can inspect, integrate, and verify the output.

Every delegated task needs a bounded task packet. Keep it as small as correctness allows.

Minimum invariant:

```text
What should this agent do?
What source material is authoritative?
What is inside and outside scope?
What kind of output is useful?
What evidence or reasoning standard applies?
When should the agent stop or report a blocker?
```

Choose assignment intent and context exposure before wording the packet. Prefer source-first packets for independent formulation and high-risk review; use artifact-focused, finding-focused, execution-focused, or synthesis-focused packets when those fit the phase.

Choose the delegation topology explicitly:

- Redundant judgment: multiple agents review the same whole Spec, Eval, Plan, or final result independently.
- Complementary lens review: multiple agents review the same whole artifact with different focus areas.
- Partitioned implementation: agents implement different modules, files, or artifacts after ownership boundaries are clear.

For Spec, Eval, Plan, and final quality review, default to redundant or complementary same-artifact review. Do not shard the artifact by section before whole-artifact review unless doing targeted follow-up after the first round.

Discussion and review agents do not write shared blackboards, Spec, Eval, Plan, findings, or decision files by default. The moderator sends each round's context, collects outputs, normalizes them, and writes shared state. Implementation agents may edit project files only inside explicit ownership boundaries.

When using external agents for multiple rounds, reuse only the intended agent's explicit session ID. Do not use "continue the last session" semantics for parallel reviewers.

For details, read `references/task-packets.md`.

## Outputs And Artifacts

Agent output is not automatically source of truth.

Normalize raw output into:

```text
evidence | finding | hypothesis | proposal | gap | artifact | decision_candidate
```

Only evidence-backed, scoped, actionable items can change system state. Gaps should route through agent-first resolution before user escalation. Findings need evidence, impact, severity, scope, and next action before entering a ledger.

Default target-project layout:

```text
docs/multi-agent-orchestration/
  index.md
  blackboards/
  capabilities/
  specs/
  evals/
  goals/
  discussions/
  roadmaps/
  plans/
  tasks/
  agent-outputs/
  reviews/
  evidence/
```

Do not create durable artifacts just because a template exists. Use Level 0-1 lightweight forms unless risk, ambiguity, or continuity requires persistence.

For Level 4, "full staged artifacts" means every needed decision and evidence path is represented. It does not mean every artifact must be long or schema-heavy.

For evidence closure shape and artifact details, read `references/output-normalization.md` and `references/artifact-layout.md`.

## Review And Convergence

Reviewer angles are focus areas, not blinders. Reviewers may challenge the Spec, Eval, plan, evidence, assumptions, and contract itself when source materials justify it.

For Level 2+ judgment stages, run the first round as independent blind source-first review over the same whole artifact. In later rounds, the moderator sends the blackboard state and asks agents to challenge high-impact claims, weak evidence, omissions, contradictions, and unresolved questions.

Findings must be evidence-backed and severity-graded:

```text
blocker | major | minor | question | note
```

Level 2 is a multi-agent audit. Level 3 is bounded review-repair convergence. Escalate to Level 3 when blocker/major findings affect target correctness, Eval quality, result correctness, verification, or convergence.

Stop only when no accepted blocker or major finding remains open, open questions are answered, converted to safe assumptions, deferred as non-blocking, or escalated to the user, and the moderator verifies the current artifact against Spec/Eval/plan/evidence. Agent sign-off is useful only when it states blocker/major status, remaining minor/question items, evidence checked, and confidence.

For review contracts, findings ledgers, stop rules, and pause rules, read `references/review-convergence.md`.

## Reference Routing

Read only what the current intensity needs:

- `references/lifecycle-intensity.md`: intensity routing, lifecycle boundaries, formulation and completion gates.
- `references/workflow-integration.md`: parent workflow ownership, source maps, private orchestration state, and promoted updates.
- `references/capability-cache.md`: cache-first discovery, capability profile vocabulary, consent, freshness.
- `references/external-agent-sessions.md`: external shell/editor/protocol agent sessions, `opencode` multi-round use, session ledgers, and resume failure handling.
- `references/task-packets.md`: adaptive task packet invariants, assignment intent, context exposure, non-review delegation.
- `references/output-normalization.md`: promotion gate and normalized item types.
- `references/artifact-layout.md`: Spec/Eval/evidence contract shapes, target-project docs layout, resume order, status checkpoints, and artifact meanings.
- `references/review-convergence.md`: review contracts, findings ledgers, severity, stop and pause conditions.

Do not expose internal schemas, full packet vocabulary, capability profiles, or reviewer transcripts to the user unless they help the user decide or audit the work.
