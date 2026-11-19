# Optimize code

Name the required behavior, the target metric and a representative workload. Use the installed `$steady-coding` optimization guidance when available. Compare the original (A) and candidate (B) at the same entry with matched inputs, environment and starting state. Check correctness as well as the metric, repeating noisy measurements to see their variation.

For a performance claim, check what the timer includes, how much work completed and how many operations failed on each run. Follow asynchronous work through the final write or other completion signal the caller relies on. Locate the limiting stage and time the user-facing path before reporting an end-to-end gain. Different outputs, missing work or unexpected errors invalidate that comparison.

Starting from B each time, remove one change and repeat the same checks. For a single change A already supplies its ablation. Keep the simplest correct variant that delivers the demonstrated benefit. For an optimization review, assess the measurements and end at the report.

Report the observed baseline, candidate and ablations, what they support and any missing measurement. When independent prototypes are requested or needed, give the installed `$team-orchestration` the same workload, correctness checks and target metric for each.

## Sustained optimization

When the user requests continued tuning toward a target, fix the representative workload, metric, correctness checks and stopping condition before the first attempt. Measure the starting baseline. Test one hypothesis per round against the best verified version using the same workload. Keep a change only when the required behavior holds and the gain exceeds measurement noise. Otherwise discard that experiment's change and retain the evidence for the next round.

Stop when the target is met, the agreed limit is reached, or no remaining hypothesis justifies another run. Report the best verified result and any gap to the target. On a requested pause or handoff, use the [existing handoff](../SKILL.md#handoff-and-resume).
