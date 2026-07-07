# OpenCode Runtime

Use this reference before declaring a user-approved OpenCode participant
unavailable, checking an approved OpenCode provider/model, running `opencode`,
or resuming an OpenCode session.

## Safe Local Checks

These checks are allowed only for a user-selected OpenCode participant/provider.
They prove presence or local runnability surfaces; they do not authorize sending
task content.

```bash
command -v opencode
opencode run --help
opencode session list --format json -n 20
opencode models <provider>
```

Run provider model-listing only when the user selected that provider and asked
for a check. Do not use it to build an unsolicited environment-discovered
candidate set.

Do not mark a user-approved OpenCode `shell_agent` unavailable merely because it
is not a host-visible subagent tool. First run the safe local checks above for
presence, command shape, and selected provider/model availability.

## Command Shape

- `opencode run` takes the task packet as `message..` positionals.
- Put the message immediately after `run`, before `--file` attachments.
- For long packets, put the packet in `PROMPT` with a heredoc and pass `"$PROMPT"`.
- Prefer long `--file "$PATH"` flags for attachments.
- Do not place the prompt after `-f` or `--file`; it can be parsed as another
  file path.
- Create the output directory first, then redirect output only after all
  arguments.

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

Capture `session_id` from JSON output or `opencode session list --format json`.
If ambiguous, do not resume; start fresh or resolve ambiguity.

Continue the same external agent:

```bash
mkdir -p "$(dirname "$OUTPUT_JSONL")"
opencode run "$ROUND_PACKET" --dir "$PROJECT_DIR" --session "$SESSION_ID" \
  --model "$MODEL" --format json \
  --file "$BLACKBOARD" \
  > "$OUTPUT_JSONL"
```

Use `--continue` only when a single serial agent intentionally owns the latest
session. Use `--fork` only for intentional branches, never for blind first-round
review.

## Failure Handling

If `opencode run` treats the prompt as a file path, rebuild the command with the
message immediately after `run` and attachments after it.

When a resume command fails, mark only resume runnability failed if a fresh
OpenCode run still works. Do not downgrade the whole participant without a fresh
run check.
