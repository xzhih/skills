# Requirements Convergence Eval

Repository-maintenance evidence for the discovery-to-baseline behavior spanning
`agent-grilling`, `agent-debate`, and `agent-requirements-analysis`. This is not
runtime skill context.

## Intended lifecycle

```text
core problem framing
  -> agent-grilling discovery and feature-detail expansion
  -> candidate additions and changes
  -> Requirements owner assembles/version Candidate Requirement Set
  -> agent-debate adversarial convergence
  -> keep / modify / cut / defer / user-decision
  -> scope pruning
  -> Requirements Baseline
```

Terminology:

| Stage | Governed term |
| --- | --- |
| Find what actually needs solving | Core Problem / Core Need |
| Remove branches that drift or cost more than they earn | Requirement Convergence / Scope Pruning |
| Publish the surviving version | Core Version / Requirements Baseline |

## RED baseline

Before this convergence contract:

- `agent-grilling` discovered gaps and requirement deltas but did not hand a
  candidate set into a required convergence stage
- `agent-debate` returned decisions and tradeoffs but had no branch-level
  `keep / modify / cut / defer` contract
- `agent-requirements-analysis` could build flows directly after discovery;
  debate was optional and no compact pruning ledger was required
- no artifact proved that every material candidate was retained, changed,
  removed, deferred, or escalated before a Requirements Baseline was named

Initial subagent forward-testing was not run because the session policy required
explicit user authorization. The user later granted that authorization; the
forward RED and post-fix rerun below supplement the deterministic assertions.

## Behavior cases

### C1 — Core problem before solution branches

Pass when the artifact states the affected actor, causal problem, desired
outcome, evidence, and non-goal before evaluating feature candidates. Fail when
the debate optimizes a feature list without an agreed problem anchor.

### C2 — Discovery precedes convergence

Pass when every non-trivial requirements change runs or consumes a current same-scope
`agent-grilling` discovery snapshot before `agent-debate`. Fail when debate
prunes the original prompt before omitted branches and detailed flows are found.

### C3 — Branch-level adversarial decision

Pass when every material candidate gets one outcome from `keep`, `modify`,
`cut`, `defer`, or `user-decision`, based on core alignment, necessity, evidence,
value, complexity, risk, timing, dependencies, and simpler alternatives.

### C4 — Compact pruning memory

Pass when every cut, defer, or materially modified branch is recorded once in a concise
ledger with branch handle, considered idea, outcome, one-line reason/evidence,
and retained implication; every defer also has an owner and observable reopen
trigger. Fail on raw debate transcripts,
duplicated arguments, a repeated full candidate set, or silent deletion.

### C5 — Baseline contains only survivors

Pass when final baseline behavior in the tree, function-flow inventory, and
Mermaid packets contains only `keep` and `modify` survivors. Non-blocking
governance leaves may remain visibly owned but do not become flows. Cut branches
may survive only as an explicit non-goal, constraint, or retained implication;
reopen triggers belong to defer outcomes.

### C6 — Baseline naming and handoff

Pass when work-in-progress is called a Requirements Candidate with one exact
pending/blocked lifecycle state; use `Requirements Baseline` only after discovery,
convergence, pruning, evidence consistency, and existing Spec-readiness gates close.

### C7 — Mermaid overview, Markdown detail

Pass when Mermaid concisely shows requirement analysis, candidate handles,
branch outcomes, and the surviving Core Version, while Markdown owns detailed
requirements, evidence, reasons, constraints, and reopen triggers. Fail when
tradeoffs exist only in a table, Mermaid contains full prose, or graph and
Markdown handles/outcomes disagree.

### C8 — Gate execution evidence

Pass when Gate Evidence separately records execution, Requirements-owner
consumption, and gate result. Normal success is `completed / consumed / passed`;
an eligible skip is `skipped / not_applicable / passed`. The debate snapshot
must trace to the owner-assembled Candidate Requirement Set version. Fail when a
pending, running, interrupted, unavailable, unconsumed, or blocked result is
treated as a passed gate.

### C9 — Current behavior evidence closure

Pass when consequential current/existing/reused/authoritative behavior maps to
source/runtime evidence, an explicit user-confirmed invariant, or a blocking
frontier, and every unresolved row uses the same frontier handle in the Mermaid
tree and ledger. Fail when those words or an anonymous `open` substitute for the
explicit trace.

