---
name: steady-coding
description: "Implement, debug, refactor, or migrate code with grounded scope and verification. Use for non-trivial engineering changes; not standalone requirements, planning, or review requests."
---

# Steady Coding

Implement the authorized outcome in the existing project structure.

1. Inspect controlling source, callers, tests, workspace changes, and any current plan. Preserve unrelated work; resolve material scope drift before implementation.
2. For faults, establish evidence for the cause before changing behavior. Use [agent-grilling](../agent-grilling/SKILL.md) when competing explanations need deeper investigation.
3. Make the smallest sufficient change. Add abstractions, configuration, or dependencies only for a present requirement or demonstrated simplification.
4. Verify affected behavior, inspect the diff for omissions and surplus scope, repair concrete failures, and recheck.

Treat the user's proposed cause as a hypothesis. Do not mask defects with weaker assertions, longer timeouts, suppression, or retries without evidence that the change is correct.

Check the most plausible missed failure before completion; the workflow's review stage can provide this check. Report actual changes, verification, and remaining limits. Unrun checks are not passes. Keep records only when continuity needs them.
