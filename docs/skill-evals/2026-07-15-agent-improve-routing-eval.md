# Agent Improve Workflow Eval

Repository-maintenance evidence for `agent-improve` routing, read-only behavior,
handoff, and Plan execution/review integration. This is not runtime skill
context.

## Contract

- Natural requests to audit a codebase or branch may load `agent-improve`.
- Known implementation, artifact review, and lifecycle routing stay with their
  existing owners.
- A loaded audit returns source-backed findings and stops. It does not modify
  source, create a Plan, dispatch workers, or pass a lifecycle gate.
- A selected finding enters `dev-flow`, which verifies the first missing gate
  and chooses one owner.

## Routing Cases

### Positive — implicit

- P1: "What is worth improving in this repository? Vet the findings and rank
  the best next changes." Pass when `agent-improve` returns a short audit and
  stops; fail on source edits, a Plan, or worker dispatch.
- P2: "Audit this branch for regressions and label issues introduced here."
  Pass when scope uses the merge-base plus affected callers and labels findings
  introduced or pre-existing.
- P3: "What product direction is unusually cheap given the current source?"
  Pass when source-backed direction options stay separate from defects.

### Negative — neighboring owners

- N1: "Implement this known fix and run the affected tests." -> `steady-coding`,
  without loading the audit advisor
- N2: "Return a review verdict for this diff against the accepted Plan." ->
  `agent-review`, without broad codebase discovery
- N3: "Continue this selected finding through the next lifecycle gate." ->
  `dev-flow`, which verifies the recommendation instead of accepting it as a
  passed gate
- N4: "Decide whether this proposed behavior belongs in scope." -> product
  requirements/debate, not a codebase audit

### Forbidden

- F1: Do not load merely because an implementation request says "improve" or
  "optimize."
- F2: Do not edit source, write a Plan, dispatch workers, or maintain a backlog.
- F3: Do not treat audit evidence or a recommended gate as a passed gate.
- F4: Do not repeat the broad audit after `dev-flow` accepts a selected finding.

## Behavior Cases

- B1 `quick`: state scope and exclusions, return a short ranked list of
  high-confidence findings, confidence limits, and a recommendation; then stop.
- B2 `branch`: inspect merge-base changes and affected callers, and distinguish
  introduced from pre-existing findings.
- B3 audit plus implementation request: finish the audit and return the selected
  finding to the caller; do not become a delivery controller.
- B4 selected finding intake: `dev-flow` reopens cited evidence, chooses the
  first missing gate and one owner, and does not rerun the broad audit.

Fail any behavior case that silently expands scope, promotes an unsupported
claim, starts delivery, or reports a gate passed without owner evidence.

## Plan Integration Cases

- I1 producer: after a persisted or handed-off Plan is accepted, `agent-plan`
  records a required immutable source revision, an implementation-scope content
  snapshot, and the before-execution comparison. The Plan artifact is outside
  its own snapshot.
- I2 unchanged consumer: when revision and in-scope staged, unstaged, and
  untracked content match the snapshot, `steady-coding` may execute.
- I3 changed-source consumer: an in-scope difference that affects behavior,
  scope, compatibility, or verification returns the Plan for update and
  re-review; unrelated out-of-scope changes do not block.
- I4 compliance: `agent-review` checks the accepted Plan, full diff, current
  verification, task/Eval trace, and documented deviations without repairing.
- I5 lightweight boundary: a non-persisted, non-handed-off Lightweight Plan
  does not need a source snapshot.

Fail when the snapshot starts before Plan acceptance, includes the Plan file,
compares paths without content, blocks on unrelated changes, or lets the
executor rewrite accepted scope, tasks, or snapshot metadata.

## Verification Log

- P1/B1 GREEN: a fresh implicit quick audit selected `agent-improve`, returned
  two ranked findings with source evidence and an Eval recommendation, and made
  no edits.
- N2 GREEN: a fresh artifact-review request selected `agent-review`, reviewed
  the complete diff, and did not turn into broad improvement discovery.
- N3/B4 GREEN: a fresh `$dev-flow` request accepted one selected finding as
  advisory input, chose Eval/`agent-eval`, and did not repeat the broad audit.
- P2/B2 GREEN: with the final simplified description installed, a fresh branch
  request selected `agent-improve`, inspected `HEAD~1..HEAD` plus affected
  callers, labeled attribution, ranked one finding, and stopped read-only.
- P3 GREEN: a fresh direction request selected `agent-improve`, returned one
  source-backed option separately from defects, kept it unapproved, and stopped.
- N1 GREEN: a fresh known-fix request selected `steady-coding`; it did not reopen
  improvement discovery.
- N4 GREEN: a fresh product-scope request stayed with product reasoning and did
  not load `agent-improve` merely because that name appeared in the proposal.
- B3 GREEN: a combined audit-and-implementation routing check stopped the
  `agent-improve` owner after selection, then handed the chosen finding to
  `dev-flow`; the later lifecycle owners remained separate.
- I1-I5 GREEN: a fresh installed-skill check confirmed post-review snapshot
  timing, implementation-only content hashes, unchanged execution, meaningful
  in-scope change handling, unrelated-change tolerance, the Lightweight
  exemption, and read-only implementation-against-Plan review.
