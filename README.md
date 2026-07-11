# xzhih skills

[English](README.md) | [简体中文](README.zh-CN.md)

Personal Codex/agent skills published for installation with `npx skills`.

## Install

List available skills:

```sh
npx skills add xzhih/skills --list
```

Install all skills:

```sh
npx skills add xzhih/skills --all
```

Install the recommended workflow set, including entry skills and required internal dependencies:

```sh
npx skills add xzhih/skills --skill steady-coding codex-image-gen dev-flow discussion-workflows doc-driven-workflows agent-self-driving agent-runtime agent-requirements-analysis agent-spec agent-eval agent-plan agent-debate agent-review agent-lanes agent-grilling integration-review project-context
```

## Skills

User-entry skills:

- `steady-coding`: stable, grounded implementation, debugging, refactoring, verification, and reviewable code changes.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `dev-flow`: explicit development lifecycle router for requirements, Spec, Eval, Plan, execution, review/test, repair/recheck, context recovery, docs, lanes, and heavier multi-agent workflows.
- `discussion-workflows`: explicit discussion governance for long, corrected, or decision-heavy conversations that need recap, boundaries, complexity checks, drift control, or durable state.
- `doc-driven-workflows`: explicit project documentation governance for source-backed architecture, operation-flow, call-path, code/docs synchronization, and open-question ledgers.
- `agent-self-driving`: explicit long-task automation controller for new projects, new requirements, model-diverse review/repair, external agents, and multi-agent delivery that should continue until completion or a true user decision.
- `agent-requirements-analysis`: explicitly invoked requirements analysis that anchors the Core Problem, expands a traversable candidate tree, adversarially converges and prunes scope, then publishes a Mermaid-backed Requirements Baseline before Spec.
- `agent-spec`: explicitly invoked Spec production from governed requirements.
- `agent-eval`: explicitly invoked Eval and acceptance evidence production from a locked Spec.
- `agent-plan`: explicitly invoked implementation planning from locked Spec and Eval, including task decomposition and lane candidates.
- `agent-debate`: explicitly invoked same-topic multi-agent debate for requirements, product friction, simplicity, necessity, usability, user flow, and compact branch-level convergence or scope pruning.
- `agent-review`: explicitly invoked one-reviewer or multi-agent review of one artifact, such as a Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result.
- `agent-lanes`: explicit parallel lane execution for safe batches of subagent/worktree work.

Internal flow skills:

- `project-context`: restores authoritative project instructions, handoff docs, coordination state, decisions, verification conventions, and collision risks.
- `agent-runtime`: internal agent/model runtime rules; records live in `docs/dev-flow/capabilities/`.
- `agent-grilling`: uses persistent questioning and challenge to discover unexamined requirements, assumptions, edge cases, boundaries, and downstream consequences before Requirements, Spec, planning, or dispatch; grilling is the method, not a stress-test gate.
- `integration-review`: reviews returned lanes, normalizes claims, checks evidence,
  classifies integration state, and returns next-batch eligibility to `agent-lanes`.

`agent-self-driving` may call internal flow skills, but is a direct entry
when explicitly invoked for long-task automation.

## Product vs Implementation

Workflow skills split into two lines, joined by handoff artifacts (Requirements
→ Spec → Eval → Plan → code/evidence). They are not two install sets; they are
two job types so product judgment and delivery mechanics stay separate.

```text
Product line (what / why / what "good" means)
  discussion, grilling, debate, requirements, Spec, Eval, durable docs

Implementation line (how / who changes what / is the change good enough)
  Plan, lanes, coding, integration of returned work, code/module review

Control plane (route, resume, multi-agent runtime)
  dev-flow, agent-self-driving, project-context, agent-runtime

Shared reviewer (not a third product philosophy)
  agent-review — same tool for Spec/Plan contracts and for module diffs
```

| Question type | Line | Typical skills |
| --- | --- | --- |
| Should we build it, scope, behavior, tradeoffs, “too heavy”? | Product | `discussion-workflows`, `agent-grilling`, `agent-debate`, `agent-requirements-analysis`, `agent-spec`, `agent-eval`, `doc-driven-workflows` |
| Task split, files/APIs, parallel work, module quality, merge readiness? | Implementation | `agent-plan`, `agent-lanes`, `steady-coding`, `integration-review`, `agent-review` on diffs/code |
| Which phase next, continue from Spec, long-task loop? | Control | `dev-flow`, `agent-self-driving`, `project-context`, `agent-runtime` |

