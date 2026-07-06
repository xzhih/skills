# Modes And Gates

Use this reference before bootstrap or maintenance.

## Contents

- Invocation Gate
- Bootstrap Gate
- Maintenance Gate
- Resolved Paths
- Lightweight Detection
- Bootstrap Evidence Pass
- Maintenance Discovery
- Anchor Verification
- Drift Judgment
- Action Strength
- Project Guidance Rule

## Invocation Gate

Separate two decisions:

- Skill invocation gate: whether this skill should run at all.
- Mode eligibility gate: whether bootstrap or maintenance is allowed after the skill has run.

A doc-driven docs folder existing in a repository makes maintenance possible, not mandatory.

Use the skill only when:

- the user explicitly asks for doc-driven docs, doc sync, architecture docs, tech-stack docs, workspace or multi-repo docs, full-chain docs, source-linked docs, operation flows, call paths, code/docs alignment review, or an open-question ledger for doc-driven uncertainty
- project guidance explicitly requires doc-driven maintenance for relevant code changes or review
- the user asks to review whether code and docs are aligned

Do not use the skill when:

- a docs folder merely exists
- a repository merely lacks docs
- a code task could theoretically affect docs, but no user request or project guidance requires doc-driven maintenance

Maintenance runs at natural boundaries: after a requested code change, during review summary, before commit checks, or when the user asks about doc sync. It does not run after every file read or during every small edit.

## Bootstrap Gate

Bootstrap requires explicit user intent.

Allowed examples:

```text
Create doc-driven docs for this project.
Build architecture and operation-flow docs that stay synchronized with code.
Build source-backed docs for this workspace or multi-repo project.
Document the architecture and tech stack for agent handoff.
Set up docs/doc-driven-workflows for this repo.
Make this codebase documentation-driven.
Create a doc-driven open-question ledger for this repo.
```

If the user explicitly asks only for a doc-driven open-question ledger and no doc-driven docs exist yet, treat it as a minimal bootstrap for the ledger and index needed to locate it.

Not enough for bootstrap:

```text
This repo has no docs.
Please fix this bug.
Review this code.
```

## Maintenance Gate

Maintenance cannot bootstrap.

Maintenance is eligible only when at least one is true:

- `docs/doc-driven-workflows/` exists
- a docs index declares itself as the doc-driven source of truth
- project guidance points to an equivalent doc-driven docs set

If none exists, say briefly that doc-driven maintenance is skipped because no doc-driven docs were found.

## Resolved Paths

Resolve paths before writing:

1. `doc_root`
   - user-specified path
   - path declared by project guidance or docs index
   - default `docs/doc-driven-workflows/`
   - for a multi-repo workspace, `doc_root` normally lives at the workspace root and covers all subprojects; see `project-shapes.md` for layering
2. `ledger_path`
   - existing ledger under resolved `doc_root`
   - ledger declared by docs index
   - default `doc_root/open-questions.md`

Follow the `ledger_path` order above. If multiple ledgers exist, use the ledger declared by the docs index. If no index declares the right ledger, choose the ledger under resolved `doc_root` and report that choice in the final summary.

Use the resolved paths in docs and summaries. Do not hardcode the default after a user override.

## Lightweight Detection

To detect an existing doc-driven system:

1. Check whether default `docs/doc-driven-workflows/` exists.
2. If absent, search project guidance and docs indexes with `rg` for:
   - `doc-driven`
   - `docs/doc-driven-workflows`
   - `open-questions`
   - `doc_root`
3. Do not read the whole docs tree for detection.

## Bootstrap Evidence Pass

Before writing bootstrap docs, resolve the project shape(s) and scale with `project-shapes.md`, then do a source-backed inventory:

