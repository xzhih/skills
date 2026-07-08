---
name: doc-driven-workflows
description: "Use when the user explicitly invokes $doc-driven-workflows, asks for doc-driven/code-docs sync, architecture/tech-stack/operation-flow/call-path docs, alignment review, or open-question ledgers; or when active workflow/project guidance requires maintaining declared source-of-truth docs. Do not use merely because docs exist."
---

# Doc-Driven Workflows

Maintain durable, source-backed project truth. This skill owns architecture,
tech stack, operation flows, call paths, project operating model, and
doc-driven open-question ledgers.

## Iron Law

```text
NO DOC SYNC WITHOUT AN INVOCATION GATE AND SOURCE EVIDENCE.
```

Docs that merely exist, docs that are absent, or theoretical drift do not
trigger this workflow.

## Use For

- explicit doc-driven work
- code/docs alignment review
- source-backed architecture, tech-stack, operation-flow, or call-path docs
- open-question ledgers for durable uncertainty
- maintenance when current work would make declared source-of-truth docs stale

Do not use for ordinary docs edits, discussion recap, lane integration, or code
implementation.

## Gates

1. Invocation allowed: user asked, project guidance requires it, or declared
   source-of-truth docs may drift.
2. Mode resolved from `references/modes-and-gates.md`: bootstrap, maintenance,
   or no-op.
3. Evidence current: source, config, tests, runtime evidence, project guidance,
   or official external docs.
4. Fact has one home. Link instead of duplicating.
5. Uncertainty goes to the open-question ledger, not confirmed docs.

## Refinement

Raw inbox material, vendor docs, SDK notes, screenshots, agent outputs, and
research excerpts are not project truth. Promote only refined, project-specific
contracts, flows, call paths, constraints, risks, evidence, or open questions.

Core question:

```text
Would future readers misunderstand how to operate, integrate, run, modify, or
trust the system if docs stayed unchanged?
```

If no, stay quiet.

## References

Read only what the mode needs:

- `references/modes-and-gates.md`: invocation, mode, paths, action strength.
- `references/document-patterns.md`: doc set and writing rules.
- `references/project-shapes.md`: shape detection and scale adaptation.

## Language

Reply in the user's current language. Preserve existing document language during
maintenance unless the user asks otherwise.

## Output

Keep summaries short:

```text
Docs updated:
Evidence:
Open questions:
Skipped:
```

Omit empty headings. Do not include broad next steps unless asked.

## Red Flags

- Bootstrapping because docs are missing.
- Running maintenance for every coding task.
- Writing speculation into confirmed docs.
- Copying raw external docs into durable truth.
- Creating duplicate fact homes.
- Claiming alignment without checking current source anchors.
