# Project Shapes

Use this reference during bootstrap, and during maintenance when the project shape, workspace layout, or an architecture-shaping dependency may have changed.

## Contents

- Shape Detection
- Shape Analysis
- Workspace And Multi-Repo Layering
- Scale Adaptation

## Shape Detection

Detect project shape from source evidence, never from assumptions or a fixed taxonomy. A project can combine several interaction and runtime styles, and the docs should follow that combination.

Detection signals:

- manifests: `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`, `Package.swift`, `build.gradle`, and their scripts
- entry points: page routes, `main` functions, exported package APIs, command definitions, handlers, schedules
- layout: app/page directories, `cmd/` directories, IaC directories, dataset or notebook directories, multiple subproject roots
- project guidance: `AGENTS.md`, `CONTRIBUTING.md`, README statements about what the project is

Record the detected shape and its evidence in the root index using the project's own vocabulary. Shape drives which documents exist and what each emphasizes; the underlying invariants are always the same five: actors, entry points, boundaries, contracts, state.

## Shape Analysis

Analyze the project through questions, not labels:

- Who or what acts on the system: people, services, automation, external platforms, developer tooling, or another caller?
- Where do actions enter: UI routes, process entry points, exported APIs, commands, scripts, handlers, jobs, schedules, or data/artifact flows?
- What boundaries matter: code ownership, process, package, repository, trust, deployment, platform, or external service boundaries?
- What state or artifacts matter: persisted records, local state, caches, files, messages, queues, generated outputs, reports, deploy resources, or other durable artifacts?
- How does the project run and change: build tools, runtime processes, tests, local workbench, deploy flow, release flow, migrations, generated code, or operational procedures?
- What assumptions would break other work if they drift: input/output shapes, configuration, permissions, public behavior, storage formats, or cross-project expectations?
- What would a new human or agent most likely misunderstand without docs?

Use the answers to choose doc emphasis. Do not copy labels from this reference into project docs unless those labels are the project's actual language.

## Workspace And Multi-Repo Layering

When the doc root covers multiple repositories, or a monorepo with several deployable projects, use two documentation levels.

Workspace level owns:

- system map of subproject boundaries and how they communicate
- cross-project contracts: the APIs, events, schemas, or file formats that two or more subprojects depend on - the highest-drift-cost facts in the workspace
- end-to-end operation flows that cross subproject boundaries
- workspace-wide conventions: shared tooling, branch and release flow, environment layout
- the single shared open-question ledger

Project level owns:

- per-project architecture and tech stack
- per-project domain documents
- flows, contracts, and call paths that stay inside one project

Ownership rule: a fact lives at the level that owns it. Cross-project behavior is written once at workspace level; project internals are written once at project level; each level links to the other instead of restating. A small subproject may be a single section in a workspace document instead of its own subtree.

Choose names and paths from the project's own vocabulary. Keep the workspace index, cross-project contracts, end-to-end flows, and ledger easy to discover from the root index; nest or link project-level docs only when that reduces duplication.

## Scale Adaptation

Match ceremony to project size, and state the choice in the root index:

- Tiny projects: one document can hold overview, key facts, and open questions. No separate files unless they remove real complexity.
- Medium projects: keep a root index, architecture/tech-stack context, domain docs, and ledger, but let project vocabulary drive file names.
- Large or multi-project workspaces: separate workspace-level facts from project-level internals, using the ownership rule above.

When unsure, start smaller; splitting a document later is cheaper than maintaining ceremony that drifts.
