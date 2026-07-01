# Sample prompts

These are reusable prompt recipes for vague asks, prompt-help tasks, or cases where
an agent needs a solid starting structure. Do not automatically inject them into
user requests. Do not merge them into a detailed user prompt unless the user asks
for that kind of rewrite.

Rules for adapting:

- Keep user-provided requirements.
- Preserve exact text, palette boundaries, metaphors, layout hierarchy, and avoid lists.
- Add only details that materially help the requested output.
- Treat labeled lines as prompt scaffolding, not a required schema.
- Keep CLI controls such as `--size`, `--quality`, `--format`, `--mask`, `--out`,
  and `--mode` outside the prompt.
- Do not store one-off project prompts or user-specific temporary briefs in this file.

For prompting principles, specificity policy, invariants, and iteration guidance,
see `prompting.md`.

## Generate

### photorealistic-natural

```text
Use case: photorealistic-natural
Primary request: candid photo of an elderly sailor on a small fishing boat adjusting a net
Scene/backdrop: coastal water with soft haze
Subject: weathered skin with wrinkles and sun texture
Style/medium: photorealistic candid photo
Composition/framing: medium close-up, eye-level
Lighting/mood: soft coastal daylight, shallow depth of field, subtle film grain
Materials/textures: real skin texture, worn fabric, salt-worn wood
Constraints: natural color balance; no heavy retouching; no glamorization; no watermark
Avoid: studio polish; staged look
```

### product-mockup

```text
Use case: product-mockup
Primary request: premium product photo of a matte black shampoo bottle with a minimal label
Scene/backdrop: clean studio gradient from light gray to white
Subject: single bottle centered with subtle reflection
Style/medium: premium product photography
Composition/framing: centered, slight three-quarter angle, generous padding
Lighting/mood: softbox lighting, clean highlights, controlled shadows
Materials/textures: matte plastic, crisp label printing
Constraints: no logos or trademarks; no watermark
```

### ui-mockup

```text
Use case: ui-mockup
Primary request: mobile app home screen for a local farmers market with vendors and daily specials
Asset type: mobile app screen
Style/medium: realistic product UI, not concept art
Composition/framing: clean vertical mobile layout with clear hierarchy
Subject: top search, vendor cards, daily specials strip, bottom navigation
Constraints: practical layout, clear typography, no logos or trademarks, no watermark
```

### infographic-diagram

```text
Use case: infographic-diagram
Primary request: detailed infographic of an automatic coffee machine flow
Scene/backdrop: clean, light neutral background
Subject: bean hopper -> grinder -> brew group -> boiler -> water tank -> drip tray
Style/medium: clean vector-like infographic with clear callouts and arrows
Composition/framing: vertical poster layout, top-to-bottom flow
Text (verbatim): "Bean Hopper", "Grinder", "Brew Group", "Boiler", "Water Tank", "Drip Tray"
Constraints: clear labels, strong contrast, readable sans-serif typography, no logos or trademarks, no watermark
```

### scientific-educational

```text
Use case: scientific-educational
Primary request: biology diagram titled "Cellular Respiration at a Glance" for high school students
Scene/backdrop: clean white classroom handout background
Subject: glucose turns into energy inside a cell; include glycolysis, Krebs cycle, and electron transport chain
Style/medium: flat scientific diagram with consistent icons, arrows, and readable labels
Composition/framing: landscape slide-style layout with clear hierarchy and generous whitespace
Text (verbatim): "Cellular Respiration at a Glance", "Glucose", "Pyruvate", "ATP", "NADH", "FADH2", "CO2", "O2", "H2O"
Constraints: scientifically plausible; avoid tiny text; no extra decoration; no watermark
```

### ads-marketing

```text
Use case: ads-marketing
Primary request: campaign image for a streetwear brand called Thread
Subject: group of friends hanging out together in a stylish urban setting
Style/medium: polished youth streetwear campaign photography
Composition/framing: vertical ad layout with natural poses and integrated headline space
Lighting/mood: contemporary, energetic, tasteful
Text (verbatim): "Yours to Create."
Constraints: render the tagline exactly once; clean legible typography; no extra text; no watermarks; no unrelated logos
```

### productivity-visual

```text
Use case: productivity-visual
Primary request: one pitch-deck slide titled "Market Opportunity"
Asset type: fundraising slide image
Style/medium: clean modern deck slide, white background, crisp sans-serif typography
Subject: TAM/SAM/SOM concentric-circle diagram plus a small growth bar chart from 2021 to 2026
Composition/framing: 16:9 landscape slide, clear data hierarchy, polished spacing
Text (verbatim): "Market Opportunity", "TAM: $42B", "SAM: $8.7B", "SOM: $340M", "AGI Research, 2024", "Internal analysis"
Constraints: readable labels, no clip art, no stock photography, no decorative clutter, no watermark
```

### logo-brand

