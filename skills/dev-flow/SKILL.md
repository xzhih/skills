---
name: dev-flow
description: "Use when the user invokes $dev-flow to explain, fix, refactor, optimize, deliver or resume engineering work. Select a playbook and decide what can be done directly or delegated."
---

# Dev Flow

Start on a direct invocation. A skill name inside a draft being edited belongs to the draft. On resume, first separate completed outcomes from outstanding work using the [handoff](#handoff-and-resume). Choose by the requested result and stopping point. Read the matching playbook or specialist, preferring the copy installed with this collection. On a mixed request, combine the relevant parts.

| Requested result | Method |
|---|---|
| Understand an existing feature, design choice or UI | [Explain](playbooks/explain.md), using `$explain` when installed |
| Correct a local behavior or diagnose a fault | [Fix or diagnose](playbooks/fix.md). A known small correction goes straight to the edit and check. |
| Simplify or reorganize code while preserving behavior | [Refactor with the same behavior](playbooks/deliver.md#refactor-with-the-same-behavior) |
| Run an experiment to decide between designs | [Settle a design choice](playbooks/deliver.md#settle-a-design-choice) |
| Deliver a feature, migration or cross-module change | [Deliver](playbooks/deliver.md). Start at the first unresolved decision. |
| Create or update a manual, API reference or other maintained page | Only the [document maintenance steps](playbooks/deliver.md#maintain-a-document) |
| Improve a measurable property, such as latency, memory or database reads | [Optimize](playbooks/optimize.md). For a combined refactor and optimization, also check behavioral equivalence. |

For requirements, specification, an architecture choice, planning or acceptance design alone, read the requested part of the installed `$agent-plan` and stop at that artifact. For review alone, use `$agent-review` and stop with findings. If a multi-reviewer pass is authorized, use `$team-orchestration` to assign its risk questions on the same candidate. The [delivery playbook](playbooks/deliver.md) covers local planning and review when this skill is installed alone. If the user required an unavailable specialist, identify it and continue the independent work.

Use one agent by default for a small task or a sequential dependency chain. Add specification for disputed behavior or targeted review for consequential risk. Use the installed `$team-orchestration` to discuss or run independent deliverables, or to compare complete solutions to one task when independent attempts are requested or needed to settle a consequential choice. Pass it the goal, dependencies and stopping point. Discussion ends with the proposed assignments. Without the team skill or a required dispatch tool, keep feasible work local and identify any requested team activity still pending.

## Handoff and resume

Keep a small task in chat. When a durable handoff is requested or needed, update the affected parts of the project's existing record. Preserve decisions, owner assignments and evidence that still hold. If there is no such record, use one `docs/dev-flow/<slug>.md` in the project's language. Use the same flow IDs across the requirement, plan, checks and findings when several outcomes could otherwise be confused.

Record the accepted outcome, actual consumer, candidate version, evidence obtained, outstanding check and next action. For a check another owner will repeat, link the [verified procedure](playbooks/deliver.md#hand-off-a-repeatable-check). Mark a newly designed check pending until run. Identify the integration owner when work is delegated. On resume, carry valid results and original artifacts forward as completed. Repeat a check when the user requests a fresh run or a relevant change or conflicting evidence invalidates the result. If the next candidate is unknown, state that condition and keep the existing result. A blocked integration check stays open while independent work proceeds. See the [handoff examples](references/worked-handoffs.md).

At a requested pause or shift change, record any still-running job, its owner, handle and last observed status. Give the evidence for any rejected approach and the first concrete action on resume. The next owner checks live status before continuing or relaunching the work.
