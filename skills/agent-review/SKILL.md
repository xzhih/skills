---
name: agent-review
description: "Review a concrete specification, plan, diff, implementation, or result against its goals and evidence. Use for artifact review or post-execution review; not broad improvement discovery."
---

# Agent Review

Review the concrete artifact against its goal, scope, and evidence; formal upstream documents are unnecessary.

Inspect relevant source, and for implementation the full relevant diff, affected callers, and verification. Check incorrect behavior, omissions, contradictory assumptions, weak acceptance, and surplus scope. Plans need grounded surfaces and purposeful steps; specifications need unambiguous behavior.

Each material finding needs location/evidence, consequence, severity, and a focused correction or next check. Separate defects from questions and optional improvements. Do not invent findings to demonstrate effort.

Use the current model, re-reading from acceptance criteria. Label self-review honestly; independence requires an actual separate reviewer.

Report findings, evidence checked, and coverage limits. A review-only request does not authorize repairs. In a delivery workflow, return findings for repair and recheck; close them only through verification or evidence-backed rejection.
