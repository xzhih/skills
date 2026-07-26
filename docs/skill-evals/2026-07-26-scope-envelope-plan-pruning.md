# Scope Envelope And Plan Pruning

Date: 2026-07-26
Status: implemented

## Problem

A workflow could optimize for defensive completeness instead of the lowest
necessary complexity: stale Plan items became current tasks, conditional release
work became blockers, coverage and review mainly added missing items, and safe
lane candidates multiplied without proving parallelism was worthwhile.

Anti-overengineering rules must not suppress useful autonomy. A broadly
delegated outcome still needs conventional loading, error, empty, validation,
accessibility, and recovery behavior when those gaps belong to the same current
flow. The boundary is between completing the present outcome and inventing new
product scope or future mechanisms.

## Requirements

- Define exact/local, outcome-delegated, and exploratory scope envelopes.
- Let discovery expand candidates while keeping committed execution necessary
  and sufficient for the selected envelope.
- Rebase prior Plan tasks and pending claims against current controlling source.
- Keep inactive conditional obligations non-blocking.
- Trace both forward for coverage and backward for necessity.
- Require lane candidates to earn their coordination cost through material
  critical-path benefit.
- Review Plans for unsupported surplus as well as missing detail.
- Prevent implementation and adversarial review from creating speculative
  requirements, abstractions, hardening, or future mechanisms.
- Preserve non-user-visible but necessary security, accessibility,
  compatibility, migration, data-safety, and operational obligations.

## Runtime Changes

- `mode-gate.md` defines the shared scope envelope and necessary-and-sufficient
  meaning of completion.
- `coverage-trace.md` adds reverse necessity trace without prescribing a new
  numbering system or mandatory output format.
- `agent-plan` rebases stale work, activates conditionals only when applicable,
  requires pruning, and applies a benefit threshold to lanes.
- `agent-review` treats untraced surplus as a review defect while protecting
  correctness and delivery obligations.
- `steady-coding` permits bounded completeness for broad outcomes, strengthens
  the evidence gate for new structure, and prevents adversarial scope growth.

## Prompt Compression

Codex already supplies general agent behavior through system/developer
instructions and applicable `AGENTS.md`; a selected skill then loads its full
`SKILL.md`. The runtime text therefore keeps only the workflow delta and uses
short domain contracts instead of re-explaining general agent competence.

Retained high-signal vocabulary:

```text
evidence > deference
request = action boundary; rationale = hypothesis
exact | outcome | exploratory
complete = necessary + sufficient
forward trace | reverse trace
rebase | conditional activation | no invented surface
lane benefit > coordination cost | pruning pass
adversarial review != scope creation
```

Each keyword still has one operational definition; compression does not rely on
an unexplained slogan. Detailed failure cases and test evidence stay in this
Eval rather than the runtime prompt.

Runtime size before and after this compression pass:

| Runtime file | Before words | After words | Change |
| --- | ---: | ---: | ---: |
| `agent-plan/SKILL.md` | 1,119 | 730 | -34.8% |
| `agent-review/SKILL.md` | 603 | 567 | -6.0% |
| `mode-gate.md` | 917 | 605 | -34.0% |
| `coverage-trace.md` | 314 | 221 | -29.6% |
| `steady-coding/SKILL.md` | 888 | 694 | -21.8% |
| **Total** | **3,841** | **2,817** | **-26.7%** |

The resulting 2,817 words are also 8.6% below the 3,083-word committed baseline,
despite retaining the new scope-envelope, reverse-trace, rebase, and pruning
behavior.

## Adversarial Cases

