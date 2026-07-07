# Lane Packets

Use this format for both direct subagent dispatch and manual handoff prompts.

## Worker Packet

```text
You are working in {project}. You are not alone in the codebase: other lanes may be active, so do not revert unrelated changes and keep edits inside your owned scope.

Lane id:
Objective:
Repository path:
Lane workspace:
Branch:
Base branch:
Base commit:
Selected participant/model:

Before starting, read:
- ...

Owned scope:
- ...

Excluded scope:
- ...

Allowed files/surfaces:
- ...

Forbidden files/surfaces:
- ...

Implementation rules:
- ...

Derived quality gates:
- ...

Verification:
- ...

Stop and report blocked if:
- ...

Handoff must include:
- lane status: review | blocked
- lane workspace and branch
- participant/model actually used when known
- touched files
- implementation summary
- explicit non-covered scope
- verification commands and results
- documentation impact: none | proposed doc update | stale-doc ledger entry | assigned doc write
- browser/UI evidence status when relevant, including raw error if failed
- merge conflict notes
- package-manager/generated artifact scan result
- what you are not claiming
```

## Batch Selection Checklist

- Lanes have disjoint owned files, API contracts, component families, migrations, evidence packets, or docs.
- No lane depends on another lane in the same batch unless dependency is read-only and already merged.
- Each lane has a meaningful verification path.
- If no project lane mechanism is declared and editable isolation is useful, consider git worktrees before falling back to shared-checkout lanes.
- Shared coordination and handoff docs are moderator-owned by default. Workers may update them only when the lane explicitly owns a non-overlapping doc region.
- High-risk or unclear boundaries were discussed before dispatch.

## Handoff Prompt Fallback

When callable subagent tools are unavailable, or the user requests manual threads, output one fenced prompt per lane. Keep each prompt self-contained and copy-ready. Do not rely on the user to remember rules from another prompt.
