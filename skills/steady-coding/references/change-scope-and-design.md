# Change Scope and Design

Read this before refactors, migrations, compatibility changes, new dependencies
or configuration surfaces, architectural abstractions such as interfaces,
factories, registries, services, or wrappers, pluggability, or broad cleanup.
An ordinary local helper/function does not load this reference by itself.

## Smallest Correct Move

Use this order:

1. Do not build speculative requirements or future scaffolding.
2. Prefer platform-native and standard-library features when correct.
3. Prefer existing project dependencies and patterns before adding new ones.
4. Preserve the local mental model and keep the diff reviewable.
5. Add abstraction for a current requirement, real complexity reduction, or an
   established local pattern.
6. Broaden the change only when a local patch would materially increase
   duplication, fragility, complexity, or review cost.

A future possibility is a non-goal until a concrete consumer, behavior, or
acceptance check exists. “Future parsers,” “another backend later,” or “make it
configurable” does not earn a registry, interface, factory, or configuration
surface. Implement present behavior and list extensibility as an optional
follow-up. If a real second consumer exists in source or requirements, design
against that evidence.

When the request contains only future extensibility, make the scope decision
visible:

```text
CURRENT SCOPE:
- Required now: [present behavior/change]
- Excluded now: [registry/config/interface/pluggability with no current consumer]
- Reopen when: [concrete second consumer, selection behavior, or acceptance check]
```

Do not promise to add a “small,” “project-native,” or “minimal” configuration or
registration surface after repository inspection. Inspection can discover a
real current consumer; it cannot turn the word “future” into one.

Avoid interfaces with one implementation, factories with one product,
configuration nobody changes, wrappers that only delegate, manager/service
layers that only rename calls, and dependencies for tiny utilities. Use these
shapes only when current evidence makes them earn their cost.

## Scope Hygiene

- Preserve comments you do not understand.
- Do not mix orthogonal cleanup into a behavior change.
- Do not delete apparently unused code without evidence and authorization.
- Remove imports, variables, helpers, and branches made dead by your own change.
- Mention pre-existing dead code separately.
- Keep compatibility, migrations, and rollback behavior explicit when affected.

Minimalism never authorizes removing trust-boundary validation, data-loss
prevention, security, accessibility, explicit requirements, compatibility, or
necessary runtime calibration.

For a deliberate shortcut, record its ceiling, the evidence that would trigger
an upgrade, and the likely upgrade path where a future maintainer will find it.

## Refactor and Migration Checks

Before changing structure, characterize the invariants that must remain true:

```text
public behavior and API
data/schema compatibility
callers and integration points
error/empty/edge behavior
performance or resource ceiling when relevant
rollback or migration boundary
```

Verify those invariants after the change. A smaller diff is not safer if it
leaves the local design materially more fragile.

## Red Flags

- A hypothetical future use becomes a current feature.
- “While we are here” cleanup expands the review surface.
- A new abstraction has no present consumer or complexity reduction.
- Compatibility is assumed rather than characterized.
- Scope discipline is used to avoid a necessary structural correction.
