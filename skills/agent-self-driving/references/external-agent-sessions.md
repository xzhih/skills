# External Agent Sessions

Use this reference when assigning external, shell, editor, or protocol agents across rounds, especially with `opencode run` for review, rebuttal, or recheck.

## Contents

- Core Rules
- Consent
- Session Ledger
- OpenCode Golden Path
- Multi-Round Loop
- Packet Minimum
- Failure Handling

## Core Rules

Choose the lightest session strategy:

```text
one-shot: single independent pass; do not reuse context
pinned session: same external agent continues rebuttal or recheck
fresh session: blind review, contaminated context, or changed role/model
```

For parallel or adversarial reviewers, use one stable `agent_id` and one explicit `session_id` per reused agent.

Never use shared "last session" semantics for multiple agents. In `opencode`, do not use `--continue` for parallel reviewers; use `--session "$SESSION_ID"`.

Long-running external agents are normal. Do not prod, interrupt, kill, close, or replace a running external session just because it has not returned quickly. Preserve active sessions when rebuttal, recheck, or reviewer continuity may matter.

Intervene only when the user cancels, the agent is clearly on the wrong task, the task crosses privacy/cost/account/safety authorization, the tool reports a real failure, or the session is complete and no longer needed.

## Consent

External-agent availability is not authorization. Confirm permission before sending prompts, files, repo context, diffs, screenshots, artifacts, account data, paid usage, or networked calls outside the local trust boundary.

When intensity routing shows external agents would materially improve confidence, ask before invoking them:

```text
Use external agents for this workflow?
Which external agent(s)?
Which model(s)?
Which phases are allowed?
Any privacy, cost, or context limits?
```

Use only the approved external agent(s), model(s), and phases. If the user
declines, continue with host-native subagents or main-agent review.

For review/rebuttal/recheck, tell the external agent not to edit files. For implementation, include write boundaries and delegate only when the main agent can inspect and verify the result.

## Session Ledger

For reused external agents, record the mapping in:

```text
docs/agent-self-driving/capabilities/external-agent-sessions.md
```

Minimum fields:

```text
agent_id | tool | model | role | session_id | purpose | round | policy | stale_when
```

Store raw or summarized round outputs only when needed for auditability, handoff, or later rebuttal. Promote only normalized findings, decisions, and evidence into blackboards, reviews, tasks, plans, or evidence files.

## OpenCode Golden Path

Safe local check:

```bash
command -v opencode
opencode run --help
opencode session list --format json -n 20
opencode models <provider>
```

Run provider model-listing only when the user selected that provider and asked
for a check. Do not use it to build an unsolicited environment-discovered
candidate set.

Command shape:

- `opencode run` takes the task packet as `message..` positionals.
- Put the message immediately after `run`, before `--file` attachments.
- For long packets, put the packet in `PROMPT` with a heredoc and pass `"$PROMPT"`.
- Prefer long `--file "$PATH"` flags for attachments. Do not place the prompt after `-f` or `--file`; it can be parsed as another file path.
- Create the output directory first, then redirect output only after all arguments.

Start a fresh session:

```bash
PROMPT=$(cat <<'EOF'
<round packet>
EOF
)
mkdir -p "$(dirname "$OUTPUT_JSONL")"
opencode run "$PROMPT" --dir "$PROJECT_DIR" --model "$MODEL" \
  --title "$AGENT_ID-$PHASE" --format json \
  --file "$SOURCE_1" --file "$SOURCE_2" \
  > "$OUTPUT_JSONL"
```

Capture `session_id` from JSON output or `opencode session list --format json`. If ambiguous, do not resume; start fresh or resolve ambiguity.

Continue the same external agent:

```bash
mkdir -p "$(dirname "$OUTPUT_JSONL")"
opencode run "$ROUND_PACKET" --dir "$PROJECT_DIR" --session "$SESSION_ID" \
  --model "$MODEL" --format json \
  --file "$BLACKBOARD" \
  > "$OUTPUT_JSONL"
```

Use `--continue` only when a single serial agent intentionally owns the latest session. Use `--fork` only for intentional branches, never for blind first-round review.

## Multi-Round Loop

```text
1. Round 1: blind source-first or artifact-focused review.
2. Moderator normalizes claims, evidence, findings, conflicts, questions, sign-offs.
3. Round 2+: send blackboard snapshot for targeted rebuttal, recheck, or sign-off.
4. Stop only when blocker/major findings are fixed, rejected with evidence,
   deferred as non-blocking, or escalated by a real pause condition.
```

The moderator owns shared state. External agents do not write shared blackboards by default.

## Packet Minimum

```text
You are <agent_id>. Role: <reviewer/rebutter/rechecker>.
Round: <N>. Do not modify files.
Sources: <files/artifacts/excerpts>.
Task: <specific review or rebuttal objective>.
Evidence standard: cite paths, lines, commands, or concrete artifact evidence.
Output: blocker/major/minor/question/note findings plus sign-off status.
Stop if: <privacy/cost/auth/scope/blocker condition>.
```

## Failure Handling

If resume fails:

```text
1. Check for --continue or guessed session IDs.
2. Re-run the local session check for the user-selected external agent.
3. Mark only resume runnability failed if fresh runs still work.
```

If `opencode run` treats the prompt as a file path, rebuild the command with the message immediately after `run` and attachments after it.

If output lacks evidence, normalize it as a claim, hypothesis, or gap. If a blind reviewer saw another reviewer's conclusions, start fresh for independence-sensitive review.
