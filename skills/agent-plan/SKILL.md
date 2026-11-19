---
name: agent-plan
description: "Clarify requirements, specify behavior, compare architecture choices, plan an implementation, or design acceptance checks. Use for the particular deliverable requested."
---

# Agent Plan

Deliver the requested requirements, specification, design decision, plan or acceptance checks. Ground them in the current system, prior decisions and existing evidence. For planning alone, describe new experiments and leave them unrun until execution is requested. Reuse existing flow IDs. State a reversible assumption where it matters. If a decision belongs to the user, identify what it blocks and finish the independent parts.

## Requirements

Start at the real entry. Identify the user, success signal, current behavior and requested difference. An existing capability may be unreachable. Follow the flow far enough to tell. Explore branches that change the outcome, such as who owns the data, who has permission, and what happens on failure or recovery.

At each meaningful fork, compare the options against the evidence, value, cost and constraints. Record which option to keep, change, defer or drop and why. Preserve confirmed requirements. A costly confirmed need calls for a tradeoff the user can decide. Keep only the dependent branch provisional and continue the others.

For a disputed design, state the premise, a plausible counterexample and the evidence that would change the decision. Treat a newly discovered need as a proposal until accepted.

For branching requirements, give a Mermaid tree and a compact decision table. Mark confirmed, provisional and pruned branches consistently and record why each material choice was made. A simple requirement can be stated directly. Stop a branch when the behavior is clear enough to specify, the remaining choice belongs to implementation, or a named decision blocks it. A requirements-only request ends here.

## Behavior specification

For each affected flow, describe the actor, starting state, action and observable result. Trace the input and output through the actual interface to the consumer that owns the resulting state. Mark proposed interfaces as proposals. Cover relevant empty, permission, failure, cancellation, retry or late-result cases. State when data is retained, committed or invalidated and which constraints or exclusions apply.

When cancellation, retry or crash recovery can interleave, state what must hold in every relevant order. Give the shortest reachable sequence likely to break that rule and the observable state or effect count that would expose it. Use that sequence as an acceptance case. Draw a state diagram when the ordering is hard to check in prose.

Compare the spec with the original request and reference. Resolve ambiguities that would let two implementers produce conflicting behavior. Keep observations, source inferences and open decisions distinct. For a reference interface, use the [reference UI guide](references/reference-ui.md). A spec-only request stops at the behavior contract.

## Architecture decisions

When an open choice changes a shared interface, who owns state, or a boundary that would be costly to move, compare two feasible structures for the same required behavior. Use the current structure as one option when viable. Trace the same real caller and a relevant failure through each. Show where the state or responsibility lives, what the caller passes and receives, and what a migration would touch.

Recommend the simplest structure supported by existing evidence. If the choice turns on an empirical question, specify the smallest representative probe and which observation would favor each option. An inconclusive result leaves the choice open. In a large migration, schedule the test most likely to invalidate the remaining plan as soon as its dependencies are ready. One planner can make this comparison. A design-only request ends with a recommendation or the unrun experiment and its decision rule.

## Implementation plan

Write for the person who will carry out the plan. For each deliverable, give the before-and-after outcome, the entry and callers affected, and an acceptance check. Reuse suitable code and checks. Include needed wiring, configuration, fixtures or exports, order work by dependency and name the integration owner for delegated work.

Trace each accepted requirement to a deliverable and each planned step back to a requirement or necessary dependency. For an older plan, check its pending steps against current source and evidence. Keep completed work, revise invalidated steps and prune unrelated cleanup. If a target is unknown, plan the smallest discovery that identifies it before naming a file or API.

## Acceptance design

An acceptance-only request ends with executable checks and coverage gaps.

- Require only setup established by the brief or the system. Check that the fixture can reach the required state. Give the starting data, real action or project command, observable pass and fail conditions, and the smallest decisive evidence.
- Check that a plausible wrong result would fail. A manual retry check must distinguish a user-triggered retry from automatic recovery. If a controlled change is needed to test a check, look for the intended assertion to fail. An unrelated timeout leaves the question open.
- Match the evidence to the claim. Integration needs its real consumer. A claim about rendered appearance needs an observation of the relevant view.
- Keep a blocked, accepted check required and pending. Name the missing evidence, where to obtain it, and the checks that can proceed. Provisional features become acceptance obligations only when accepted.

Mark proposed checks as pending until someone executes them against an identified candidate.
