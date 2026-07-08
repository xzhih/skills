---
name: discussion-workflows
description: "Use when the user explicitly invokes $discussion-workflows, or when an active workflow routes here, for long/corrected/decision-heavy discussion governance: recap, boundaries, reference comparison, complexity checks, drift control, confirmed/draft/open state, inbox material, or durable discussion notes."
---

# Discussion Workflows

Keep complex discussion decision-ready. This skill owns discussion state, not
implementation, lane integration, or durable project truth.

## Iron Law

```text
DO NOT TREAT UNMARKED DISCUSSION CONCLUSIONS AS CONFIRMED.
```

Separate `confirmed / draft / open`. User corrections replace stale phrasing and
boundaries.

## Use For

- recap after long, corrected, or decision-heavy discussion
- boundary, responsibility, complexity, or drift checks
- comparing references without copying them as templates
- deciding what is confirmed, draft, open, deferred, or stale
- saving raw research/reference material before refinement

Use [agent-grilling](../agent-grilling/SKILL.md) when the goal itself is still
unformed. Use [integration-review](../integration-review/SKILL.md) for returned
lanes. Use [doc-driven-workflows](../doc-driven-workflows/SKILL.md) for durable
source-backed project truth.

## Actions

Pick the smallest action that unblocks the discussion:

```text
recap current state
clarify boundaries
compare references
check complexity
check subtopic drift
capture discussion state
```

Do not run all actions by default.

## Process

```text
frame the action
  -> restore persisted discussion state only when needed
  -> separate confirmed / draft / open
  -> mark stale corrected claims
  -> name the next decision or next owner
  -> persist only when reuse, handoff, or memory loss risk warrants
```

Raw inbox material belongs in `docs/discussion-workflows/inbox/`; it is not
implementation truth. Promote only refined, project-specific conclusions through
the owning workflow.

## Persistence Gate

Short answers stay in chat. Consider persistence when the user asks to record,
the discussion is long, corrections changed key boundaries, reusable judgments
are accumulating, or a future thread must resume.

## Output

Default shape:

```text
Confirmed:
Draft:
Open:
Next:
```

Omit empty headings. Do not make the user type "continue" just to see the next
decision candidate when it is already known.

## Red Flags

- Recapping by adding new design.
- Treating draft/open as confirmed.
- Copying a reference without local constraints.
- Letting a subtopic hide the main question.
- Persisting chat transcript instead of decision state.
