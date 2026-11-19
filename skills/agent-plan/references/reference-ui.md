# Matching a reference UI

Use this guide when a requested outcome depends on matching an existing interface. Record the visual decisions once so the implementer and reviewer work from the same reference.

## Establish what must match

Identify the reference version, screen, platform and state. When source is available, trace the production entry through its parent containers, platform branches, inherited styles and assets. Check whether an isolated preview uses the same composition before treating a difference as a product defect.

Record the layout, interactions and states that matter on that screen. When the brief specifies a typeface or image, name the font and asset so the implementer can find them and the reviewer can check the rendered result. Preserve required copy. Add text where it helps the user navigate, act or understand a state. Cite the source, asset or observed view for each decision. Keep logical units distinct from image pixels and record agreed platform deviations.

## Choose the evidence

Use production source to check source-defined layout and asset choices. Inspect the target rendering for an unresolved question such as clipping, contrast or inherited appearance. Report which rules the source establishes and which rendered results were actually inspected.

Compare paired screenshots when the user requests them or a specific visual question needs them. Reuse faithful existing images where possible and match the relevant viewport, theme, data and state. Source-established corrections can proceed while a particular rendering check is unavailable.

## Worked example

In this example, `reference-A` shows a Resource Library with Local and WebDAV cards. Its production `StorageRowButtonView` has a 36 × 36 type icon, height 160, corner radius 16 and a separate lower panel with outer spacing 4 and inner spacing 12. Its `StorageFormPage` groups source types with 30 × 30 icons and spacing 16. All measurements come from source in logical units. In `desktop-B`, `library_view.go::storageCard` has a generic 32 × 32 drive icon and a single panel. `storage_form_view.go::typesView` shows full-width text buttons.

The requested change restores both layouts using the existing `sourceTypeIcon(type)` resolver. Preserve source identity, card navigation, the separate menu action, and the existing create and cancel behavior in Add Source. Establish the shared icon and grouping rules before dependent views adopt them.

Plan the checks alongside the changes. Trace the resolver and lower panel in the production card and the groups in the form. A clickable card with the generic icon fails the visual requirement. With Local and WebDAV entries, cancel Add Source and reopen it to check for a stale draft. Complete the existing Local creation flow with a disposable directory and check that the source appears. When the work is delegated, identify who owns the integration with the creation callback and directory picker.
