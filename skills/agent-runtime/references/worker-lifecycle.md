# Worker Lifecycle

Use whenever a workflow dispatches, waits for, resumes, or closes workers,
lanes, subagents, external agents, or long-running sessions.

Agent work may take a long time. Do not prod, stop, close, cancel, restart, or
re-dispatch a worker only because it is slow or silent.

`Bounded` describes assignment scope, ownership, output, and stop criteria—not
wall-clock duration. A correct worker may need minutes, tens of minutes, hours,
or longer. Do not invent a default execution deadline.

A short timeout, including a 10s polling window, or no new output means `still
running` or `unknown`, not failed. Do not turn polling timeouts into retry loops.
Repeated short polls do not accumulate into a worker timeout, even when several
polls return no update. Poll again, do non-overlapping work, or wait longer while
leaving the worker intact.

A real wall-clock deadline exists only when the user, system, host/tool, external
service, or task contract explicitly supplies one. Record that deadline and its
consequence before dispatch; do not infer it later from silence.

Before re-dispatching, check whether an existing worker or session is still
active and whether it can be read or resumed.

While workers run, the moderator should do non-overlapping work, prepare
integration/evidence checks, inspect safe shared context, or wait when the next
critical-path action truly needs the result.

Close or interrupt only for user cancellation, wrong-task execution, boundary or
safety risk, host/tool-reported failure, duplicate worker, completion cleanup,
or a result that is no longer needed.

Before interrupting, name which condition above is evidenced. “Several polls
timed out,” “this is taking longer than expected,” and “I want to unblock the
parent” are not interruption conditions.