- project guidance: `AGENTS.md`, `CONTRIBUTING.md`, README, or equivalent
- manifests: `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`, or equivalent, for architecture-shaping dependencies
- real actors: humans, operators, CLI users, SDK consumers, service callers, automation systems
- real entry points: pages, commands, package APIs, service interfaces, message handlers, schedules, deploy entry points
- real boundaries: modules, packages, processes, devices, external systems, files, data stores
- real contracts and state: function signatures, APIs, events, schemas, config, lifecycle, failure/recovery paths

Bootstrap discovery must be deep enough to write narrative overviews and architecture docs that pass the inclusion method and value threshold in `document-patterns.md`. Read the key entry files and follow the main call chains; do not write architecture or flow docs from directory listings alone.

Unknowns go into `ledger_path` or a pending section. Do not invent confirmed architecture, design rationale, or dependency constraints.

## Maintenance Discovery

Use this bounded discovery order:

1. Inspect the actual change surface: diff, modified files, review target, or user-named files. Treat manifest changes (`package.json`, `go.mod`, and equivalents), architecture-boundary changes, and cross-project contract changes as part of the surface.
2. Read `doc_root/README.md` or equivalent index.
3. Search `doc_root` for changed paths, symbol names, entry names, flow names, contract names, or user-named keywords.
4. Open only matching candidate docs.
5. If too many docs match, open the most relevant docs from the index. Do not expand to the whole docs tree unless the user asked for a deep audit.

If impact remains unclear and there is no evidence, prefer no-op or record only.

When choosing no-op or record only because evidence is insufficient, keep the final summary to one traceable sentence that states the uncertainty and why discovery was not expanded.

## Anchor Verification

Evidence anchors are machine-checkable: a `path` must exist and a `path:symbol` must be findable with `rg` in that file.

When maintenance touches a document, verify the anchors in the touched sections:

- fix an anchor when the symbol moved and the documented behavior is unchanged
- record a `stale doc` ledger entry when the anchor's fact may itself have drifted
- refresh the document's freshness anchor (date and short commit hash) after verification

Keep verification bounded to touched documents and sections. Verify a whole document set only when the user asks for a deep audit, and offer the project a reusable check (script or documented command) instead of repeating manual sweeps when the docs set is large.

## Drift Judgment

Ask:

- Would any current document sentence, diagram, operation step, contract, lifecycle, invariant, call path, or risk statement become inaccurate?
- Would a reader following old docs operate, integrate, deploy, test, or modify the system incorrectly?
- Did the change alter an interaction path, system boundary, contract, lifecycle, failure/recovery behavior, trust boundary, or external dependency?
- Did the change alter a documented architecture boundary, dependency direction, design invariant, architecture-shaping dependency, or cross-project contract?
- Does the potential update pass the inclusion method, or would it merely translate code into prose?
- Did the change reveal an uncertainty worth tracking?

These are internal judgment prompts, not required final-output sections.

## Action Strength

### No-op

Use no-op when no documented behavior changed. Do not load large docs. If reporting is needed, say only that doc-driven maintenance was skipped because no documented behavior changed.

### Small Sync

Use small sync when impact is confirmed, local, and source-backed. Update only affected docs.

Confirmed docs must only contain confirmed behavior.

### Record Only

Use record only when impact is broad, uncertain, product-dependent, or speculative. Add or update a ledger entry instead of changing confirmed docs.

Use record only when a potential bug is found while organizing docs and the user did not ask for fixes.

When in doubt between small sync and record only, choose record only.

## Project Guidance Rule

As part of explicit bootstrap, add a short rule to project guidance using resolved paths:

```markdown
Doc-driven workflow docs live under `<doc_root>`. Start from `<doc_root>/README.md`.
When code changes would make those docs inaccurate, update the matching docs in the same change or commit.
Unresolved questions or suspected issues go in `<ledger_path>`.
```

Replace `<doc_root>` and `<ledger_path>` with the resolved project-relative paths before writing project guidance.

Maintenance should check this rule with a lightweight search. It must not silently edit guidance files unless the user explicitly asked for doc maintenance or the current task itself is documentation maintenance.
