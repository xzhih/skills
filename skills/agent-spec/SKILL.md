---
name: agent-spec
description: "Define observable behavior, scope, non-goals, interfaces, and relevant failure boundaries from a request or existing requirements. Use independently for a specification or within a development workflow."
---

# Agent Spec

Define observable behavior from the request or available requirements; no formal baseline is required.

Specify relevant primary flows, scope/non-goals, interface/data boundaries, and important empty/error/permission/recovery cases. Include compatibility and performance constraints only when consequential.

Resolve details from current project evidence or explicit assumptions. Preserve confirmed scope and surface consequential open choices. Ask whether two implementers could agree on the intended behavior; repair ambiguity, contradiction, and missing coverage without adding speculative features.

Output the specification and material open questions. Link existing decisions instead of duplicating them. Standalone invocation stops here; return to the caller when part of a workflow.