```text
Use case: logo-brand
Primary request: original logo for "Field & Flour", a local bakery
Style/medium: vector logo mark; flat colors; minimal
Composition/framing: single centered logo on a plain background with generous padding
Color palette: warm black and soft cream
Text (verbatim): "Field & Flour"
Constraints: strong silhouette, balanced negative space; original design only; no gradients unless essential; no mockups; no watermark
```

### illustration-story

```text
Use case: illustration-story
Primary request: 4-panel comic about a pet left alone at home
Scene/backdrop: cozy living room across panels
Subject: pet reacting to the owner leaving, then relaxing, then returning to a composed pose
Style/medium: comic illustration with clear panels
Composition/framing: 4 equal-sized vertical panels, readable actions per panel
Constraints: no text; no logos or trademarks; no watermark
```

### stylized-concept

```text
Use case: stylized-concept
Primary request: cavernous hangar interior with tall support beams and drifting fog
Scene/backdrop: industrial hangar interior, deep scale, light haze
Subject: compact shuttle parked near the center
Style/medium: cinematic concept art, industrial realism
Composition/framing: wide-angle, low-angle
Lighting/mood: volumetric light rays cutting through fog
Constraints: no logos or trademarks; no watermark
```

### historical-scene

```text
Use case: historical-scene
Primary request: outdoor crowd scene in Bethel, New York on August 16, 1969
Scene/backdrop: open field with period-appropriate staging
Subject: crowd in period-accurate clothing, authentic environment
Style/medium: photorealistic photo
Composition/framing: wide shot, eye-level
Constraints: period-accurate details; no modern objects; no logos or trademarks; no watermark
```

## Asset type templates

### website-hero

```text
Use case: <photorealistic-natural|stylized-concept|product-mockup|infographic-diagram|ui-mockup>
Asset type: landing page hero image
Primary request: <short description>
Scene/backdrop: <environment or abstract backdrop>
Subject: <main subject>
Style/medium: <photo/illustration/3D/rendered UI>
Composition/framing: wide composition; note usable negative space only if needed
Lighting/mood: <soft/bright/neutral/dramatic>
Color palette: <brand colors or neutral palette>
Constraints: no text unless requested; no logos; no watermark
```

### website-section-illustration

```text
Use case: stylized-concept
Asset type: feature section illustration
Primary request: simple abstract shapes suggesting connection and flow
Scene/backdrop: subtle light-gray backdrop with faint texture
Style/medium: flat illustration with soft shadows and restrained contrast
Composition/framing: centered cluster with open margins for UI
Color palette: muted neutral palette
Constraints: no text; no logos; no watermark
```

### blog-header

```text
Use case: photorealistic-natural
Asset type: blog header image
Primary request: overhead desk scene with notebook, pen, and coffee cup
Scene/backdrop: warm wooden tabletop
Style/medium: photorealistic photo
Composition/framing: wide crop with clean room for page copy
Lighting/mood: soft morning light
Constraints: no text; no logos; no watermark
```

### game-environment-concept

```text
Use case: stylized-concept
Asset type: game environment concept art
Primary request: cavernous hangar interior with tall support beams and drifting fog
Scene/backdrop: industrial hangar interior, deep scale, light haze
Subject: compact shuttle parked near the center
Style/medium: cinematic concept art, industrial realism
Composition/framing: wide-angle, low-angle
Lighting/mood: volumetric light rays cutting through fog
Constraints: no logos or trademarks; no watermark
```

### game-character-concept

```text
Use case: stylized-concept
Asset type: game character concept
Primary request: desert scout character with layered travel gear
Subject: long coat, satchel, practical travel clothing
Style/medium: character render; stylized realism
Composition/framing: neutral hero pose on a simple backdrop
Constraints: no logos or trademarks; no watermark
```

### game-ui-icon

```text
Use case: stylized-concept
Asset type: game UI icon
Primary request: round shield icon with a subtle rune pattern
Style/medium: painted game UI icon
Composition/framing: centered icon; generous padding; clear silhouette
Constraints: no text; no background scene elements; no logos or trademarks; no watermark
```

### tileable-texture

```text
Use case: stylized-concept
Asset type: tileable game texture
Primary request: worn sandstone blocks
Style/medium: seamless tileable texture; PBR-like material reference
Scene/backdrop: neutral lighting reference only
Constraints: seamless edges; no obvious focal elements; no text; no logos; no watermark
```

### wireframe-homepage

```text
Use case: ui-mockup
Asset type: website wireframe
Primary request: SaaS homepage layout with clear hierarchy
Style/medium: low-fidelity grayscale wireframe
Subject: top nav; hero with headline and CTA; three feature cards; testimonial strip; pricing preview; footer
Composition/framing: landscape desktop layout
Constraints: label major blocks; no color; no logos; no real photos; no watermark
```

### wireframe-pricing-page

```text
Use case: ui-mockup
Asset type: website wireframe
Primary request: pricing page layout with comparison table
Style/medium: low-fidelity grayscale wireframe
Subject: header; plan toggle; three pricing cards; comparison table; FAQ accordion; footer
Composition/framing: desktop or tablet layout
Constraints: label key areas; no color; no logos; no real photos; no watermark
```

