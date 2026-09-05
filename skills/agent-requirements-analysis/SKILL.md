---
name: agent-requirements-analysis
description: "Expand a user need into a reasoned requirement tree, prune alternatives, and produce a clear requirements document with Mermaid. Use for requirements discovery or refinement, independently or within a development workflow."
---

# Agent Requirements Analysis

Turn a short need into a bounded requirements document through tree-shaped exploration by the current model.

1. Establish the problem, users, outcome, success signal, and constraints; inspect relevant existing behavior.
2. Grow consequential branches across scenarios, actions, states, data, permissions, and failure/recovery paths. Avoid speculative feature expansion.
3. At meaningful forks, compare necessity, value, evidence, cost, and compatibility. Keep, modify, reject, or defer; record the reason. Resolve evidence-backed local choices yourself.
4. At each leaf, ask whether further growth changes behavior or an important decision. Stop when it is specific enough for Spec, belongs to implementation, is pruned, or can proceed under an explicit low-risk assumption.
5. Batch only consequential questions the user must decide. Keep affected branches provisional while exploring independent branches. Never silently prune a confirmed requirement.

Distinguish confirmed needs, working assumptions, and open decisions. Use [agent-grilling](../agent-grilling/SKILL.md) only for a consequential blind spot needing deeper investigation; routine questioning stays here.

Output the goal, retained behaviors, scope/non-goals, constraints, and unresolved choices. Include a readable Mermaid tree with provisional nodes and significant cuts marked, plus a compact table of material branch decisions and reasons. Keep the diagram and document consistent; split large views only for readability. Do not log every exploratory thought.

Technical detail belongs here only when feasibility, cost, or existing constraints affect requirements. Standalone invocation ends with the requirements; write a file only when requested or needed for recovery.
