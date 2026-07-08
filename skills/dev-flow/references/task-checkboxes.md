# Task Checkboxes

Use checkbox tasks when a workflow needs explicit execution state.

## Core Rule

Checkboxes track task status. They do not replace coverage trace, evidence, or
review.

```text
- [ ] Task not started
- [~] Task in progress or partially blocked
- [x] Task completed with evidence
- [!] Task blocked or needs repair
- [-] Task deferred or intentionally skipped
```

Use only the states that the current medium supports. If `[~]`, `[!]`, or `[-]`
would be awkward in the target format, keep the checkbox and put the state after
it:

```text
- [ ] Implement export flow - blocked: missing API contract
```

## Task Shape

Each executable task should be action-oriented:

```text
- [ ] <verb + deliverable> - trace: <need/check>; verify: <command or evidence>
```

Keep tasks small enough to execute and verify independently. Do not split by
document section when one deliverable needs several sections, and do not create
checkboxes for empty ceremony.

## Status Discipline

- Mark `[x]` only after evidence exists.
- Mark `[!]` when the next action is repair, user decision, external blocker,
  or failed verification.
- Mark `[-]` only with an explicit deferral reason.
- Preserve unchecked tasks in handoff so the next worker knows what remains.

When checkboxes and coverage trace conflict, trust the evidence and update the
checkbox.
