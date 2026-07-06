---
name: multi-agent-orchestration
description: Use when, and only when, the user explicitly requests multi-agent-orchestration, one focused reviewer or researcher agent, fresh-eyes review, a Spec/Eval-driven multi-agent delivery workflow, model-diverse or adversarial review, external-agent policy, repeated review-repair, or higher-intensity multi-agent convergence. Do not use for routine subagent/worktree lane dispatch or lightweight goal/path pressure testing.
---

# Multi-Agent Orchestration

Opt-in orchestration for Spec/Eval delivery, adversarial review-repair, external-agent policy, and higher-confidence multi-agent convergence. The main thread is always the moderator: it owns the blackboard, permissions, integration, verification, and final claims.

## Iron Law

```text
MULTI-AGENT OUTPUT IS EVIDENCE INPUT, NOT A CONCLUSION.
```

Agents may improve coverage, challenge framing, and find defects, but the moderator must normalize claims, inspect source evidence, resolve conflicts, and decide what is promoted. Agreement is a signal; verified evidence is the gate.

## Quick Decision

Use this skill only when the user explicitly asks for one of these:

- `multi-agent-orchestration` or a Spec/Eval-driven workflow
- one focused reviewer, researcher, or fresh-eyes agent for a bounded artifact or question
- multiple agents for target correctness, Eval quality, or final result correctness
- model-diverse, fresh-reviewer, adversarial, or repeated review-repair work
- external, shell, editor, protocol, or account-bound agents
- a long task that needs durable multi-agent state and evidence-backed closure

Do not use it for:

- routine subagent/worktree lane dispatch with clear ownership; use [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md)
- unclear goals, branches, or lane boundaries that need formulation first; use [agent-grilling](../agent-grilling/SKILL.md)
- returned lane handoffs; use [integration-review](../integration-review/SKILL.md)
- ordinary document-led development routing; start with [development-workflows](../development-workflows/SKILL.md) and [project-context](../project-context/SKILL.md)
- confidence theater: broad, risky, or long work is not enough without an explicit multi-agent/Spec/Eval/review-repair trigger

## First Move

1. Restore the user goal, current repo/runtime state, and any active parent workflow.
2. Select the lowest sufficient intensity from the ladder below.
3. Check whether host subagents or external agents are actually needed for this phase.
4. Ask the user before sending task content to external, paid, account-bound, editor, protocol, networked, or data-leaving agents unless they already authorized that exact use.

## Intensity Ladder

```text
Level 0: main agent only
  Clear, narrow, reversible work. Do the work directly and verify directly.

Level 1: one focused review or research pass
  Small-to-medium work with some risk or a bounded question. Use one reviewer,
  researcher, or inline review and keep it lightweight.

Level 2: multi-agent audit
  Spec, Eval, Plan, final review, cross-domain judgment, research conclusion,
  or result-correctness check where one framing may miss issues.

Level 3: bounded review-repair convergence
  Blocker/major findings, repeated failures, significant refactors, high-risk
  release checks, or review -> repair -> fresh review loops.

Level 4: full delivery lifecycle
  Broad outcome-to-delivery work: formulation, Spec, Eval, roadmap, plan, goal
  contract, execution, review, publication/deployment when relevant, evidence,
  and handoff.
```

Read `references/lifecycle-intensity.md` whenever routing is not obvious or the work is Level 3-4.

## Spec/Eval Spine

For Level 2+ delivery work, use Spec and Eval as the control surfaces:

```text
source inspection
  -> optional agent-grilling formulation snapshot
  -> execution preflight
  -> Spec draft/review/lock
  -> Eval draft/review/lock
  -> Plan draft/review/lock
  -> goal contract and task queue when needed
  -> execution, review, repair, verification
  -> evidence-backed status: in_progress | paused | complete
```

Keep artifacts compact. Full lifecycle does not mean long documents; it means the target, Eval, plan, side effects, evidence, and stop/pause state are traceable.

## Minimum Execution Gates

These gates stay in the entry file because missing them changes behavior:

- Before dispatch or final claims, read the reference that owns the active phase. Use `lifecycle-intensity.md` for stop/pause/continue rules, `task-packets.md` before delegation, `output-normalization.md` before promoting agent output, and `review-convergence.md` before accepting review results.
- For Level 2+ judgment, first review the same whole artifact blind/source-first. If a blocker, major issue, startability concern, verification concern, or high-impact conflict appears, run an adversarial convergence round before repair or final acceptance.
- Minimum convergence round: give the reviewer the blackboard or challenged claim, require blocker/major/minor/question findings with evidence, repair or reject only evidence-backed blocker/major findings, then recheck until no accepted blocker/major remains or a real pause condition appears.
- Every delegated task needs a bounded packet: task, authoritative sources, inside/outside scope, output format, evidence standard, and blocker/stop condition.
- Preserve reviewer or external-agent session identity when rebuttal or recheck may be needed. Do not use "last session" semantics for parallel or adversarial reviewers.
- Stop by evidence, not round count. Accepted blocker/major findings stay open until fixed and rechecked, rejected with evidence, deferred as non-blocking, or escalated by a real pause condition.

## Runtime Capability Contract

Before dispatching agents, separate these states:

```text
present does not mean runnable
runnable does not mean authenticated
authenticated does not mean authorized_for_task
available does not mean suitable
```

If model-selectable agents, model-diverse review, or external agents may be used, restore or create the Agent Model Profile: implementation model(s), review model(s), external model(s), allowed phases, privacy/cost limits, and fallbacks.

If external agents would improve confidence, ask for:

```text
Use external agents for this workflow?
Allowed external agent(s):
Allowed model(s):
Allowed phases:
Privacy/cost limits:
```

When capabilities are missing, degrade to the lightest host-native or main-agent path and record that limitation. Do not turn unavailable automation into fake multi-agent evidence.

## Moderator Rules

- Start from authoritative source materials, not from the moderator's preferred framing.
- Use agents to improve target correctness first, Eval quality second, result correctness third.
- Treat every agent output as a claim until normalized through evidence, scope, severity or decision impact, and next action.
- Treat multi-agent agreement as a signal, not a conclusion.
- Ask the user only for non-agent-decidable choices: product direction, brand/taste, privacy/cost, account access, destructive/public actions, deployment, or user-defined limits.
- Ask one user decision at a time with the recommended default, impact/tradeoff, and why agents or evidence cannot decide it safely.
- Do not ask the user to pick ordinary internal sequencing when evidence and the active goal can decide it.
- Maintain one active parent workflow for task-level source of truth; do not create competing top-level Spec, Eval, plan, task queue, or goal docs when another workflow already owns them.
- Do not create `docs/multi-agent-orchestration/` only because this skill loaded; persist state only when continuity, auditability, external side effects, or Level 3-4 work requires it.
- Do not claim a task, stage, or run is complete without fresh moderator-inspected evidence.
- If status is `in_progress`, continue to the next bounded action instead of stopping at a recommendation.

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

## Checkpoint Output

Use this compact checkpoint for multi-round work:

```text
Current phase:
Active owner:
Evidence state:
Open blocker or major:
Next bounded action:
What not to claim yet:
```

## Red Flags

- Opening this workflow only because the task is large or uncertain.
- Treating reviewer consensus as proof.
- Sending content to external, paid, account-bound, editor, protocol, networked, or data-leaving agents without matching authorization.
- Creating durable orchestration docs for Level 0-1 work.
- Claiming a phase is complete before moderator-inspected evidence exists.
- Starting repair or final acceptance before a required convergence round.
- Losing reviewer/session identity when rebuttal or recheck may matter.
