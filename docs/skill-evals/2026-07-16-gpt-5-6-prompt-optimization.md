# GPT-5.6 Prompt Optimization

Date: 2026-07-16
Status: implemented

## Requirements

- Apply the official
  [GPT-5.6 prompting guidance](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices)
  to favor lean prompts, define action/approval boundaries once, and avoid
  broad brevity instructions that can remove required content.
- Preserve routing descriptions, workflow ownership, coverage, review gates,
  evidence requirements, and user-decision boundaries.
- Limit runtime changes to prompt surfaces where the guidance closes a
  demonstrated repetition or ambiguity.

Baseline:

```text
All SKILL.md words: 10,989
Requirements + Spec + Eval + Plan + steady-coding words: 3,989
All skill folders pass quick_validate.py before editing.
```

## Spec

- Centralize answer/review versus change/fix authority in `steady-coding` and
  `dev-flow/references/critical-overrides.md`.
- Remove duplicated routing, depth, process, and readiness prose from
  `agent-spec`, `agent-eval`, and `agent-plan` while retaining their contracts.
- Replace broad "keep it short" output instructions with explicit content
  priorities: conclusion/status first, preserve evidence, material caveats,
  blockers, and next action; omit repetition.
- Leave all frontmatter descriptions and `agents/openai.yaml` routing metadata
  unchanged.

## Eval

- Every skill folder passes `quick_validate.py`.
- All relative Markdown links in changed runtime Markdown resolve.
- Frontmatter descriptions and `agents/openai.yaml` are unchanged.
- Static behavior cases for this pass:
  - review/diagnose/plan requests inspect and report without implementation
  - change/build/fix requests perform authorized in-scope local work and
    relevant non-destructive validation without routine approval prompts
  - external writes, destructive/costly actions, unauthorized data-leaving
    agent use, and material scope expansion still require confirmation
  - concise output still preserves evidence, caveats, blockers, and next action
- Fresh-agent forward tests preserve concrete behavior, failure oracles,
  lifecycle ownership, and stop conditions.
- Word counts decrease without moving required behavior into an unreferenced
  location.

## Plan

1. Update shared action authority.
2. Streamline Spec, Eval, and Plan prompts.
3. Replace broad brevity wording on affected output contracts.
4. Run structure, link, routing-boundary, diff, and word-count checks.
5. Forward-test the changed lifecycle prompts and repair any accepted issue.

## Evidence

Changed:

- `steady-coding` and `critical-overrides.md` now define request authority and
  confirmation boundaries directly.
- `agent-spec`, `agent-eval`, and `agent-plan` retain their contracts with less
  repeated routing, process, and readiness prose.
- `agent-improve`, `agent-debate`, `agent-review`, and
  `doc-driven-workflows` now prioritize required output content instead of
  applying a broad shortness instruction.

Validation:

- All 18 skill folders passed `quick_validate.py`.
- All 18 `agents/openai.yaml` files parsed; none changed.
- All relative links in changed Markdown resolved.
- Frontmatter `name` and `description` fields did not change.
- `git diff --check`, lifecycle-invariant assertions, and broad-brevity phrase
  checks passed.
- SKILL body words changed from 10,989 to 10,441 (-5.0%). The core
  Requirements/Spec/Eval/Plan/steady-coding sequence changed from 3,989 to
  3,383 (-15.2%).

Forward tests:

- `agent-spec` produced concrete behavior, non-goals, failures, affected
  surfaces, and trace, then correctly left whole-Spec review pending.
- `agent-eval` produced fixtures, executable oracles, plausible-failure
  detection, trace, and required evidence without editing files.
- `agent-plan` detected that the current checkout was not the synthetic target
  application, stopped at bounded discovery, and did not invent implementation
  files, commands, lanes, sign-off, or a source snapshot.

Adversarial check:

- Most plausible miss: shortening the review gates could make a review waiver
  appear to dismiss already accepted blocker/major findings.
- Action: restored an explicit accepted-finding closure requirement in both
  Spec and Plan readiness lists, then reran the static lifecycle assertions.

Installed:

- Not installed into `~/.agents/skills`; this request changed the project
  source only.

Remaining risk:

- Forward tests used synthetic lifecycle artifacts rather than a production
  project. Routing behavior is unchanged because frontmatter and agent metadata
  were not modified.
