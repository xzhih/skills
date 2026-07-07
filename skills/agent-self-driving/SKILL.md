---
name: agent-self-driving
description: "Use only when the user explicitly invokes $agent-self-driving, or an active self-driving workflow already owns the task, for long-task automation that should continue through dev-flow, agents, review/repair, lanes, external-agent policy, evidence, and closure until completion or a true user decision. Do not use for routine lanes."
---

# Agent Self-Driving

Opt-in dispatcher for multi-agent workflows and long-task automation:
discussion, artifact review, parallel lanes, returned-lane integration,
dev-flow-driven requirements/Spec/Eval/Plan delivery, external-agent policy,
and repeated review-repair. The main thread is always the moderator: it owns
the blackboard, permissions, integration, verification, and final claims.

## Iron Law

```text
MULTI-AGENT OUTPUT IS EVIDENCE INPUT, NOT A CONCLUSION.
```

Agents may improve coverage, challenge framing, and find defects, but the moderator must normalize claims, inspect source evidence, resolve conflicts, and decide what is promoted. Agreement is a signal; verified evidence is the gate.

## Quick Decision

Use this skill only when the user explicitly asks for one of these:

- `agent-self-driving`, long-task automation, or a Spec/Eval-driven workflow
- a new project, new requirement, or broad outcome where the user provides a
  direction and expects the agent to keep moving until an MVP, completed
  deliverable, or true pause condition
- model-diverse, adversarial, or repeated review-repair work that needs a
  controller across review, repair, recheck, and evidence
- external, shell, editor, protocol, or account-bound agents
- a long task that needs durable multi-agent state and evidence-backed closure

Do not use it for:

- one focused reviewer, researcher, or fresh-eyes pass over a bounded artifact;
  use [agent-review](../agent-review/SKILL.md)
- ordinary same-artifact review, even with multiple reviewers; use
  [agent-review](../agent-review/SKILL.md)
- same-topic debate about requirements, product friction, necessity,
  simplicity, usability, user flow, or whether a proposal is too heavy; use
  [agent-debate](../agent-debate/SKILL.md)
- routine subagent/worktree lane dispatch with clear ownership; use [agent-lanes](../agent-lanes/SKILL.md)
- unclear goals, branches, or lane boundaries that need formulation first; use [agent-grilling](../agent-grilling/SKILL.md)
- returned lane handoffs; use [integration-review](../integration-review/SKILL.md)
- ordinary document-led development routing when the user did not explicitly
  opt into orchestration; start with [dev-flow](../dev-flow/SKILL.md) and
  [project-context](../project-context/SKILL.md)
- confidence theater: broad, risky, or long work is not enough without an explicit multi-agent/Spec/Eval/review-repair trigger

## Explicit Long-Task Mode

When the user explicitly invokes this skill with a direction for a new project,
new requirement, or broad delivery goal, treat this skill as the automation
controller and [dev-flow](../dev-flow/SKILL.md) as the development lifecycle
spine.

Default sequence:

```text
project-context
  -> dev-flow phase detection
  -> agent-requirements-analysis
  -> agent-spec
  -> agent-eval
  -> agent-plan
  -> agent-review for risky artifacts
  -> agent-lanes or direct execution
  -> integration-review for returned lanes
  -> implementation eval/review/fix
  -> doc-driven-workflows only when its gate permits
  -> completion evidence or true pause
```

Continue automatically while the next action is inside the approved goal,
source-evident, reversible enough, and verifiable. Do not stop after producing
only Requirements, Spec, Eval, Plan, one lane batch, or one repair if the goal
contract still has unfinished work.

Pause only for a true user decision: product direction, taste, priority,
privacy/cost/account authorization, destructive/public action, deployment
target, external-agent approval, missing credentials, unavailable verification
with no acceptable substitute, or a blocker that agents and evidence cannot
resolve safely.

For a new project or MVP, completion means the smallest useful deliverable that
satisfies the locked Spec and Eval, with evidence and review state. It does not
mean every possible hardening item is done unless the goal contract requires it.

## First Move

