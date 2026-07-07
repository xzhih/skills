---
name: agent-review
description: "Use only when the user explicitly invokes $agent-review, or when a loaded workflow routes here, for one focused reviewer or multiple agents to review the same artifact: Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result. Do not use for debate, lanes, or returned-lane integration."
---

# Agent Review

Run a moderator-owned multi-agent review of one artifact. The core move is
whole-artifact review before targeted follow-up: independent agents inspect the
same artifact, findings are normalized, and material issues trigger rebuttal or
fresh recheck.

## Iron Law

```text
REVIEW THE SAME ARTIFACT BEFORE SHARDING FOLLOW-UP.
```

Do not split a Spec, Eval, plan, PR, or final result by section before a whole
artifact review round. Targeted follow-up is allowed only after the first round
identifies bounded issues.

## Use For

- one focused reviewer or multi-agent review of a Spec, Eval, Plan, roadmap,
  design proposal, PR, diff, implementation, deployment, evidence package, or
  final result
- high-confidence artifact review where one framing may miss issues
- fresh review after repair
- model-diverse review for architecture, UX/product judgment, verification, or final quality

Use [agent-debate](../agent-debate/SKILL.md) when the main goal is open
product/requirements debate. Use [integration-review](../integration-review/SKILL.md)
when returned lane handoffs, lane status, conflicts, and next-batch decisions
are the reviewed object.

## Preflight

No reviewer may be spawned or contacted before this preflight completes.

1. Identify the artifact, goal, review boundary, and evidence standard.
2. Run the dispatch gate in [agent-model-profile.md](../dev-flow/references/agent-model-profile.md) before assigning reviewers.
3. Use [capability-cache.md](../agent-self-driving/references/capability-cache.md) only for user-approved model-selectable or external reviewers.

Do not send task content to external reviewers until external use, model, phase,
privacy, and cost boundaries are authorized.

## Internal Flows

Handle review governance inside this skill:

- Use [review-convergence.md](../agent-self-driving/references/review-convergence.md)
  when blocker/major findings, conflicting sign-off, rebuttal, or fresh recheck
  are needed.
- Use [output-normalization.md](../agent-self-driving/references/output-normalization.md)
  before promoting agent outputs into findings, decisions, evidence, or repair
  tasks.
- Use [external-agent-sessions.md](../agent-self-driving/references/external-agent-sessions.md)
  when an approved external reviewer must be started, resumed, or kept pinned
  across rebuttal rounds.

## Review Topology

Choose the lightest topology that fits:

```text
single fresh review:
  one focused reviewer for a bounded artifact or question

redundant judgment:
  multiple reviewers inspect the same whole artifact independently

complementary lens review:
  multiple reviewers inspect the same whole artifact with different lenses

fresh recheck:
  a fresh reviewer or different model reviews after repair
```

Use the Agent Model Profile for reviewer identity, model diversity, and
independence rules.

Complementary lenses do not mean section ownership. Every reviewer still sees
the whole artifact unless the moderator assigns a targeted follow-up after the
first round.

## Review Contract

Every reviewer packet needs:

```text
Artifact:
Goal / source materials:
Review boundary:
Required checks:
Evidence rules:
Output: blocker | major | minor | question | note
Sign-off:
Stop condition:
```

First-round review should be blind, independent, and source-first when the
artifact affects Spec, Eval, plan, architecture, UX/product judgment, result
correctness, or final quality. Do not include other reviewers' conclusions or
the moderator's preferred answer in Round 1.

## Findings And Recheck

The moderator normalizes outputs into:

```text
Accepted findings:
Rejected findings:
Duplicated or merged findings:
Evidence gaps:
Questions:
Required repair:
Recheck owner:
```

Run rebuttal or fresh recheck when there is an evidence-backed blocker, a major
finding, conflicting sign-off, weak evidence on a high-impact claim, or repair
that changes the reviewed surface materially.

## Output

```text
Review target:
Participants/model mix:
Accepted blocker/major:
Minor/deferred:
Rejected findings:
Evidence checked:
Repair or recheck needed:
Sign-off status:
What not to claim yet:
```

## Red Flags

- Sharding review by section before whole-artifact review.
- Treating reviewer agreement as proof.
- Accepting findings without source or artifact evidence.
- Asking reviewers to invent the plan they are supposed to verify.
- Claiming sign-off while accepted blocker/major findings remain.
