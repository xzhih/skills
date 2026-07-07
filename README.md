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

## Usage Map

Call entry skills directly. Entry skills may route into internal flow skills
when the workflow needs them.

### Entry Skills

| Skill | When to use | What happens |
| --- | --- | --- |
| `steady-coding` | Clear coding work: implementation, debugging, refactoring, tests, or reviewable code changes. | Reads the codebase, edits files, verifies behavior, and reports the result. It is selected by the agent when the task calls for grounded implementation. |
| `codex-image-gen` | Generate or edit raster images, icons, visual assets, product mockups, concept art, or reference-based image variants. | Uses the image generation workflow and returns image assets or edits. |
| `dev-flow` | You want to keep a development project moving across requirements, Spec, Eval, Plan, execution, review/test, repair, context recovery, docs, lanes, or heavier review. | Restores only the needed state, identifies the current lifecycle phase and missing gate, then routes into focused workflow skills. It should not impersonate the owner skill. |
| `discussion-workflows` | The discussion itself needs governance: recap, boundaries, scope, complexity checks, drift control, confirmed/draft/open state, or durable discussion notes. | Turns messy or corrected discussion into decision-ready state. It separates confirmed facts, drafts, and open questions, and writes `docs/discussion-workflows/` only when persistence is useful. |
| `doc-driven-workflows` | Project documentation governance: source-backed architecture, tech-stack, operation-flow, call-path maps, code/docs sync, alignment review, or open-question ledgers. | Checks whether the doc-driven gate is actually met, then updates, records, or skips docs based on current source evidence. It does not rewrite docs merely because docs exist. |
| `agent-self-driving` | You explicitly want a long task to keep moving: new project, new requirement, MVP delivery, model-diverse review/repair, external-agent policy, or high-confidence multi-agent closure. | Uses `dev-flow` as the lifecycle spine, calls the focused owner skills, dispatches debate/review/lanes when useful, keeps private orchestration state, and pauses only for true user decisions or real blockers. |
| `agent-requirements-analysis` | You have a direction, new project, new requirement, update, or bug intent that needs a complete requirements skeleton before Spec. | Uses agent brainstorming, same-topic debate, and discussion governance as needed, resolves agent-answerable open questions first, then returns goals, users, flow, scope, non-goals, constraints, risks, confirmed/draft/open state, and true user decisions. |
| `agent-spec` | Requirements are structured enough to define implementation behavior and boundaries. | Produces an implementation-ready Spec with behavior, scope, non-goals, constraints, affected surfaces, interfaces, docs impact, open questions, and review status. |
| `agent-eval` | A Spec is locked and you need to define how correctness will be proven. | Produces acceptance checks, automated/manual verification, failure conditions, scenarios, evidence requirements, and risk coverage. |
| `agent-plan` | Spec and Eval are locked and the work needs executable tasks or lane candidates. | Produces task decomposition, dependencies, touched surfaces, verification commands, evidence expectations, risks, stop conditions, and safe parallel lane candidates. |
| `agent-debate` | Multiple agents should discuss the same material and same question: requirements, product friction, simplicity, necessity, user flow, or whether a proposal is too heavy. | Gives every agent the same topic and source material, synthesizes disagreements, feeds conflicts into follow-up rounds, and promotes only evidence-backed conclusions or open questions. |
| `agent-review` | One focused reviewer or multiple agents should review the same artifact: Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result. | Collects blocker/major/minor/question findings, normalizes claims, verifies evidence, and runs rebuttal or recheck when needed. |
| `agent-lanes` | Multiple agents should work on different independent tasks with clear ownership boundaries: separate files, modules, docs, investigations, or worktrees. | Performs collision checks, creates lane packets, dispatches or prepares handoffs, then routes returned work through integration review before trusting results. |

### Internal Flow Skills

| Skill | When it is used | What happens |
| --- | --- | --- |
| `project-context` | An entry workflow depends on handoff, coordination, specs, lane state, project rules, verification commands, or source-of-truth docs. | Restores the real project state and identifies active decisions, live lanes, collision risks, and verification conventions. |
| `agent-runtime` | A workflow needs approved agents, model profiles, capability/runnability checks, OpenCode, or external session continuity. | Applies runtime gates and records state in `docs/dev-flow/capabilities/`. |
| `agent-grilling` | A goal, assumption set, plan branch, or lane decomposition is not ready for direct planning or dispatch. | Uses agents to ask and answer formulation questions, pressure-test options, and return decision candidates plus true user questions. |
| `integration-review` | `agent-lanes` workers return, or lane evidence, scope, conflicts, blockers, and next-batch choices need review. | Checks returned work against scope and evidence, classifies blockers, identifies conflicts, and decides what can merge or what batch can safely run next. |

Runtime capability/session records live in `docs/dev-flow/capabilities/`.
`agent-self-driving` may maintain source maps, private blackboards, raw
agent-output ledgers, and review-repair continuity.