### C10 — Long-running worker wait

Pass when repeated short `wait_agent`/poll timeouts leave the worker running and
the moderator continues polling, waits longer, or does non-overlapping work.
Fail when silence is accumulated into an invented task deadline or used to
interrupt/re-dispatch. A real deadline must be explicit before dispatch or
reported by the user/system/host/tool/task contract.

### C11 — Candidate ownership and lifecycle state

Pass when `agent-grilling` returns candidate additions/changes, the Requirements
owner alone assembles and versions the complete Candidate Requirement Set, and an
unfinished artifact records `discovery_pending`, `convergence_pending`, or
`blocked`, plus every applicable `convergence_major`, `user_decision`, or
`dependency` reason. Concurrent blockers must not overwrite one another.

### C12 — One evolving tree and implementation eligibility

Pass when one Requirement Search Tree evolves from Candidate search state into
the pruned Baseline tree. The Convergence Map and compact Markdown ledger retain
brief-versus-detailed pruning memory. Only implementation-eligible confirmed
`keep/modify` behavior enters the Core Version, Baseline tree, flow inventory,
Feature Flow Packets, Spec, Eval, Plan, or execution scope.

## Verification log

- RED structural assertion: failed as expected; all seven contract markers were
  absent (`Requirements Baseline`, Core Problem Contract, Convergence Gate,
  Scope Pruning Ledger, branch outcomes, reopen trigger, candidate handoff).
- GREEN structural assertion: 7/7 contract markers passed.
- GREEN semantic assertion: 15/15 ordering, authority, coverage, pruning,
  downstream-baseline, and bilingual lifecycle checks passed.
- REFACTOR: removed the temptation to repeat the full discovery candidate set
  beside the Core Version and Scope Pruning Ledger.
- C7 RED: the tree and feature flows existed, but no required Mermaid
  convergence view connected candidate branches to pruning outcomes.
- C7 GREEN: 8/8 visual/detail assertions passed; the contract now requires four
  linked views and stable candidate handles between Mermaid and Markdown.
- Forward RED: the Standard run entered grilling and debate, but the root
  mistakenly manually interrupted it after repeated short polling windows. That
  was not a worker timeout and is invalid failure evidence. The Lightweight run
  produced the intended Mermaid/Markdown layers
  but falsely claimed a consumed grilling pass and terminalized unsupported
  current-system semantics; independent review reported both as major.
- Post-fix rerun closed the gate-evidence major by returning Candidate/not_ready
  when convergence was unavailable. It exposed one remaining trace failure:
  an unresolved empty-state claim was Markdown `open` without a matching Mermaid
  tree frontier handle.
- Post-fix rerun encountered a real worker-slot limit. The artifact correctly
  stayed `Requirements Candidate / convergence pending / not_ready`, recorded
  inline discovery as consumed, and recorded convergence as unavailable instead
  of inventing a Baseline.
- First post-fix output still left the unsupported empty-state claim as anonymous
  Markdown `open`. Targeted repair introduced one stable `RT6 frontier:open`
  across Mermaid tree, frontier ledger, Evidence Closure, and `C6 -> RT6 -> FL3`
  flow trace.
- Independent recheck found no remaining critical/major after the RT6 repair.
- Residual coverage boundary: the post-fix environment could not execute a full
  happy-path independent convergence pass because of the worker-slot limit; the
  failure-path gate evidence and visual/Markdown repair path were exercised.
- Worker-wait correction: polling timeout is not task timeout; repeated silent
  polls do not accumulate into a deadline, and no worker may be interrupted for
  slowness alone.
- C10 GREEN: a fresh `agent-runtime` scenario kept a worker `still running` or
  `unknown` after eight silent 30-second polls, refused interrupt/redispatch,
  and chose a longer poll or non-overlapping moderator work.
- C11/C12 RED: post-review structural assertions passed 0/9. The old contracts
  conflated completed with consumed, limited convergence to new features, gave
  Candidate Set ownership to both grilling and Requirements, required ambiguous
  one-versus-two trees, and allowed draft behavior to approach downstream work.
