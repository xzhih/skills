---
name: agent-grilling
description: "Investigate a question deeply through evidence, assumptions, counterexamples, and causal tests. Use for explicit grilling, hidden requirements, disputed design assumptions, or root-cause investigation; not routine review."
---

# Agent Grilling

Investigate a consequential question through evidence, assumptions, counterexamples, and causal checks using the current model.

1. Separate observations, claims, and assumptions; inspect relevant source, logs, data, or reproducible behavior.
2. Ask what must be true, what supports it, what else explains it, and what follows if it is wrong.
3. Choose the next check that best distinguishes explanations. Follow high-impact branches rather than a fixed number of “whys.”

For requirements, expose missing actors, states, permissions, ownership, failure paths, and second-order effects; return proposed changes, not confirmed scope.

For faults, distinguish symptom, trigger, mechanism, and underlying condition. A plausible story is not a verified root cause: use reproduction or discriminating evidence, otherwise retain competing hypotheses and the next useful check.

For designs, test assumptions, failure boundaries, and alternatives against the actual goal.

Stop when the consequential question is answered, further work belongs to implementation, remaining uncertainty is low-impact and bounded, or a necessary fact/decision is unavailable. Resolve source-answerable questions yourself; ask only for user-owned facts or choices.

Output the supported conclusion, evidence, uncertainty, and next action—not an exploration transcript. Standalone investigation does not authorize repair or risky live experiments. Within an authorized fix, return findings for continued implementation.