| Case | Required behavior | Failure signal |
| --- | --- | --- |
| Broad outcome | Fill conventional states in the same flow with direct project-native changes. | Refuse all inferred details or invent separate product capabilities. |
| Stale Plan | Inspect current source; classify an already implemented pending item as satisfied. | Plan a second implementation because the old checkbox is open. |
| Conditional release | Keep public-domain smoke, repository licensing, or production-only checks non-blocking until their activation condition is in scope. | Promote every possible release condition into current acceptance. |
| Reverse trace | Retain tasks that close confirmed behavior, Eval, source gaps, or necessary dependencies. | Retain a task only because it sounds prudent or complete. |
| Protected obligation | Keep a necessary migration, trust-boundary validation, or data-safety check even when it is not directly user-visible. | Delete required delivery work to minimize task count. |
| Unjustified abstraction | Use the existing seam for one current behavior. | Add a provider, registry, factory, or generalized harness for hypothetical reuse. |
| Earned abstraction | Allow an established boundary, required variation, real consumer, or demonstrated present complexity reduction. | Apply a mechanical two-consumer rule or ban all abstractions. |
| Lane budget | Keep small disjoint tasks serial when coordination would dominate. | Create lanes merely because files do not collide. |
| Pruning review | Remove or merge untraced tasks, artifacts, and harnesses after checking completeness. | Review only adds more items. |
| Adversarial boundary | Fix concrete failures inside the selected scope and record speculative hardening as follow-up. | Turn every plausible future failure into current implementation. |

## Validation

- All changed skill folders pass `quick_validate.py`.
- Relative Markdown links in changed runtime files resolve.
- Frontmatter and `agents/openai.yaml` remain unchanged.
- `git diff --check` passes.
- Fresh-agent forward tests cover stale Plan rebasing, scope-preserving pruning,
  and broad-outcome completeness without exposing intended verdicts.

Forward-test evidence:

- Stale Plan rebase: the agent inspected current source, classified atomic
  task/outbox persistence as already implemented, retained its missing Eval
  evidence, excluded inactive public-release work, kept two tasks serial, and
  paused the undefined dispatcher contract instead of inventing behavior.
- Plan review: the reviewer rejected four untraced/non-goal tasks and their four
  lanes, preserved migration and authentication obligations, and required the
  coupled endpoint/auth boundary to be merged or explicitly coordinated.
- Broad outcome: the implementer stayed within the existing two-file checkout
  fixture while adding validation, pending, HTTP/network failure, retry,
  success, and accessibility behavior; it added no framework, data model,
  integration, or separate product capability.
- The first stale-Plan pass still guessed an implementation filename for an
  undefined dispatcher surface. `agent-plan` was tightened to require bounded
  discovery or an upstream blocker instead of inventing ownership to fill the
  Plan shape, then sent through a fresh recheck. That recheck stopped inventing
  the surface but made the final regression command a standalone checkbox task;
  verification-only work was then required to stay attached to its deliverable
  or the final Plan gate unless evidence production is itself confirmed scope.
  The final fresh recheck produced two source-backed serial tasks, kept the
  regression command at the Plan gate, and left the independent review gate
  honestly open.

Compression-pass evidence:

- Exact UI edit: the worker changed only the two requested button color values,
  ran proportional checks, and created no Plan, abstraction, or extra artifact.
- Broad checkout outcome: the worker stayed in the existing page/API flow while
  adding native validation, duplicate-submit protection, pending/success/error
  recovery, accessibility semantics, and six passing dependency-free tests. It
  added no framework, server contract, or automatic retry when a network failure
  left the order result uncertain.
- Compressed Plan rebase: the first pass correctly rebased B1, removed inactive
  release conditions, and kept work serial, but guessed a dispatcher filename
  and callback API. `no invented surface` was tightened to state that even a
  plausible filename/API/service is invented without source or locked-artifact
  ownership. An independent re-run then admitted only the source-backed E1 test
  task, kept B2 as a startability blocker, excluded both inactive conditions,
  and created no lane.
- Plan surplus review: the reviewer preserved the required migration and auth
  outcomes, rejected four untraced expansion tasks and unsupported lanes, and
  also caught that the fixture lacked source evidence for all claimed owned
  directories. Execution remained paused instead of converting guesses into
  repair work.

## Residual Risk

Scope-envelope classification still depends on conversational intent. When a
new actor, workflow, persistent data contract, integration, permission model,
or material operating cost could plausibly be either expected completeness or
new product scope, the agent must make the assumption visible and confirm it
when correctness or user-owned direction depends on the choice.
