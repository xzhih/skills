---
name: multi-agent-orchestration
description: Use when, and only when, the user explicitly requests multi-agent-orchestration, a multi-agent long-task workflow, subagents, external agents, model diversity, fresh reviewers, or repeated review-repair work.
---

# Multi-Agent Orchestration

## Overview

Run opt-in long-task workflows where independent agents help formulate, implement, verify, and finish the task.

Multi-agent orchestration is the execution mechanism. The goal is not to make agents talk; it is to keep long work moving until evidence proves completion, pause, or a required user decision.

The main agent owns orchestration, permissions, integration, verification, and final accountability.

Core pattern:

```text
user goal
  -> intensity decision
  -> capability cache, discovery, and consent as needed
  -> bounded formulation, review, or work task packets
  -> independent outputs
  -> main-agent promotion gate
  -> finalized proposal, plan, or execution boundary
  -> goal contract and host goal/task mode when available
  -> bounded execution, review, repair, or production
  -> status checkpoint: continue, pause, or complete
  -> evidence-backed handoff
```

## Explicit Activation

Use this skill only when the user actively asks for multi-agent-orchestration, a multi-agent long-task workflow, subagents, external agents, model diversity, fresh reviewers, or repeated review-repair work.

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
  Multi-agent audit for specs, plans, medium work, research conclusions,
  or cross-file/cross-domain decisions.

Level 3:
  Bounded review-repair convergence for complex, high-risk, repeatedly failing,
  or pre-release work.

Level 4:
  Full outcome-to-delivery lifecycle: formulation, roadmap, plan, goal contract,
  execution or production, review, publication/deployment if relevant, evidence,
  and handoff.
```

For details, read `references/lifecycle-intensity.md`.

## Lightweight Defaults

Prefer the lightest path that preserves correctness:

- Level 0: do the work directly, verify directly, and create no orchestration artifacts.
- Level 1: use one focused inline review when useful; record only real findings that need tracking.
- Level 2: run a compact audit with bounded packets and normalized findings; avoid durable artifacts unless review state must survive.
- Level 3-4: persist goal, plan, review, findings, and evidence artifacts because convergence, side effects, or handoff need continuity.

Do not create `docs/multi-agent-orchestration/` only because this skill was loaded. Create it only when the selected intensity, repeated review-repair, auditability, external side effects, or handoff requires durable state.

## Runtime Invariants

- Treat this as a long-task workflow first; multi-agent routing is a means, not the product.
- The main agent owns orchestration, permissions, integration, verification, and final accountability.
- Start from the user goal and authoritative source materials, not only from the main agent's current framing.
- Use the smallest sufficient orchestration for the selected intensity.
- Use agents to improve target correctness first, then result correctness.
- Resolve ordinary uncertainty agent-first through source materials, runtime evidence, focused agents, safe research, or reversible assumptions.
- Ask the user only for non-agent-decidable choices, authorization, cost, privacy, destructive/public actions, or critical product decisions.
- Do not ask the user whether to continue, which internal work unit to do next, or how to sequence ordinary implementation, review, verification, or investigation inside a clear goal boundary.
- Treat host-native model-selectable subagents as first-class capabilities when available.
- Require explicit authorization before sending task content to external, editor, protocol, paid, account-bound, or data-leaving agents.
- Treat agent outputs as claims until normalized through the promotion gate; only evidence-backed, scoped, actionable items can change plans, findings ledgers, goals, or final decisions.
- Maintain one active parent workflow for task-level source of truth. If no parent workflow owns task state, this skill's artifact layout may own it.
- Stop by evidence and unresolved blocker/major status, not by review round count.
- Pause only when required authorization, capability, evidence, verification, external side-effect approval, or a non-agent-decidable user decision is missing.

## Execution Preflight

Use execution preflight for Level 3-4 work, well-specified new projects, behavior-preserving refactors, and other non-trivial development, debugging, documentation, or design tasks.

Before the first write or external side effect, state briefly:

```text
Goal, scope, and default understanding in 1-3 sentences.
Clear requirements.
Possible ambiguities or highest-risk misunderstanding.
Execution plan or first major nodes.
```

Do enough source, repository, runtime, or requirement inspection first to avoid inventing the preflight. Do not modify durable outputs before the preflight unless the user explicitly requested immediate execution or the action is a reversible inspection.

If an ambiguity affects target, scope, product behavior, privacy/cost boundary, destructive/public action, account, deployment, or other non-agent-decidable decision, pause and ask the user. Otherwise record the default assumption and continue; do not make the user confirm ordinary implementation choices.

If the user explicitly asks for preflight or planning only, stop after the plan. Otherwise preflight is not a stopping point: create or update the goal contract when needed, then continue execution inside the stated boundaries.

## Heavy Task Run Loop

For Level 3-4 work, follow this loop until the run is `complete` or `paused`:

```text
1. Inspect authoritative sources, repo/runtime state, and existing workflow artifacts.
2. Run execution preflight.
3. Create or update the goal contract; use host goal/task mode when available.
4. Discover or refresh only the agent capabilities needed for the current phase, with consent boundaries respected.
5. Announce the major node, then execute it.
6. Delegate bounded formulation, implementation, review, repair, synthesis, or verification packets when they improve correctness.
7. Normalize agent outputs through the promotion gate.
8. Verify or review the current result against the goal contract.
9. Update document state and checkpoint exactly one status: `in_progress`, `paused`, or `complete`.
10. If `in_progress`, immediately choose and run the next bounded action.
```

This loop is the default behavior for heavy use cases such as a well-specified new project, complete requirements document, high-risk release, or behavior-preserving refactor. A checkpoint is not a stopping point unless the status is `paused` or `complete`.

Each loop iteration is complete only when:

- the current source of truth reflects any changed goal, plan, finding, or status
- promoted agent output has evidence, scope, severity or decision impact, and a next action
- verification evidence has been run, captured, or explicitly identified as the pause blocker
- the next status is exactly one of `in_progress`, `paused`, or `complete`
- `in_progress` immediately maps to the next bounded action

Do not treat "agent replied", "review round finished", or "status was updated" as completion by itself.

For user-facing major nodes, use this compact format before executing the node:

```text
目标：xxx
为什么先做：
这一步的效果：
```

Use this for meaningful plan nodes, not every shell command, file edit, or small verification step. After reporting the node, execute it; do not wait for permission unless a pause condition applies.

## Autonomous Continuation

For heavy use cases such as a well-specified new project, a complete requirements document, or a behavior-preserving refactor, treat the user's activation as authorization to keep executing inside the stated boundaries until the goal contract is satisfied or a real pause condition appears.

If status is `in_progress`, continue immediately with the next bounded action. A message like "next I recommend..." or "you can continue by..." is a failure mode unless it is paired with actual continuation in the same run.

For behavior-preserving refactors, the default next step is to preserve and prove invariants: identify current behavior, plan bounded changes, repair, run verification, and use fresh review when the change or evidence warrants it. Do not ask the user to pick ordinary refactor sequencing when the preservation goal and evidence can determine it.

For status definitions, stop rules, and pause rules, read `references/lifecycle-intensity.md`.

## Document State Maintenance

For Level 3-4 work with durable state, keep task documents current as execution advances. Do not wait until the final response to repair stale state.

Update the owning artifact in the same bounded action after execution preflight, goal/plan/roadmap/parent workflow/boundary changes, major nodes, finding status changes, capability or authorization changes, and before pause, completion, or handoff.

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

For details, read `references/capability-cache.md`.

## Workflow Integration

Before writing task-level artifacts, identify whether another workflow already owns the current spec, plan, roadmap, goal, or task status.

- If yes, treat it as the active parent workflow. Do not create competing top-level plans or specs under this skill.
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

Do not assign multiple agents to overlapping writes, shared decisions, or hidden state without explicit coordination through artifacts and main-agent integration.

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
  capabilities/
  goals/
  discussions/
  roadmaps/
  plans/
  reviews/
  evidence/
```

