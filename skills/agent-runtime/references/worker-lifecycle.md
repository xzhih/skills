# Worker Lifecycle

Use whenever a workflow dispatches, waits for, resumes, or closes workers,
lanes, subagents, external agents, or long-running sessions.

Agent work may take a long time. Do not prod, stop, close, cancel, restart, or
re-dispatch a worker only because it is slow or silent.

A short timeout, including a 10s polling window, or no new output means `still
running` or `unknown`, not failed. Do not turn polling timeouts into retry loops.

Before re-dispatching, check whether an existing worker or session is still
active and whether it can be read or resumed.

While workers run, the moderator should do non-overlapping work, prepare
integration/evidence checks, inspect safe shared context, or wait when the next
critical-path action truly needs the result.

Close or interrupt only for user cancellation, wrong-task execution, boundary or
safety risk, host/tool-reported failure, duplicate worker, completion cleanup,
or a result that is no longer needed.
