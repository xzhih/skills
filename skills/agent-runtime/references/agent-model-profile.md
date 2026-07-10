# Agent Model Profile

Use this reference when participant/model selection, named or model-diverse
assignment, external participation, or a coverage claim depends on a specific
assignment. Do not use it for `native-default` alone.

## Contents

- Trigger
- Hard Gate
- Profile Shape
- User Selection
- Reuse Rules
- Where To Record
- Packet Rule

## Trigger

Restore or create an Agent Model Profile before dispatch when:

- the user names a participant/model or supplies a candidate set
- the workflow can select participants, models, providers, or reasoning profiles
- model/provider diversity or a specific assignment is requested
- an external, editor, protocol, paid, account-bound, or data-leaving agent may participate
- a claim depends on a particular participant/model assignment
- an applicable recorded profile is missing, stale, or contradicted

Do not use this gate for `native-default`: one or more host-native workers already
exposed by the current runtime when there is no participant/model choice,
or external boundary. Fresh and resumed host-native workers still use worker
lifecycle. Separate fresh sessions may support an independent-session claim;
record model diversity as unverified unless the runtime exposes and verifies it.

## Hard Gate

When a Trigger condition applies, this is a selection/authorization gate, not
advice. Do not dispatch the governed participant, send its task packet, or claim
the selected model/provider coverage before the gate is satisfied. This does not
block unrelated `native-default` host workers.

If a model profile is needed and no current matching profile exists, pause long
enough to propose or confirm the agent/model mix. Do not auto-discover the
environment, scan installed agents, or list choices from environment-scan results.
Recommend only from a user-declared or project-recorded candidate set. If no
candidate set exists, ask the user to provide candidate agents/models or name
the exact participants.

If the requested workflow is profile-governed and no matching approved profile
or candidate set exists, ask the user. Do not silently reinterpret requested
model diversity, named participation, external review, or agent-backed sign-off
as self-review or substitute evidence.

While the gate is unsatisfied, the main agent may prepare source context,
identify boundaries, and draft a bounded packet. It must not claim the blocked
named/model-diverse/external coverage. Label any main-agent-only pass as a local
self-check or packet preparation.

Ask once in this shape:

```text
Recommended agent/model mix:
Candidate set used:
Roles needed:
Review independence:
Reuse scope:
External use / cost / privacy:
Approve this mix, or specify different agents/models for <scope>?
```

After the user answers, record the profile and continue. When a fresh profile
already matches the same scenario, reuse it without asking again. Mention reuse
only when it affects privacy, cost, confidence, or an external-agent boundary.

Do not silently pick models for high-judgment multi-agent work. Do not send task
content to external agents without explicit authorization, even if the model
profile names them.

Candidate-set examples may include user-named options such as `gpt5.5`,
`gpt5.4`, `deepseek-v4-pro`, or `flash`. Treat examples as candidates only when
the user or project profile supplied them; they are not global defaults.

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
    same_model_workers_allowed:
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

Treat this as a user profile, not a universal default. Implementation workers
may use the same approved model when the goal is consistent execution. Reviewers
must be distinct agent sessions; prefer different models, providers, reasoning
profiles, or context exposure when the approved candidate set allows it. If only
one review model is approved, use separate fresh reviewer sessions/lenses and
record the limitation. Do only minimal verification for the user-selected agents
before dispatch.

## User Selection

Use these role prompts when recommending or asking the user to choose
agents/models. They are candidate-set instructions, not auto-discovery
instructions, and must not be converted into a global default model choice by
the agent.

```text
agent-debate / same-topic debate:
  recommend moderator and debate participants from the approved candidate set
  ask whether external participants are allowed when any external candidate is included
  continuity: preserve the same reviewers for rebuttal rounds

agent-review:
  recommend one or more distinct reviewer agents from the approved candidate set
  prefer model/provider/context diversity for review when available
  ask whether external review is allowed when any external candidate is included
  recheck: use fresh context or a different model after material repair

parallel-lane-execution:
  recommend implementation workers and review agents separately when both are needed
  implementation workers may share one approved model; reviewers must be distinct agents
  continuity: workers may be one-shot; reviewers need identity when rebuttal may matter

low-risk focused review or research:
  recommend a light reviewer only when independent judgment materially helps
```

If the user has repeatedly preferred a concrete mix in this project, reuse it
only when it is recorded in a fresh matching profile. If it is not recorded,
recommend from the current candidate set, ask approval or correction, and then
record it.

## Reuse Rules

Reuse a recorded profile when all are true:

- `scenario_key` matches the current work shape
- the scope still applies: project, workflow, batch, or task
- minimal runnability checks for the user-selected participants pass
- external-agent authorization, cost, and privacy boundaries still cover this phase
- the confidence target has not increased beyond what the profile covered

Ask again when:

- the user requests a different model, provider, confidence level, or external agent
- the scenario changes from discussion to execution, or from low-risk review to high-judgment review
- a recorded model is unavailable, unauthenticated, unauthorized, or contradicted by a failed run
- external task content would cross a new privacy, cost, account, destructive, public, or production boundary
- the profile is stale by its own `stale_when`

## Where To Record

```text
docs/dev-flow/capabilities/agent-model-profile.md
```

## Packet Rule

Every task-bearing packet should include the selected participant/model when the host or external tool supports model selection. Every returned handoff or review should record the model actually used when known.

If the requested model is unavailable, stale, unauthorized, or cannot be
verified, record the limitation and ask the user for a replacement unless the
profile already names an approved fallback for this exact scenario.
