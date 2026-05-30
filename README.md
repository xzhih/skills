# xzhih skills

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

Install selected skills:

```sh
npx skills add xzhih/skills --skill careful-coding decision-methods dm-boundary-pass dm-reference-lens dm-state-capture dm-weight-check
```

## Skills

- `careful-coding`: careful implementation, debugging, refactoring, and reviewable code changes.
- `decision-methods`: manual router for the Decision Methods skill set.
- `dm-boundary-pass`: clarify architecture boundaries before implementation details.
- `dm-reference-lens`: compare references against local product boundaries.
- `dm-state-capture`: capture long discussion state into durable files.
- `dm-weight-check`: check whether a product or system direction is getting too heavy.

## Layout

```text
skills/
  careful-coding/
  decision-methods/
  dm-boundary-pass/
  dm-reference-lens/
  dm-state-capture/
  dm-weight-check/
```
