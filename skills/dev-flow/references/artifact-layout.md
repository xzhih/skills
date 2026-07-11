# Dev Flow Artifact Layout

Use this reference when Requirements, Spec, Eval, Plan, execution evidence, or
handoff state should survive context loss, multi-agent work, or a new thread.

## Contents

- Default Layout
- Directory Meanings
- File Naming
- Index Shape
- Archive Rules
- Persistence Rules
- Promotion Rules
- Coverage Chain
- Resume Order

## Default Layout

Stage artifacts belong to the target project:

```text
docs/dev-flow/
  index.md
  requirements/
  specs/
  evals/
  plans/
  capabilities/
  evidence/
  handoffs/
  archive/
```

Use a project-declared equivalent when one exists. Otherwise default to
`docs/dev-flow/`.

This directory owns lifecycle artifacts, not durable architecture truth.
Architecture, tech stack, operation flows, call paths, and source-backed
open-question ledgers belong to `doc-driven-workflows`.

## Directory Meanings

```text
index.md
  Current lifecycle source map: active requirement, Spec, Eval, Plan,
  evidence, handoff, current phase, status, and next owner.

requirements/
  Requirements candidates, compact pruning ledgers, and active Requirements
  Baselines from agent-requirements-analysis.

specs/
  Locked or draft Spec artifacts from agent-spec.

evals/
  Eval and acceptance-evidence artifacts from agent-eval.

plans/
  Implementation plans, task decomposition, verification commands, lane
  candidates, stop conditions, and docs impact from agent-plan.

capabilities/
  Agent-runtime-owned model profiles, selected participants, capability
  snapshots, authorization boundaries, and external/session ledgers. Lifecycle
  indexes link these records; they do not copy them.

evidence/
  Verification commands, logs, screenshots, manual checks, review summaries,
  and final proof that close Eval criteria.

handoffs/
  Compact pause, resume, closeout, or thread-transfer summaries.

archive/
  Superseded, abandoned, or historical lifecycle artifacts that must remain
  traceable but are not active truth.
```

## File Naming

Use dated, stable, descriptive names:

```text
requirements/<YYYY-MM-DD>-<slug>-requirements.md
specs/<YYYY-MM-DD>-<slug>-spec.md
evals/<YYYY-MM-DD>-<slug>-eval.md
plans/<YYYY-MM-DD>-<slug>-plan.md
capabilities/agent-model-profile.md
capabilities/selected-participants.md
capabilities/snapshots/<YYYY-MM-DD>-<slug>.md
capabilities/external-agent-sessions.md
evidence/<YYYY-MM-DD>-<slug>-evidence.md
handoffs/<YYYY-MM-DD>-<slug>-handoff.md
```

`<slug>` uses 2-6 lowercase kebab-case words. If the same artifact evolves,
update the existing active file instead of creating a new dated file for every
small change. Create a new file when the target, phase, or deliverable changes.

## Index Shape

Keep `index.md` short and current:

```text
# Dev Flow Index

Status: in_progress | paused | complete
Current phase:
Target:
Active requirement:
Active Spec:
Active Eval:
Active Plan:
Runtime agent profile:
Runtime capabilities:
Runtime sessions:
Latest evidence:
Latest handoff:
Active lanes / task queue:
Open blocker or major:
True user decision:
Next owner:
Updated:
```

The index links to owner artifacts. It should not duplicate full Requirements,
Spec, Eval, or Plan content.

## Archive Rules

Archive, do not delete, when an artifact is no longer the latest active source
but remains useful for traceability:

- superseded Requirements, Spec, Eval, or Plan
- abandoned or rejected delivery branches
- stale evidence packages that no longer prove current Eval
- handoffs for completed or replaced work
- artifacts created from wrong assumptions that future agents should not reuse

Default archive layout:

```text
archive/
  requirements/
  specs/
  evals/
  plans/
  evidence/
  handoffs/
```

Move the old artifact under the matching archive subfolder, preserving its file
name when possible. Add an archive header at the top:

```text
Archived: <YYYY-MM-DD>
Status: superseded | abandoned | obsolete | wrong-assumption | completed-history
Reason:
Replaced by:
Evidence:
Do not use as active truth because:
```

Then update `docs/dev-flow/index.md` so it points only to active artifacts.
Archived artifacts may be linked from an `Archived` section, but must never be
listed as the active Requirements, Spec, Eval, Plan, evidence, or handoff.

## Persistence Rules

Persist stage artifacts when:

- a task is medium, large, high-risk, or long-running
- `agent-self-driving` is active
- subagents, external agents, lanes, review/recheck, or thread handoff may need
  to restore state
- the user asks for Spec, Eval, Plan, handoff, documentation, or later reuse
- a phase reaches a gate and the next phase depends on it

Keep artifacts in chat only when the task is small, single-threaded, and
unlikely to need recovery.

## Promotion Rules

- Requirements become the source for Spec only after the Spec readiness gate.
- Spec becomes the source for Eval only after the Eval readiness gate.
- Eval becomes the source for Plan only after the Plan readiness gate.
- Plan becomes the source for execution only after the execution readiness gate.
- Evidence closes Eval criteria; agent reports do not replace evidence.

Do not promote draft/open items into confirmed behavior. Do not copy durable
architecture truth into these artifacts; link to `doc-driven-workflows` docs
instead.

## Coverage Chain

For persisted, high-risk, or multi-agent work, artifacts should preserve a
stable coverage trace across the lifecycle. Use `coverage-trace.md` for the
shared trace rules:

```text
requirement
  -> Spec behavior
  -> Eval check or evidence path
  -> Plan task
  -> evidence link or blocker
```

Small tasks can keep this compact, but the chain must still answer:

```text
Which requirement does this behavior implement?
Which Eval proves it?
Which task owns it?
What evidence closed it?
```

Do not mark a task, lane, or final result complete when a non-deferred trace
item has no owner, no evidence, or only a worker claim.

## Resume Order

When continuing a durable development goal, route recovery through
`project-context` and read index-first:

```text
1. docs/dev-flow/index.md
2. latest active handoff/status pointer when needed to resolve current phase
3. only active Requirements/Spec/Eval/Plan artifacts needed by the current
   phase or candidate next owner
4. current evidence and lane/task state only when that phase is active
5. linked runtime profile/capability/session records only when participant
   selection, authorization, resume, wait, or closure affects the next action
6. docs/agent-self-driving/index.md only for the existing active controller
7. doc-driven state only after confirmed drift or an explicit owner route
```

Do not read `archive/` during normal resume. Read archived artifacts only when
investigating history, explaining why a decision changed, resurrecting abandoned
work, or resolving a contradiction named by an active artifact.

If the index and artifacts disagree, inspect source evidence and current code,
then update the owner artifact and index together.
