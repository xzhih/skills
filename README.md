# xzhih skills

English | [简体中文](README.zh-CN.md)

Personal skills that work independently or compose into a compact development workflow. The current model works directly; multiple agents, sign-off gates, and fixed document suites are not prerequisites.

## Install

```sh
npx skills add xzhih/skills --list
npx skills add xzhih/skills --all
```

Install a standalone capability with `npx skills add xzhih/skills --skill agent-grilling`.
For the complete development workflow:

```sh
npx skills add xzhih/skills --skill dev-flow agent-requirements-analysis agent-spec agent-plan agent-eval steady-coding agent-review
```

## Development workflow

```text
Requirements -> behavior/boundaries -> Plan <-> Eval -> implement/verify -> review -> repair/recheck
```

`dev-flow` continues through authorized stages and reuses existing work. A standalone stage stops at its requested output. Clear user input can replace formally named upstream documents. Define acceptance before implementing; planning and evaluation may refine each other.

| Skill | Purpose |
|---|---|
| `dev-flow` | Select a starting point, continue delivery, and close from evidence |
| `agent-requirements-analysis` | Grow and prune a requirement tree; provide requirements, Mermaid, and material decision reasons |
| `agent-spec` | Define observable behavior, scope, non-goals, and important failure boundaries |
| `agent-plan` | Plan minimal executable deliverables grounded in current source |
| `agent-eval` | Design acceptance criteria and verification evidence without executing tests |
| `steady-coding` | Implement, debug, verify, and repair within scope |
| `agent-review` | Check concrete artifacts for defects, omissions, and surplus scope; disclose self-review and evidence limits |

Stop growing a requirement leaf when behavior is specific enough, further detail belongs to implementation, it is pruned, or a consequential user decision is needed. Resolve evidence-backed local choices directly. Ask only the important questions that cannot be inferred. Grilling is optional, not a mandatory requirement gate.

## Independent capabilities

| Skill | Purpose |
|---|---|
| `agent-improve` | Audit and rank worthwhile codebase improvements on request; stop without entering dev-flow |
| `agent-grilling` | Investigate hidden needs, design assumptions, and root causes through evidence; standalone investigation does not imply repair |
| `doc-driven-workflows` | Maintain source-backed long-lived technical documentation |
| `codex-image-gen` | Generate and edit images through the configured API |

## Persistence and migration

Keep ordinary work in chat. For requested files or recovery, use the project's existing location, otherwise one `docs/dev-flow/<slug>.md` with decisions, steps, acceptance, evidence, and next action. Split only when useful. Preserve the project's technical documentation structure.

The self-driving, runtime, lanes, integration-review, debate, project-context, and discussion-workflows entrypoints were removed. Their useful reasoning methods live in the relevant stages. Historical maintenance records are in `docs/skill-evals/archive/`, not current runtime guidance. Existing installations may retain removed skills; repository edits do not automatically clean installed directories.