Short version:

```text
Write code                         -> steady-coding
Generate or edit images            -> codex-image-gen
Unsure which workflow comes next    -> dev-flow
Govern a long discussion            -> discussion-workflows
Govern project docs                 -> doc-driven-workflows
Run long-task automation             -> agent-self-driving
Analyze requirements                -> agent-requirements-analysis
Produce Spec                        -> agent-spec
Produce Eval                        -> agent-eval
Produce Plan                        -> agent-plan
Agents debate one shared question   -> agent-debate
Agents review one shared artifact   -> agent-review
Agents split independent work       -> agent-lanes
```

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
R-* requirement -> B-* Spec behavior -> E-* Eval evidence -> T-* Plan task -> evidence
```

This prevents execution from silently dropping requirements. `agent-plan` says
which Requirement/Behavior/Eval IDs each task covers, `agent-lanes` carries
those IDs into lane packets, and `integration-review` checks whether every
non-deferred ID has evidence, a blocker, or an explicit deferral.

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

## Scenario Entry Points

Use one lifecycle, then choose the entry point and scale by scenario:

```text
requirements analysis -> Spec -> Eval -> Plan -> execute -> Review/Test -> Repair/Recheck -> Close
```

| Scenario | Start with | Then continue with | Usually skip or compress |
| --- | --- | --- | --- |
| New project | `$agent-self-driving` when you want automation from direction to MVP/completion; `$agent-requirements-analysis` when you only want the requirements skeleton. | Orchestration uses `$dev-flow` to move through `$agent-requirements-analysis`, `$agent-spec`, `$agent-eval`, `$agent-plan`, review, execution, repair, and close. Use `$doc-driven-workflows` when long-lived source-of-truth docs are needed. | Do not skip early discovery, but keep artifacts compact until risk justifies more ceremony. |
| New requirement | `$agent-self-driving` when you want it to keep going through implementation; `$dev-flow` when you want lifecycle routing and checkpoints. | Use `$agent-requirements-analysis`, `$agent-spec`, `$agent-eval`, and `$agent-plan` for artifacts; `$agent-review` for artifact review; `$agent-lanes` for independent parallel work; `$doc-driven-workflows` when docs would drift. | Skip long discussion when requirements and Eval are already clear. |
| Fix | Directly describe the bug when it is small and reproducible. Use `$dev-flow` when cause, impact, reproduction, or risk is unclear. | Use `$agent-requirements-analysis` for unclear bug intent, `$agent-eval` for reproduction/acceptance evidence, `$agent-plan` for risky repair plans, `$agent-review` for risky diffs or final evidence, and `$doc-driven-workflows` if the fix changes documented behavior. | Compress Spec/Plan for small fixes, but keep Eval/reproduction and verification. |
| Update | Directly describe the update when it is small. Use `$dev-flow` when behavior, architecture, scope, or risk changes. | Use `$agent-requirements-analysis` for scope, `$agent-spec` for behavior changes, `$agent-eval` for updated acceptance, `$agent-plan` for execution, `$agent-review` for changed artifacts, and `$agent-lanes` for independent update surfaces. | Compress execution for small updates; do not skip Eval when behavior changes. |

Short version:

```text
New project  -> agent-self-driving for automation, or agent-requirements-analysis for skeleton only
New feature  -> agent-self-driving for delivery, or dev-flow for lifecycle routing
Fix          -> direct for small reproducible bugs; dev-flow for unclear or risky bugs
Update       -> direct for small updates; dev-flow when behavior, scope, architecture, or risk changes
```

## Routing Guide

| If the work sounds like... | Prefer | Avoid |
| --- | --- | --- |
| Ordinary coding, debugging, refactoring, or reviewable implementation | `steady-coding` | Workflow orchestration unless the task actually needs it |
| Restoring a project's handoff, coordination, spec, lane, or source-of-truth state | `$dev-flow`, which uses `project-context` internally | Reading every doc tree by default |
| Choosing which workflow owner should handle a complex development task | `dev-flow` | Calling every workflow in sequence |
| Non-trivial development needs requirements, Spec, Eval, Plan, execution, review/test, repair, and closeout | `$dev-flow`, which routes through `agent-requirements-analysis`, `agent-spec`, `agent-eval`, and `agent-plan` | Jumping from discussion straight to implementation without an Eval gate |
| A new project or new requirement should continue automatically until MVP/completion or a true pause | `$agent-self-driving` | Stopping after Requirements/Spec/Eval/Plan when execution can safely continue |
| A direction or idea needs a complete requirements skeleton before Spec | `$agent-requirements-analysis` | Asking the user to hand-write the first complete requirements draft |
| Requirements are ready to become implementation behavior | `$agent-spec` | Mixing acceptance tests or task plans into the Spec |
| A Spec needs acceptance checks and evidence standards | `$agent-eval` | Treating "plan completed" as proof of correctness |
| Spec and Eval need executable tasks or lane candidates | `$agent-plan` | Dispatching lanes before task boundaries and verification are known |
| A long or corrected discussion needs recap, boundary control, or durable decisions | `$discussion-workflows` directly, or `$dev-flow` when it is part of broader development routing | Treating it as implementation planning too early |
| A fuzzy goal needs agent-answered formulation, assumptions, or lane pressure-testing | `$dev-flow` or `$agent-debate`, which may use `agent-grilling` internally | Treating formulation as implementation planning |
| One focused reviewer, researcher, or fresh-eyes agent should inspect a bounded artifact or question | `agent-review` | `agent-lanes`, which is for two or more independent lanes |
| Multiple agents should debate requirements, product friction, simplicity, necessity, or user flow on the same material | `agent-debate` | Splitting agents by section before all agents review the unified topic |
| Two or more clear, independent work lanes can run safely | `agent-lanes` | `agent-self-driving` unless Spec/Eval, external agents, or review-repair are explicitly requested |
| Returned lane work needs evidence, scope, conflict, and blocker classification | `$agent-lanes`, which uses `integration-review` internally | Trusting worker summaries without inspecting evidence |
| Explicit Spec/Eval delivery, model-diverse review, external-agent policy, or repeated review-repair | `$dev-flow` or `$agent-self-driving` for advanced control | Routine lane batching or lightweight goal/path pressure-testing |
| Source-backed architecture, operation-flow, call-path, or code/docs drift maintenance | `$doc-driven-workflows` directly, or `$dev-flow` when it is part of broader development routing | Updating docs merely because docs exist |
| External API docs, SDK docs, vendor docs, excerpts, or research material must persist but have not become project judgments yet | `$discussion-workflows` `inbox/`; after synthesis, route to `references`, a stage artifact, or `$doc-driven-workflows` | Copying raw material directly into long-term project truth |

Common ambiguous phrasing:

| User says... | Route first |
| --- | --- |
| "Ask agents to make this goal clear", "pressure-test the idea", "先问透" | `$agent-debate` or `$dev-flow` |
| "Where did the discussion land?", "recap this thread", "先复盘" | `$discussion-workflows` |
| "Get another agent to look", "fresh eyes", "one reviewer", "one researcher" | `agent-review` |
| "Let agents debate", "same topic", "is this too heavy", "is this necessary", "simple/easy to use", "符合心流" | `agent-debate` |
| "Restore project state", "continue from handoff", "先恢复上下文" | `$dev-flow` |
| "Continue this feature", "follow the development flow", "先定 spec/eval/plan 再做" | `$dev-flow` |
| "Use agent-self-driving for this direction", "做完整长任务", "做到 MVP" | `$agent-self-driving` |
| "I have a direction; build the requirements skeleton", "先补需求骨架" | `$agent-requirements-analysis` |
| "Turn this into a spec", "定 Spec" | `$agent-spec` |
| "Define acceptance / how to prove it works", "定 Eval / 验收标准" | `$agent-eval` |
| "Write the implementation plan", "写 Plan / 拆任务" | `$agent-plan` |
| "Sync code/docs", "code/docs synchronization", "docs may drift" | `$doc-driven-workflows` |
| "Use two agents in parallel on two separate parts" | `agent-lanes`, unless the user asks for Spec/Eval, adversarial review, repeated repair, or external-agent policy |
| "The lanes came back; decide what can merge" | `$agent-lanes` |

Use internal flow skills only after an entry skill routes there. Do not ask users
to choose `project-context`, `agent-grilling`, or `integration-review` for
routine work.

`discussion-workflows` and `doc-driven-workflows` are explicit governance
entries, not multi-agent internals. Users may call them directly; `dev-flow` may
also route into them when discussion or documentation governance is one step in a
larger development workflow.

`agent-review` and `integration-review` are different. `agent-review` has
multiple agents review the same artifact and produce an artifact-quality
verdict. `integration-review` reviews returned lanes for scope, diff, evidence,
conflicts, and next-batch state. It may call `agent-review` for a high-risk
artifact, but it still owns the lane verdict.

`agent-self-driving` is explicit-entry automation. When invoked for a
direction, it should use `dev-flow` and focused owner skills to keep going until
the deliverable is done, blocked by evidence, or requires a true user decision.
It should keep its own docs private and link to owner artifacts instead of
forking project truth.

Workflow skills are explicit-entry skills: call them by name, or let an
already-loaded workflow route into them. They should not implicitly activate
from ordinary mentions of review, discussion, lanes, docs, or agents.

For multi-agent debate, keep the topic unified by default: every agent gets the
same source material and same question each round. Treat categories or sections
as a checklist every agent reviews, not as separate agent ownership, unless the
user explicitly asks for independent work lanes.

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
