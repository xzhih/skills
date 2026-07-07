# Agent Model Profile

Use this reference when a workflow may dispatch subagents, choose model-diverse reviewers, involve external agents, or run review-repair loops.

## Trigger

Before the first task-bearing agent dispatch, restore or create an Agent Model Profile when any of these are true:

- multiple subagents will implement, review, rebut, synthesize, or verify work
- model diversity would improve confidence for Spec, Eval, Plan, architecture, UX/product judgment, or final quality review
- implementation and review should intentionally use different model strengths
- an external, editor, protocol, paid, account-bound, or data-leaving agent may participate
- the user has a known preferred model mix, but the current workflow has not recorded it
- the current scenario has no matching, fresh model profile

Do not ask for a model profile for clear, low-risk, main-agent-only work.

## Hard Gate

If a model profile is needed and no current matching profile exists, pause long enough to ask the user for the model mix. Do not ask as a blank form. First inspect the current need, available known capabilities, and any stale profiles, then recommend a concrete default combination with tradeoffs.

Ask once in this shape:

```text
Recommended model mix:
Why this fits:
Reuse scope:
External use / cost / privacy:
Fallback if unavailable:
Approve this mix for <scope>, or tell me the models to use?
```

After the user answers, record the profile and continue. When a fresh profile already matches the same scenario, reuse it without asking again. Mention reuse only when it affects privacy, cost, confidence, or an external-agent boundary.

Do not silently pick all models for high-judgment multi-agent work. Do not send task content to external agents without explicit authorization, even if the model profile names them.

## Profile Shape

Record enough to route future packets:

```text
agent_model_profile:
  scope: project | workflow | batch | task
  scenario_key:
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
  recommended_default:
  user_approved:
  reuse_when:
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

## Scenario Defaults

Use these as recommendation patterns after capability discovery. Replace example
model names with actually available names and any current user preference.

```text
agent-debate / same-topic debate:
  moderator: current main model or strongest planning model
  host_review: two strong reasoning models or profiles when available
  external_review: one diverse external model only when authorized and useful
  continuity: preserve the same reviewers for rebuttal rounds

agent-review:
  host_review: at least one fresh reviewer; use two model-diverse reviewers for
    Spec, Eval, architecture, UX/product judgment, or final quality
  external_review: optional high-confidence pass when privacy/cost allow
  recheck: use fresh context or a different model after material repair

parallel-lane-execution:
  implementation: strongest reliable coding model or project default
  review: different model/profile when practical; external review only if
    specifically authorized for review
  continuity: workers may be one-shot; reviewers need identity when rebuttal may matter

low-risk focused review or research:
  host_review: one focused reviewer or main-agent inline review
  external_review: no by default
```

If the user has repeatedly preferred a concrete mix in this project, recommend
that mix first, but still verify capability freshness and external authorization.
For example, if the current project profile says internal GPT 5.5 as moderator,
internal GPT 5.4/5.5 as host reviewers, and `opencode` DeepSeek v4 Pro as an
external reviewer for review-only phases, reuse that profile for matching
discussion or review scenarios until stale.

## Reuse Rules

Reuse a recorded profile when all are true:

- `scenario_key` matches the current work shape
- the scope still applies: project, workflow, batch, or task
- model/provider/runtime freshness checks pass
- external-agent authorization, cost, and privacy boundaries still cover this phase
- the confidence target has not increased beyond what the profile covered

Ask again, with a new recommendation, when:

- the user requests a different model, provider, confidence level, or external agent
- the scenario changes from discussion to execution, or from low-risk review to high-judgment review
- a recorded model is unavailable, unauthenticated, unauthorized, or contradicted by a failed run
- external task content would cross a new privacy, cost, account, destructive, public, or production boundary
- the profile is stale by its own `stale_when`

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