- C11/C12 GREEN: the same structural assertions passed 9/9 after separating gate
  state dimensions, assigning Candidate Set ownership to Requirements, choosing
  one evolving tree, separating Candidate lifecycle state from blocking reasons, and restricting
  Baseline/downstream behavior to implementation-eligible confirmed requirements.
- Post-change forward case: a fresh Requirements owner handled a complex update
  to an existing annual-subscription pause feature. It consumed independent
  discovery and convergence snapshots, assigned all 16 candidates an outcome,
  preserved cut decisions in the Mermaid/Markdown layers, and returned a blocked
  Requirements Candidate rather than inventing current billing behavior or a
  Baseline. Because only one confirmed invariant survived, it correctly omitted
  Feature Flow Packets instead of promoting draft/open behavior.
- Forward-case refactor: the case had both blocking user decisions and missing
  source evidence, exposing that mutually exclusive `decision_blocked` and
  `dependency_blocked` states could not preserve concurrent causes. Lifecycle is
  now `blocked` with a set of blocking reasons. A fresh targeted retest recorded
  both `user_decision` and `dependency`, kept convergence
  `completed / consumed / blocked`, and retained Requirements ownership.
- Final-review RED: 0/7 assertions exposed that Spec could add or defer Baseline
  scope locally, Candidate visuals simultaneously required and prohibited flow
  packets, and the eval blurred defer versus cut memory.
- Final-review GREEN: 7/7 assertions passed after making Baseline the sole Spec
  scope authority, routing scope changes back through Requirements convergence,
  requiring two Candidate views versus four Baseline views, and enforcing defer
  owner/reopen-trigger semantics separately from cut.
- Re-review RED/GREEN: 0/3 then 3/3 assertions caught and closed two stale
  loopholes: tree pruning now waits for `baseline_ready` so blocked Candidates
  retain exact frontier traces, and Spec's thinness rule no longer permits a
  local merge/removal/deferral escape from Baseline coverage.
- Final refactor: allow one Spec behavior to cover multiple confirmed Baseline
  requirements through an explicit many-to-one trace when every requirement
  semantic remains. Only semantic removal, deferral, or material change returns
  to Requirements convergence.
- Compression baseline/refactor: the Requirements main skill plus its two
  mandatory references measured 6,200 words. Domain-keyword compression removed
  duplicated process prose, examples, contents lists, and repeated mistakes while
  retaining schemas and ownership contracts; after the tree-invariant repair the
  set measures 3,161 words (49.0% smaller), with frozen contract assertions still
  passing.
- Compressed forward case: a fresh audit-export request completed discovery and
  convergence, preserved Gate Evidence/Evidence Closure, rendered Candidate tree
  and convergence Mermaid, omitted Baseline flows, and stayed blocked on six
  explicit source frontiers. It exposed one Mermaid tree defect: shared evidence
  frontier IDs were drawn under two parents despite the one-parent prose rule.
- Tree-invariant RED/GREEN: added the checkable rule “each non-root node ID has
  exactly one incoming parent edge; cross-links live only in the ledger.”
- Tree-invariant retest: a shared Current Role Model frontier received one tree
  parent; the Scheduling branch referenced it only through the ledger cross-link.
- Compression review RED/GREEN: 0/6 then 6/6 assertions closed discovery-skip
  evidence handoff, grilling-owner routing, the pre-dispatch convergence state,
  Baseline packet governance leakage, the root exception to one-parent trees, and
  Core Version versus Requirements Baseline terminology.
- Discovery-skip retest: governed input plus canonical skip evidence produced
  `skipped / not_applicable / passed`; owner-assembled Candidate Set `CRS-7` then
  consumed a passed convergence snapshot and reached `baseline_ready`.
- Compression re-review RED/GREEN: 0/2 then 2/2 assertions closed the remaining
  Candidate Set skip-source wording and defined answered `user-decision` outcome
  replacement, retained decision trace, and targeted reconvergence trigger.
- Final adjacent RED/GREEN: 0/2 then 2/2 aligned Debate's precondition with
  canonical discovery-skip evidence and mapped answered tree decisions:
  `keep/modify -> terminal:confirmed`; `cut/defer` leave Baseline behavior for
  their governance memory.
