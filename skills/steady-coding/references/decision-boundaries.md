# Decision Boundaries

Read this before a material architecture or dependency choice, or when the task
touches a public API, data/schema, user-visible behavior, security/privacy,
destructive action, or irreversible migration.

## Establish the Boundary

Identify the success state and explicit constraints before choosing how to work.
Prefer the user's desired outcome over proposed steps that do not reach it, but
treat named boundaries, files, APIs, and required steps as constraints unless
they conflict with correctness or safety.

Read the smallest source-backed surface that can settle the decision:

- implementation and call paths
- relevant tests, failures, logs, and runtime behavior
- public API, schema, data, configuration, and dependency conventions
- project instructions and source-of-truth docs
- current diff, git state, and nearby working examples

Before that inspection, keep technologies and designs conditional. Permission to
consider Redis, a queue, a framework, or another dependency does not authorize
inventing TTL, key shape, invalidation, privacy boundaries, retries, failure
policy, compatibility, or ownership. Derive each behavior from requirements or
project evidence.

## Assumptions

Block and ask when uncertainty controls:

- public API or schema/data meaning
- user-visible behavior
- security, privacy, destructive action, or data loss
- dependency or architecture direction
- irreversible migration or external side effect

For a local reversible choice, state a working assumption and take the simplest
reasonable path. A working assumption must not override source evidence, turn a
draft/future idea into a current requirement, authorize a symptom patch, or hide
a public/architectural/security decision.

Explicit permission for one choice does not silently authorize adjacent choices.
Before inspection, an assumption may define evidence to seek; it may not commit
to unobserved implementation behavior.

## Push Back with Evidence

When the requested path has a concrete problem:

1. Name the issue directly.
2. Explain the observable downside.
3. Offer the smallest safer or simpler alternative.
4. Respect the user's informed decision unless safety or authorization still
   blocks the action.

Sunk cost is context, not evidence that an architecture should continue. Judge
the current design by present requirements, compatibility, and change risk.

## Red Flags

- Selecting architecture before inspecting project evidence.
- Using a working assumption to bypass a material decision.
- Treating a named dependency as a complete behavior contract.
- Reframing the request to override an explicit user constraint.
- Continuing an architecture only because prior work already exists.
