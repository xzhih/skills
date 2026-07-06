---
name: doc-driven-workflows
description: Use when the user explicitly asks for doc-driven workflows, code/docs synchronization, architecture or tech-stack docs, full-chain or source-linked docs, operation-flow docs, call-path maps, code/docs alignment review, or doc-driven open-question ledgers, for a single project or a multi-repo workspace; or when project guidance requires maintaining an existing or declared doc-driven source of truth that may drift. Do not use merely because docs exist, docs are missing, or a normal code task could theoretically affect docs.
---

# Doc-Driven Workflows

## Overview

Use this skill to prevent documentation drift. The goal is to keep project docs useful for future humans and agents without turning documentation into noisy ceremony.

Doc-driven docs serve two readers at once: a human building a mental model of the project, and an agent loading architecture, contracts, and design intent before changing code. A human should be able to read them, understand how the system is built and operated, then ask an agent to repair docs, code, or both when documented behavior and implementation diverge. An agent should be able to navigate them by stable headings and source anchors.

Do not use this skill just because a repository has documentation. Use it only when the user asks for doc-driven work, when the user asks to review whether code and docs are aligned, or when project guidance explicitly requires doc-driven maintenance for the current kind of code or review task.

## Workflow Composition

When this skill is part of a larger development workflow, route through [development-workflows](../development-workflows/SKILL.md) and restore state with [project-context](../project-context/SKILL.md) before changing docs.

This skill owns documentation drift decisions. It does not own:

- discussion boundaries or confirmed/draft/open decision flow; use [discussion-workflows](../discussion-workflows/SKILL.md)
- subagent/worktree lane batching; use [parallel-lane-orchestration](../parallel-lane-orchestration/SKILL.md)
- returned lane review and next-batch recommendation; use [integration-review](../integration-review/SKILL.md)
- heavy Spec/Eval multi-agent convergence; use [multi-agent-orchestration](../multi-agent-orchestration/SKILL.md)

When another workflow changes source-of-truth docs, keep this skill focused on whether docs would mislead future humans or agents. Do not turn every lane into a broad doc rewrite.

Core question:

```text
If a future human or agent reads the existing docs after this change, could they misunderstand how to operate, integrate, run, modify, or trust the system?
```

If yes, or if source-backed uncertainty is worth tracking, sync docs or record it. Otherwise stay quiet.

## Language Policy

Reply in the user's current language by default.

When creating new persistent docs, use the user's current language unless the user specifies another language.

When maintaining existing docs, preserve the target document's established language and terminology. Only switch document language when the user explicitly asks, the document language is genuinely mixed or unclear, or a new document has no established language.

When docs serve a multilingual team, briefly restate the language convention before writing persistent files.

## Routing

Use the frontmatter description as the first gate. Presence or absence of docs never triggers this skill by itself.

If invocation is allowed, read `references/modes-and-gates.md` and resolve the mode there:

- `bootstrap` requires explicit user intent to create or initialize doc-driven docs.
- `maintenance` requires existing or declared doc-driven docs and a current task that may make them inaccurate.
- otherwise, no-op quietly.

## Mode Details

Read `references/modes-and-gates.md` before performing bootstrap or maintenance. It defines invocation gates, resolved paths, lightweight discovery, anchor verification, action strength, and the project-guidance rule.

Read `references/document-patterns.md` before creating or materially changing a doc-driven documentation set. It defines the domain-first document set, architecture and tech-stack patterns, writing quality rules, contrastive examples, ledger format, governance, and final summary style.

Read `references/project-shapes.md` during bootstrap, and during maintenance when project shape, workspace layout, or an architecture-shaping dependency may have changed. It defines shape detection, per-shape doc focus, multi-repo layering, and scale adaptation.

## Core Workflow

1. Resolve whether invocation is allowed.
2. Resolve mode: bootstrap, maintenance, or no-op.
3. Resolve `doc_root` and `ledger_path`.
4. For bootstrap, resolve project shape(s) and scale, then run a discovery pass deep enough to write source-backed narrative and architecture docs. For maintenance, use the smallest source-backed discovery pass that can answer whether docs would drift.
5. Choose action strength:
   - no-op
   - small sync
   - record only
6. Preserve confirmed docs for confirmed behavior.
7. Put uncertainty in the open-question ledger.
8. Keep user-facing output short and traceable.

## Companion Workflows

This skill owns documentation drift decisions and documentation synchronization boundaries. It does not replace design, planning, coding, review, or multi-agent orchestration skills.

- Use an appropriate design workflow before creating a new doc-driven skill or major documentation system.
- Use an appropriate planning workflow when implementation planning is needed.
- Use an explicit orchestration workflow only when the user requests multiple agents or repeated review/repair.
- Use an appropriate implementation, review, or domain-specific workflow for actual code changes.

If another workflow is unavailable, proceed with ordinary capabilities. Mention the missing workflow only when it would materially affect work quality.

## Output Style

Default to quiet operation. Avoid long process narration, especially when other skills are active.

Final summaries should list only:

- docs updated
- code or behavior changes those docs correspond to
- open-question ledger entries recorded with levels
- skipped updates and reasons

Do not include broad next-step recommendations unless the user asks.

## Completion Gate

Before claiming doc-driven work is complete:

- Bootstrap only ran after explicit user intent.
- Maintenance did not run merely because a docs folder exists.
- Existing document language was preserved during maintenance.
- Multilingual-team docs had their language convention restated before writing.
- The document set matched the resolved project shape and scale, including workspace layering for multi-repo work.
- Confirmed docs contain only source-backed confirmed behavior.
- New or changed content passes the inclusion method: it has durable reader value, stale-doc consequence, source-backed evidence, and an appropriate abstraction level.
- Every created or materially changed document opens with a narrative overview, and no zero-information statements were added.
- Each fact has a single home; duplicates were replaced with links, and no evidence-mirror file was created.
- Evidence anchors in touched documents resolve to current source, and freshness anchors were updated.
- Useful source-backed diagrams were created or updated when they materially improve navigation, or when existing diagrams would otherwise drift.
- Uncertainties or suspected issues are recorded in the open-question ledger.
- Project guidance references the resolved docs path after bootstrap.
- Maintenance did not silently edit project guidance unless the task explicitly included doc maintenance.
- Formatting checks ran for touched Markdown.

## Common Mistakes

```text
Bootstrapping because a repository lacks docs
Running maintenance on every normal coding task
Reading the whole docs tree to decide no-op
Hardcoding docs/doc-driven-workflows after the user chose another doc_root
Changing existing document language during maintenance
Writing speculation into confirmed architecture docs
Dumping source facts into tables without narrative or design intent
Translating code line-by-line into docs
Documenting private helpers, branches, variables, or file inventories with no durable consequence
Creating one global evidence mirror that duplicates every fact
Splitting one domain across system-map, operation-flow, contract, and call-path files
Listing every dependency instead of architecture-shaping direct dependencies
Copying reference examples or role lists as templates instead of adapting to the project
Treating every question as a bug
Forcing Web/backend/admin-shaped docs onto libraries, CLIs, infra, or small tools
Adding diagrams that are decorative or ceremonial instead of useful for navigation
Making noisy process updates while another skill is doing the main work
```
