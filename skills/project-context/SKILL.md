---
name: project-context
description: "Restore authoritative project state when the current request depends on handoff, coordination, spec, lane, discussion, multi-agent, or declared source-of-truth docs before planning, delegation, integration, or doc maintenance. Do not use merely because a repository has AGENTS.md or ordinary project docs."
---

# Project Context

Recover the real project state before deciding, planning, delegating, or editing. This skill produces a compact context packet; it does not design the solution or implement changes.

## Composition

When entered through [development-workflows](../development-workflows/SKILL.md), treat this skill as the shared context gate for the rest of the workflow.

After restoring context, route to:

- [discussion-workflows](../discussion-workflows/SKILL.md) for boundary, decision, or drift questions
- [doc-driven-workflows](../doc-driven-workflows/SKILL.md) for doc source-of-truth maintenance
- [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md) for batched lane work
- [integration-review](../integration-review/SKILL.md) for returned lane review
- [agent-grilling](../agent-grilling/SKILL.md) for goal/path pressure testing
- [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md) for heavier multi-agent Spec/Eval or adversarial workflows

## Profile Discovery

Use the smallest source-backed read that can recover current state. Prefer `rg --files` and targeted reads.

First classify the project profile:

```text
lightweight:
  No declared workflow docs are needed for the current request. Build an
  in-chat context packet from code, package manifests, repo guidance, tests,
  and git state. Do not create docs.

handoff-governed:
  The request depends on an active handoff, roadmap, task state, or equivalent.

lane-governed:
  The request depends on lane coordination, returned worker handoffs,
  or batch planning.

discussion-governed:
  The request depends on confirmed/draft/open decisions, boundaries, or
  discussion records.

doc-governed:
  The request depends on declared source-of-truth docs or doc-driven
  maintenance.

spec/evidence-governed:
  The request depends on specs, compliance, evidence, or hard gates.

heavy multi-agent:
  An active multi-agent Spec/Eval workflow owns the task.
```

Then read only the roots that match the profile and exist in the project. Use declared project paths first, then common equivalents from `references/source-map.md`.

Always inspect current repo state as needed:

- branch and dirty files
- active lane workspaces when lane-governed
- recent relevant commits when needed
- package manager artifacts that could signal drift

## Context Packet

Return or internally carry this shape:

```text
Project:
User goal:
Authoritative instructions:
Current handoff:
Active/review/blocked/merged lanes:
Agent Model Profile:
Confirmed decisions:
Draft decisions:
Open questions:
Overlap/collision risks:
Doc source-of-truth roots:
Ownership map:
  Task-state owner:
  Lane-status owner:
  Decision owner:
  Architecture-doc owner:
  Evidence owner:
  Open-question owner:
  Raw-agent-output owner:
Verification conventions:
Package manager conventions:
Dirty workspace notes:
Next workflow to continue:
```

Keep the packet concise. Link or name source files instead of copying large sections.

When two or more workflow doc roots exist, fill the ownership map before planning, dispatch, integration, or doc maintenance. If ownership is unclear, read `references/ownership-map.md`.

## Rules

- Treat docs and code as current evidence; do not rely on memory from another project.
- Do not read every doc just because it exists.
- Do not reopen decisions already marked confirmed unless source evidence contradicts them.
- Do not promote draft or open questions into confirmed behavior.
- Do not edit coordination or source-of-truth docs from this skill unless the user explicitly asked only to repair context records.
- If required context is missing, state the missing source and proceed with an in-chat context packet plus a reversible assumption when safe. Do not ask the user to create workflow docs before proceeding unless durable documentation is itself the requested work.

## Reference Routing

Read `references/source-map.md` when a project has many documentation roots, custom equivalents, or the correct read order is unclear.

Read `references/ownership-map.md` when multiple docs could plausibly own the same fact, when worker handoffs include doc changes, or before promoting discussion/agent output into source-of-truth docs.