Do not create durable artifacts just because a template exists. Use Level 0-1 lightweight forms unless risk, ambiguity, or continuity requires persistence.

For Level 4, "full staged artifacts" means every needed decision and evidence path is represented. It does not mean every artifact must be long or schema-heavy.

For details, read `references/output-normalization.md` and `references/artifact-layout.md`.

## Review And Convergence

Reviewer angles are focus areas, not blinders. Reviewers may challenge the goal, plan, evidence, assumptions, and contract itself when source materials justify it.

Findings must be evidence-backed and severity-graded:

```text
blocker | major | minor | question | note
```

Level 2 is a multi-agent audit. Level 3 is bounded review-repair convergence. Escalate to Level 3 when blocker/major findings affect target correctness, result correctness, verification, or convergence.

For review contracts, findings ledgers, stop rules, and pause rules, read `references/review-convergence.md`.

## Reference Routing

Read only what the current intensity needs:

- `references/lifecycle-intensity.md`: intensity routing, lifecycle boundaries, formulation and completion gates.
- `references/workflow-integration.md`: parent workflow ownership, source maps, private orchestration state, and promoted updates.
- `references/capability-cache.md`: cache-first discovery, capability profile vocabulary, consent, freshness.
- `references/task-packets.md`: adaptive task packet invariants, assignment intent, context exposure, non-review delegation.
- `references/output-normalization.md`: promotion gate and normalized item types.
- `references/artifact-layout.md`: target-project docs layout, resume order, status checkpoints, and artifact meanings.
- `references/review-convergence.md`: review contracts, findings ledgers, severity, stop and pause conditions.

Do not expose internal schemas, full packet vocabulary, capability profiles, or reviewer transcripts to the user unless they help the user decide or audit the work.
