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

## Contract

Apply [mode-gate.md](../dev-flow/references/mode-gate.md) and
[coverage-trace.md](../dev-flow/references/coverage-trace.md). Produce a
complete, concrete artifact at the selected weight; omit fields that do not
change planning or verification.

Accept only implementation-eligible confirmed Spec behavior. For every
important behavior, include each applicable obligation:

```text
Automated command, named test, or reproducible manual steps
Pass/fail oracle a stranger can apply
Failure condition that catches a plausible wrong implementation
Behavior -> check/evidence trace
Fixtures/data/setup when the check depends on them
Regression or risk checks when change could break nearby behavior
Untestable/deferred reason, risk, and owner
Evidence the Plan and implementers must attach
```

Block Plan handoff when the Eval contains:

```text
"works as expected" or "manual QA" without steps and an oracle
one vague check for unrelated behaviors
no failure condition beyond the happy path
no trace from a check to Spec behavior
checks for draft/open candidates as if they were implementation scope
```

Before handoff, ask whether a plausible wrong implementation could still pass.
Strengthen the oracle or failure condition until the answer is no.

## Process

1. Read the locked Spec and use
   [project-context](../project-context/SKILL.md) to discover relevant test
   commands, fixtures, and evidence surfaces.
2. Map confirmed behavior to automated, manual, or explicitly untestable
   coverage, including failure conditions and required evidence.
3. Route unclear behavior to [agent-spec](../agent-spec/SKILL.md). Route any
   draft/open candidate back to its upstream owner instead of creating a check
   that promotes it into scope.
4. Use [agent-review](../agent-review/SKILL.md) only when one testing frame may
   miss material risk.
5. Hand the ready Eval to [agent-plan](../agent-plan/SKILL.md).

## Plan Readiness Gate

Move to Plan only when:

- every important behavior has an acceptance check or manual evidence path
- no draft/open candidate appears as Eval behavior or implementation evidence
- every check/evidence path traces to the behavior it proves
- failure conditions are explicit enough to catch wrong implementations
- verification commands or evidence surfaces are known, or flagged open
- accepted blocker/major review findings are fixed and rechecked, or rejected
  with evidence; a true decision/dependency blocker keeps Eval paused

If persistence is needed, use the active workflow location; default:
`docs/dev-flow/evals/<YYYY-MM-DD>-<slug>-eval.md`.
