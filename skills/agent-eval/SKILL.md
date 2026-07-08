---
name: agent-eval
description: "Use only when the user explicitly invokes $agent-eval, or when an active workflow routes here, to convert locked Spec behavior into acceptance evidence, automated/manual checks, failure conditions, fixtures, risk coverage, and implementation evidence requirements before Plan."
---

# Agent Eval

Define how to prove the Spec is correct. Own Eval only: do not write the
implementation plan or execute tests.

## Iron Law

```text
NO PLAN WITHOUT A WAY TO PROVE CORRECTNESS.
```

Every important behavior needs an automated check, manual evidence path, or
explicit `untestable/deferred` entry with risk and owner.

## Shared Rules

Apply:

- [mode-gate.md](../dev-flow/references/mode-gate.md)
- [coverage-trace.md](../dev-flow/references/coverage-trace.md)

Return only what Plan needs. Do not print empty headings.

## Use For

- acceptance criteria and evidence standards
- automated test targets, manual checks, fixtures, and scenarios
- failure conditions and regression risks
- implementation evidence expectations

Use [agent-spec](../agent-spec/SKILL.md) when behavior is still unclear. Use
[agent-plan](../agent-plan/SKILL.md) when checks and evidence are ready.

## Process

```text
read locked Spec and test context
  -> map behavior to checks or evidence
  -> identify automated, manual, and untestable coverage
  -> name failure conditions that catch wrong implementations
  -> preserve behavior-to-evidence trace at the selected weight
  -> review or debate only when coverage risk warrants
  -> hand off to Plan only when ready
```

Use [project-context](../project-context/SKILL.md) to discover test commands,
fixtures, and evidence surfaces. Use [agent-review](../agent-review/SKILL.md)
when one testing frame may miss important risk.

## Plan Readiness Gate

Move to Plan only when:

- every important behavior has an acceptance check or manual evidence path
- every check/evidence path traces to the behavior it proves
- failure conditions are explicit enough to catch wrong implementations
- verification commands or evidence surfaces are known, or flagged open
- blocker/major review findings are resolved or explicitly deferred

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/evals/<YYYY-MM-DD>-<slug>-eval.md`.
