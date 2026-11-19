---
name: team-orchestration
description: "Plan or run parallel work when explicitly invoked or selected by an active workflow. Coordinate shared contracts and independent deliverables, compare solutions, or split a review by risk."
---

# Team Orchestration

For a discussion, propose assignments, dependencies, owners and acceptance checks, then stop before dispatch. For authorized execution, reuse the agreed scope and current results. The lead can both manage and integrate a single line of work. Add a Manager for a line that needs its own coordination, Workers for independently verifiable deliverables, and an independent Reviewer for the requested scope or consequential risk within the agreed arrangement.

## Decide what can start

Trace the real consumers and identify their shared behavior. When splitting deliverables, keep a sequential dependency chain with one owner. For each parallel deliverable, name its owner, writable area, dependency or contract version, and the check that decides completion. A Worker should be able to finish and verify its outcome without guessing another Worker's behavior. If the split fails that test, settle the missing contract or give the coupled work to one owner.

| Dependency | Work that can start |
|---|---|
| Independent outcome with a distinct writable area | Start now. |
| Small shared capability needed by several consumers | Give it one owner. Start its dependent consumers when the capability is usable. Unrelated work can proceed immediately. |
| Heavy shared implementation with agreed behavior | Publish a minimal contract with inputs, outputs, relevant failure semantics and runnable examples. Give consumers one versioned mock or fake implementing that contract. The provider and consumers can then work in parallel. |
| Disputed shared behavior | Give the decision an owner. Hold only the work whose behavior depends on it. |

## Compare solutions to one task

Use independent candidates when the user asks for independent solutions or a consequential choice needs separate designs or prototypes to settle it. Otherwise, one owner can compare the options locally.

1. Start with two Workers by default. Give each the same brief, baseline, inputs, constraints and acceptance checks. When testing specific alternatives, assign a different approach to each. Each produces a complete answer independently, in a separate worktree or output location.
2. The integrator applies the same checks to each candidate and records the results. Choose the passing candidate that best meets the agreed criteria, preferring simplicity on a tie. Bring in a part of another only when it closes a specific gap. If none passes, use the failures to guide repair and retest before selecting a result.
3. Recheck the selected or combined result against the original criteria. For code, run the affected real entry on that version.

## Review one candidate by risk

For an authorized multi-reviewer pass, take the review questions from `$agent-review` when installed. Give each reviewer the same fixed candidate (including in-scope uncommitted changes), the intended behavior and a distinct risk to investigate. Ask for the trigger, expected and observed results, supporting evidence and any unchecked area. A discussion ends with the proposed assignments.

The lead checks the evidence on that version and replays decisive checks where feasible. Keep every supported finding, merging reports with a common cause while preserving each affected consumer. List outstanding coverage, including missing reviewer results or unresolved evidence, with the check that would settle it. For review alone, deliver the consolidated findings and stop.

## Dispatch and integrate

For execution, use the [dispatch and handoff guidance](references/dispatch.md). Give each Worker its outcome, baseline, required skill paths, shared contract if applicable, writable scope, acceptance check, evidence to return and recipient. Link the project's verified procedure for shared checks. Instruct the Worker to open and read every designated skill in its own environment before starting the assignment. One named integrator owns the final result and checks.

Run the same contract examples against the mock and the real provider. Passing consumer tests against a mock establishes mock integration. After the provider lands, exercise each affected real entry on the integrated version. Record which checks passed on which version and who owns any still pending. A Reviewer checks the agreed scope and the evidence. For delivery assignments, the integrator follows up on findings, repairs and re-verification.

## When a Worker needs a protocol change

1. The discovering Worker sends the contract owner the failing scenario, the smallest proposed change, compatibility impact and affected consumers. Local implementation details stay with the Worker. Other independent work continues.
2. The owner assesses whether a local adaptation suffices or the shared contract should change. Take unresolved product choices or changes in scope to the decision maker. Once approved, designate one writer. That can be the discovering Worker on its own branch.
3. Isolate the contract change, mock and examples as a separately integrable change. The integrator lands it early, communicates its version to affected owners, and coordinates any incompatible transition before switching consumers.
4. Update the provider and affected consumers, including ones previously marked done. Rerun the shared examples and the affected real entries. Preserve valid evidence for unaffected work.