**Product line** owns intent, boundaries, user-visible behavior, and how to
prove correctness. Outputs are decisions and contracts for humans and downstream
skills—not file-level change lists.

**Implementation line** owns decomposition, owned surfaces, execution, and
verification against those contracts. Outputs are tasks, diffs, tests, evidence,
and merge/lane status.

**`agent-review`** is a shared gate on one concrete artifact: a Spec, Eval,
Plan, PR, module diff, implementation slice, or final package. It is not
`agent-debate` (product tradeoffs) and not `integration-review` (returned-lane
batch status). Spec and Plan each require an `agent-review` pass before Eval or
execution/lanes unless the user explicitly waives it.

**Discovery, convergence, and baseline are composable (product):**
`agent-grilling` returns candidate additions and changes; `agent-requirements-analysis`
assembles and versions the complete Candidate Requirement Set; `agent-debate`
challenges that same set and assigns each branch `keep`, `modify`, `cut`,
`defer`, or `user-decision`. `agent-requirements-analysis` owns the compact
pruning ledger and surviving Requirements Baseline. Non-trivial analysis records
passed gate evidence and consumes current same-scope discovery and convergence
snapshots when required instead of repeating them. Mermaid gives the concise analysis, convergence, and surviving-flow views;
Markdown owns detailed requirements, evidence, reasons, constraints, and reopen
triggers. The final behavior tree and packets contain the Core Version, while
pruned ideas remain once in the tradeoff map and compact ledger. Blocking
decisions pause the handoff.
**Self-driving** may start at any reached phase (for example from a
locked Spec) and only run the remaining delivery work—it should not rewind
product work without cause.

## Development Lifecycle

For non-trivial development work, `dev-flow` uses this lifecycle as the default
control spine:

```text
1. Analyze Requirements
2. Lock Spec
3. Lock Eval
4. Lock Plan
5. Execute Plan
6. Review + Test
7. Repair + Recheck
8. Close / Handoff
```

Each phase has an exit gate:

| Phase | Exit gate |
| --- | --- |
| Analyze Requirements | The Core Problem is explicit; current same-scope `agent-grilling` discovery and `agent-debate` convergence gates are satisfied; every material candidate has a keep/modify/cut/defer/user-decision outcome; pruning memory is compact; the Mermaid tree has no high-impact answerable frontier or blocking decision; only implementation-eligible confirmed surviving flows map to packets; the artifact is a Requirements Baseline. |
| Lock Spec | Goal, scope, non-goals, user-visible behavior, constraints, and affected surfaces are clear; a mandatory `agent-review` of the whole Spec has closed (or the user waived it) before Eval. |
| Lock Eval | Acceptance checks, test points, manual checks, failure conditions, and evidence expectations define how to prove correctness. |
| Lock Plan | Execution order, touched files/modules, risks, verification commands, lane candidates, and stop or rollback conditions are known; a mandatory `agent-review` of the whole Plan has closed (or the user waived it) before execution or lanes. |
| Execute Plan | Changes stay within the plan boundary and produce evidence for what changed and what was not changed. |
| Review + Test | Implementation is checked against Spec and Eval with inspectable test or manual-verification evidence. |
| Repair + Recheck | Accepted blocker/major findings are fixed and rechecked, rejected with evidence, or kept paused on a true user decision or unavailable required dependency. Only minor/out-of-scope/future items may be deferred after the owning artifact and trace are updated. |
| Close / Handoff | Final state, evidence, residual risks, docs impact, and next owner are clear. |

For persisted, high-risk, or multi-agent work, preserve the coverage chain:

```text
requirement -> Spec behavior -> Eval evidence -> Plan task -> evidence
```

This prevents execution from silently dropping requirements. `agent-plan` keeps
task coverage traceable to requirements and evidence, `agent-lanes` carries that
trace into lane packets, and `integration-review` checks whether every
non-deferred trace item has evidence, a blocker, or an explicit deferral.

Executable tasks use checkbox state for progress:

```text
- [ ] not started
- [x] completed with evidence
- [!] blocked or needs repair
- [-] deferred with reason
```

Checkboxes track task status; coverage trace explains why the task exists and
what evidence closes it.

Scale the ceremony to the task:

