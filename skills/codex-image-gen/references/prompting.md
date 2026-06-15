# Prompting guide

How to turn a user request into a strong `--prompt`. Read this when the user's ask
is vague, when output quality matters, or when you need a recipe for a known asset
type. Applies to all auth modes (the prompt text is identical everywhere).

## Contents
- [Structure](#structure)
- [How much to augment](#how-much-to-augment)
- [Composition, text, references](#composition-text-references)
- [Editing](#editing)
- [Use-case taxonomy](#use-case-taxonomy)
- [Copy/paste recipes](#copypaste-recipes)

## Structure

Order the prompt: **scene/backdrop → subject → key details → constraints → intended
use**. Stating the intended use (ad, UI mock, infographic, hero) sets the polish
level. For complex requests, use short labeled lines instead of one long paragraph:

```
Use case: product-mockup
Asset type: landing-page hero
Subject: a matte black insulated water bottle
Scene: light gray seamless studio backdrop
Style: clean product photography, soft box lighting, subtle shadow
Composition: centered, wide framing with negative space on the right for copy
Constraints: no text, no watermark, no extra props
```

Always end with explicit negatives like `No text, no watermark.` — gpt-image-2
otherwise tends to sprinkle garbled text.

## How much to augment

Match augmentation to the prompt's specificity — don't bury the user's intent:

- **Already specific** → normalize into a clean spec, add nothing creative.
- **Generic** → add tasteful detail only where it materially helps.

Allowed: composition/framing cues, intended-use/polish hints, practical layout,
reasonable scene concreteness. **Not allowed:** extra characters/props, brand
palettes/slogans/story beats, or left/right placement the layout doesn't support.

For photorealism, say `photorealistic` and call for real-world texture (pores,
fabric wear, material grain, imperfect everyday detail) rather than glossy polish.

## Composition, text, references

- **Composition**: specify framing/viewpoint (close-up, wide, top-down) only when it
  helps. Call out negative space when the asset needs room for UI/copy. For people,
  describe body framing, scale, gaze, and interactions (`full body visible`,
  `hands gripping the handlebars`).
- **In-image text**: put literal text in quotes or ALL CAPS, specify typography
  (style, size, color, placement), require verbatim rendering with no extra
  characters. Spell uncommon words letter-by-letter. Dense text/diagrams come out
  better at higher `--quality` **in mode A** (mode B fixes quality, so don't rely on
  it there — keep the layout simple instead).
- **Reference images** (`--input-image`, repeatable): not every supplied image is an
  edit target. Label each by role in the prompt (`Image 1: edit target`,
  `Image 2: style reference`). Images given only for style/mood/composition → it's a
  generation-with-references, not an edit. For compositing, describe how they
  interact (`place the subject from Image 2 into Image 1`).

## Editing

Restate invariants every time and on every iteration to fight drift:
`change only X; keep Y unchanged`. Iterate with one small targeted change at a time
rather than rewriting the whole prompt. Edit-specific intents:

- **text-localization**: change only the text; preserve layout/typography/spacing.
- **identity-preserve**: lock face, body, pose, hair, expression; match lighting.
- **precise-object-edit**: name exactly what to remove/replace; keep surroundings.
- **lighting-weather**: change only light/shadow/atmosphere; keep geometry & subject.
- **style-transfer**: name what to preserve vs change; add `no extra elements`.
- **compositing**: reference inputs by index; match lighting, perspective, scale.
- **sketch-to-render**: preserve layout/proportions/perspective; add no new elements.

## Use-case taxonomy

Pick the closest bucket — it sets the language and polish level.

**Generate:**
- `photorealistic-natural` — candid/editorial scenes; photography language, real texture.
- `product-mockup` — product/packaging/catalog; clean silhouette, label clarity.
- `ui-mockup` — app/web mockups; state fidelity (shippable vs wireframe) first.
- `infographic-diagram` — structured layout + verbatim labels; define audience/flow.
- `logo-brand` — simple, scalable, strong silhouette, balanced negative space.
- `ads-marketing` — creative-brief style: positioning, audience, vibe, exact tagline.
- `productivity-visual` — slides/charts/workflows; real labels, readable typography.
- `scientific-educational` — labeled, accurate, scan-friendly whitespace.
- `illustration-story` — concrete scene beats or panels.
- `stylized-concept` — style/material/render cues without inventing story elements.
- `historical-scene` — period-accurate clothing, props, environment.

**Edit:** `text-localization`, `identity-preserve`, `precise-object-edit`,
`lighting-weather`, `background-extraction`, `style-transfer`, `compositing`,
`sketch-to-render` (see [Editing](#editing)).

## Copy/paste recipes

Templates, not the required amount of detail — trim to fit the request.

**Product hero (white/seamless):**
```
A clean studio product photo of <product>, centered on a light gray seamless backdrop,
soft box lighting, subtle contact shadow, high detail. Wide framing with negative space
for page copy. No text, no watermark.
```

**Photorealistic lifestyle:**
```
Photorealistic editorial photo of <subject> <doing X> in <real setting>, natural <time-of-day>
light, shot on a 35mm lens, shallow depth of field, real skin/fabric/material texture.
No text, no watermark.
```

**App/UI mockup (shippable fidelity):**
```
A shippable high-fidelity UI mockup of <screen>, clean modern design system, clear visual
hierarchy, realistic components (<nav, cards, buttons>), legible placeholder copy. Balanced
spacing. No lorem-ipsum gibberish, no watermark.
```

**Logo / mark:**
```
A simple, scalable logo mark for <brand>, <concept>, strong silhouette, balanced negative
space, flat vector-friendly shapes, solid background. No photographic detail, no watermark.
```

**Infographic / diagram (text-heavy → mode A + higher quality):**
```
A clean infographic explaining <topic> for <audience>, structured top-to-bottom flow,
labeled sections with verbatim text: "<label 1>", "<label 2>", readable sans-serif
typography, generous whitespace. No decorative clutter, no watermark.
```

**Background replacement (edit, with --input-image):**
```
Replace only the background of Image 1 with <new background>. Change only the background;
keep the subject, its edges, lighting, and shadows unchanged. No text, no watermark.
```

**Transparent-ready subject (chroma-key, see SKILL.md transparency section):**
```
<subject> centered on a perfectly flat solid #00ff00 chroma-key background for background
removal. One uniform color, no shadows, gradients, texture, reflections, floor plane, or
lighting variation. Crisp edges, generous padding. Do not use #00ff00 anywhere in the
subject. No cast/contact shadow, no reflection, no text, no watermark.
```
