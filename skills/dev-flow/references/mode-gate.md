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

- Lightweight: shortest useful artifact in chat.
- Standard: compact artifact with only relevant sections.
- Durable: persisted artifact in the declared owner location.
- Multi-agent / Lane: persisted or packetized artifact with exact ownership,
  exclusions, evidence, and blocker rules.

Output shapes are checklists for completeness, not fill-in templates. Include a
section only when it changes the next decision, handoff, verification, or
reader's understanding. Prefer a short action-oriented answer over an empty
schema.

When in doubt, downgrade the ceremony and upgrade only the missing proof.
