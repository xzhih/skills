# xzhih skills

English | [简体中文](README.zh-CN.md)

Six independently installable skills. Choose the result you want and where the work should stop.

## Install

List the available skills, install all six for Codex, or select one.

```sh
npx skills add xzhih/skills --list
npx skills add xzhih/skills --agent codex --skill '*'
npx skills add xzhih/skills --agent codex --skill agent-plan
```

For a local checkout, use `.` in place of `xzhih/skills`.

## Choose an entry

| Entry | Use it when you want | Where it stops |
|---|---|---|
| `$steady-coding` | Everyday help with a prompt, practical guide, scoped change or fault diagnosis | Returns a paste-ready prompt or steps the reader can follow outside the chat. Diagnosis alone ends with evidence, supported causes and any explanations still to distinguish. |
| `$dev-flow` | To choose a playbook for a task or resume from a handoff | Explains, diagnoses, fixes, refactors, optimizes or delivers to the requested stopping point. Small fixes go directly to the edit and check. Documentation-only work ends with the maintained page. |
| `$explain` | To understand an existing feature, change, design decision or UI | Follows one interaction from the control and its state owner through the event to the visible result. Distinguishes recorded intent from inference. Answers in chat and saves a lesson on request. |
| `$team-orchestration` | To discuss a split, coordinate parallel delivery, compare solutions or split a review by risk | Discussion ends with owners, dependencies and checks. Workers read the assigned skills first. The lead verifies integrated work, tests competing solutions against the same criteria, or consolidates all supported review findings. |
| `$agent-plan` | Requirements, a behavior specification, an architecture choice, an implementation plan or acceptance checks | Delivers whichever you ask for. For an important architecture choice, traces two structures through the same caller and failure. Branching requirements include a Mermaid tree and reasons for choices. Older plans are reconciled with current work. Blocked, accepted checks stay pending. |
| `$agent-review` | Findings on a named artifact, or a ranked audit of a repository, branch or area | One reviewer normally reports severity, evidence and coverage gaps. For a requested team review, defines risk questions for the same version. Re-review checks repairs. An audit ranks opportunities. Both end with a report. |

In Codex, `steady-coding` and `agent-review` can be selected from a natural-language request. Invoke the other four by name. An active `$dev-flow` reads the relevant installed specialist when needed. Its four bundled playbooks work when installed alone.

Coding and review favor the simplest correct implementation that meets caller constraints. A pure refactor replays the same inputs at the real entry before and after the change, comparing outputs, errors and side effects. For a shared contract change, `$agent-review` also checks indirect consumers, for example by opening an older file with the current importer. [Refactoring](skills/dev-flow/playbooks/deliver.md#refactor-with-the-same-behavior) · [Review](skills/agent-review/SKILL.md#review-a-specified-artifact)

For a measurable optimization, compare the baseline and candidate under matched conditions (A/B), then remove one candidate change at a time (ablation). Before reporting a speedup, check completed work, errors and the time the user actually waits. For continued tuning, `$dev-flow` fixes the workload, metric, correctness checks and stopping condition, then tests one hypothesis per round. [Optimization checks](skills/steady-coding/references/engineering-checks.md#compare-optimizations) · [Sustained optimization](skills/dev-flow/playbooks/optimize.md#sustained-optimization)

`$steady-coding` starts a diagnosis with the trace or incident record already available. After two fixes fail the same check on the same assumption, it tests that assumption. For an authorized repair with a cheap test, it reproduces the failure before the edit and reruns the same test afterward. [Diagnosis checks](skills/steady-coding/references/engineering-checks.md#distinguish-the-cause)

When the same error recurs, `$steady-coding` first looks for a design or type that prevents it, then a lint or CI check, then a regression test. A decision that requires human judgment gets a documented check. `$agent-review` verifies that an automated safeguard catches a real past mistake and still accepts a valid case. [Recurrence checks](skills/steady-coding/references/engineering-checks.md#prevent-a-recurring-error)

If a design depends on a fact you can measure, `$agent-plan` gives the smallest experiment and the result that would favor each option. For retries or recovery, it states what must always hold and gives an event sequence that could break it. Ask `$dev-flow` to run the prototype when you want a decision backed by observations. In a large migration, test the assumption that could invalidate the most downstream work first. [Behavior specification](skills/agent-plan/SKILL.md#behavior-specification) · [Design experiments](skills/dev-flow/playbooks/deliver.md#settle-a-design-choice)

“`$dev-flow` fix this label” goes straight to the edit and check. “`$explain` show me why the older search result disappears” follows the same input from the search field to the code that accepts or discards the response. “`$team-orchestration` discuss how to split this migration” ends with the proposed assignments. [Playbook selection](skills/dev-flow/SKILL.md) · [Routing examples](docs/skill-evals/routing-cases.md)

For a heavy shared dependency, one owner publishes the contract, mock and examples so consumers can work in parallel. A protocol change can land separately from the feature that discovered it. The integrator verifies each affected real entry after the provider lands. Workers share a verified procedure covering setup, readiness, the real action and its expected results and side effects. For a team review, the lead verifies the evidence, merges findings with the same cause and lists uncovered risks. [Team workflow](skills/team-orchestration/SKILL.md) · [Repeatable checks](skills/dev-flow/playbooks/deliver.md#hand-off-a-repeatable-check)

At a pause or shift change, update the existing handoff with each running job's owner, handle and last observed status, the evidence behind rejected approaches, and the next concrete action. On resume, check the live job first. If the project needs its first durable handoff, use one `docs/dev-flow/<slug>.md`. [Handoff and resume](skills/dev-flow/SKILL.md#handoff-and-resume)

## Migrate earlier invocations

| Retired entry | Use now |
|---|---|
| `agent-requirements-analysis` | `$agent-plan` with a requirements-only request |
| `agent-spec` | `$agent-plan` with a request for the behavior specification alone |
| `agent-eval` | `$agent-plan` with an acceptance-only request |
| `agent-improve` | `$agent-review` with a request to find and rank improvements |
| `agent-grilling` | `$agent-plan` for requirement or design assumptions, or `$steady-coding` for fault diagnosis |
| `doc-driven-workflows` | `$explain` for a walkthrough or saved lesson. Use `$dev-flow` to create or maintain a manual, reference or runbook. |

Update saved prompts that name retired entries. Existing project notes can be reused in place. Previously installed directories may persist after a repository update. [Earlier maintenance records](docs/skill-evals/README.md)
