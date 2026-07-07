# Declared Agent Capability Checks

Use this reference for user-declared agent participants, candidate model sets,
model controls, consent boundaries, and minimal runnability checks. Do not
auto-discover which agents or models exist in the environment.

## Contents

- Storage
- Positive Inclusion
- Separate The States
- Minimum Record
- Candidate Set
- User-Declared Flow
- Consent Boundary
- Session Continuity
- Shell Agent Run Preflight
- External Session Use
- Freshness Triggers
- Model And Reasoning Controls
- User Selection And Reuse

## Storage

User-approved capability facts belong to the target project:

```text
docs/agent-runtime/capabilities/selected-participants.md
```

Optional snapshots are only useful for auditability, selected participant
changes, or long Level 4 work:

```text
docs/agent-runtime/capabilities/snapshots/<YYYY-MM-DD>-<slug>.md
```

Do not store runtime capability facts in the installed skill, global memory, or
the skill source repository unless that repository is the active target project.
Do not create or refresh this file by scanning the environment without a
user-declared agent/model selection.

Naming a workflow skill is not external-agent authorization. A request like
"use agent-review" or "use agent-self-driving" authorizes that orchestration
workflow; it does not authorize sending task content to external agents.

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
docs/agent-runtime/capabilities/agent-model-profile.md
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
reasoning_control
session_continuity
send_or_resume_surface
safe_preflight
requires_user_permission_for
intensity_fit
limits
cost_or_budget_notes
privacy_or_data_boundaries
```

Do not create empty fields just because they exist.

## Candidate Set

Use only candidates that the user supplied in the current request, a project
profile, or a previously approved Agent Model Profile. Examples like `gpt5.5`,
`gpt5.4`, `deepseek-v4-pro`, or `flash` are candidates only after the user or
project names them.

Minimal candidate-set record:

```text
agent_candidate_set:
  source: user | project_profile | workflow_profile
  updated_at:
  candidates:
    - id:
      kind:
      provider_or_protocol:
      model:
      allowed_roles:
      known_strengths:
      limits:
      external_boundary:
```

The Agent Model Profile may recommend from this candidate set. Environment
scanning, directory listing, provider inventory, or installed-agent probing is
not a candidate-set source unless the user explicitly asked for that specific
check.

## User-Declared Flow

```text
1. Determine likely intensity and which roles need agents.
2. Follow the Agent Model Profile dispatch gate for recommendation, approval,
   reuse, external boundaries, and fallback policy.
3. Record only the user-approved participants and boundaries.
4. Run minimal checks only for the selected participants before dispatch.
5. If a selected participant is unavailable, ask the user for a replacement unless an approved fallback is already recorded.
```

## Consent Boundary

Allowed without extra confirmation:

- host-native subagents exposed by the current runtime
- safe, local, non-task-bearing checks for user-selected participants, such as
  command existence or local version/help output when they do not contact remote
  services or mutate auth state

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

For user-selected `shell_agent` CLIs, distinguish safe check surfaces from
task-execution surfaces.

- Command presence, version output, or a user-requested named-agent check does
  not prove that task execution works.
- Do not mark a user-approved `shell_agent` unavailable merely because it is
  not a host-visible subagent tool. For approved OpenCode participants, read
  [opencode.md](opencode.md) and run its safe local checks before deciding
  presence, runnability, authentication, or model availability.
- Fresh-run execution and resume/continue execution are separate capability states. Record them separately when they differ.
- Prefer a fresh-run invocation for new task packets. Use resume flags only when intentionally continuing a known prior task.
- Do not infer resume/session IDs from project, repository, worktree, or marker files. Confirm valid resume identifiers through the CLI's current session/list/export/help surface before passing resume flags.
- If a resume preflight fails, mark only resume runnability as failed. Do not
  mark the whole CLI unavailable when the user-selected fresh-run check still
  works.

When a CLI reports a missing session, stale session, or unknown conversation
during a task run, first check whether the invocation used a resume flag or
marker-derived identifier. Re-run the user-selected fresh-run check before
downgrading the participant's overall runnability.

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
- user explicitly asks to check or refresh a named participant

## Model And Reasoning Controls

Record model names and reasoning/profile controls only when supplied by the
user, present in a project-approved candidate set, or safely checked for a
user-selected participant.

If the user declares candidate models or a preferred model mix, record the
candidate facts here when useful, then use the Agent Model Profile as the sole
model assignment and approval rule.

When the Agent Model Profile approves multiple participants, record the actual
assignment before spawning agents:

```text
agent_id | role | model | reasoning/profile | context exposure | purpose
```

If the host exposes model overrides, do not omit the model field for approved
model-selectable participants.

Do not use small, mini, or ultra-fast models as default reviewers for high-judgment phases such as Spec, Eval, Plan, architecture, or final quality review. Use them only for simple, low-risk, mechanical, or explicitly user-approved work.

Optimize for independent, decorrelated judgment rather than model diversity as a
ritual. When the user selected different models, model families, reasoning
profiles, providers, or context exposures, preserve that diversity especially
for Spec, Eval, Plan, and final quality review.

Do not require model diversity as a stop condition. If only one model family is available, preserve independence through separate agents, blind source-first first rounds, different reviewer angles, adversarial rebuttal, and evidence promotion.

Record material limits when they affect confidence:

```text
model_diversity:
context_independence:
reasoning_profile_diversity:
provider_or_auth_limitations:
confidence_effect:
```

Do not treat directory-listed external models as usable, and do not list models
to the user as if they were choices. Recommend only from the user/project
candidate set. Only verify provider credentials, authentication, and invocation
surface for the external model or agent the user approved.

## Profile Reuse Evidence

Use [agent-model-profile.md](agent-model-profile.md)
for selection, recommendation, approval, and reuse rules. This file records the
evidence that makes reuse safe or unsafe.

Record the accepted answer with a `scenario_key`, for example:

```text
scenario_key: agent-debate.same-topic.product-friction
scenario_key: agent-review.spec-eval.high-confidence
scenario_key: parallel-lane-execution.implementation-with-review
scenario_key: adversarial-convergence.rebuttal-recheck
```

Reuse the profile silently within the same scenario after minimal checks. Ask
again only when the scenario, confidence target, external boundary, selected
participant availability/auth state, or user instruction changes enough that
the old choice no longer covers the task.
