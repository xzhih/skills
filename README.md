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

Install selected user-entry skills:

```sh
npx skills add xzhih/skills --skill steady-coding codex-image-gen dev-flow discussion-workflows doc-driven-workflows agent-debate agent-review agent-lanes
```

## Skills

User-entry skills:

- `steady-coding`: stable, grounded implementation, debugging, refactoring, verification, and reviewable code changes.
- `codex-image-gen`: generate or edit images via the Responses API `image_generation` tool, auto-detecting auth (API key / codex custom provider / ChatGPT login).
- `dev-flow`: explicit development lifecycle router for requirements, Spec, Eval, Plan, execution, review/test, repair/recheck, context recovery, docs, lanes, and heavier multi-agent workflows.
- `discussion-workflows`: explicit discussion governance for long, corrected, or decision-heavy conversations that need recap, boundaries, complexity checks, drift control, or durable state.
- `doc-driven-workflows`: explicit project documentation governance for source-backed architecture, operation-flow, call-path, code/docs synchronization, and open-question ledgers.
- `agent-debate`: explicitly invoked same-topic multi-agent debate for requirements, product friction, simplicity, necessity, usability, user flow, and decision clarity.
- `agent-review`: explicitly invoked multi-agent review of one artifact, such as a Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result.
- `agent-lanes`: explicit parallel lane execution for safe batches of subagent/worktree work.

Internal flow skills:

- `project-context`: restores authoritative project instructions, handoff docs, coordination state, decisions, verification conventions, and collision risks.
- `agent-grilling`: pressure-tests unclear goals, assumptions, and decomposition before planning or dispatch.
- `integration-review`: reviews returned lanes, normalizes claims, checks evidence, classifies blockers, and continues to the next safe batch.
- `multi-agent-orchestration`: advanced/internal dispatcher for Spec/Eval delivery, external-agent policy, repeated review-repair, and multi-agent convergence.

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
| `agent-debate` | Multiple agents should discuss the same material and same question: requirements, product friction, simplicity, necessity, user flow, or whether a proposal is too heavy. | Gives every agent the same topic and source material, synthesizes disagreements, feeds conflicts into follow-up rounds, and promotes only evidence-backed conclusions or open questions. |
| `agent-review` | Multiple agents should review the same artifact: Spec, Eval, plan, design, PR, diff, implementation, evidence package, or final result. | Collects blocker/major/minor/question findings, normalizes claims, verifies evidence, and runs rebuttal or recheck when needed. |
| `agent-lanes` | Multiple agents should work on different independent tasks with clear ownership boundaries: separate files, modules, docs, investigations, or worktrees. | Performs collision checks, creates lane packets, dispatches or prepares handoffs, then routes returned work through integration review before trusting results. |

### Internal Flow Skills

| Skill | When it is used | What happens |
| --- | --- | --- |
| `project-context` | An entry workflow depends on handoff, coordination, specs, lane state, project rules, verification commands, or source-of-truth docs. | Restores the real project state and identifies active decisions, live lanes, collision risks, and verification conventions. |
| `agent-grilling` | A goal, assumption set, plan branch, or lane decomposition is not ready for direct planning or dispatch. | Uses agents to ask and answer formulation questions, pressure-test options, and return decision candidates plus true user questions. |
| `integration-review` | `agent-lanes` workers return, or lane evidence, scope, conflicts, blockers, and next-batch choices need review. | Checks returned work against scope and evidence, classifies blockers, identifies conflicts, and decides what can merge or what batch can safely run next. |
| `multi-agent-orchestration` | A high-intensity workflow explicitly needs Spec/Eval, external agents, model-diverse convergence, repeated review-repair, or advanced multi-agent dispatch. | Acts as an advanced dispatcher and control surface. It may route to `agent-debate`, `agent-review`, `agent-lanes`, or a heavier Spec/Eval/review-repair lifecycle. |

Short version:

