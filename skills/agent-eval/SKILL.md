---
name: agent-eval
description: "Use only when the user explicitly invokes $agent-eval, or when an active workflow routes here, to convert locked Spec behavior into E-* acceptance/evidence IDs, automated/manual checks, failure conditions, fixtures, risk coverage, and implementation evidence requirements before Plan."
---

# Agent Eval

Define how to prove the Spec is correct. This skill owns the Eval artifact; it
does not write the implementation plan or execute tests.

## Iron Law

```text
NO PLAN WITHOUT A WAY TO PROVE CORRECTNESS.
```

Eval turns Spec into acceptance evidence. If a behavior cannot be checked, say
so and either redesign the Spec or record a manual evidence requirement.

## Eval IDs And Coverage

Create acceptance/evidence IDs:

```text
E-001, E-002, ...
```

Each Eval item cites one or more Spec behavior IDs. Every important behavior
must have an automated check, manual evidence path, or an explicit
`untestable/deferred` entry with risk and owner. Do not let a behavior disappear
between Spec and Plan.

## Use For

- acceptance criteria and evidence standards
- automated test targets, manual checks, fixtures, and scenarios
- failure conditions and regression risks
- deciding what evidence implementation lanes must return

Use [agent-spec](../agent-spec/SKILL.md) when behavior is still unclear. Use
[agent-plan](../agent-plan/SKILL.md) after Eval is ready.

## Internal Flows

- Use [agent-debate](../agent-debate/SKILL.md) when correctness, confidence,
  testing strategy, or risk coverage is disputed.
- Use [agent-review](../agent-review/SKILL.md) when Eval quality is high-impact
  or one test framing may miss issues.
- Use [project-context](../project-context/SKILL.md) to discover existing test
  conventions, commands, fixtures, and evidence surfaces.
- Use [discussion-workflows](../discussion-workflows/SKILL.md) if Eval decisions
  change confirmed/draft/open requirements.

## Persistence Boundary

This skill owns the Eval artifact for the active workflow. Do not create a
parallel evidence or compliance root when a parent workflow, project evidence
root, or source map already owns it. If persistence is needed, update the
declared owner. By default, use `docs/dev-flow/evals/<YYYY-MM-DD>-<slug>-eval.md`
and update `docs/dev-flow/index.md`.

Follow [artifact-layout.md](../dev-flow/references/artifact-layout.md) for the
lifecycle artifact boundary and durable doc-truth ownership.

## Workflow

```text
read locked Spec and project test context
  -> map each Spec behavior to evidence
  -> assign Eval IDs to automated checks, manual checks, and evidence paths
  -> identify automated, manual, and untestable checks
  -> debate or review coverage when risk warrants it
  -> produce Eval
  -> hand off to agent-plan only when plan readiness is satisfied
```

## Output Contract

```text
Eval:
Source Spec:
Behavior coverage:
Acceptance checks:
Automated tests:
Manual checks:
Fixtures / scenarios:
Failure conditions:
Regression risks:
Evidence required from implementation:
Uncovered or untestable behavior:
Eval IDs:
Review status:
Plan readiness: ready | not_ready
Next owner:
```

## Plan Readiness Gate

Move to `agent-plan` only when:

- every important Spec behavior has an acceptance check or manual evidence path
- every acceptance check or evidence path has an Eval ID
- every Eval ID cites the Behavior ID it proves
- failure conditions are explicit enough to catch wrong implementations
- verification commands or evidence surfaces are known or flagged as open
- blocker/major Eval review findings are resolved or explicitly deferred
