# Capability Cache

Use this reference for cache-first discovery, agent participant selection, model controls, consent boundaries, and freshness checks.

## Contents

- Storage
- Positive Inclusion
- Separate The States
- Minimum Record
- Cache-First Flow
- Consent Boundary
- Shell Agent Run Preflight
- Freshness Triggers
- Model And Reasoning Controls

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
4. If strategy may use external, editor, protocol, paid, account-bound, or data-leaving agents, proactively ask whether the user authorizes that use before refreshing or invoking them unless already authorized.
5. If permission is not granted, mark task use as not_authorized and continue with host-native subagents or main-agent path.
6. If permission is granted, refresh only the participants needed by the selected intensity and phase.
7. Re-run broader discovery only when cache is missing, stale, contradicted by runtime errors, or insufficient for the requested intensity or user-requested capability.
```

## Consent Boundary

Allowed without extra confirmation:

- host-native subagents exposed by the current runtime
- safe, local, non-task-bearing checks such as command existence or local version/help output when they do not contact remote services or mutate auth state

Requires explicit user permission:

- sending prompts, files, repo context, plans, diffs, screenshots, or artifacts to external/editor/protocol agents
- asking an external/editor/protocol agent to review, implement, research, summarize, or generate artifacts
- running an agent call that may consume API credits, paid usage, account quota, or leave the local trust boundary

## Shell Agent Run Preflight

For `shell_agent` CLIs, distinguish discovery surfaces from task-execution surfaces.

- Command presence, version output, model listing, and agent listing do not prove that task execution works.
- Fresh-run execution and resume/continue execution are separate capability states. Record them separately when they differ.
- Prefer a fresh-run invocation for new task packets. Use resume flags only when intentionally continuing a known prior task.
- Do not infer resume/session IDs from project, repository, worktree, or marker files. Confirm valid resume identifiers through the CLI's current session/list/export/help surface before passing resume flags.
- If a resume preflight fails, mark only resume runnability as failed. Do not mark the whole CLI unavailable when fresh-run discovery still works.

When a CLI reports a missing session, stale session, or unknown conversation during a task run, first check whether the invocation used a resume flag or marker-derived identifier. Re-run capability discovery against the fresh-run path before downgrading the participant's overall runnability.

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

Do not hard-code a user's personal model preferences. Model assignment is a runtime decision based on task difficulty, risk, requested confidence, available capabilities, cost, privacy, authorization, current main model, and independence needs.