```text
Write code                         -> steady-coding
Generate or edit images            -> codex-image-gen
Unsure which workflow comes next    -> dev-flow
Govern a long discussion            -> discussion-workflows
Govern project docs                 -> doc-driven-workflows
Agents debate one shared question   -> agent-debate
Agents review one shared artifact   -> agent-review
Agents split independent work       -> agent-lanes
```

## Development Lifecycle

For non-trivial development work, `dev-flow` uses this lifecycle as the default
control spine:

```text
1. Discuss Requirements
2. Lock Spec
3. Lock Eval
4. Write Plan
5. Execute Plan
6. Review + Test
7. Repair + Recheck
8. Close / Handoff
```

Each phase has an exit gate:

| Phase | Exit gate |
| --- | --- |
| Discuss Requirements | Confirmed, draft, and open points are separated; goal, non-goals, product friction, and constraints are not mixed. |
| Lock Spec | Goal, scope, non-goals, user-visible behavior, constraints, and affected surfaces are clear enough to review or implement. |
| Lock Eval | Acceptance checks, test points, manual checks, failure conditions, and evidence expectations define how to prove correctness. |
| Write Plan | Execution order, touched files/modules, risks, verification commands, and stop or rollback conditions are known. |
| Execute Plan | Changes stay within the plan boundary and produce evidence for what changed and what was not changed. |
| Review + Test | Implementation is checked against Spec and Eval with inspectable test or manual-verification evidence. |
| Repair + Recheck | Accepted blocker/major findings are fixed and rechecked, rejected with evidence, deferred as non-blocking, or escalated as blocked. |
| Close / Handoff | Final state, evidence, residual risks, docs impact, and next owner are clear. |

Scale the ceremony to the task:

```text
Small task:
  one-line requirement -> combined Spec/Eval -> short plan -> implement -> verify

Medium task:
  separate Spec, Eval, and Plan in reasoning or compact notes; review only risky gates

Large task:
  explicit Spec, Eval, and Plan artifacts; consider agent-review for each gate

High-risk task:
  review Spec, Eval, Plan, implementation, and final result; use repair -> recheck
```

Review is not only a final step. Use `agent-review` for high-impact Spec, Eval,
Plan, implementation, or final-result checks when one framing may miss issues.

Documentation governance is also a lifecycle gate: use `doc-driven-workflows`
when a locked Spec, accepted implementation, or review finding would make
source-of-truth docs mislead a future human or agent.

## Scenario Entry Points

Use one lifecycle, then choose the entry point and scale by scenario:

```text
understand/discuss -> Spec -> Eval -> Plan -> execute -> Review/Test -> Repair/Recheck -> Close
```

| Scenario | Start with | Then continue with | Usually skip or compress |
| --- | --- | --- | --- |
| New project | `$discussion-workflows` to clarify goal, users, boundaries, non-goals, product flow, and complexity placement. Use `$agent-debate` when direction or complexity needs same-topic challenge. | `$dev-flow` to move through Spec, Eval, Plan, execution, review/test, repair, and close. Use `$doc-driven-workflows` when long-lived source-of-truth docs are needed. | Do not skip early discovery, but keep artifacts compact until risk justifies more ceremony. |
| New requirement | `$dev-flow` to restore project context and identify the missing lifecycle gate. | Use `$discussion-workflows` if the requirement is unclear, `$agent-debate` if the tradeoff is contested, `$agent-review` for Spec/Eval/Plan/diff/result review, `$agent-lanes` for independent parallel work, and `$doc-driven-workflows` when docs would drift. | Skip long discussion when the requirement and Eval are already clear. |
| Fix | Directly describe the bug when it is small and reproducible. Use `$dev-flow` when cause, impact, reproduction, or risk is unclear. | Use `$discussion-workflows` for boundary/design confusion, `$agent-debate` for competing repair paths, `$agent-review` for risky diffs or final evidence, `$agent-lanes` for independent fixes, and `$doc-driven-workflows` if the fix changes documented behavior. | Compress Spec/Plan for small fixes, but keep Eval/reproduction and verification. |
| Update | Directly describe the update when it is small. Use `$dev-flow` when behavior, architecture, scope, or risk changes. | Use `$discussion-workflows` for scope or complexity tradeoffs, `$agent-debate` for contested direction, `$agent-review` for changed Spec/Eval/Plan/diff/result, `$agent-lanes` for independent update surfaces, and `$doc-driven-workflows` if source-of-truth docs would become stale. | Compress execution for small updates; do not skip Eval when behavior changes. |

