# Dev Flow Mode Gate

Use this gate before shaping Requirements, Spec, Eval, Plan, lane packets, or
handoff artifacts. Pick the lightest mode that keeps the next step safe.

## Modes

| Mode | Choose when | Required weight |
| --- | --- | --- |
| Lightweight | Small, low-risk, single-threaded | Chat trace; no files, full templates, or labels unless they help the next action. |
| Standard | Several behaviors, checks, or tasks | Only fields and compact labels that prevent execution or review ambiguity. |
| Durable | Long-running, high-risk, reusable, or thread-spanning | Persist under the declared owner; index it; keep stable trace. |
| Multi-agent / Lane | Parallel/disjoint workers, coordinated rounds, external/session agents, or durable coordination | Stable ownership, collisions, evidence, and handoff controls. One focused reviewer alone does not promote the lifecycle. |

## Scope Envelope

Set one envelope before expanding artifact detail:

```text
exact: requested result + delivery invariants
outcome: coherent current flow; infer visible, low-risk, reversible,
  project-native completeness
exploratory: broaden candidates, not commitment; promotion stays with the
  owning Requirements/Spec gate

material expansion: new actor | independent workflow | persisted contract |
  API/integration | permission model | material operating cost
complete = necessary + sufficient for the selected envelope
```

Treat material expansion as candidate scope unless the outcome requires it or
the project already establishes it. Discovery may diverge; committed work must
converge on the envelope. Future release, operations, hardening, and consumers
do not become current work merely because they are plausible.

## Review Weight

Mode controls review ceremony, not whether an owner-mandated gate exists:

```text
Lightweight: required review is inline; one fresh native-default reviewer by default
Standard: focused whole-artifact review; add reviewers only for evidence/risk
Durable: persist review/findings state when continuity or auditability needs it
Multi-agent / Lane: blind whole-artifact first round; normalize and converge
  when high-impact findings, disagreement, or repeated repair triggers it
```

Use a reviewer independent of drafting; independence does not require multiple
models. If unavailable, pause an owner-mandated gate unless the user grants an
artifact-scoped waiver. Close accepted blocker/major findings only by a fresh
recheck after repair or evidence-backed rejection. A real decision/dependency
blocker pauses the gate; deferral closes nothing. Move work out of scope only
through its owning requirement/Spec/Eval/Plan, then record owner and risk.

## Trace And Output Weight

Use [coverage-trace.md](coverage-trace.md). Trace prevents loss; it does not
trigger ceremony.

- Lightweight: concrete artifact in chat; inline trace is enough.
- Standard: include only relevant sections and disambiguating labels.
- Durable: persist enough stable trace for another thread to restore state.
- Multi-agent / Lane: packetize exact ownership, exclusions, evidence, blockers,
  and stable trace.

Do not promote untraced work across lifecycle gates. Do not make a low-risk
single-threaded task heavy to fill a schema. Treat output shapes as completeness
checks, not templates: include a field only when it changes a decision, action,
handoff, verification, or understanding.

## Substance Gate

Target `compact completeness`: mode scales ceremony, not required decisions.
Length follows the number of behaviors, checks, and surfaces.

Reject or expand before the next gate when an artifact is mostly:

```text
vague goal | wish without observable behavior | hollow check
missing relevant edge/error/empty behavior | placeholder/TBD
task without owned surface, verify path, or stop condition
missing boundary where scope could expand
long prose without accept/reject or verify/stop criteria
```

Minimum bar: every important behavior has observable acceptance/evidence; every
task is executable by a fresh worker without inventing decisions. For Standard
and above, two implementers should build the same behavior and two reviewers
should reach the same acceptance result from the artifact. When in doubt:
`ceremony down; concrete detail up`.
