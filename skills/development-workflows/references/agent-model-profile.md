# Agent Model Profile

Use this reference when a workflow may dispatch subagents, choose model-diverse reviewers, involve external agents, or run review-repair loops.

## Trigger

Before the first task-bearing agent dispatch, restore or create an Agent Model Profile when any of these are true:

- multiple subagents will implement, review, rebut, synthesize, or verify work
- model diversity would improve confidence for Spec, Eval, Plan, architecture, UX/product judgment, or final quality review
- implementation and review should intentionally use different model strengths
- an external, editor, protocol, paid, account-bound, or data-leaving agent may participate
- the user has a known preferred model mix, but the current workflow has not recorded it

Do not ask for a model profile for clear, low-risk, main-agent-only work.

## Hard Gate

If a model profile is needed and no current profile exists, pause long enough to ask the user for the model mix. Ask once, with a default recommendation when possible. After the user answers, record the profile and continue.

Do not silently pick all models for high-judgment multi-agent work. Do not send task content to external agents without explicit authorization, even if the model profile names them.

## Profile Shape

Record enough to route future packets:

```text
agent_model_profile:
  scope: project | workflow | batch | task
  updated_at:
  implementation:
    primary_model:
    fallback_model:
    allowed_roles:
  host_review:
    models:
    roles:
    independence_rules:
  external_review:
    allowed: yes | no
    agent_tool:
    provider_or_model:
    allowed_phases:
    privacy_cost_limits:
  repair_recheck:
    same_reviewer_continuity:
    fresh_reviewer_model:
  unavailable_or_unverified:
  stale_when:
```

For the user's current preferred shape, a profile might say:

```text
implementation.primary_model: gpt5.5
host_review.models: gpt5.4, gpt5.5
external_review.agent_tool: opencode
external_review.provider_or_model: deepseek
external_review.allowed_phases: review only unless separately authorized
```

Treat this as a user profile, not a universal default. Verify availability before dispatch.

## Where To Record

Prefer the active project/workflow owner:

- existing project coordination, handoff, or workflow profile if one exists
- `docs/multi-agent-orchestration/capabilities/agent-model-profile.md` for durable heavy workflows
- lane registry or batch packet for lightweight parallel-lane work
- in-chat context packet for repositories without durable workflow docs

Do not write personal model preferences into an unrelated project source-of-truth doc unless the user asked for durable project configuration.

## Packet Rule

Every task-bearing packet should include the selected participant/model when the host or external tool supports model selection. Every returned handoff or review should record the model actually used when known.

If the requested model is unavailable, stale, unauthorized, or cannot be verified, record the limitation and either use an approved fallback or ask the user when the fallback changes confidence materially.
