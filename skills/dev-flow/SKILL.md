---
name: dev-flow
description: "Use only when the user explicitly invokes $dev-flow, or when an active workflow routes here, to choose and sequence the development lifecycle: Requirements, Spec, Eval, Plan, execution, review/test, repair, handoff, docs, lanes, or heavier agent workflows. Do not use when one leaf skill can finish the request."
---

# Dev Flow

Route complex development work to the owner skill. Do not implement, review,
dispatch, or edit docs from this router alone.

## Iron Law

```text
ROUTE TO THE OWNER; DO NOT IMPERSONATE THE OWNER.
```

## Shared Rules

Before shaping lifecycle artifacts, apply:

- `references/mode-gate.md`
- `references/coverage-trace.md`
- `references/task-checkboxes.md`
- `references/critical-overrides.md`

Read `references/artifact-layout.md` only when artifacts must persist.

## Owners

```text
requirements -> agent-requirements-analysis
Spec -> agent-spec
Eval -> agent-eval
Plan / lane candidates -> agent-plan
parallel batches -> agent-lanes
returned lanes -> integration-review
durable architecture / operation / call-path docs -> doc-driven-workflows
long-task orchestration -> agent-self-driving
agent capability / session lifecycle -> agent-runtime
```

Use one owner for each fact. Do not create competing docs.

## Use This Router

Use when the next owner or sequence is unclear, or when work crosses context
recovery, lifecycle gates, docs, lanes, integration, or heavier review.

Do not use when one leaf skill can finish:

- ordinary coding/debugging -> implementation workflow
- clear discussion recap -> `discussion-workflows`
- clear doc sync -> `doc-driven-workflows`
- clear lane dispatch -> `agent-lanes`
- same-topic debate -> `agent-debate`
- same-artifact review -> `agent-review`

## Lifecycle

```text
requirements -> Spec -> Eval -> Plan -> execute -> review/test -> repair/recheck -> close
```

Start at the first missing gate. Skip what is already obvious for the task size.
Small work may keep compact artifacts in chat. Persist only when recovery,
handoff, risk, or multi-agent work needs it.

Coverage trace:

```text
requirement -> behavior -> check -> task -> evidence
```

Never claim completion while a non-deferred trace item lacks a task, evidence,
blocker, or deferral.

## Scale

```text
small: one-line requirement -> compact Spec/Eval -> checkbox task -> verify
medium: separate gates in concise notes; review risky gates only
large: persisted lifecycle artifacts; review important gates
high-risk: review, repair, and recheck until blocker/major issues close
```

## Progression

When the user delegates a goal, continue to the next source-evident owner
instead of stopping at routing advice. Ask the user only for true user
decisions: product direction, taste, priority, privacy/cost, destructive/public
action, external-agent authorization, or unavailable information.

## Output

Return the smallest routing answer that lets work continue:

```text
Owner:
Why:
Next action:
Do not do yet:
```

Omit empty headings. If the next action needs no user input, continue into the
focused skill.

## Red Flags

- Loading this router because words like "plan", "review", or "docs" appear.
- Turning a small task into lifecycle ceremony.
- Writing durable docs when chat trace is enough.
- Routing to self-driving only because work feels large.
- Treating a routing recommendation as completed work.