Short version:

```text
New project  -> discussion-workflows -> dev-flow -> doc-driven-workflows when durable docs matter
New feature  -> dev-flow; add discussion/debate/review/lanes/docs only when the gate needs it
Fix          -> direct for small reproducible bugs; dev-flow for unclear or risky bugs
Update       -> direct for small updates; dev-flow when behavior, scope, architecture, or risk changes
```

## Routing Guide

| If the work sounds like... | Prefer | Avoid |
| --- | --- | --- |
| Ordinary coding, debugging, refactoring, or reviewable implementation | `steady-coding` | Workflow orchestration unless the task actually needs it |
| Restoring a project's handoff, coordination, spec, lane, or source-of-truth state | `$dev-flow`, which uses `project-context` internally | Reading every doc tree by default |
| Choosing which workflow owner should handle a complex development task | `dev-flow` | Calling every workflow in sequence |
| Non-trivial development needs requirements, Spec, Eval, Plan, execution, review/test, repair, and closeout | `$dev-flow` | Jumping from discussion straight to implementation without an Eval gate |
| A long or corrected discussion needs recap, boundary control, or durable decisions | `$discussion-workflows` directly, or `$dev-flow` when it is part of broader development routing | Treating it as implementation planning too early |
| A fuzzy goal needs agent-answered formulation, assumptions, or lane pressure-testing | `$dev-flow` or `$agent-debate`, which may use `agent-grilling` internally | Treating formulation as implementation planning |
| One focused reviewer, researcher, or fresh-eyes agent should inspect a bounded artifact or question | `agent-review` | `agent-lanes`, which is for two or more independent lanes |
| Multiple agents should debate requirements, product friction, simplicity, necessity, or user flow on the same material | `agent-debate` | Splitting agents by section before all agents review the unified topic |
| Two or more clear, independent work lanes can run safely | `agent-lanes` | `multi-agent-orchestration` unless Spec/Eval, external agents, or review-repair are explicitly requested |
| Returned lane work needs evidence, scope, conflict, and blocker classification | `$agent-lanes`, which uses `integration-review` internally | Trusting worker summaries without inspecting evidence |
| Explicit Spec/Eval delivery, model-diverse review, external-agent policy, or repeated review-repair | `$dev-flow` or `$multi-agent-orchestration` for advanced control | Routine lane batching or lightweight goal/path pressure-testing |
| Source-backed architecture, operation-flow, call-path, or code/docs drift maintenance | `$doc-driven-workflows` directly, or `$dev-flow` when it is part of broader development routing | Updating docs merely because docs exist |

Common ambiguous phrasing:

| User says... | Route first |
| --- | --- |
| "Ask agents to make this goal clear", "pressure-test the idea", "先问透" | `$agent-debate` or `$dev-flow` |
| "Where did the discussion land?", "recap this thread", "先复盘" | `$discussion-workflows` |
| "Get another agent to look", "fresh eyes", "one reviewer", "one researcher" | `agent-review` |
| "Let agents debate", "same topic", "is this too heavy", "is this necessary", "simple/easy to use", "符合心流" | `agent-debate` |
| "Restore project state", "continue from handoff", "先恢复上下文" | `$dev-flow` |
| "Continue this feature", "follow the development flow", "先定 spec/eval/plan 再做" | `$dev-flow` |
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
  agent-grilling/
  agent-debate/
  agent-review/
  agent-lanes/
  integration-review/
  multi-agent-orchestration/
```
