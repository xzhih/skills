# Document Patterns

Use this reference when creating or materially changing a doc-driven documentation set.

## Contents

- Default Document Set
- Root Index
- System Map
- Data And State Flows
- Operation Flows
- Contracts And Interfaces
- Call Paths
- Diagrams
- Open-Question Ledger
- Final Summary

## Default Document Set

The default document set is optional and shape-aware:

```text
<doc_root>/
  README.md
  system-map.md
  operation-flows.md
  data-and-state-flows.md
  contracts-and-interfaces.md
  call-paths.md
  open-questions.md
```

Instantiate only documents justified by the observed project:

- Create `operation-flows.md` only when there are human, operator, CLI, SDK, automation, or consumer flows.
- Create `data-and-state-flows.md` only when there are meaningful persistence, lifecycle, cache, queue, file, message, migration, or recovery concerns.
- Create `contracts-and-interfaces.md` only when there are cross-boundary contracts.
- Create `call-paths.md` only when future humans or agents need source entry chains.
- Merge small projects into `README.md` when separate files would be ceremony.

Do not force Web/backend/admin-shaped docs onto other repo shapes.

## Root Index

The root index should include:

- purpose of the doc-driven docs
- resolved `doc_root` and `ledger_path`
- maintenance rule
- document map
- short source-backed system summary
- links to module docs

## System Map

Create or maintain a system map only when it helps readers understand boundaries. It can describe participants, modules, packages, processes, deployment units, devices, external systems, or storage boundaries.

Keep it source-backed. Do not turn it into a speculative architecture diagram.

## Data And State Flows

Create or maintain data/state docs only when the project has meaningful persistence, lifecycle, cache, queue, file, message, migration, or recovery behavior.

State what changes, where it lives, who owns it, what transitions are allowed, and what happens on failure or recovery.

## Operation Flows

Operation flows are written from the actor's point of view. Actors can be users, administrators, operators, CLI users, SDK consumers, internal staff, automation systems, or service callers.

Document a flow when it is user-visible, operationally critical, contract-bearing, failure-prone, risk-sensitive, or already documented.

When meaningful human, operator, consumer, automation, CLI, SDK, or service-caller interaction exists, present it in an actor-oriented flow document or section. Do not bury actor actions only inside system, data, or state-flow docs.

For each relevant flow, capture:

- entry point
- action: click, type, select, drag, upload, call, confirm, schedule, or run
- observed feedback or state transition
- success result
- failure result when source-backed
- source files and functions/components

Examples of observed feedback:

- GUI: loading, disabled, empty, warning, success, error
- CLI: exit code, stdout, stderr, progress output
- SDK/API: response shape, error code, thrown error
- automation: event, log, retry, alert

## Contracts And Interfaces

Document contracts that other code, systems, or humans rely on:

- API routes
- public functions/classes
- events/messages
- CLI flags
- file formats
- config formats
- schemas
- external protocols
- permission or trust rules

Avoid listing private implementation details unless they are needed for future maintenance.

## Call Paths

Call paths should be compact and source-backed:

```text
entry file or actor
-> source file:function/component
-> source file:function/service
-> source file:repository/adapter/side effect
```

Keep paths useful for navigation, not exhaustive stack traces.

## Diagrams

Diagrams are optional. When created or maintained, use Mermaid when it improves understanding and keep it source-backed.

Good diagram types:

- system map
- sequence flow
- state lifecycle
- data flow
- operation journey

Do not add diagrams just to satisfy a template.

## Open-Question Ledger

Unconfirmed questions, suspected issues, stale docs, or product decisions go to `ledger_path`, not confirmed docs.

Levels:

- `confirmed issue`: explicit contract, test, schema, invariant, or unambiguous code path proves wrong behavior
- `likely issue`: strong suspicion that needs runtime, environment, or product validation
- `question`: evidence is insufficient; needs clarification
- `stale doc`: existing docs contradict current source, config, or observed behavior
- `product decision needed`: technical behavior is possible but product, operations, trust, or experience needs a decision

Statuses:

- `open`
- `needs verification`
- `deferred`
- `resolved`
- `superseded`

Entry format:

```markdown
### <short title>

- Level: `<level>`
- Status: `<status>`
- Observed: <source-backed observation>
- Risk: <why it matters>
- Evidence: `<path>` or `<path:function>`
- Suggested next step: <one concrete next step>
```

Write rules:

- Update an existing matching entry instead of duplicating it.
- If multiple ledgers exist, use the ledger resolved by `modes-and-gates.md`.
- Prefer lower certainty when evidence is incomplete.
- After a fix, update status and evidence instead of deleting the entry unless the project docs define cleanup rules.

## Final Summary

Keep final output short and traceable:

```text
Docs updated:
- path: reason

Ledger entries recorded:
- level path-or-title: short reason

Skipped:
- reason
```

If nothing changed:

```text
Doc-driven maintenance skipped: no existing documented behavior changed.
```
