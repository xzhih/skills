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
- `agent-requirements-analysis`: explicitly invoked requirements analysis for project directions, new requirements, updates, or bug intents before Spec.
- `agent-spec`: explicitly invoked Spec production from governed requirements.
- `agent-eval`: explicitly invoked Eval and acceptance evidence production from a locked Spec.
- `agent-plan`: explicitly invoked implementation planning from locked Spec and Eval, including task decomposition and lane candidates.
- `agent-debate`: explicitly invoked same-topic multi-agent debate for requirements, product friction, simplicity, necessity, usability, user flow, and decision clarity.
- `agent-review`: explicitly invoked one-reviewer or multi-agent review of one artifact, such as a Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result.
- `agent-lanes`: explicit parallel lane execution for safe batches of subagent/worktree work.

Internal flow skills:

- `project-context`: restores authoritative project instructions, handoff docs, coordination state, decisions, verification conventions, and collision risks.
- `agent-runtime`: internal agent/model runtime rules; records live in `docs/dev-flow/capabilities/`.
- `agent-grilling`: pressure-tests unclear goals, assumptions, and decomposition before planning or dispatch.
- `integration-review`: reviews returned lanes, normalizes claims, checks evidence, classifies blockers, and continues to the next safe batch.

`agent-self-driving` may call internal flow skills, but is a direct entry
when explicitly invoked for long-task automation.

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
| Analyze Requirements | `agent-requirements-analysis` has separated confirmed, draft, and open points; agent-answerable questions have been resolved through context or debate; goal, non-goals, product friction, and constraints are not mixed. |
| Lock Spec | Goal, scope, non-goals, user-visible behavior, constraints, and affected surfaces are clear enough to review or implement. |
| Lock Eval | Acceptance checks, test points, manual checks, failure conditions, and evidence expectations define how to prove correctness. |
| Lock Plan | Execution order, touched files/modules, risks, verification commands, lane candidates, and stop or rollback conditions are known. |
| Execute Plan | Changes stay within the plan boundary and produce evidence for what changed and what was not changed. |
| Review + Test | Implementation is checked against Spec and Eval with inspectable test or manual-verification evidence. |
| Repair + Recheck | Accepted blocker/major findings are fixed and rechecked, rejected with evidence, deferred as non-blocking, or escalated as blocked. |
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
  one-line requirement -> combined Spec/Eval -> short plan -> implement -> verify

Medium task:
  separate requirements, Spec, Eval, and Plan in reasoning or compact notes; review only risky gates

Large task:
  explicit requirements analysis, Spec, Eval, and Plan artifacts; consider agent-review for each gate

High-risk task:
  review requirements, Spec, Eval, Plan, implementation, and final result; use repair -> recheck
```

Review is not only a final step. Use `agent-review` for high-impact Spec, Eval,
Plan, implementation, or final-result checks when one framing may miss issues.

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
  evidence/
  handoffs/
  archive/
```

Use `docs/dev-flow/index.md` as the resume map. It links the active
Requirements, Spec, Eval, Plan, evidence, handoff, current phase, status, and
next owner. Do not duplicate full artifact content in the index.

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

## Skill Maintenance

Read [docs/skill-evals/README.md](docs/skill-evals/README.md) before changing
skill routing. A `description` is a trigger surface, not feature documentation;
update positive, negative, or forbidden routing cases before editing it. For
ordinary failures, prefer a small gotcha or red flag over making `SKILL.md`
longer.

When using these workflow ideas to improve the workflow skills themselves, keep
that meta-process in
[docs/skill-evals/workflow-skill-maintenance.md](docs/skill-evals/workflow-skill-maintenance.md).
Do not copy repository-maintenance rules into runtime skills.

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
