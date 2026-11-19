# Diagnosis and implementation checks

## Distinguish the cause

Separate the symptom, trigger, mechanism and any underlying cause still unknown. Start with the supplied trace, profile or incident log and map the relevant signal to the actual caller and version. If the evidence leaves competing explanations, including the user's hypothesis, collect the smallest observation that distinguishes them.

When two attempted fixes rely on the same premise and fail the same check, state that premise and test a prediction that could disprove it before trying another fix. For example, two failed timeout increases warrant checking when the request reached the provider. For an authorized repair with a cheap local test path, run the smallest behavioral check before editing, confirm it fails for the reported reason, then fix the cause and rerun that same check. An existing reproduction at the affected entry can serve when a focused test is impractical.

A longer timeout, retry, suppressed error or weaker assertion may hide the symptom. Check what it would change before treating it as a repair. When evidence runs out, report what it establishes, what remains open and the next discriminating check. With a diagnosis-only request, leave the system as found. With an authorized fix, use the diagnosis to continue within scope.

## Complete the requested change

Inspect the controlling source, existing tests, current plan and workspace changes. Preserve unrelated edits. Follow the change to each required real consumer, including needed wiring, configuration, fixtures, exports and guidance made stale by the change. Add an abstraction or dependency only for a current need or a demonstrated simplification. Surface a conflict with an accepted requirement before changing that contract.

For a reference UI, trace the shipped view, parent containers, platform rules and assets. Preserve the requested interactions and approved deviations. Verify a concrete visual uncertainty in the rendered target. Use matched captures when the user asks for them or a specific comparison needs them.

Run the relevant entry and check the most plausible missed failure. Inspect the resulting diff for omissions and surplus changes, fix confirmed issues in scope and rerun affected checks. Report the version or artifact checked and what the evidence actually covers. A helper test, a rendered screen and a real integration each establish a different result.

## Prevent a recurring error

Use this for recurring bugs, repeated review corrections or a workflow step that keeps getting missed. Trace the incidents to the same cause. Find the shared place that could prevent the mistake and choose the first proportionate safeguard that covers the affected paths.

1. Give the operation one owner or change the interface so the mistake is impossible.
2. Express the constraint in a type so invalid values or calls are rejected.
3. Add a focused lint or CI check that flags the mistake and points to the fix.
4. Add a regression test that exposes the bad behavior at the affected entry.
5. If the decision requires human judgment, document the trigger, who checks it and what they must verify.

For an automated safeguard, replay a real past failure and a valid counterpart through the project's normal build or test path. Verify the old mistake fails for the intended reason and the valid case passes. For a regression test, run it against both the faulty and fixed behavior. Record the command and both outcomes. For a manual check, identify the decision that still relies on a person.

## Compare optimizations

Choose the target before editing, such as database reads per request, latency or a dependency to eliminate. Identify the outputs and failure behavior that callers rely on.

1. **A/B comparison.** Run the current implementation (A) and the candidate (B) through the same entry with the same representative inputs, environment and starting state. Record the target metric, completed work, errors and output correctness for each. Repeat noisy measurements to see the variation.
2. **Ablation.** Starting from B each time, remove or disable one proposed change, keep the rest fixed and rerun the same checks. When B contains a single change, A already provides its ablation.
3. **Decision.** Report the observed results for A, B and the ablations. Keep the simplest variant that preserves required behavior and delivers the measured benefit. If the difference falls within measurement noise, prefer the simpler correct variant. If a run is blocked, identify the missing measurement and leave the gain unconfirmed.

Before reporting speed, inspect where timing starts and stops. Count the units the caller needs delivered, including the last asynchronous write or acknowledgment when it defines completion. A run that skips work, drops output or fails early cannot support a speedup. Locate the bottleneck and measure the path the user waits for. A measurement of one stage supports a claim about that stage only.
