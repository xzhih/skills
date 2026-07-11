---
name: agent-debate
description: "Use only when the user explicitly invokes $agent-debate, or when a loaded workflow routes here, and same-topic shared material needs adversarial product tradeoffs, requirement convergence, scope pruning, or decision clarity. Do not use for lanes, returned-lane review, code review, or single-agent brainstorming."
---

# Agent Debate

Moderate same-topic disagreement. Agents inspect the same material to clarify
tradeoffs, risks, and decisions. When Requirements routes here after discovery,
converge the candidate set through explicit scope pruning. Participants do not
own separate work areas.

## Iron Law

```text
SAME TOPIC, SAME MATERIAL, SAME ROUND.
```

Sections and categories are prompts for every participant, not lane boundaries.

## Use For

- requirements or product tradeoffs
- simplicity, necessity, usability, user flow, or "too heavy" questions
- agent-answerable disagreement before escalating to the user
- decision candidates from conflicting views

Use [agent-review](../agent-review/SKILL.md) for one concrete artifact. Use
[agent-lanes](../agent-lanes/SKILL.md) when agents should own disjoint surfaces.

## Preflight

- restore only the source context needed for the debate
- route every dispatched participant through
  [agent-runtime](../agent-runtime/SKILL.md) for worker lifecycle and the
  applicable native-default, profile-governed, or external/session gates
- get authorization before sending content to external, paid, account-bound, or
  data-leaving agents

## Round Rules

- Round 1: independent, source-first, same question for all.
- Moderator normalizes accepted, rejected, unresolved, evidence gaps, and
  decision candidates.
- Round 2+: send the same conflict summary back for rebuttal when needed.
- Promote only evidence-backed findings, assumptions, tradeoffs, and decisions.

Stop with a decision only when no accepted blocker/major disagreement remains.
Defer only minor, out-of-scope, or future issues with reason, owner, and risk.
If a true user decision remains, pause and return the exact decision instead of
claiming convergence.

## Requirements Convergence Mode

When `agent-requirements-analysis` routes a discovered candidate set here, read
its [requirements-convergence.md](../agent-requirements-analysis/references/requirements-convergence.md)
contract completely. It is the canonical owner of the convergence packet,
challenge dimensions, authority rules, outcomes, candidate coverage, and compact
ledger semantics. This skill owns the adversarial round and returned snapshot;
it does not redefine that protocol or publish the Requirements Baseline.

## Output

For ordinary debate, keep synthesis short:

```text
Decision:
Tradeoffs:
Remaining blocker/major:
Open user decision:
Next action:
```

Omit empty headings.

For Requirements convergence return:

```text
Convergence snapshot handle / candidate-set version:
Core Problem verdict:
Candidate outcomes and survivor recommendations:
Scope Pruning Ledger:
Candidate coverage: every handle -> one outcome
Remaining blocker/major:
Open user decision:
Next action: return to agent-requirements-analysis
```

Return the canonical outcomes and ledger rows without a transcript. The
Requirements owner marks this snapshot consumed only after integrating the
returned outcomes; dispatch, worker completion, or partial round state alone is
not a passed convergence gate.

## Red Flags

- Splitting agents by section before shared-topic review.
- Treating agreement as proof.
- Dispatching model mixes without approval.
- Ending after Round 1 while blocker/major disagreement remains.
- Letting agents write the shared blackboard directly.
- Pruning before Requirements has consumed discovery deltas or canonical
  discovery-skip evidence and assembled a versioned Candidate Requirement Set.
- Keeping a feature because it is interesting or comprehensive rather than necessary.
- Cutting a confirmed user requirement by majority vote.
- Returning raw debate, duplicated arguments, or silently removed branches.
- Calling the result a Requirements Baseline instead of returning convergence
  decisions to the Requirements owner.