1. Restore the user goal, current repo/runtime state, and any active parent workflow.
2. If the request is explicit long-task mode, use `dev-flow` as the parent
   workflow and keep this skill as the automation controller.
3. Select the lowest sufficient intensity from the ladder below.
4. Classify the agent shape and delegate to the focused skill when possible:
   - same-topic product/requirements debate -> [agent-debate](../agent-debate/SKILL.md)
   - one-pass or same-artifact review -> [agent-review](../agent-review/SKILL.md)
   - independent implementation/investigation lanes -> [agent-lanes](../agent-lanes/SKILL.md)
   - returned lane handoffs -> [integration-review](../integration-review/SKILL.md)
5. Check whether host subagents or external agents are actually needed for this phase.
6. Ask the user before sending task content to external, paid, account-bound, editor, protocol, networked, or data-leaving agents unless they already authorized that exact use.

## Agent Shape Gate

Route to [agent-debate](../agent-debate/SKILL.md) when the user asks agents to
discuss, debate, judge whether something is too heavy, simplify requirements,
clarify product friction, inspect ease of use, or evaluate user flow.

```text
same-topic debate:
  all agents receive the same blackboard, same source material, same question,
  and same output contract in each round

parallel lanes:
  agents own different implementation or investigation surfaces with disjoint
  files, docs, modules, or evidence responsibilities
```

Do not split a debate by section just because the material has sections. Treat
sections as a round sequence or checklist for every agent, not as ownership
boundaries. Use parallel lanes only when the user explicitly wants different
agents to own different parts, or after a whole-artifact debate/review identifies
targeted follow-up work with safe ownership boundaries.

Route to [agent-review](../agent-review/SKILL.md) when the target is
a concrete Spec, Eval, plan, design, diff, implementation, evidence package, or
final result. Use parallel lanes only when the user explicitly wants different
agents to own different parts, or after discussion/review identifies targeted
follow-up work with safe ownership boundaries.

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

## Dev-Flow Spine

For Level 2+ delivery work, use the focused lifecycle owner skills rather than
recreating their artifacts inside this skill:

```text
agent-requirements-analysis owns requirements state
agent-spec owns Spec state
agent-eval owns Eval state
agent-plan owns Plan and lane-candidate state
agent-lanes owns parallel execution batches
integration-review owns returned-lane review
doc-driven-workflows owns durable project source-of-truth docs
agent-self-driving owns private orchestration state and continuity
```

Keep artifacts compact. Full lifecycle does not mean long documents; it means
the target, Eval, plan, side effects, evidence, owner docs, and stop/pause state
are traceable.

## Minimum Execution Gates

These gates stay in the entry file because missing them changes behavior:

- Before dispatch or final claims, read the reference that owns the active phase. Use `lifecycle-intensity.md` for stop/pause/continue rules, `task-packets.md` before delegation, `output-normalization.md` before promoting agent output, and `review-convergence.md` before accepting review results.
- Before assigning agents, run the Agent Shape Gate. For product, requirements, simplicity, or user-flow debates, route to `agent-debate`; for concrete artifact judgment, route to `agent-review`; do not turn "classify by sections" into per-agent ownership unless the user explicitly asks for that.
- For Level 2+ judgment, use `agent-review` to first review the same whole artifact blind/source-first. If a blocker, major issue, startability concern, verification concern, or high-impact conflict appears, run an adversarial convergence round before repair or final acceptance.
- Minimum convergence round: give the reviewer the blackboard or challenged claim, require blocker/major/minor/question findings with evidence, repair or reject only evidence-backed blocker/major findings, then recheck until no accepted blocker/major remains or a real pause condition appears.
- Every delegated task needs a bounded packet: task, authoritative sources, inside/outside scope, output format, evidence standard, and blocker/stop condition.
- Preserve reviewer or external-agent session identity when rebuttal or recheck may be needed. Do not use "last session" semantics for parallel or adversarial reviewers.
- Stop by evidence, not round count. Accepted blocker/major findings stay open until fixed and rechecked, rejected with evidence, deferred as non-blocking, or escalated by a real pause condition.

## Runtime Capability Contract