### mobile-onboarding-wireframe

```text
Use case: ui-mockup
Asset type: mobile onboarding wireframe
Primary request: three-screen mobile onboarding flow
Style/medium: low-fidelity grayscale wireframe
Subject: screen 1 headline and CTA; screen 2 feature bullets; screen 3 form fields and CTA
Composition/framing: portrait mobile layout
Constraints: label screens and blocks; no color; no logos; no real photos; no watermark
```

### logo-symbol

```text
Use case: logo-brand
Asset type: logo concept
Primary request: geometric leaf symbol suggesting sustainability and growth
Style/medium: vector logo mark; flat colors; minimal
Composition/framing: centered mark; clear silhouette; generous margin
Color palette: deep green and off-white
Constraints: no text unless requested; no gradients; no mockups; no 3D; no watermark
```

### logo-monogram

```text
Use case: logo-brand
Asset type: logo concept
Primary request: interlocking monogram of the letters "AV"
Style/medium: vector logo mark; flat colors; minimal
Composition/framing: centered mark; balanced spacing
Color palette: black on white
Constraints: no gradients; no mockups; no 3D; no watermark
```

### logo-wordmark

```text
Use case: logo-brand
Asset type: logo concept
Primary request: clean wordmark for a modern studio
Style/medium: vector wordmark; flat colors; minimal
Text (verbatim): "Studio North"
Composition/framing: centered text; even letter spacing
Constraints: no gradients; no mockups; no 3D; no watermark
```

## Edit

### text-localization

```text
Use case: text-localization
Input images: Image 1: original infographic
Primary request: replace "Bean Hopper", "Grinder", "Brew Group", "Boiler", "Water Tank", and "Drip Tray" with "Tolva", "Molino", "Grupo de infusión", "Caldera", "Depósito de agua", and "Bandeja de goteo"
Constraints: change only the text; preserve layout, typography, spacing, and hierarchy; no extra words; do not alter logos or imagery
```

### identity-preserve

```text
Use case: identity-preserve
Input images: Image 1: person photo; Image 2..N: clothing references
Primary request: replace only the clothing with the provided garments
Constraints: preserve face, body shape, pose, hair, expression, and identity; match lighting and shadows; keep the background unchanged; no accessories or text
```

### precise-object-edit

```text
Use case: precise-object-edit
Input images: Image 1: room photo
Primary request: replace only the white chairs with wooden chairs
Constraints: preserve camera angle, room lighting, floor shadows, and surrounding objects; keep all other aspects unchanged
```

### lighting-weather

```text
Use case: lighting-weather
Input images: Image 1: original photo
Primary request: make it look like a winter evening with gentle snowfall
Constraints: preserve subject identity, geometry, camera angle, and composition; change only lighting, atmosphere, and weather
```

### background-extraction

```text
Use case: background-extraction
Input images: Image 1: product photo
Primary request: isolate the product on a clean transparent background
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for local background removal
Constraints: background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation; crisp silhouette; generous padding; no halos or fringing; preserve label text exactly; no restyling; do not use #00ff00 anywhere in the subject
```

Post-process after generation:

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

### style-transfer

```text
Use case: style-transfer
Input images: Image 1: style reference
Primary request: apply Image 1's visual style to a man riding a motorcycle on a plain white backdrop
Constraints: preserve palette, texture, and brushwork; no extra elements
```

### compositing

```text
Use case: compositing
Input images: Image 1: base scene; Image 2: subject to insert
Primary request: place the subject from Image 2 next to the person in Image 1
Constraints: match lighting, perspective, and scale; keep the base framing unchanged; no extra elements
```

### character-consistency

```text
Use case: identity-preserve
Input images: Image 1: previous character anchor illustration
Primary request: continue the story with the same character in a new scene and action
Scene/backdrop: snowy forest after a winter storm
Subject: same young forest hero gently helping a frightened squirrel out of a fallen tree
Style/medium: same children's book watercolor illustration style as Image 1
Constraints: do not redesign the character; preserve facial features, proportions, outfit, color palette, and personality; no text; no watermark
```

### sketch-to-render

```text
Use case: sketch-to-render
Input images: Image 1: drawing
Primary request: turn the drawing into a photorealistic image
Constraints: preserve layout, proportions, and perspective; choose realistic materials and lighting; do not add new elements or text
```

## Negative constraints that do not fight the user

Use narrow negatives that protect the requested output:

- `No extra text, no watermark.`
- `No new objects outside the requested subject.`
- `Keep the existing layout and typography unchanged.`
- `No shadows or gradients on the chroma-key background.`
- `No unrelated logos or trademarks.`

Avoid broad negatives that erase the brief:

- Do not add `No text` when the user requested exact visible text.
- Do not ban a visual metaphor the user explicitly asked for.
- Do not replace a detailed user style with a generic premium style.
- Do not remove text, labels, arrows, or UI elements that are central to the requested artifact.
