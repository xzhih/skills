# Lean workflow revision

## Scope

Keep seven development stages and four independent capabilities. Delete seven orchestration/discussion entrypoints and their references. Retain image-generation work unchanged. Review and requirement reasoning use the current model; optional collaboration is not a prerequisite.

## Scenarios and source-review expectations

| Request | Expected behavior |
|---|---|
| Develop a small bounded fix | Compact context and acceptance, implementation, verification, self-review; no mandatory documents/workers |
| Only plan this feature | Read source, produce steps and checks, stop before implementation |
| Write a Spec from this clear request | Accept the request directly; no mandatory Requirements Baseline |
| Resume delivery from an existing Spec | Reuse it; fill only missing planning/acceptance information |
| Explore this one-sentence need | Grow meaningful branches, compare alternatives, record important pruning reasons, render Mermaid |
| A confirmed need seems costly | Propose a tradeoff; do not silently reject the confirmed requirement |
| Investigate why a timeout occurs | Separate observations and hypotheses, inspect distinguishing evidence, no automatic repair |
| Grilling within an authorized fix | Return causal findings and continue the authorized repair scope |
| Audit improvements | Rank source-backed findings and stop; no dev-flow handoff or backlog |
| Review a result without subagents | Review directly, label self-review when applicable, no waiver request |
| Design acceptance checks | Describe pass/fail conditions; never claim checks ran |
| Ordinary code task with documentation present | Do not bootstrap a documentation system |

These are manual source-review cases, not fresh-model behavioral executions. Structural validation cannot prove model behavior or performance improvement.

## Checks

Validate all eleven skill frontmatters and UI metadata, resolve active local Markdown links, inspect removed-name references in active runtime files, and check the diff. Archived history may reference deleted paths and old policies. Existing installed skill copies are outside this repository revision.

## Validation results

- Official quick_validate.py passed for all 11 skills, using an isolated uv runtime with PyYAML.
- The 10 rewritten workflow UI metadata files parsed and matched their skill prompts; existing image-generation metadata was parsed without changing its separate format.
- Active skill/README local Markdown links resolved; removed skill names were absent from runtime Markdown and YAML.
- git diff --check passed. Six tracked historical evaluation records were archived byte-for-byte.
- Manual source review covered the scenarios above. No independent model execution or runtime behavior benchmark was performed.
- After the initial rewrite, workflow Markdown was 226 lines versus the inspected 7,343-line baseline, excluding image generation. This measures instruction size, not behavioral quality.
- Changes apply to this repository only; installed copies were not updated and no commit was created.

## Follow-up: compact stage instructions

Preserved dev-flow as the router and stage skills as method owners. Removed repeated orchestration disclaimers, formal-artifact commentary, and redundant output rules; Plan and Eval now return gaps to their caller instead of initiating other stages. Preserved requirement-tree growth/pruning, decision reasons, Mermaid, evidence-based root-cause investigation, independent improvement audits, and standalone stop boundaries.

The ten workflow SKILL.md files fell from 20,786 to 13,529 Unicode characters (including frontmatter, whitespace, and newlines), a 34.9% reduction; now 170 lines. Image generation is unchanged at 7,709 entrypoint characters plus 47,060 characters of optional Markdown references. Character counts are not token counts. All eleven official skill validations, changed UI metadata checks, active Markdown links, and git diff --check passed again. Scenario checking remains static source review, not a model behavior benchmark.