Do not dispatch host subagents, external agents, shell/editor/protocol agents,
or task-bearing reviewer packets before this contract is satisfied.

Before dispatching agents, separate these states:

```text
present does not mean runnable
runnable does not mean authenticated
authenticated does not mean authorized_for_task
available does not mean suitable
```

If model-selectable agents, model-diverse review, or external agents may be
used, run the dispatch gate in [agent-model-profile.md](../agent-runtime/references/agent-model-profile.md) before any task-bearing dispatch. Use [capability-cache.md](../agent-runtime/references/capability-cache.md) only to record candidate sets and check user-approved participants.

When a user-selected participant is unavailable, ask for a replacement unless
the profile already names an approved fallback. Do not turn unavailable
automation into fake multi-agent evidence.

## Moderator Rules

- Start from authoritative source materials, not from the moderator's preferred framing.
- Use agents to improve target correctness first, Eval quality second, result correctness third.
- Treat every agent output as a claim until normalized through evidence, scope, severity or decision impact, and next action.
- Treat multi-agent agreement as a signal, not a conclusion.
- For same-topic debate, delegate to `agent-debate` and preserve a unified topic per round. Board/category labels are prompts for every participant, not assignments to separate agents.
- Ask the user only for non-agent-decidable choices: product direction, brand/taste, privacy/cost, account access, destructive/public actions, deployment, or user-defined limits.
- Ask one user decision at a time with the recommended default, impact/tradeoff, and why agents or evidence cannot decide it safely.
- Do not ask the user to pick ordinary internal sequencing when evidence and the active goal can decide it.
- Maintain one active parent workflow for task-level source of truth. In
  explicit long-task mode, that parent is normally `dev-flow` plus its focused
  owner skills. Do not create competing top-level Requirements, Spec, Eval,
  plan, task queue, or goal docs when another workflow already owns them.
- Use `doc-driven-workflows` as the only durable architecture/operation/call-path
  source-of-truth writer. Other workflow docs are coordination, discussion,
  review, or private orchestration state unless promoted through the owning
  workflow.
- Do not create `docs/agent-self-driving/` only because this skill loaded; persist state only when continuity, auditability, external side effects, or Level 3-4 work requires it.
- Do not claim a task, stage, or run is complete without fresh moderator-inspected evidence.
- If status is `in_progress`, continue to the next bounded action instead of stopping at a recommendation.

## Reference Routing

Read only what the current intensity needs:

- `references/lifecycle-intensity.md`: intensity routing, lifecycle boundaries, formulation and completion gates.
- `references/workflow-integration.md`: parent workflow ownership, source maps, private orchestration state, and promoted updates.
- [capability-cache.md](../agent-runtime/references/capability-cache.md): user-declared participant checks, capability
  profile vocabulary, consent, and minimal runnability checks.
- [external-agent-sessions.md](../agent-runtime/references/external-agent-sessions.md): external shell/editor/protocol agent sessions, session ledgers, and resume failure handling.
- `references/task-packets.md`: adaptive task packet invariants, assignment intent, context exposure, non-review delegation.
- `references/output-normalization.md`: promotion gate and normalized item types.
- `references/artifact-layout.md`: Spec/Eval/evidence contract shapes, target-project docs layout, resume order, status checkpoints, and artifact meanings.
- `references/review-convergence.md`: review contracts, findings ledgers, severity, stop and pause conditions.
- [agent-debate](../agent-debate/SKILL.md): focused same-topic product, requirements, friction, simplicity, and user-flow debate.
- [agent-review](../agent-review/SKILL.md): focused same-artifact review, findings normalization, rebuttal, and recheck.

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
- Splitting a product/requirements debate into per-agent sections before all agents have reviewed the same topic and material.
- Treating reviewer consensus as proof.
- Sending content to external, paid, account-bound, editor, protocol, networked, or data-leaving agents without matching authorization.
- Creating durable orchestration docs for Level 0-1 work.
- Claiming a phase is complete before moderator-inspected evidence exists.
- Starting repair or final acceptance before a required convergence round.
- Losing reviewer/session identity when rebuttal or recheck may matter.
