---
name: agent-plan
description: "Create a practical implementation plan from a request, specification, or current source. Use for planning only or within an authorized delivery workflow; no formal upstream artifacts are required."
---

# Agent Plan

Plan the smallest sequence of testable deliverables from the request and current source. Formal Spec/Eval documents are unnecessary.

Recheck whether existing pending work is still needed. Ground file/module/API targets in source; use bounded discovery for unknown surfaces rather than inventing them.

Each meaningful step states its deliverable, affected surface, dependencies, and verification. Include risks or stop conditions only when they change execution. Cover every important requirement, and require every step to serve a current need or delivery dependency. Remove speculative cleanup and needless task splitting.

Acceptance may be embedded or supplied by the workflow. Flag gaps rather than initiate other stages. Use checkboxes when tracking helps. For an older plan, check current source and update only invalidated steps.

Output steps, checks, and material uncertainties. Standalone planning ends here; return to the caller in a delivery workflow.
