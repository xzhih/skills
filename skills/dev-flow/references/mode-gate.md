# Dev Flow Mode Gate

Use this gate before shaping Requirements, Spec, Eval, Plan, lane packets, or
handoff artifacts. Pick the lightest mode that keeps the next step safe.

## Modes

```text
Lightweight
  Small, single-threaded, low-risk work. Keep the trace in chat. Use short
  labels only when they clarify the handoff. Do not create files or full
  templates only to satisfy the lifecycle.

Standard
  Medium work or work with several behaviors, checks, or tasks. Use compact
  trace labels only when they prevent confusion. Include only fields needed by
  the next owner.

Durable
  Long-running, high-risk, reusable, or thread-spanning work. Persist artifacts
  under the declared owner, update the index, and keep a stable coverage trace.

Multi-agent / Lane
  Work dispatched to subagents, worktrees, external agents, reviewers, or
  parallel lanes. Stable trace labels, owned surfaces, collision checks, evidence
  expectations, and handoff formats are required.
```

## Trace Rule

Coverage trace is a safety tool, not a ceremony trigger. Use
`coverage-trace.md` for the shared trace rules.

- Lightweight mode may use inline trace notes such as `need -> behavior ->
  check -> task -> evidence`.
- Standard mode may use compact labels when more than one need, behavior,
  check, or task could be confused.
- Durable and Multi-agent / Lane modes require stable trace and enough coverage
  detail for another thread, reviewer, or worker to restore state without
  memory.

Do not promote untraced work across lifecycle gates. Do not make a low-risk
single-threaded task heavy merely to fill every output field.

## Output Rule

Every lifecycle skill should scale its output:

- Lightweight: complete and concrete artifact in chat—detailed enough to act,
  not a slogan summary.
- Standard: focused artifact with only relevant sections, each section still
  detailed enough for the next owner to act without guessing.
- Durable: persisted artifact in the declared owner location.
- Multi-agent / Lane: persisted or packetized artifact with exact ownership,
  exclusions, evidence, and blocker rules.

Output shapes are checklists for completeness, not fill-in templates. Include a
section only when it changes the next decision, handoff, verification, or
reader's understanding. Prefer concrete action-oriented detail over empty
schema or padded prose.

## Substance Rule (detail without emptiness)

**Target: detailed and concrete, never hollow, never padded.**

- Prefer **specific detail** over short vagueness.
- Prefer **compact completeness** over long filler, empty headings, or repeated
  slogans.
- Length should follow how many behaviors, checks, and surfaces must be locked—
  not a brevity contest and not a word-count contest.

Mode controls ceremony (files, templates, stable IDs), not whether behavior,
checks, and tasks are fully specified.

Reject or expand before the next gate when an artifact is mostly:

```text
vague goals ("improve UX", "make it work")
wish outcomes without observable behavior
one-line "behaviors" with no edge/error/empty states
checks that only restate the goal ("works correctly")
tasks like "implement feature" / "add tests" with no surface or verify path
missing non-goals, constraints, or affected surfaces when scope could expand
"TBD" / "handle edge cases" without a decision or explicit deferral owner
long prose that still never pins accept/reject or verify/stop criteria
```

Minimum bar by mode:

```text
Lightweight:
  Still detailed enough: concrete behavior, real check/evidence per important
  behavior, tasks a stranger can execute without re-asking "what exactly?".
  May stay in chat; may not be a hollow summary.

Standard / Durable / Multi-agent:
  Each important behavior, check, and task is specific enough that two
  implementers would build the same thing and two reviewers could accept or
  reject it from the artifact alone. Add the detail that removes ambiguity;
  omit only empty ceremony.
```

When in doubt: **downgrade ceremony, upgrade missing concrete detail.** Never
"downgrade" by deleting decisions the next owner needs, and never "upgrade" by
adding empty length.
