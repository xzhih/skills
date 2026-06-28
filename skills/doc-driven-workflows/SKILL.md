---
name: doc-driven-workflows
description: Use when the user explicitly asks for doc-driven workflows, documentation/code synchronization, architecture indexes, full-chain or source-linked docs, operation-flow docs, call-path maps, open-question ledgers, code/docs alignment review, or when project guidance explicitly requires maintaining an existing or declared doc-driven documentation source of truth during relevant code changes or review.
---

# Doc-Driven Workflows

## Overview

Use this skill to prevent documentation drift. The goal is to keep project docs useful for future humans and agents without turning documentation into noisy ceremony.

Do not use this skill just because a repository has documentation. Use it only when the user asks for doc-driven work, when the user asks to review whether code and docs are aligned, or when project guidance explicitly requires doc-driven maintenance for the current kind of code or review task.

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

First decide whether the skill should run at all:

```text
User explicitly asks for doc-driven docs, doc sync, architecture docs, full-chain docs,
operation flows, call paths, code/docs alignment review, or an open-question ledger:
  use this skill

Project guidance explicitly says relevant code/review work must maintain doc-driven docs:
  use this skill at natural task boundaries

Repository merely contains doc-driven docs:
  do not use this skill by that fact alone

Repository lacks doc-driven docs:
  do not bootstrap unless the user explicitly asks
```

Then choose the mode:

```text
bootstrap:
  user explicitly asks to create/init doc-driven docs

maintenance:
  doc-driven docs already exist or are declared as source of truth,
  and the current task may make existing docs inaccurate
```

Presence of a doc-driven docs folder makes maintenance possible, not mandatory.

## Mode Details

Read `references/modes-and-gates.md` before performing bootstrap or maintenance. It defines invocation gates, resolved paths, lightweight discovery, action strength, and the project-guidance rule.

Read `references/document-patterns.md` before creating or materially changing a doc-driven documentation set. It defines the default document set, operation-flow rules, contract/call-path guidance, ledger format, diagrams, and final summary style.

## Core Workflow

1. Resolve whether invocation is allowed.
2. Resolve mode: bootstrap, maintenance, or no-op.
3. Resolve `doc_root` and `ledger_path`.
4. Use the smallest source-backed discovery pass that can answer whether docs would drift.
5. Choose action strength:
   - no-op
   - small sync
   - record only
6. Preserve confirmed docs for confirmed behavior.
7. Put uncertainty in the open-question ledger.
8. Keep user-facing output short and traceable.

## Companion Skills

This skill owns documentation drift decisions and documentation synchronization boundaries. It does not replace design, planning, coding, review, or multi-agent orchestration skills.

- Use brainstorming before designing a new doc-driven skill or a major documentation system.
- Use writing-plans after an approved design when implementation planning is needed.
- Use multi-agent-orchestration only when the user explicitly requests multiple agents or repeated review/repair.
- Use careful-coding or a domain-specific implementation skill for actual code changes.

If a companion skill is unavailable, proceed with ordinary capabilities. Mention the missing skill only when it would materially affect work quality.

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
- Confirmed docs contain only source-backed confirmed behavior.
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
Treating every question as a bug
Forcing Web/backend/admin-shaped docs onto libraries, CLIs, infra, or small tools
Making noisy process updates while another skill is doing the main work
```
