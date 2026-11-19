# Fix or diagnose

For a known local correction, locate its real entry, make the smallest correct edit that preserves other callers and check the observable result. The current agent can finish a typo or a small module fix directly.

For an unexplained fault, use the `$steady-coding` diagnosis checks when installed. Start with any existing trace or incident log. Capture another signal only if needed to distinguish causes. If two fixes based on the same premise fail the same check, test that premise directly. A diagnosis-only request ends with the supported cause or the next decisive check.

For an authorized repair with a cheap local test path, demonstrate the intended failure before editing. Change the cause and repeat the same check or original failing action. Check any other caller sharing the affected behavior. Add a test when requested, required by the project or needed for a specific uncovered regression. If the fix exposes a product decision or a shared migration, carry the established facts to the relevant part of the [delivery playbook](deliver.md).

For repeated incidents with one cause, use the installed `$steady-coding` recurrence guidance. When working from this playbook alone, try removing the invalid operation, expressing the constraint in a type, adding a lint or CI check, then a regression test. Keep the first proportionate safeguard that covers the callers. Replay a past failure and a valid case. Document a manual check when the decision requires human judgment.
