# Document Patterns

Use this reference when creating or materially changing a doc-driven documentation set.

## Contents

- Reader Model
- Document Set
- Root Index
- Architecture And Tech Stack
- Domain Documents
- Inclusion Method
- Writing Quality
- Quality Heuristics
- Human-Agent Workflow
- Operation Flows
- Contracts And Interfaces
- Call Paths
- Mermaid Diagrams
- Open-Question Ledger
- Document Governance
- Final Summary

## Reader Model

Doc-driven docs serve two readers at once:

- A human reading the project for the first time. They need narrative and a mental model: what the system is, how it is layered, and why it works the way it does.
- An agent loading context before changing code. It needs stable file names, greppable headings, precise source anchors, and recorded design intent so its changes do not break the architecture.

Every document must serve both. Facts without narrative fail the human; narrative without source anchors fails the agent.

## Document Set

Organize by domain, not by document form. A useful doc set usually has these roles, but file names and count should follow the project:

- a root index for purpose, reading order, glossary, and agent routing
- architecture and tech-stack context for layering, boundaries, design decisions, and key dependencies
- domain documents for subject areas that deserve their own durable explanation
- an open-question ledger for uncertainty, suspected drift, and product decisions
- an `archive/` area for superseded or abandoned docs that must remain
  traceable but are not active source of truth

Rules:

- Resolve the project shape first with `project-shapes.md`. It defines shape-specific doc focus, workspace/multi-repo layering, and scale adaptation.
- Operation flows, contracts, call paths, and data/state flows are sections inside the domain document that owns them, not global form-shaped files. A global `operation-flows.md` that mixes login, billing, and deployment scatters every domain across files and forces duplication.
- Merge everything into `README.md` when the project is small enough that separate files would be ceremony.
- Never create a global evidence-mirror file that repeats facts recorded elsewhere. Evidence lives next to the fact it supports, once.

## Root Index

The root index is the entry point for both readers. Include:

- purpose of the doc set, resolved `doc_root` and `ledger_path`
- maintenance rule: docs update in the same change as the code that invalidates them
- detected project shape(s) and the evidence for that detection
- reading order for humans: which documents to read first and why
- routing table for agents: "changing X: read Y first" entries for the main domains
- short glossary when project terminology is not obvious from names
- document map with a one-line summary per document
- source-backed Mermaid overview diagram when project structure benefits from one

## Architecture And Tech Stack

The architecture document explains how the system is built and why. It is often the highest-value document for an agent about to modify code. Include only source-backed content:

- Layering and boundaries: the layers or module groups, the allowed dependency direction, and explicitly forbidden dependencies (for example "HTTP handlers never touch the ORM directly; they go through `internal/modules/`").
- Design decisions and invariants (ADR-lite): decisions a future change could silently break. For each: the decision, why it holds, and evidence. Record the "why" only when source, config, tests, or project guidance state it; when the rationale is unknown, record the decision as observed and put the "why" question in the ledger.
- Cross-cutting mechanisms: the shared patterns new code must follow: error handling, auth, idempotency, transactions, validation, logging.
- Tech stack: only architecture-shaping direct dependencies, not a lockfile dump. For each: name, role, where it is used, and constraints or sharp edges (for example "queries are generated with `gorm.io/gen`; do not hand-write them"). Evidence comes from manifests: `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`, or equivalent.

## Domain Documents

Each domain document covers one subject area end to end, so a reader never chases one topic across five files. Let the domain shape the section structure instead of copying a template. Useful sections usually answer these questions:

- What is this domain responsible for, and what is explicitly outside it?
- What are the main actors, entry points, and boundaries?
- What operation flows, contracts, call paths, data, or state transitions are important enough to preserve?
- What source anchors prove the current behavior?
- What uncertainties belong in the ledger instead of confirmed docs?

## Inclusion Method

Do not decide by matching a fixed list of allowed topics. Decide by usefulness, durability, and source-backed confidence.

Raw intake from `docs/discussion-workflows/inbox/` is evidence input, not
doc-driven content. Before promotion, transform raw excerpts, external docs,
research notes, screenshots, or agent outputs into the project-specific
contract, operation flow, call path, constraint, risk, or open question they
prove. If that transformation is not possible yet, keep the material in
discussion state or the ledger instead of confirmed docs.

Before adding anything to confirmed docs, ask:

- Reader value: would this help a future human or agent understand, operate, integrate, modify, or trust the project better than reading the code alone?
- Change consequence: if this fact becomes stale, could someone make a wrong change, call the system incorrectly, operate it incorrectly, or misunderstand an important boundary or behavior?
- Abstraction level: is this explaining the system's shape, intent, constraint, behavior, or navigation path, instead of translating implementation mechanics into prose?
- Durability: is this likely to remain meaningful across ordinary refactors, or is it a temporary local detail best left in code?
- Evidence quality: can the claim be verified from source, config, tests, runtime evidence, or project guidance without speculation?
- Single-home fit: is this the one best place for the fact, with other docs linking instead of repeating?

Add the content only when the answers justify durable documentation. If the value is only "this exists in code," omit it. If the detail is useful only as a locator, make it a compact source anchor inside a broader explanation. If the evidence is incomplete, record the uncertainty in the ledger instead of writing confirmed docs.

## Writing Quality

- Narrative first. Every document and every major section opens with 2-5 plain sentences that build a mental model before any details. A reader who stops after the overview should still leave with a correct rough picture.
- Refined truth only. Do not paste raw API docs, vendor docs, role lists,
  external examples, agent transcripts, or inbox notes into durable docs. Extract
  the local obligation, behavior, constraint, risk, and evidence, then link to
  the raw material only when provenance matters.
