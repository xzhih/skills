---
name: agent-grilling
description: "Use only when an active workflow routes here, for agent-mediated formulation before Requirements, Spec, Plan, or lane dispatch: hidden gaps, assumptions, options, risks, boundary pressure, and questions agents can answer before asking the user. Do not use for review or returned-lane integration."
---

# Agent Grilling

Pressure-test an unclear goal before requirements, Spec, Plan, or lanes. This is
formulation help, not review and not implementation.

## Iron Law

```text
NO USER QUESTION UNTIL AGENT-ANSWERABLE QUESTIONS ARE EXHAUSTED.
```

Ask the user only for true decisions: product direction, taste, priority,
privacy/cost, destructive/public action, account access, or unavailable facts.

## Use For

- fuzzy target, path, scope, boundary, or success criteria
- likely human clarification questions agents can answer first
- user feedback like "not usable", "hard to scan", or "feels wrong"
- plausible architecture or lane-split branches
- risky lane boundaries before dispatch

Use [discussion-workflows](../discussion-workflows/SKILL.md) after a decision
state exists. Use [agent-lanes](../agent-lanes/SKILL.md) when boundaries are
clear enough for parallel work.

When using agents for the pass, use
[agent-runtime](../agent-runtime/SKILL.md) for capability, authorization, and
session lifecycle.

## Method

```text
restore source context if needed
  -> name the unclear target
  -> list agent-answerable questions
  -> translate user feelings into standards and gates
  -> get a default formulation and one challenge
  -> probe evidence, assumptions, counterexamples, and boundaries
  -> synthesize safe assumptions, decision candidates, and true user questions
```

Do the smallest useful pass. Repeat only while high-impact agent-answerable
questions remain.

## Output

Return only what helps the next owner:

```text
Formulation:
Assumptions:
Decision candidates:
Open user decision:
Next:
```

Omit empty headings. Read `references/formulation-grilling.md` only for large or
multi-round uncertainty.

## Red Flags

- Asking broad brainstorming questions before source or agent exploration.
- Dispatching lanes before boundaries are clear.
- Dumping raw disagreement on the user.
- Producing review findings while still formulating.
- Stopping after the first convenient answer.
