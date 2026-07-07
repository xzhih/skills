---
name: agent-debate
description: Use only when the user explicitly invokes $agent-debate, or when a loaded workflow skill routes here, to run same-topic multi-agent discussion for requirements, product friction, simplicity, necessity, usability, user flow, tradeoffs, or decision clarity. Do not use for parallel implementation lanes, returned lane integration, ordinary code review, or single-agent brainstorming.
---

# Agent Debate

Moderate a same-topic multi-agent discussion. The point is not to divide work;
it is to make several agents inspect the same material, surface disagreement,
and converge on clearer requirements, tradeoffs, and decisions.

## Iron Law

```text
SAME TOPIC, SAME MATERIAL, SAME ROUND.
```

Sections, boards, categories, and feature areas are prompts every participant
reviews. They are not agent ownership boundaries unless the user explicitly asks
for independent work lanes.

## Use For

- deciding whether a proposal is too heavy, necessary, simple, usable, or aligned with user flow
- clarifying product, UX, requirements, architecture, or workflow friction
- turning disagreement into a decision-ready blackboard
- repeatedly debating blocker/major disagreements until they are resolved, deferred, or escalated

Use [agent-review](../agent-review/SKILL.md) when the main goal is
to validate a concrete artifact. Use [agent-lanes](../agent-lanes/SKILL.md)
when agents should own different implementation or investigation surfaces.

## Preflight

1. Restore source context only as needed for the discussion.
2. Restore or create the Agent Model Profile from [agent-model-profile.md](../dev-flow/references/agent-model-profile.md).
3. Use [capability-cache.md](../multi-agent-orchestration/references/capability-cache.md) when model-selectable, external, paid, account-bound, or data-leaving agents may participate.
4. If no matching model profile exists, recommend a concrete model mix and ask for approval once.

Do not send task content to external agents until external use, model, phase,
privacy, and cost boundaries are authorized.

## Internal Flows

Handle adjacent discussion work inside this skill:

- Use [agent-grilling](../agent-grilling/SKILL.md) internally when the goal,
  assumptions, options, or decomposition are not formed enough for a debate
  packet.
- Use [discussion-workflows](../discussion-workflows/SKILL.md) internally when
  the debate result needs recap, confirmed/draft/open state, boundary records,
  or durable discussion notes.
- Use [agent-review](../agent-review/SKILL.md) when the discussion produces a
  concrete artifact that needs review instead of more debate.

Do not ask the user to choose these internal flows. Choose the next flow from
the evidence and continue unless a true user decision remains.

## Round Protocol

Round 1 is independent and source-first:

```text
Topic:
Source material:
Question:
Required lenses:
Output: blocker | major | minor | question | proposal | tradeoff
Evidence standard:
Sign-off options:
```

All participants receive the same topic, source material, question, and output
contract. Lenses may differ, but every participant still reviews the whole topic.

The moderator then builds a blackboard:

```text
Accepted:
Rejected:
Unresolved:
Conflicts:
Decision candidates:
Open questions:
Evidence gaps:
Next rebuttal packet:
```

Round 2+ is blackboard-focused. Send the same conflict blackboard back to the
same participants when continuity is available. Ask them to challenge weak
evidence, merged root causes, omissions, wrong severity, and decision impact.

## Convergence

Stop only when one of these is true:

- no accepted blocker or major issue remains
- remaining disagreement is explicitly deferred as non-blocking
- a true user decision remains: product direction, taste, privacy/cost, account access, destructive/public action, or user-defined priority
- a real pause condition blocks evidence, authorization, or capability

Agreement is not enough. Promote only evidence-backed findings, assumptions,
tradeoffs, and decision candidates.

## Output

```text
Discussion frame:
Participants/model mix:
Consensus:
Disagreements resolved:
Remaining blocker/major:
Decision candidates:
Open user decision:
Next bounded action:
What not to claim yet:
```

## Red Flags

- Splitting agents by board section before they all inspect the same material.
- Treating multi-agent agreement as proof.
- Asking the user to choose model mix without a recommendation.
- Ending after Round 1 while blocker/major disagreement remains.
- Letting agents write shared blackboards directly.
