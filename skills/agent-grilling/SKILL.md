---
name: agent-grilling
description: Use when a goal needs agent-mediated brainstorming, requirements discovery, option exploration, boundary clarification, risky lane decomposition, or pressure-testing before planning or dispatch. Use when questions that would normally go to the user can first be answered by source context or focused agents. Do not use for routine plan review, code review, returned lane integration, or full Spec/Eval delivery.
---

# Agent Grilling

Turn unclear goals into workable formulations by having agents answer, debate, and probe the questions that would otherwise interrupt the user. This skill is a focused formulation helper; it is not a full delivery workflow.

## Composition

When used inside the development workflow, start from [development-workflows](../development-workflows/SKILL.md) and restore source state with [project-context](../project-context/SKILL.md).

Use this skill when:

- a goal exists but the target, path, boundaries, or success criteria are fuzzy
- the next natural step would be asking the user brainstorming-style clarification questions, but agents can first infer, research, or debate likely answers
- the user gives experiential feedback such as "not usable", "doesn't feel like a real admin", "hard to scan", or "this feels wrong" and the workflow must translate it into professional standards and gates
- several implementation or architecture branches seem plausible
- a lane boundary feels risky but not ready for heavy Spec/Eval orchestration
- the user asks agents to challenge, grill, debate, pressure-test, or dig into an idea

After grilling:

- use [discussion-workflows](../discussion-workflows/SKILL.md) when the result is a decision/boundary recap
- use [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md) when boundaries are clear enough for worktree lanes
- use [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md) when the result needs full Spec/Eval, adversarial review-repair, external-agent policy, or repeated convergence

If the next step is safe and inside the delegated goal, continue into it. Do not stop to ask the user to approve ordinary implementation order, lane splitting, or an evidence-backed default.

## Rules

- The main thread is the moderator. It owns the blackboard, synthesis, user escalation, and promoted decisions.
- Use the smallest useful number of agents, but do not stop after one pass while high-impact agent-answerable questions remain.
- Grilling creates inferred answers, proposals, tradeoffs, assumptions, decision candidates, and open questions. It does not create review findings unless a true blocker prevents a coherent next artifact.
- Treat user-style clarification questions as an agent work queue first: purpose, constraints, non-goals, users, success criteria, approach choices, boundary placement, and decomposition.
- Treat user feelings and business intent as valid requirements input. Translate them into domain vocabulary, task models, unacceptable shapes, quality bars, and verification gates instead of asking the user for expert parameters.
- Preserve the grilling posture: for high-impact answers, ask follow-up "why", "what evidence", "what assumption", "what counterexample", "what boundary", and "what if this is wrong" questions before accepting them.
- Resolve agent-answerable questions with source docs, code, runtime evidence, focused agents, or safe assumptions before asking the user.
- Ask the user only for non-agent-decidable decisions such as product direction, brand/taste, privacy/cost, public/destructive actions, or user-defined preferences.
- Do not dump raw agent disagreement on the user. Synthesize it into a small set of decisions and next actions.
- Keep the user out of the moderator loop unless a true user decision remains.

## Lightweight Flow

```text
restore source context
  -> state the unclear target or decision
  -> list the questions a human brainstorming session would ask
  -> translate user feelings/business intent into domain standards and failure gates
  -> route agent-answerable questions to source inspection or focused agents
  -> get one default formulation
  -> get one challenge or alternate formulation
  -> probe high-impact answers for root causes, evidence, assumptions, counterexamples, and failure modes
  -> resolve evidence-backed questions
  -> repeat only while high-impact agent-answerable questions remain
  -> synthesize decision candidates and safe assumptions
  -> route to discussion, lane orchestration, or heavy multi-agent workflow
```

## Output

Return:

```text
Formulation snapshot:
Agent-answered questions:
Derived standards and gates:
Decision candidates:
Safe assumptions:
Open questions:
True user decisions:
Next workflow to continue:
What not to claim yet:
```

Read `references/formulation-grilling.md` for role details, packet shape, and stop conditions when the uncertainty is large or multi-round.
