# Formulation Grilling

Use this reference when the user has a real goal but the requirements, design tree, execution path, or success criteria are not yet clear enough to draft or lock a plan, lane packet, Spec, or Eval.

## Contents

- Purpose
- Brainstorming Rhythm
- Expert Translation
- Root-Cause Probing
- Roles
- Topology
- Round Policy
- Griller Contract
- Agent-Answered Questions
- Derived Standards And Gates
- Normalized Output
- User Escalation
- Formulation Snapshot
- Stop Conditions

## Purpose

Agent grilling moves brainstorming burden from the user into bounded agent exploration first, while preserving a root-cause probing posture.

Use it to discover:

- the real problem behind the stated goal
- explicit requirements versus inferred assumptions
- professional standards implied by user feelings, business intent, or domain goals
- hidden boundaries, non-goals, dependencies, and product decisions
- design branches and their consequences
- unknowns that source, repo, runtime, research, or focused agents can resolve
- the smallest set of true user decisions

Do not use it as ritual when the task is narrow enough for direct work.

## Brainstorming Rhythm

Borrow the useful rhythm of human brainstorming, but make agents answer first. The moderator should identify the questions that would normally be asked one by one, then classify each question:

```text
source_answerable:
  Existing docs, code, tests, logs, or repo state can answer.

agent_answerable:
  A focused agent can infer a likely answer, compare options, or inspect a slice.

safe_assumption:
  The moderator can choose a reversible default and record it.

true_user_decision:
  Product direction, taste, brand, privacy, cost, destructive/public action,
  external-agent authorization, or a user-defined preference is required.
```

Run another formulation round when a high-impact `source_answerable` or `agent_answerable` question remains. Do not run another round merely to polish wording, seek consensus, or debate minor preferences.

## Expert Translation

The user does not need to supply professional parameters. Treat experiential feedback as a valid problem statement:

```text
user says:
  "This does not feel like a real admin."
  "This is hard to scan."
  "The page feels like a showcase, not an operator tool."
  "I want to do this safely and quickly."

moderator translates:
  domain:
  core operator task:
  current failure mode:
  unacceptable shapes:
  quality bar:
  concrete acceptance gates:
  evidence required:
```

Do not ask the user for values they should not have to know, such as exact row height, density tokens, component anatomy, evidence mechanics, or test strategy. Ask the user for business intent, taste, product direction, risk tolerance, or domain facts only when agents and source evidence cannot infer them safely.

For product or UX work, derive standards from the task domain before implementation. Examples:

- Admin pages should optimize repeated operator tasks, scan density, filtering, auditability, safe actions, and evidence-backed state.
- Dashboards should optimize comparison, trend visibility, anomaly detection, and decision path clarity.
- Editors should optimize creation flow, selection state, undo safety, keyboard ergonomics, and recoverability.

These examples are not fixed project rules. Use them as a pattern: user feeling -> domain name -> task model -> failure standards -> gates.

## Root-Cause Probing

For high-impact answers, the moderator should not accept the first plausible response. Probe until the answer has enough backing for the next artifact.

Use this ladder:

```text
answer:
  What is the current answer or default?

why:
  Why is this the right framing instead of a nearby alternative?

evidence:
  What code, docs, tests, logs, user statement, or reasoning supports it?

assumption:
  What has to be true for this answer to hold?

counterexample:
  What situation would make this answer wrong or incomplete?

boundary:
  What is included, excluded, or deferred because of this answer?

failure_mode:
  If this answer is wrong, what breaks downstream?

resolver:
  Can source, runtime, a focused agent, safe assumption, or only the user resolve it?
```

Stop probing when the remaining uncertainty is low-impact, explicitly deferred, safely reversible, or a true user decision. Continue probing or run another focused round when a weakly supported answer controls target correctness, boundaries, lane decomposition, acceptance criteria, or user-visible behavior.

## Roles

```text
moderator:
  Owns source inspection, blackboard state, synthesis, and user escalation.

proposer:
  Drafts the current target, option tree, assumptions, risks, recommended
  defaults, and implications for the next workflow.

griller:
  Challenges unclear goals, hidden dependencies, skipped branches, weak
  assumptions, premature plans, unsupported defaults, and shallow answers.

alternative:
  Offers a meaningfully different approach or decomposition when useful.

context_agent:
  Answers a specific source-answerable question from docs, code, tests, logs,
  or repository state.

domain_agent:
  Answers a specific design, product, architecture, testing, UX, data, or
  operations question when the answer does not require user taste or authority.

standards_agent:
  Translates user feeling and business intent into domain standards,
  unacceptable shapes, acceptance gates, and evidence requirements.

synthesizer:
  Merges surviving proposals, tradeoffs, decisions, assumptions, and true
  user questions into a formulation snapshot.
```

