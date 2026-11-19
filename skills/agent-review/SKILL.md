---
name: agent-review
description: "Review a specified plan, spec, diff, implementation, or result for defects and omissions. Also use when asked to audit a repository or branch and rank worthwhile improvements. Both requests end with findings."
---

# Agent Review

Use the requested object and question to choose the scope. Lead with the finding or decision the recipient needs first. Give enough context to understand it without this chat.

For code in either scope, reason from first principles about what callers need and which constraints must hold. Apply Occam's razor by asking what would break if a branch, abstraction or dependency were removed. Recommend the simplest readable design that preserves the required behavior.

For an optimization claim, compare output correctness, units of work completed, errors and the target metric under matched conditions. For a speedup, inspect the timing boundary, including asynchronous completion. Missing work invalidates the comparison. A stage measurement supports a claim about that stage. An end-to-end gain needs evidence from the path the user waits for and its limiting stage. Check ablations that remove one change from the candidate (B) at a time. For a single change, the baseline (A) already serves as its ablation. If measurements are missing or within run-to-run noise, report the gap and the smallest check that would settle it.

For a recurring mistake, trace the incidents to their common cause and inspect the safeguard where the affected paths meet. To credit an automated safeguard, check that the normal build or test rejects a known past mistake for the intended reason and accepts a valid counterpart. If the fix relies on a reminder, identify any simple enforceable check or the decision that requires human judgment.

## Review a specified artifact

Identify the base and candidate or the document revision. Check it against the original request, accepted outcomes and relevant reference, including requirements that disappeared from an intermediate plan. For a spec, inspect observable behavior and boundaries. For a plan, check grounded dependencies, real consumers, integration ownership and whether acceptance would catch a wrong result. For a code change, trace the full relevant diff through the production entry and existing callers.

One reviewer handles an ordinary review. For an authorized multi-reviewer pass, frame distinct questions about the same candidate and intent, such as whether old data still loads or a canceled request can still write. Give those questions and the expected behavior to the coordinator using the installed `$team-orchestration` when available. Reviewers return evidence for their findings and identify any scope they could not check. The review ends with one report.

When shared fields, protocols, defaults or cleanup behavior change, state the assumption that keeps existing consumers safe. Trace it beyond symbol references into the relevant stored data, configuration, background job or external reader. Run the cheapest check that could disprove it through the real consumer, such as importing a file produced by the previous release. Report the observed result against the expected behavior. Keep an unexercised consumer identified as a coverage gap when its compatibility remains open.

For each material finding, give its location and evidence, trigger, user impact, severity and a focused correction or next check. Separate confirmed defects, conditional risks, coverage gaps and optional improvements. A review can finish with no findings.

State which outcomes the inspected evidence covers. A helper test covers that helper. Real integration needs evidence from its consumer. For UI fidelity, check the production view and its parents, assets and platform rules, and report which rendering was actually observed. A missing artifact leaves its dependent judgment open. Continue the parts that can be reviewed.

## Rank improvements

Use this scope when asked what to improve in a repository, branch or area. Inspect source, consumers and tests. For a branch, identify its base and distinguish new issues from existing ones. Combine findings with a shared cause and account for intentional tradeoffs.

Rank opportunities by impact, effort, uncertainty and change risk. Give each a location, evidence and concrete benefit. Identify any verification gap that could change the ranking.

Both scopes stop at the report. Label self-review when applicable. For a repaired candidate, recheck the finding and affected outcomes. Close it with verification on that candidate or evidence showing why the finding does not apply. Record the precise outstanding check otherwise. Keep secret values out of the report.
