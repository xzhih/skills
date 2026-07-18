# Critical Overrides

Use these rules across the development workflow skills.

## Source Truth

- Recover current project context from code, repository state, and source-of-truth docs before planning, delegating, integrating, or claiming progress.
- Do not rely on memory from another thread or another project when current docs or code can answer.
- Treat agent outputs, old evidence, and handoff summaries as claims until checked against source files, diffs, or fresh verification.

## Documentation Hygiene

- Do not create competing sources of truth.
- Do not promote `draft`, `open`, `overlap`, or `blocked` notes into confirmed behavior.
- Do not scatter the same fact across handoff, discussion, spec, and architecture docs. Pick the owning document and link from other places.
- Use the project-context ownership map when multiple docs could own the same fact.
- Prefer small source-backed updates over broad documentation rewrites.
- Record uncertainty in an open-question ledger or discussion inbox instead of confirmed docs.

## Internal Flow Ownership

- When a loaded workflow lists internal flow skills, choose the next flow from
  evidence and the current blocker. Do not ask the user to choose ordinary
  internal flows.
- Ask the user only for true user decisions, authorization boundaries, or
  workflow preferences they have not already provided.

## Parallel Work

- Parallelize only after ownership boundaries, excluded surfaces, verification, and integration expectations are clear.
- Keep high-collision files, shared contracts, migrations, and evidence packets single-owner per batch.
- The main thread owns batching, normalized state, integration, and final claims.

## Action Authority

- For requests to answer, explain, review, diagnose, or plan, inspect the
  relevant material and report the result. Do not implement unless requested.
- For requests to change, build, or fix, make the requested in-scope local
  changes and run relevant non-destructive validation without asking first.
- Confirm external writes, destructive actions, purchases or other costly
  execution, unauthorized data-leaving agent use, and material scope expansion.
- After a goal is delegated, continue until completion, a true blocker, or an
  explicit redirect. Resolve uncertainty from source, focused agents, or
  reversible assumptions before escalating.
- Do not make the user relay prompts, worker summaries, routine batch choices,
  or ordinary agent disagreements. Continue non-overlapping work when one lane
  blocks.
- Route dispatched workers through `agent-runtime`: native-default host workers
  need lifecycle handling but no model profile; named/model-selectable or
  external/session participants need their applicable profile/authorization gates.

## Evidence

- Verification must match the changed surface.
- UI/Admin hard gates need fresh browser or DOM evidence when project rules require it.
- A blocked external condition is a real status, not a pass.
- Do not claim a gate passed without the command, evidence path, or blocker record that supports it.
