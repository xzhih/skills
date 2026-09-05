---
name: agent-improve
description: "Use when the user requests a codebase or branch improvement audit, including explicit $agent-improve. Independently find and rank worthwhile improvements; stop before planning or implementation."
---

# Agent Improve

Independently audit what is worth improving next. Inspect the requested repository, branch, or focus area using current source, callers/tests, and known tradeoffs.

For branches, identify the base and distinguish introduced issues from pre-existing ones. Validate suspected findings, reject intentional behavior, and merge common causes. Never disclose secret values.

Rank a few supported improvements by impact, effort, uncertainty, and change risk. Each needs a source location, concrete consequence, likely improvement, and relevant verification gap. Separate speculative product options from defects; novelty alone does not justify upgrades or abstractions.

Output ranked findings and scope/coverage limits, then stop. Do not create a backlog or plan, implement changes, or automatically enter dev-flow.
