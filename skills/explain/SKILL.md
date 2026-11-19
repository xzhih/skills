---
name: explain
description: "Explain an existing feature, change, design decision or UI from source and history. Use for $explain or when a workflow requests a walkthrough or teaching."
---

# Explain

Start with the question the reader wants answered. Give the smallest complete explanation first, in their language. Choose how, why or both. Use teaching to connect the evidence to something the reader can see or do.

**How it works.** Trace one real action from entry through state or data changes to the result. Point to the few files or symbols that let the reader follow it. For a complex UI, introduce the view containing the control and the owner of its state. Follow the same interaction through the event handler to the visible update, including who accepts or discards a late response when relevant. If structure and timing are hard to read together, show a small component tree and then an event diagram using the same names. Reuse a state diagram when it matches the implementation. Ground claims about appearance in the observed rendering or the specific rules the source establishes.

**Why it works that way.** A causal question about current behavior needs source, a trace or a reproduction. A question about why a design was chosen needs the introducing commit, PR, decision record or later revision. Cite the reason the author recorded. If that record is missing, explain the present tradeoff as an inference and identify the historical question still open.

**Teach it.** Walk through a concrete example at the reader's level. Start with the visible behavior and add implementation detail where it answers their question. Offer the relevant evidence without turning the lesson into a file inventory.

Deliver the explanation in chat. When the user requests a saved lesson, write for someone outside the conversation, use the project's existing page when available, preserve accurate text and check the links. Updating an operational procedure is a documentation task that `$dev-flow` can handle directly.
