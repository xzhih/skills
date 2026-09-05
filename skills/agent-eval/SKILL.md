---
name: agent-eval
description: "Define acceptance criteria, failure conditions, and verification evidence for a request, specification, or plan. Use for evaluation design before implementation; not for executing tests or auditing a codebase."
---

# Agent Eval

Define acceptance from the request, behavior, or plan; no formal upstream artifact is required.

For each important behavior, provide a check and observable pass/fail criterion. Ground commands in project tooling; include reproducible manual steps or necessary fixtures where appropriate. Mark unknown setup and unavailable verification explicitly.

Ask whether a plausible wrong implementation could pass. Add the boundary, failure, or regression check that distinguishes it. Avoid exhaustive low-value tests and checks that merely mirror implementation.

Output behavior/check/pass-condition entries and material coverage gaps. Acceptance design is not a test result: do not execute tests or claim they passed. Keep provisional features out of acceptance obligations. Return gaps to the caller; standalone invocation stops here.
