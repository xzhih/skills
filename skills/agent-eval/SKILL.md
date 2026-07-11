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

Return only what Plan needs. Do not print empty headings. Do not confuse
brevity with hollow checks.

## Use For

- acceptance criteria and evidence standards
- automated test targets, manual checks, fixtures, and scenarios
- failure conditions and regression risks
- implementation evidence expectations

Use [agent-spec](../agent-spec/SKILL.md) when behavior is still unclear. Use
[agent-plan](../agent-plan/SKILL.md) when checks and evidence are ready.

Accept only implementation-eligible confirmed Spec behavior. If a draft/open
candidate appears as behavior, route it back to Spec/Requirements; do not create
an Eval check that could promote it into implementation scope.

## Depth (detailed, not empty)

Eval proves the Spec with **concrete checks and oracles**—detailed enough to
catch wrong implementations, not a short restatement of the goal and not empty
test theater. Apply mode-gate **Substance Rule**.

Minimum applicable obligations (omit irrelevant slots; never invent `N/A`
content merely to fill the shape):

```text
Per important Spec behavior:
  check or evidence path (automated command, named test, or manual steps)
  pass/fail signal a stranger can apply
  failure conditions that would catch a plausible wrong implementation
Trace: behavior -> check/evidence
Fixtures/data/setup when the check depends on them
Regression or risk checks when change could break nearby behavior
Untestable/deferred entries: reason, risk, owner—not silent omission
Implementation evidence expectations (what Plan/workers must attach)
```

Thin Eval red flags (block Plan readiness):

```text
- "works as expected" / "manual QA" with no steps or oracle
- one vague check covering many unrelated behaviors
- no failure condition that a wrong but "happy path" build would hit
- no link from check back to a Spec behavior
- inventing tests for draft/open Spec items as if confirmed
- whole Eval is a short bullet list for multi-behavior Specs
```

Self-check: **Would a wrong implementation still "pass" this Eval?** If yes,
deepen failure conditions and oracles.

## Process

```text
read locked Spec and test context
  -> map behavior to checks or evidence
  -> identify automated, manual, and untestable coverage
  -> name failure conditions that catch wrong implementations
  -> preserve behavior-to-evidence trace at the selected weight
  -> expand until anti-thin bar passes
  -> review or debate only when coverage risk warrants
  -> hand off to Plan only when ready
```

Use [project-context](../project-context/SKILL.md) to discover test commands,
fixtures, and evidence surfaces. Use [agent-review](../agent-review/SKILL.md)
when one testing frame may miss important risk.

## Plan Readiness Gate

Move to Plan only when:

- Depth (anti-thin) bar is met—not only "has a checks section"
- every important behavior has an acceptance check or manual evidence path
- no draft/open candidate appears as Eval behavior or implementation evidence
- every check/evidence path traces to the behavior it proves
- failure conditions are explicit enough to catch wrong implementations
- verification commands or evidence surfaces are known, or flagged open
- blocker/major review findings are fixed/rechecked or rejected with evidence;
  a true decision/dependency blocker keeps Eval paused

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/evals/<YYYY-MM-DD>-<slug>-eval.md`.
