# Agent Requirements Visual Eval

Repository-maintenance evidence for the `agent-requirements-analysis` Mermaid
flow and requirement-tree behavior. This is not runtime skill context.

## Baseline

Prompt:

```text
Use $agent-requirements-analysis to analyze subscription pause/resume for team
monthly and annual plans with discounts, read-only pause state, and early resume.
```

Observed before the visual contract:

- detailed prose requirements and gap dispositions
- zero Mermaid blocks
- no parent-child search tree, frontier, traversal state, or terminal proof
- no function-flow-to-diagram coverage mapping

The no-skill control had the same failure shape.

## Behavior Cases

### V1 — Standard multi-flow requirement

Pass when:

- a tree or overview-plus-subtrees covers all leaf states
- agent/source-answerable frontier nodes are resolved or owned
- blocking user decisions make Spec readiness `not_ready`
- a flow inventory distinguishes pause request, paused access/billing, and resume
- every inventory row maps to a readable Mermaid packet

### V2 — Function-flow coverage

Pass when distinct actor, trigger, lifecycle, or outcome creates a separate
inventory row and is either visibly covered by a packet or causes a packet split.
Fail when one generic feature diagram silently drops a material flow.

### V3 — Blocking decision

Pass when a user-owned billing or permission choice remains `user-decision` with
`blocking: yes` and pauses Spec. Fail when it is relabeled `terminal` or treated
as ready merely because agent search stopped.

### V4 — Lightweight single feature

Pass when the artifact keeps one smallest-meaningful tree, a compact disposition
ledger, one flow inventory row per real flow, and usually one Mermaid packet.
Fail when it expands to a target depth/node count or repeats every obvious leaf.

### V5 — Product boundary

Pass when diagrams describe actors, triggers, product states, outcomes, errors,
and recovery. Fail when they prescribe endpoints, schemas, persistence, queues,
workers, implementation tasks, or detailed test mechanics.

### V6 — Source-answerable frontier

Pass when a high-impact question about current behavior is inspected during
Requirements or remains `frontier` and keeps Spec `not_ready`. Fail when the
artifact marks it terminal and says "Spec will inspect it later."

Also fail when requirements, risks, diagrams, or readiness mention an unverified
current-system/vendor capability without a matching `frontier` or valid
non-blocking `deferred` node.

## Verification Log

- RED: fresh current-skill and no-skill agents both returned prose-only artifacts.
- GREEN, first pass: a Standard agent produced a requirement tree and three
  Mermaid packets; a Lightweight agent produced one tree and one packet.
- REFACTOR findings: add explicit flow inventory, keep blocking user decisions
  non-terminal, remove target node counts, and keep diagrams at product level.
- V1–V5 rerun: the Standard subscription case produced one search tree, nine
  inventoried flows mapped across four product-level packets, and kept three
  business decisions blocking with Spec `not_ready`. The Lightweight reset case
  kept one compact tree, a consequential-only ledger, and one packet.
- V6 RED: the first Lightweight rerun called uninspected reset-state and resend
  behavior terminal, then assigned the inspection to Spec and reported ready.
- V6 GREEN: after the source-answerable and whole-artifact consistency rules,
  the same case kept two source questions as blocking `frontier` nodes and left
  the next owner in Requirements. The Standard consistency rerun requeued five
  unverified permission/vendor-capability claims and classified only release
  timing as a non-blocking `deferred` item.
- Reference Mermaid examples parsed with the current `mermaid` package under a
  temporary jsdom environment: 2/2 passed.
