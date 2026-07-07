---
name: agent-requirements-analysis
description: "Use only when the user explicitly invokes $agent-requirements-analysis, or when an active workflow routes here, to turn a direction, new requirement, update, bug intent, or discussion result into Requirements with question backlog, resolver matrix, scope, non-goals, risks, confirmed/draft/open state, and R-* IDs before Spec."
---

# Agent Requirements Analysis

Turn a direction into a decision-ready requirements skeleton. This skill owns
the requirements analysis artifact; it does not write Spec, Eval, Plan, code, or
lane packets.

## Iron Law

```text
DO NOT TURN DRAFT OR OPEN REQUIREMENTS INTO SPEC.
```

Use [discussion-workflows](../discussion-workflows/SKILL.md) governance:
separate `confirmed / draft / open`, preserve user corrections, and identify
true user decisions instead of hiding them inside a polished document.

## Open Question Policy

Do not hand the user a long open-question list before exhausting agent-resolvable
questions.

Maintain a question backlog before producing requirements. Each question gets an
owner and disposition:

- **Resolvable by context**: answer from project docs, source, prior discussion,
  or local conventions.
- **Resolvable by grilling**: answer by having agents brainstorm hidden gaps,
  assumptions, options, risks, and likely defaults.
- **Resolvable by debate**: answer by having agents inspect the same material
  and argue product flow, necessity, simplicity, constraints, or likely default.
- **True user decision**: requires user taste, priority, business direction,
  privacy/cost/account authorization, destructive/public action, or information
  not present in the workspace.

Prefer one focused user question at a time when a true user decision remains.
For agent-resolvable questions, use context lookup, [agent-grilling](../agent-grilling/SKILL.md),
or [agent-debate](../agent-debate/SKILL.md) before interrupting the user.

Use [agent-debate](../agent-debate/SKILL.md) before escalating resolvable
requirements questions to the user. A question may remain `Open` only when it is
not needed for Spec readiness, or when it is explicitly a true user decision.

## Requirement IDs

Assign stable IDs to confirmed and draft requirements:

```text
R-001, R-002, ...
```

Each requirement records:

```text
id:
state: confirmed | draft | open
source: user | context | grilling | debate | inferred-safe-default
statement:
rationale:
downstream implication:
```

Do not promote an un-IDed requirement into Spec. For small tasks, IDs may live
only in the compact artifact, but the trace still needs to exist.

## Use For

- new project or new feature direction that needs a complete requirements frame
- requirement skeletons before Spec
- user flow, product friction, non-goals, constraints, and complexity placement
- finding gaps before a user spends time editing details

Use [agent-spec](../agent-spec/SKILL.md) when requirements are already clear
enough to specify behavior. Use [agent-debate](../agent-debate/SKILL.md) only
when the main work is same-topic disagreement, not artifact production.

## Internal Flows

- Use [project-context](../project-context/SKILL.md) when existing project state,
  docs, conventions, or previous decisions matter.
- Use [agent-grilling](../agent-grilling/SKILL.md) to brainstorm gaps,
  assumptions, options, risks, and questions from the user's initial direction.
- Use `docs/discussion-workflows/inbox/` when requirements work collects raw
  external docs, API references, copied excerpts, research notes, screenshots,
  or examples that must persist before they become decisions.
- Use [agent-debate](../agent-debate/SKILL.md) when requirements, user flow,
  simplicity, necessity, or complexity placement has meaningful disagreement.
- Use [discussion-workflows](../discussion-workflows/SKILL.md) to recap,
  persist, or govern confirmed/draft/open state.
- Route durable architecture, operation-flow, call-path, contract, or
  source-backed uncertainty updates to [doc-driven-workflows](../doc-driven-workflows/SKILL.md)
  only after raw material has been refined.

## Persistence Boundary

This skill owns the requirements analysis artifact for the active workflow. Do
not create a separate project documentation root for requirements analysis. If
the artifact must persist, write or update the active parent workflow's declared
location. By default, use `docs/dev-flow/requirements/<YYYY-MM-DD>-<slug>-requirements.md`
and update `docs/dev-flow/index.md`.

Follow [artifact-layout.md](../dev-flow/references/artifact-layout.md) for the
lifecycle artifact boundary and durable doc-truth ownership.

## Workflow

```text
restore context if needed
  -> collect user direction and constraints
  -> collect raw reference material into discussion inbox when it must persist
  -> build a question backlog
  -> agent-grilling when the skeleton has gaps
  -> classify gaps as context-resolvable, grilling-resolvable, debate-resolvable, or true user decisions
  -> agent-debate when questions are debate-resolvable or tradeoffs are contested
  -> resolve debate-resolvable questions into confirmed/draft/open state
  -> refine raw references into requirements constraints, risks, or open questions
  -> assign requirement IDs to confirmed and draft requirements
  -> synthesize confirmed/draft/open
  -> ask the smallest true user decision when needed
  -> produce requirements analysis
  -> hand off to agent-spec only when the Spec gate is satisfied
```

## Output Contract

```text
Requirements Analysis:
Source:
Goal:
Users / actors:
User flow:
In scope:
Out of scope:
Constraints:
Risks / complexity placement:
Question backlog:
Resolver matrix:
Confirmed:
Draft:
Resolved by agents:
Open:
True user decisions:
Requirement IDs:
Spec readiness: ready | not_ready
Next owner:
```

## Spec Readiness Gate

Move to `agent-spec` only when:

- the goal and user-visible outcome are explicit
- scope and non-goals are separated
- key constraints and risks are known
- open questions that agents could resolve have gone through context lookup or
  grilling/debate
- remaining open questions are either non-blocking or assigned to a true user
  decision
- no draft requirement is being treated as confirmed
- confirmed and draft requirements have stable IDs
- every Spec-blocking question has a disposition: resolved, deferred, or true
  user decision

For small tasks, the artifact may be compact. Do not create ceremony only to
fill a template.
