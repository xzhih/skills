# Capability Cache

Use this reference for cache-first discovery, agent participant selection, model controls, consent boundaries, and freshness checks.

## Contents

- Storage
- Positive Inclusion
- Separate The States
- Minimum Record
- Cache-First Flow
- Consent Boundary
- Session Continuity
- Shell Agent Run Preflight
- External Session Use
- Freshness Triggers
- Model And Reasoning Controls
- Recommendation And Reuse

## Storage

Capability facts belong to the target project:

```text
docs/multi-agent-orchestration/capabilities/current-environment.md
```

Optional snapshots are only useful for auditability, frequent environment churn, or long Level 4 work:

```text
docs/multi-agent-orchestration/capabilities/snapshots/<YYYY-MM-DD>-<slug>.md
```

Do not store runtime capability facts in the installed skill, global memory, or the skill source repository unless that repository is the active target project.

Naming this skill is not external-agent authorization. A request like "use multi-agent-orchestration" authorizes this orchestration workflow; it does not authorize sending task content to external agents.

## Positive Inclusion

Record only agent-like participants that can accept a delegated objective and return independent reasoning, review, plan, implementation, synthesis, or verification evidence.

Possible participant kinds:

```text
host_subagent
shell_agent
ide_agent
protocol_agent
agentic_endpoint
agent_service
other_agent
```

Generic execution tools stay outside the capability profile. Package managers, shells, scripts, CLIs for non-agent tools, and MCP task helpers are discovered and used normally during execution, but they are not agent participants.

## Separate The States

Never collapse these into one vague "available" status:

```text
present does not mean runnable
runnable does not mean authenticated
authenticated does not mean authorized_for_task
available does not mean suitable
```

Safe local checks can prove presence or runnability. They do not prove permission to send task content.

## Minimum Record

Use the smallest record that lets the main agent decide:

```text
available?
authorized?
suitable?
how to call?
what evidence supports this?
when does it become stale?
```

Minimal capability entry:

```text
id:
kind:
presence:
runnability:
authorization_for_task:
invocation_surface:
evidence:
freshness:
```

Record approved model profiles separately from raw capability facts:

```text
docs/multi-agent-orchestration/capabilities/agent-model-profile.md
```

Capability cache answers "what can run here?" The Agent Model Profile answers
"what did the user approve for this scenario?"

Optional vocabulary, only when useful:

```text
display_name
provider_or_protocol
status
authentication
invocation_hint
input_modes
output_capture
model_selection
known_models
reasoning_control
session_continuity
send_or_resume_surface
safe_preflight
requires_user_permission_for
recommended_uses
intensity_fit
limits
cost_or_budget_notes
privacy_or_data_boundaries
```

Do not create empty fields just because they exist.

## Cache-First Flow

```text
1. Determine likely intensity and whether external-agent aggregation may be useful.
2. Read the target project's cached capability file if it exists.
3. If the cache covers needed host-native or already-authorized capabilities, do cheap freshness checks only.
4. Read the Agent Model Profile and look for a fresh entry matching the current scenario.
5. If a matching profile exists, reuse it after cheap freshness and authorization checks.
6. If no matching profile exists, build a recommended mix from discovered capabilities and ask the user to approve that mix once.
7. If the selected intensity and phase make external, editor, protocol, paid, account-bound, or data-leaving agents worth using, include external policy in the same recommendation unless one is already current.
8. If permission is not granted, mark external task use as not_authorized and continue with host-native subagents or main-agent path.
9. If permission is granted, refresh only the participants needed by the selected intensity and phase.
10. Re-run broader discovery only when cache is missing, stale, contradicted by runtime errors, or insufficient for the requested intensity or user-requested capability.
```

## Consent Boundary

Allowed without extra confirmation:

- host-native subagents exposed by the current runtime
- safe, local, non-task-bearing checks such as command existence or local version/help output when they do not contact remote services or mutate auth state

Requires explicit user permission:

- sending prompts, files, repo context, plans, diffs, screenshots, or artifacts to external/editor/protocol agents
- asking an external/editor/protocol agent to review, implement, research, summarize, or generate artifacts
- running an agent call that may consume API credits, paid usage, account quota, or leave the local trust boundary
- selecting which external agent or external model may participate in the workflow

External-agent policy should answer:

```text
allowed_external_agents:
allowed_external_models:
allowed_phases:
privacy_or_context_limits:
cost_or_budget_limits:
stale_when:
```

Once granted, the policy can cover later phases in the same workflow. Ask again when the policy is missing, stale, contradicted, or the task crosses a new privacy, cost, account, destructive, public, or production boundary.

## Session Continuity

For review participants, distinguish fresh spawn from continuing the same participant.

Record whether the surface supports:

```text
fresh_spawn
send_input_to_open_agent
resume_closed_agent
external_resume_by_explicit_session_id
```

When Round 2 adversarial review may be needed, keep Round 1 reviewer sessions open if possible. If sessions are closed, use the recorded resume surface before spawning replacements. A replacement reviewer is a `fresh_proxy_rebuttal`, not the original reviewer.

