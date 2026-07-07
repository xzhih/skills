---
name: agent-spec
description: "Use only when the user explicitly invokes $agent-spec, or when an active workflow routes here, to convert governed requirements into implementation-ready Spec behavior with scope, non-goals, constraints, affected surfaces, interfaces, docs impact, B-* IDs, and requirement coverage before Eval."
---

# Agent Spec

Convert governed requirements into an implementation-ready Spec. This skill owns
the Spec artifact; it does not define acceptance tests in detail, write the
implementation plan, or dispatch lanes.

## Iron Law

```text
SPECIFY BEHAVIOR, NOT WISHFUL OUTCOMES.
```

Every confirmed behavior must trace back to requirements, project evidence, or
an explicit user decision. Draft/open items stay marked and must not become
implementation requirements.

## Behavior IDs And Coverage

Create implementation behavior IDs:

```text
B-001, B-002, ...
```

Each behavior must cite one or more requirement IDs from the requirements
analysis. A behavior without a requirement source is either a missing
requirement, an implementation detail that belongs in the plan, or scope creep.

Maintain a compact coverage map:

```text
R-001 -> B-001, B-003
R-002 -> B-002
```

If a confirmed requirement has no behavior, either add the missing behavior,
mark the requirement as deferred with rationale, or return to
`agent-requirements-analysis`.

## Use For

- locking user-visible behavior and implementation boundaries
- converting requirements analysis into a Spec
- recording scope, non-goals, constraints, affected surfaces, and docs impact
- preparing a concrete artifact for `agent-eval` or `agent-review`

Use [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md) when
the goal, users, flow, or non-goals are still too loose. Use
[agent-eval](../agent-eval/SKILL.md) when the Spec is locked and correctness
needs to be defined.

## Internal Flows

- Use [project-context](../project-context/SKILL.md) when implementation
  surfaces, conventions, or existing behavior affect the Spec.
- Use [agent-debate](../agent-debate/SKILL.md) for contested behavior,
  architecture boundaries, simplicity, necessity, or user-flow tradeoffs.
- Use [agent-review](../agent-review/SKILL.md) for high-impact or ambiguous
  Spec review.
- Use [discussion-workflows](../discussion-workflows/SKILL.md) when the Spec
  changes confirmed/draft/open discussion state.

## Persistence Boundary

This skill owns the Spec artifact for the active workflow. Do not create a
parallel Spec doc root when a parent workflow, project spec root, or source map
already owns it. If persistence is needed, update the declared owner. By
default, use `docs/dev-flow/specs/<YYYY-MM-DD>-<slug>-spec.md` and update
`docs/dev-flow/index.md`.

Follow [artifact-layout.md](../dev-flow/references/artifact-layout.md) for the
lifecycle artifact boundary and durable doc-truth ownership.

## Workflow

```text
read requirements analysis and context
  -> identify behavior and boundaries
  -> debate contested Spec decisions when needed
  -> draft Spec
  -> assign behavior IDs and map them to requirement IDs
  -> self-check for ambiguity, contradictions, scope creep, and coverage gaps
  -> review when risk warrants it
  -> lock Spec or return questions to requirements analysis
```

## Output Contract

```text
Spec:
Source requirements:
Goal:
Requirement coverage:
In scope:
Out of scope:
User-visible behavior:
System behavior / interfaces:
Affected surfaces:
Constraints:
Error / edge behavior:
Docs impact:
Open questions:
Behavior IDs:
Eval readiness: ready | not_ready
Review status:
Next owner:
```

## Eval Readiness Gate

Move to `agent-eval` only when:

- behavior is concrete enough to accept or reject
- every confirmed requirement is covered by at least one behavior or explicitly
  deferred
- every Spec behavior cites a requirement ID, project evidence, or explicit user
  decision
- non-goals prevent obvious scope expansion
- constraints and affected surfaces are named
- open questions are non-blocking or explicitly owned
- reviewer blocker/major findings are resolved, rejected with evidence, or
  deferred as non-blocking
- self-review has checked placeholders, contradictions, ambiguity, scope creep,
  and missing requirement coverage
