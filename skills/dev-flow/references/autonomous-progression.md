# Autonomous Progression

Use this reference when the user delegates a project goal and expects the agent system to keep moving without turning the user into a dispatcher.

## Contract

After the user authorizes a goal, the main thread is the moderator. Continue through context restore, discussion, pressure testing, lane dispatch, integration review, repair, verification, and the next safe batch until the goal reaches high confidence, a true blocker appears, or the user changes direction.

Do not stop at a recommendation when the next workflow step is source-backed, reversible, and inside the user's stated goal.

## User Is Not The Message Bus

Do not ask the user to:

- copy prompts between agent threads
- summarize worker outputs back to the moderator
- choose routine lane order or batch size
- arbitrate ordinary agent disagreement
- approve every safe next batch
- restate project rules already recoverable from source docs or code

Prefer direct callable subagents only when a matching user-approved Agent Model
Profile names them and the tool is already visible. Manual prompts are a
fallback for unavailable tools or explicit user preference.

## Long-Running Agents

Long-running subagents and external agents are normal. Do not prod, interrupt, or close an active agent merely because it is taking time.

While agents run, the moderator should do non-overlapping work, prepare integration checks, inspect local sources, or wait with a reasonable timeout only when the next critical-path step truly needs that result.

Interrupt or close an agent only when the user cancels, the task crosses an authorization or safety boundary, the agent is clearly executing the wrong task, the session is no longer needed after completion, or the host reports a real failure.

## Agent Model Profile

When the workflow will use subagents, model-diverse review, external agents, or
review-repair loops, follow the dispatch gate in
[agent-model-profile.md](agent-model-profile.md) before dispatch.

Do not ask the user to pick routine lane order. Ask about model mix only when the
choice affects confidence, privacy, cost, external-agent authorization, or the
user's preferred workflow. After a profile is recorded, reuse it for matching
scenarios until stale.

## Resolve Agent-First

Before interrupting the user, try the smallest safe resolution path:

1. Check current docs, code, tests, git state, and runtime evidence.
2. Ask a focused subagent or reviewer when independent judgment helps.
3. Make a reversible working assumption and record it when the choice is local.
4. Defer, block, or split the lane when the uncertainty should not stop unrelated work.

## Expert Translation

Do not make the user provide professional implementation parameters when they have given usable intent or feedback. If the user says a workflow is hard to use, does not feel like the right product type, lacks polish, or fails their judgment, translate that into:

- domain task model
- concrete failure modes
- unacceptable shapes
- professional quality standards
- verification gates and evidence

Ask the user for business intent, product direction, taste, risk tolerance, privacy/cost authorization, or domain facts only when source evidence and agents cannot infer them safely.

## True User Decisions

Ask the user only for decisions that evidence and agents cannot safely decide:

- product direction, taste, brand, or success definition
- meaningful scope tradeoffs with user-visible impact
- privacy, cost, credential, account, or external-agent authorization
- destructive, public, production, legal, or irreversible actions
- user-defined limits such as time, budget, or forbidden areas

When asking, present the decision needed, the roles involved, and why agents or
evidence cannot decide it safely.

## Completion Standard

Treat the delegated goal as high-confidence only when:

- active/review lanes are classified and resolved
- accepted work has current evidence for the changed surfaces
- repair-needed lanes were repaired and rechecked or explicitly deferred
- blocked lanes record raw blocker evidence and do not claim pass
- documentation ownership and promotion rules were respected
- remaining work is either completed, explicitly deferred, or blocked with an owner

Report progress and final state clearly, but keep moving unless a true user decision is required.