```text
Small task:
  one-line requirement -> compact behavior/evidence contract -> implement -> verify

Medium task:
  separate requirements, Spec, Eval, and Plan in reasoning or compact notes;
  keep mandatory whole-Spec and whole-Plan reviews compact

Large task:
  explicit requirements analysis, Spec, Eval, and Plan artifacts; complete mandatory
  whole-Spec and whole-Plan reviews, then add other reviews only when risk warrants

High-risk task:
  review requirements, Spec, Eval, Plan, implementation, and final result; use repair -> recheck
```

Review is not only a final step. `agent-spec` and `agent-plan` require
`agent-review` on the whole artifact before Eval or execution. Also use
`agent-review` for Eval, implementation modules, diffs, or final results when
risk warrants or when you want an independent pass.

Documentation governance is also a lifecycle gate: use `doc-driven-workflows`
when a locked Spec, accepted implementation, or review finding would make
source-of-truth docs mislead a future human or agent.

Document ownership stays singular:

```text
Durable architecture / operation / call-path truth -> doc-driven-workflows
Requirements -> docs/dev-flow/requirements/
Spec -> docs/dev-flow/specs/
Eval -> docs/dev-flow/evals/
Plan -> docs/dev-flow/plans/
Evidence / handoff -> docs/dev-flow/evidence/ and docs/dev-flow/handoffs/
Private orchestration state -> agent-self-driving
```

Other workflow docs are coordination, discussion state, review state, evidence,
or links to the owner artifact. They should not become a second project truth.

## Produced Docs

Medium, large, high-risk, self-driving, multi-agent, or thread-spanning work
persists lifecycle artifacts under:

```text
docs/dev-flow/
  index.md
  requirements/
  specs/
  evals/
  plans/
  capabilities/
  evidence/
  handoffs/
  archive/
```

Use `docs/dev-flow/index.md` as the resume map. It links the active
Requirements, Spec, Eval, Plan, runtime profile/capability/session records when
applicable, evidence, handoff, current phase, status, and next owner. Do not
duplicate full artifact content in the index.

Default artifact names:

```text
requirements/<YYYY-MM-DD>-<slug>-requirements.md
specs/<YYYY-MM-DD>-<slug>-spec.md
evals/<YYYY-MM-DD>-<slug>-eval.md
plans/<YYYY-MM-DD>-<slug>-plan.md
evidence/<YYYY-MM-DD>-<slug>-evidence.md
handoffs/<YYYY-MM-DD>-<slug>-handoff.md
```

`agent-self-driving` stores private automation state separately:

```text
docs/agent-self-driving/
  index.md
  blackboards/
  discussions/
  agent-outputs/
  reviews/
  evidence/
```

It links to `docs/dev-flow/` artifacts instead of copying them.

Long-term project truth remains under `docs/doc-driven-workflows/` or the
declared doc-driven root. Discussion state remains under
`docs/discussion-workflows/`.

Raw intake and long-term truth are separate:

```text
docs/discussion-workflows/inbox/  raw material, external API docs, excerpts, links, research notes
docs/doc-driven-workflows/        refined source-backed long-term project truth
```

`inbox/` is not confirmed truth and is not a direct implementation source.
External interface docs, vendor docs, agent raw outputs, or research excerpts
must first pass discussion synthesis, reference comparison, or
confirmed/draft/open convergence. Only the project-specific contract,
operation-flow, call-path, constraint, risk, or open question should be promoted
to `doc-driven-workflows`.

Archive convention:

```text
docs/dev-flow/archive/              old lifecycle artifacts
docs/discussion-workflows/archive/  old discussion state
docs/doc-driven-workflows/archive/  old durable docs and ledger batches
docs/agent-self-driving/archive/    old orchestration state
```

Archive files are not active truth. They must record `Archived`, `Status`,
`Reason`, `Replaced by`, and why they should not be used as current truth.
Normal resume skips archives unless an active artifact links them or history is
needed.

## Layout

```text
skills/
  steady-coding/
  project-context/
  codex-image-gen/
  dev-flow/
  discussion-workflows/
  doc-driven-workflows/
  agent-requirements-analysis/
  agent-spec/
  agent-eval/
  agent-plan/
  agent-grilling/
  agent-debate/
  agent-review/
  agent-lanes/
  agent-runtime/
  integration-review/
  agent-self-driving/
```