Do not close or replace Round 1 reviewers just because they are slow. Slow review is not a loss of continuity.

## Shell Agent Run Preflight

For `shell_agent` CLIs, distinguish discovery surfaces from task-execution surfaces.

- Command presence, version output, model listing, and agent listing do not prove that task execution works.
- Fresh-run execution and resume/continue execution are separate capability states. Record them separately when they differ.
- Prefer a fresh-run invocation for new task packets. Use resume flags only when intentionally continuing a known prior task.
- Do not infer resume/session IDs from project, repository, worktree, or marker files. Confirm valid resume identifiers through the CLI's current session/list/export/help surface before passing resume flags.
- If a resume preflight fails, mark only resume runnability as failed. Do not mark the whole CLI unavailable when fresh-run discovery still works.

When a CLI reports a missing session, stale session, or unknown conversation during a task run, first check whether the invocation used a resume flag or marker-derived identifier. Re-run capability discovery against the fresh-run path before downgrading the participant's overall runnability.

## External Session Use

Before using external-agent resume, continue, or fork modes, read `external-agent-sessions.md`.

Record one explicit session per external agent when continuity matters. Do not use "last session" semantics for parallel reviewers or adversarial rounds, because the latest session may belong to a different agent.

## Freshness Triggers

Refresh when:

- host agent or runtime changes
- model/provider config changes
- external/editor/protocol version or auth changes
- sandbox, network, approval, write, or budget policy changes
- task requires a higher intensity than the cache covers
- previous attempt failed because a cached capability was wrong
- user explicitly asks to refresh discovery

## Model And Reasoning Controls

Record model names and reasoning/profile controls only when safely discovered.

Do not hard-code a user's personal model preferences into the installed skill. If the user declares a preferred model mix for the current project, workflow, or batch, record it as an Agent Model Profile and verify availability before dispatch. Model assignment is a runtime decision based on task difficulty, risk, requested confidence, available capabilities, cost, privacy, authorization, current main model, independence needs, and any current user-approved profile.

Create or refresh the Agent Model Profile before task-bearing dispatch when implementation and review should use different models, model-diverse reviewers are useful, external agents may participate, or the user has a known preferred mix that is not yet recorded.

Suggested profile:

```text
agent_model_profile:
  implementation.primary_model:
  implementation.fallback_model:
  host_review.models:
  external_review.allowed:
  external_review.agent_tool:
  external_review.model:
  external_review.allowed_phases:
  privacy_cost_limits:
  stale_when:
```

When model diversity is requested or useful for Spec, Eval, Plan, or final quality review, create a model assignment before spawning agents:

```text
agent_id | role | model | reasoning/profile | context exposure | purpose
```

If the host exposes model overrides, do not omit the model field for model-diverse reviewers. If all reviewers use the same model, record why and preserve independence through fresh context, different review angles, adversarial rebuttal, or external agents.

Do not use small, mini, or ultra-fast models as default reviewers for high-judgment phases such as Spec, Eval, Plan, architecture, or final quality review. Use them only for simple, low-risk, mechanical, or explicitly user-approved work.

Optimize for independent, decorrelated judgment rather than model diversity as a ritual. Prefer different models, model families, reasoning profiles, providers, or context exposures when available, especially for Spec, Eval, Plan, and final quality review.

Do not require model diversity as a stop condition. If only one model family is available, preserve independence through separate agents, blind source-first first rounds, different reviewer angles, adversarial rebuttal, and evidence promotion.

Record material limits when they affect confidence:

```text
model_diversity:
context_independence:
reasoning_profile_diversity:
provider_or_auth_limitations:
confidence_effect:
```

Do not treat directory-listed external models as usable until provider credentials, authentication, and a safe invocation surface are confirmed. Record how availability was discovered, not only the model name.

## Recommendation And Reuse

When a needed model profile is missing, do not ask the user to enumerate models
from scratch. Recommend a concrete combination based on:

- scenario: discussion, review, execution, rebuttal, recheck, research, or verification
- intensity: one-pass, multi-agent audit, review-repair, or full lifecycle
- available host subagents and model overrides
- external agents that are present, runnable, authenticated, and worth using
- privacy, cost, account, and data-leaving boundaries
- need for independent judgment, model diversity, reviewer continuity, or fresh context
- any prior user-approved profile for a similar scenario

Recommendation output should be concise:

```text
Recommended model mix:
Use for:
Why:
External boundary:
Reuse until:
Fallback:
```

Record the accepted answer with a `scenario_key`, for example:

```text
scenario_key: agent-debate.same-topic.product-friction
scenario_key: agent-review.spec-eval.high-confidence
scenario_key: parallel-lane-execution.implementation-with-review
scenario_key: adversarial-convergence.rebuttal-recheck
```

Reuse the profile silently within the same scenario after freshness checks. Ask
again only when the scenario, confidence target, external boundary, available
models, auth state, or user instruction changes enough that the old choice no
longer covers the task.
