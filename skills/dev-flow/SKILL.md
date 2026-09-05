---
name: dev-flow
description: "Route a requested development workflow across requirements, behavior, planning, acceptance, implementation, and review. Use for explicit $dev-flow or requested end-to-end delivery; not a standalone stage request."
---

# Dev Flow

Route authorized work through these stages; each skill owns its method:

1. Requirements: [agent-requirements-analysis](../agent-requirements-analysis/SKILL.md)
2. Behavior and boundaries: [agent-spec](../agent-spec/SKILL.md)
3. Implementation plan: [agent-plan](../agent-plan/SKILL.md)
4. Acceptance: [agent-eval](../agent-eval/SKILL.md)
5. Implement and verify: [steady-coding](../steady-coding/SKILL.md)
6. Review: [agent-review](../agent-review/SKILL.md)

Read the selected skill when entering its stage, perform its work, then continue automatically within the user's authorization. Reuse existing decisions and artifacts; start at the first missing stage. Plan and Eval may refine each other, with acceptance defined before implementation. Return material findings for repair and recheck only affected work.

Use the current agent. Small tasks keep stages compact in chat; no formal upstream documents or sign-offs are required. A standalone stage request stops at that stage. If a required skill is unavailable, report the gap rather than pretend it ran.

Persist only for requested files or recovery: use the project's location, otherwise one `docs/dev-flow/<slug>.md` with decisions, steps, acceptance, evidence, and next action. On resume, check relevant current source and update affected decisions.

Close from verified results and resolved material findings. Otherwise report the exact missing decision, dependency, or verification and next action.
