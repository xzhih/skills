# Prompting best practices

These prompting principles apply to `codex-image-gen` across both API shapes:
`--api images` and `--api responses`, and across all auth modes. This file is about
prompt structure, specificity, references, text, edits, and iteration. Execution
controls such as size, quality, masks, output format, output paths, auth mode, and
batch behavior live in `references/cli.md` and `references/image-api.md`.

## Contents

- [Structure](#structure)
- [Specificity policy](#specificity-policy)
- [Allowed and disallowed augmentation](#allowed-and-disallowed-augmentation)
- [Composition and layout](#composition-and-layout)
- [Constraints and invariants](#constraints-and-invariants)
- [Text in images](#text-in-images)
- [Input images and references](#input-images-and-references)
- [Iterate deliberately](#iterate-deliberately)
- [Transparent images](#transparent-images)
- [Execution controls](#execution-controls)
- [Use-case tips](#use-case-tips)
- [Where to find copy/paste recipes](#where-to-find-copypaste-recipes)

## Structure

- Use a consistent order when helpful: scene/backdrop -> subject -> key details -> constraints -> output intent.
- Include intended use such as ad, UI mockup, infographic, icon, deck slide, or product render when it sets polish level.
- For complex requests, use short labeled lines instead of one long paragraph.
- Do not force every prompt into a schema. If the user already gave a detailed, well-structured prompt, preserve the wording and sequence unless a small normalization clearly reduces ambiguity.

Example structure:

```text
Use case: product-mockup
Asset type: landing-page hero
Primary request: a matte black insulated water bottle
Scene/backdrop: light gray seamless studio backdrop
Style/medium: clean product photography
Composition/framing: centered, wide framing with negative space for copy
Lighting/mood: soft box lighting, subtle contact shadow
Constraints: no text, no watermark, no extra props
```

End with explicit negatives only when they match the request. Use `No text, no watermark.` for assets that should contain no text. If the user requires visible text, use `No extra text, no watermark.` instead and quote the required text verbatim.

## Specificity policy

- If the user prompt is already specific and detailed, normalize it into a clean spec without adding creative requirements.
- If the prompt is generic, you may add tasteful detail when it materially improves the output.
- Treat examples in `sample-prompts.md` as fully-authored recipes, not as the default amount of augmentation to add to every request.
- One-off project prompts and user-specific temporary briefs do not belong in the skill.
- For photorealism, include `photorealistic` directly when that is the goal, plus concrete real-world texture such as pores, wrinkles, fabric wear, material grain, or imperfect everyday detail.

## Allowed and disallowed augmentation

Allowed augmentation for generic prompts:

- composition and framing cues
- intended-use or polish-level hints
- practical layout guidance
- reasonable scene concreteness that supports the request
- narrow constraints that protect requested text, layout, or subject fidelity

Do not add:

- extra characters, props, objects, or story beats that are not implied
- brand palettes, slogans, labels, or claims that are not implied
- arbitrary side-specific placement unless the surrounding layout supports it
- a new metaphor, visual genre, hierarchy, information density, or color boundary
- a different avoidance list from the user's own avoid list
- `No text` when the user asked for exact visible text

If a requested detail seems risky for the model, keep it and add a narrow constraint. Do not replace it with a safer-looking generic idea.

## Composition and layout

- Specify framing and viewpoint such as close-up, wide, top-down, eye-level, or three-quarter angle only when it materially helps.
- Call out negative space if the asset clearly needs room for UI or copy.
- Avoid making left/right layout decisions unless the user or surrounding layout supports them.
- For people, describe body framing, scale, gaze, and object interactions when they matter: `full body visible`, `looking down at the book`, `hands naturally gripping the handlebars`.
- For deck slides, diagrams, and UI mockups, prioritize readable hierarchy, scan-friendly spacing, and realistic component structure over decorative detail.

## Constraints and invariants

- State what must not change.
- For edits, say `change only X; keep Y unchanged`.
- Repeat invariants on every edit iteration to reduce drift.
- For exact text, quote it every time.
- For existing text in an edit target, say whether to preserve it, replace it, or remove it.

## Text in images

- Put literal text in quotes or ALL CAPS and specify typography, size, color, and placement when accuracy matters.
- Spell uncommon words letter-by-letter if accuracy matters.
- Require verbatim rendering and no extra characters for in-image copy.
- Keep text-heavy layouts simple. Dense text, tables, legends, axes, and footnotes are fragile.
- Use `No extra text, no watermark.` when the image must contain specific text.
- Use `No text, no watermark.` only when the image should contain no visible text at all.
- In API-key mode, use higher quality for small text, dense infographics, data-heavy slides, multi-font layouts, legends, axes, and footnotes. ChatGPT/Codex private routes may ignore quality tiers, so keep text layouts simpler there.

## Input images and references

- Do not assume every provided image is an edit target.
- Label each image by index and role: `Image 1: edit target`, `Image 2: style reference`, `Image 3: object to insert`.
- If the user provides images for style, composition, mood, or subject guidance and does not ask to modify them, treat the request as generation with references.
- If the user asks to preserve an existing image while changing specific parts, treat the request as an edit.
- For compositing, describe how the images interact: `place the subject from Image 2 into Image 1`.
- For identity-sensitive edits, lock face, body, pose, hair, expression, proportions, lighting, and background unless the user says otherwise.

## Iterate deliberately

- Start with a clean base prompt, then make small single-change edits.
- Re-specify critical constraints when iterating.
- Prefer one targeted follow-up at a time over rewriting the whole prompt.
- If an output drifts, tighten invariants rather than broadening the whole prompt.
- If the user asks for a style change after a good composition, keep the previous composition as an invariant.

## Transparent images

- For simple opaque subjects, prompt for a perfectly flat solid chroma-key background, usually `#00ff00`; use `#ff00ff` when the subject is green, and avoid key colors that appear in the subject.
- Explicitly prohibit shadows, gradients, floor planes, reflections, texture, and lighting variation in the background.
- Ask for crisp edges, generous padding, and no use of the key color inside the subject.
- After generation, remove the background locally with:

```bash
python3 scripts/remove_chroma_key.py \
  --input <source> \
  --out <final.png> \
  --auto-key border \
  --soft-matte \
  --transparent-threshold 12 \
  --opaque-threshold 220 \
  --spill-cleanup \
  --force
```

- Validate the alpha result before shipping it.
- Use soft matte and spill cleanup for antialiased edges; hard tolerance-only removal is mainly for flat pixel-art or exact-color fixtures.
- Do not promise true model-native alpha through ChatGPT/Codex private routes. True alpha should be promised only when an API-key provider and selected model explicitly support it, and after the saved file is verified to contain alpha.
- Ask before attempting true native transparency for complex subjects such as hair, fur, feathers, smoke, glass, liquids, translucent materials, reflective objects, or soft shadows.

## Execution controls

- `--size`, `--quality`, `--format`, `--background`, `--input-fidelity`, `--mask`, `--out`, `--out-dir`, `--force`, `--mode`, and `--api` are CLI controls, not prompt text.
- Use `--dry-run` for expensive, long, text-heavy, or ambiguous jobs.
- Use `--api images` by default. Use `--api responses` only when compatibility with Responses `image_generation` is needed.
- Use `--mode apikey` when exact provider behavior, mask support, or quality tiers matter and credentials are available.
- Use `--mode chatgpt` only with the known limitation that custom sizes and quality tiers may not be honored.
- For 4K-style output, request `3840x2160` for landscape or `2160x3840` for portrait, then report the actual saved dimensions from the CLI summary.

## Use-case tips

Generate:

- `photorealistic-natural`: Prompt as if a real photo is captured in the moment; use photography language such as lens, lighting, and framing; call for real texture; avoid over-stylized polish unless requested.
- `product-mockup`: Describe product, packaging, materials, silhouette, label clarity, studio setup, reflection/shadow, and crop.
- `ui-mockup`: Describe target fidelity first: shippable mockup or low-fi wireframe. Focus on layout, hierarchy, states, and practical UI elements; avoid concept-art language.
- `infographic-diagram`: Define audience and layout flow. Label parts explicitly and require verbatim text. Keep labels readable.
- `scientific-educational`: Define audience, lesson objective, required labels, scientific constraints, arrows, and scan-friendly whitespace.
- `ads-marketing`: Write like a creative brief. Include positioning, audience, desired vibe, scene, and exact tagline if text must appear.
- `productivity-visual`: Name the artifact such as slide, chart, workflow, or report cover. Define canvas and hierarchy. Provide real labels/data where needed.
- `logo-brand`: Keep it simple and scalable; ask for strong silhouette, balanced negative space, flat vector-friendly shapes, and no decorative mockup context unless requested.
- `illustration-story`: Define panels or scene beats; keep each action concrete.
- `stylized-concept`: Specify style cues, material finish, and rendering approach such as 3D, painterly, clay, or cinematic concept art without inventing new story elements.
- `historical-scene`: State location/date and required period accuracy. Constrain clothing, props, vehicles, signage, and environment to match the era.

Edit:

- `text-localization`: Change only the text; preserve layout, typography, spacing, hierarchy, and image content.
- `identity-preserve`: Lock identity: face, body, pose, hair, expression, proportions. Change only specified elements and match lighting/shadows.
- `precise-object-edit`: Specify exactly what to remove or replace; preserve surrounding texture and lighting.
- `lighting-weather`: Change only environmental conditions such as light, shadows, atmosphere, precipitation, or season. Keep geometry, framing, and subject identity.
- `background-extraction`: For simple opaque subjects, request a clean cutout on a perfectly flat chroma-key background; crisp silhouette; generous padding; no shadows; no halos; preserve label text exactly; no restyling.
- `style-transfer`: Specify style cues to preserve such as palette, texture, and brushwork, and what must change. Add `no extra elements` to prevent drift.
- `compositing`: Reference inputs by index; specify what moves where; match lighting, perspective, and scale; keep the base framing unchanged.
- `sketch-to-render`: Preserve layout, proportions, and perspective; choose materials and lighting that support the supplied sketch without adding new elements.

## Where to find copy/paste recipes

For copy/paste prompt specs, see `references/sample-prompts.md`. Those examples are complete recipes for vague asks or prompt-help tasks. They are not automatic templates and should not be merged into a detailed user prompt unless the user asks for that kind of rewrite.