For small tasks, the moderator can act as proposer and synthesizer while using one griller.

## Topology

Default topology:

```text
proposer:
  Draft one coherent default path and recommended assumptions.

alternative:
  Draft a different viable path or explain why no real alternative exists.

griller:
  Challenge both paths, dependencies, missing decisions, hidden risks, and
  premature closure.

focused agents:
  Answer unresolved high-impact questions by source inspection or domain
  reasoning.

standards agent:
  Converts fuzzy feedback into professional criteria and testable gates.

synthesizer:
  Produce the best current formulation and unresolved true user questions.
```

Do not label formulation agents as reviewers unless they are validating an existing artifact. Their job is to help the moderator answer the brainstorming backlog, not to produce pass/fail verdicts.

## Round Policy

Round 1 should usually produce:

- inferred purpose and success criteria
- likely constraints and non-goals
- domain translation from user feedback to concrete quality standards
- 2-3 viable approaches or a reason only one real path exists
- challenge questions and missing evidence
- classification of questions by resolver

Round 2 is required when Round 1 leaves any high-impact `source_answerable` or `agent_answerable` question unresolved that affects:

- target correctness
- implementation boundary
- lane decomposition
- acceptance criteria or Eval quality
- data model, API, migration, security, privacy, or user-visible behavior
- whether work may safely start

Round 2 should be targeted: send only the unresolved question, relevant source context, and prior blackboard snapshot. Stop when remaining issues are true user decisions, safe assumptions, minor risks, or downstream verification tasks.

## Griller Contract

Each high-impact challenge should include:

```text
question or challenge:
why it matters:
recommended answer:
evidence needed:
who can resolve it: source | runtime | focused_agent | safe_assumption | user
```

Unsupported worries stay as questions or hypotheses until evidence supports them.

Each high-impact accepted answer should survive at least the short form:

```text
answer:
why:
evidence or reasoning:
main assumption:
counterexample or failure mode:
downstream boundary:
confidence: high | medium | low
```

## Agent-Answered Questions

Record agent-resolved brainstorming questions in a compact table or list:

```text
question:
resolver:
answer:
evidence or reasoning:
confidence: high | medium | low
downstream implication:
```

Low-confidence answers that affect target correctness become open questions, not confirmed decisions.

## Derived Standards And Gates

When the input includes fuzzy quality feedback, produce a compact gate set:

```text
domain:
task model:
unacceptable shapes:
quality standards:
static gates:
runtime/browser gates:
evidence required:
what not to claim:
```

These gates should be specific enough for implementation and review lanes to use, but not so project-specific that they invent product direction without evidence.

## Normalized Output

Use formulation language:

```text
proposal:
tradeoff:
assumption:
decision_candidate:
open_question:
implication:
```

Use `blocker` only when a formulation issue prevents a coherent next artifact.

## User Escalation

Ask the user only when the decision is genuinely non-agent-decidable.

```text
Decision needed:
Recommended answer:
Impact / tradeoff:
Why agents cannot safely decide:
```

Do not ask the user to choose ordinary implementation sequence, internal task splitting, or questions that code, docs, tests, logs, or agents can resolve.

## Formulation Snapshot

The moderator-owned snapshot should contain:

```text
goal:
real problem:
known requirements:
non-goals and boundaries:
option branches:
agent-answered questions:
derived standards and gates:
decision dependencies:
resolved decisions:
safe assumptions:
open questions:
true user questions:
next-workflow implications:
```

Promote only evidence-backed decisions, scoped assumptions, and real user questions into downstream workflows.

## Stop Conditions

Stop formulation when:

- the real problem, boundaries, and non-goals are clear enough for the current phase
- blocker dependencies have an answer, safe assumption, or user escalation
- remaining questions are minor, deferred, or captured as downstream risks
- no unresolved formulation blocker remains

Pause when a true user decision blocks target correctness and cannot be resolved by evidence or agent reasoning.