- Value threshold. Apply the delete test before writing a statement: if removing it loses nothing that a reader could not infer from file names alone, do not write it. Ban statements like "the route exists" or "X handles Y" with no behavior.
- One fact per statement. Split compound behavior into separate statements or a narrative paragraph. Never pack multiple behaviors into one table cell or one bullet.
- Tables enumerate, prose explains. Use tables only for homogeneous items: config modes, contract fields, model lists, dependency lists. Never narrate behavior or flows inside table cells.
- Evidence restraint. Inline at most 1-2 anchors per statement, choosing the most precise `path:symbol`. Move supporting evidence to a compact Evidence block at the end of the section. Evidence must support the text, not drown it.
- Single source of truth. Each fact lives in exactly one document; every other mention links to it instead of restating it.
- Size budget. Keep each document under roughly 300 lines. When a document outgrows the budget, split it by domain; never grow table cells or evidence lists instead.

## Quality Heuristics

Use these heuristics to judge the document after drafting. They are not templates:

- Mental-model test: after reading the overview, can a new human explain the domain's role, boundaries, and main moving parts without reading source first?
- Change-safety test: can an agent identify which files, contracts, invariants, and tests to inspect before changing the domain?
- Specificity test: does every claim teach behavior, constraint, ownership, or consequence that is not obvious from filenames?
- Evidence test: can a skeptical reader verify important claims without wading through a long path dump?
- Shape test: does the document match this project's form, scale, and vocabulary rather than a generic Web/backend/admin layout?

## Human-Agent Workflow

The intended loop:

1. A human reads docs to understand a domain, operation, contract, or call path.
2. The human notices missing, stale, surprising, or incorrect behavior.
3. The agent checks source, runtime evidence, or project guidance.
4. The agent chooses one outcome:
   - update confirmed docs when code is right and docs drifted
   - update code when docs describe the intended behavior and code drifted
   - update both when the source-backed contract changed
   - record uncertainty in the ledger when evidence is insufficient
5. Confirmed docs and implementation converge again.

Write docs so this loop is possible. A reader should be able to find where an operation starts, what happens, which files and functions matter, what state changes, and which contract or question to inspect next.

## Operation Flows

Operation flows are written from the actor's point of view. Actors can be users, administrators, operators, CLI users, SDK consumers, internal staff, automation systems, or service callers.

Document a flow when it is user-visible, operationally critical, contract-bearing, failure-prone, risk-sensitive, or already documented.

For each relevant flow, capture:

- entry point
- action: click, type, select, upload, call, confirm, schedule, or run
- observed feedback or state transition (GUI states, exit codes, response shapes, events)
- success result, and failure result when source-backed
- the 1-2 key source anchors per step

## Contracts And Interfaces

Document contracts that other code, systems, or humans rely on: API routes, public functions and classes, events and messages, CLI flags, file and config formats, schemas, external protocols, permission or trust rules.

Avoid listing private implementation details unless they are needed for future maintenance.

## Call Paths

Call paths are compact source navigation chains. Each step should identify a meaningful handoff, boundary, or side effect, with a short purpose phrase. Keep paths useful for navigation, not exhaustive stack traces or line-by-line call graphs.

## Mermaid Diagrams

Include a source-backed Mermaid diagram when a relationship is easier to understand visually: system maps, sequence flows, state lifecycles, data flows, operation journeys.

Maintenance must update existing diagrams when documented behavior, boundaries, state, or call paths change. Omit diagrams when they would be decorative, speculative, or less useful than a compact text summary.

## Open-Question Ledger

Unconfirmed questions, suspected issues, stale docs, or product decisions go to `ledger_path`, not confirmed docs.

Levels:

- `confirmed issue`: explicit contract, test, schema, invariant, or unambiguous code path proves wrong behavior
- `likely issue`: strong suspicion that needs runtime, environment, or product validation
- `question`: evidence is insufficient; needs clarification
- `stale doc`: existing docs contradict current source, config, or observed behavior
- `product decision needed`: technical behavior is possible but product, operations, trust, or experience needs a decision

Statuses: `open`, `needs verification`, `deferred`, `resolved`, `superseded`.

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

Ledger hygiene: when a ledger grows past roughly 30 entries or its `resolved` entries dominate, move resolved and superseded entries to an archive section or file and say so in the final summary.

## Document Governance

- Freshness anchor: each document header records the last verification point: a date plus the short commit hash (`git rev-parse --short HEAD`) when available. Agents can then scope drift checks with `git diff <hash> -- <paths>` instead of re-verifying everything.
- Machine-checkable evidence: write anchors as `path` or `path:symbol` exactly, so their existence can be verified mechanically. Anchor verification during maintenance is defined in `modes-and-gates.md`.
- Same-change rule: a code change that invalidates a documented fact updates that fact in the same change, or records a `stale doc` ledger entry.
- Stable navigation: keep file names and headings stable; agents locate context by grepping them. Rename only with the user's consent.

## Archive Governance

Archived docs are historical evidence, not active project truth. Use an
`archive/` folder under the resolved `doc_root` for:

- domain docs replaced by a new source-of-truth document
- stale architecture or operation-flow docs that should not guide future work
- resolved or superseded ledger batches
- abandoned design directions worth preserving for rationale

Before archiving, ensure the active root index no longer routes agents to the
archived file as current truth. Link the replacement or current active doc.

Add an archive header:

```text
Archived: <YYYY-MM-DD>
Status: superseded | abandoned | obsolete | wrong-assumption | completed-history
Reason:
Replaced by:
Evidence:
Do not use as active truth because:
```

Normal maintenance should not read `archive/` unless an active doc links it, a
contradiction needs history, or the user asks for provenance. Never copy
archived claims back into confirmed docs without rechecking current source
evidence.

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
