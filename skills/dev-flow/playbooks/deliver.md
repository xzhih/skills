# Deliver a change

Start with the requested outcome, existing decisions and current source. Use the steps that still have work to do. A stage-only request ends at the requested artifact.

1. **Requirements and behavior.** Identify the real entry, user, success signal and constraints. Settle consequential choices about observable behavior, data ownership and recovery. Use the relevant part of the installed `$agent-plan` for requirements or a specification. When retries, cancellations or restarts can interleave, give the invariant and an event order that could break it. Identify decisions that belong to the user and continue the independent work.
2. **Plan and acceptance.** [Settle an open design choice](#settle-a-design-choice) before work that depends on it. Trace each required outcome to its real consumers, dependencies and an owner. Reuse verified artifacts for outcomes they cover, including as references for another consumer. Give a reachable input, action, expected result and evidence for each outstanding check. Keep accepted checks blocked by missing inputs marked as required and pending. A request for acceptance design ends before running the checks.
3. **Implementation.** Use `$steady-coding` when installed. Reuse existing logic and verify the simplest correct change at its real entry. Where independent outcomes justify a team, pass the agreed outcomes to the installed `$team-orchestration` and give one person responsibility for integration. [Hand off the check](#hand-off-a-repeatable-check) when another owner will need it. Update guidance made stale by the change.
4. **Review and delivery.** Use the installed `$agent-review` when relevant. Inspect the original goal, affected callers, candidate and verification. Return in-scope defects for repair and recheck the affected outcomes on that version. Close a finding with verification or evidence showing why it does not apply. For review alone, report findings, severity, impact and evidence gaps, then stop. For an improvement audit, rank supported opportunities in the requested scope by impact, effort and risk.

For a standalone compatibility review, exercise the shared contract through an indirect consumer, such as an older file read by the current importer. For a speedup claim, use the [optimization checks](optimize.md).

## Settle a design choice

For an open choice about a shared interface, state ownership or a costly module boundary, use the installed `$agent-plan`. Compare two feasible structures through the same caller and failure case and favor the simplest that meets the constraints. If the choice depends on an observable fact, name the result that would favor each option. A planning-only request ends with the recommendation or the proposed experiment and decision rule.

When execution is authorized, run the smallest disposable prototype that exercises the disputed behavior under representative conditions. In a large migration, probe the assumption that could invalidate the most downstream work first. Compare the actual observation with the decision rule. Report the evidence and choice, or what remains unresolved, and keep the prototype separate from production code. A prototype-only request ends with the decision and evidence.

## Refactor with the same behavior

Start here for a structure-only change. Before editing, run the affected public entry or its existing contract tests on representative inputs. Capture what callers observe, including relevant errors and side effects. Reuse a fixture or snapshot when it covers the contract. Replay the same cases from equivalent starting state after the edit and compare the results. Resolve differences against the agreed behavior. Add [A/B measurements and ablations](optimize.md) when the request also names a measurable improvement.

## Hand off a repeatable check

For a check that several Workers or later tasks will repeat, reuse the project's existing command, test harness or operating guide. Start from a clean checkout or isolated state. Give commands relative to the reader's project root and let each run create its own scratch state. Include the setup and seed data, readiness signal, real action, expected output and any relevant side effect such as a written file or queued job.

Run the procedure as written. Link the verified steps where they already live, or record them once in the existing guide or handoff. Keep the previous run's evidence and version separate from the inputs the next Worker needs. If a prerequisite is missing, identify it and leave that part pending. A one-off check can stay in the task result.

## Maintain a document

For a documentation-only request, start here and finish with the requested page. Find its reader, the action or decision they need, and the existing authoritative page. Check material claims against current code, configuration, tests or observed behavior. Identify design intent, inference and open questions where they affect the reader.

For an operating procedure, verify how to obtain the input, the actual command or interaction, and the success or failure the operator can observe. For a shared acceptance procedure, follow [Hand off a repeatable check](#hand-off-a-repeatable-check). Exercise feasible steps in an appropriate environment. If an operational run is unavailable or outside scope, identify precisely what was checked and what remains to verify.

Edit the affected passages in place, preserve accurate surrounding text, keep each fact in one maintained location and check changed links. Hand over the page, the basis for corrections and material evidence gaps. A request for a saved plan or explanation retains its original scope.
