---
name: project-context
description: "Use only when an active workflow routes here, to restore authoritative project state before planning, delegation, integration, or doc maintenance: handoff, coordination, specs, lanes, discussion state, source-of-truth docs, verification conventions, and collision risks. Do not use merely because ordinary docs exist."
---

# Project Context

Recover current project state before planning, delegation, integration, or doc
maintenance. This skill produces a compact context packet; it does not design
or implement.

## Iron Law

```text
NO STATE-GOVERNED PLANNING FROM MEMORY.
```

Worker claims, stale summaries, and prior chat are hints. Current source, repo
state, and declared docs are authority.

## Use For

- continuing from handoff
- lane, discussion, Spec/Eval/Plan, or doc-governed work
- returned workers where lane state matters
- doc maintenance where source-of-truth roots matter
- collision or verification convention recovery

Do not load merely because ordinary docs exist.

## Read Lightly

Use the smallest source-backed read that identifies:

```text
goal
authoritative instructions
active handoff / lifecycle artifacts
confirmed / draft / open decisions
active lanes or returned work
source-of-truth doc roots
verification conventions
dirty workspace and collision risks
next owner
```

Prefer `rg --files` and targeted reads. Do not crawl every doc.

Read `references/source-map.md` when a project has many doc roots or restore
order is unclear. Read `references/ownership-map.md` before writing, promoting,
or routing facts when multiple docs could own them.
Use [agent-runtime](../agent-runtime/SKILL.md) when worker/session lifecycle
state affects restore.

## Routing After Context

Return the context packet and candidate next owner to the workflow that called
this skill. Never start or switch controllers from context recovery; the active
controller loads the next owner.

- discussion boundary/state -> [discussion-workflows](../discussion-workflows/SKILL.md)
- doc truth or drift -> [doc-driven-workflows](../doc-driven-workflows/SKILL.md)
- initial/approved lane dispatch -> [agent-lanes](../agent-lanes/SKILL.md)
- returned lanes -> [integration-review](../integration-review/SKILL.md)
- unclear goal/path -> [agent-grilling](../agent-grilling/SKILL.md)
- active self-driving run -> return to the same [agent-self-driving](../agent-self-driving/SKILL.md) controller

## Freshness

Reuse a recent context packet if the same goal is active and there is no branch
switch, lane return, source/doc change, new coordination artifact, or user goal
change.

## Output

Return or carry only what the next owner needs:

```text
Goal:
Sources:
State:
Risks:
Verification:
Next:
```

Omit empty headings. Link or name sources instead of copying them.

## Red Flags

- Planning or dispatching before state recovery.
- Treating a worker handoff as truth without diff/evidence.
- Reading every doc instead of the relevant roots.
- Promoting draft/open decisions into confirmed behavior.
- Creating workflow docs just because context is missing.
