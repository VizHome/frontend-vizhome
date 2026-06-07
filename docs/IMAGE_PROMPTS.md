# IMAGE_PROMPTS.md

Catalogue de prompts de génération d'images pour VizHome. Chaque prompt cible
un fichier précis du catalogue (`lib/imageCatalog.ts`). Les fichiers binaires
sont générés hors-code et déposés dans `public/images/...`.

> Référentiel : tout ce qui est listé ici doit, après génération, exister
> physiquement sous `public/images/`. Le catalogue TypeScript pointe déjà sur
> ces chemins. Tant qu'un fichier manque, le composant retombe sur
> `FALLBACK_IMAGE` (`/images/generate/image_generate.png`).

---

## 1. Charte visuelle VizHome

### Mood global

* Photoréaliste, qualité rendu Octane / V-Ray architectural visualization.
* Lumière naturelle douce, heure dorée ou lumière du nord diffuse.
* Palette neutre et chaleureuse : blancs cassés, beiges, bois clair, lin,
  gris doux, touches de terracotta ou vert sauge.
* Compositions épurées, beaucoup d'espace négatif, ambiance "moins c'est plus".
* Style scandinave / japandi / contemporain européen.

### À éviter (negative prompts globaux)

* Aucun visage humain identifiable (silhouettes lointaines OK, mais pas de
  portraits ni de détails faciaux).
* Aucun logo, aucune marque, aucun texte intégré dans l'image.
* Pas de saturation excessive, pas de néons criards.
* Pas d'esthétique "stock photo" années 2010 (peau trop lissée, couleurs trop
  vives, sourires forcés).
* Pas de filigranes, pas de watermarks.
* Pas de fish-eye ni de distorsions optiques extrêmes.

### Format de sortie

* WebP préféré, JPEG XL acceptable, PNG si transparence requise.
* Résolutions cibles :
  * Hero : 1920 x 1080 (16:9).
  * Illustration secondaire : 1280 x 960 (4:3) ou 1280 x 720 (16:9).
  * Open Graph : 1200 x 630 (1.91:1).
  * Empty state : 800 x 600 (4:3).

---

## 2. Prompts par page feature

Chaque section couvre une page de `pages/features/*.vue`. Cibles indiquées en
chemin absolu sous `public/`.

### 2.1 `auto-3d` (sketch to 3D)

#### Cible : `/images/features/auto-3d/hero.webp` (ratio 16:9)

> Cinematic photorealistic 3D render of a bright Scandinavian living room, soft
> warm morning light streaming through large floor-to-ceiling windows, light
> oak parquet floor, beige linen sofa, sage green velvet armchair, ceramic
> vase with eucalyptus branches, off-white walls, minimalist composition,
> shallow depth of field, Octane render quality, 1920x1080, 16:9.
>
> Negative prompt : people, faces, brand logos, text overlay, watermark, neon
> colors, fisheye distortion.

#### Cible : `/images/features/auto-3d/illustration-1.webp` (ratio 4:3)

> Simple pencil sketch on white paper showing the top-down floor plan of a
> living room, hand-drawn lines, soft graphite shading, minimal annotations,
> studio lighting from above, photographic flat-lay style, 1280x960.
>
> Negative prompt : color, photographs, 3D, gradients, glow.

#### Cible : `/images/features/auto-3d/illustration-2.webp` (ratio 4:3)

> Wireframe 3D mesh of a small apartment, clean white background, edges in
> dark grey, isometric perspective, subtle ambient occlusion shadow under the
> model, technical visualization style, soft studio lighting, 1280x960.
>
> Negative prompt : textures, materials, colored surfaces, people.

#### Cible : `/images/features/auto-3d/illustration-3.webp` (ratio 4:3)

> Photorealistic 3D render of a serene bedroom, white linen bedding, light
> wood nightstand with a small ceramic lamp, woven rug, morning sun rays from
> a window with sheer curtains, japandi style, Octane render quality, soft
> shadows, 1280x960.
>
> Negative prompt : people, text, brand visible, oversaturation.

#### Cible : `/images/features/auto-3d/illustration-4.webp` (ratio 16:9)

> Side-by-side comparison : left half shows an empty unfurnished room with bare
> white walls and concrete floor under flat lighting, right half shows the same
> room transformed into a fully furnished cozy living space with warm
> photorealistic 3D rendering, same camera angle, clean vertical divider in
> the middle, 1280x720.
>
> Negative prompt : text labels, watermarks, people, distorted perspective.

#### Cible : `/images/features/auto-3d/illustration-5.webp` (ratio 4:3)

> Macro photorealistic 3D detail of a beige linen sofa cushion, visible fabric
> weave, soft golden hour light from a side window, faint dust particles in
> the light beam, shallow depth of field, warm neutral palette, 1280x960.
>
> Negative prompt : hands, people, logos, oversharpening.

### 2.2 `materials` (bibliothèque PBR)

#### Cible : `/images/features/materials/hero.webp` (ratio 16:9)

> Cinematic studio composition of floating square material samples (oak wood,
> white veined marble, polished concrete, natural linen, terracotta tile)
> arranged in a soft grid against a warm cream background, gentle directional
> studio lighting, subtle shadows beneath each sample, photoreal PBR rendering
> quality, 1920x1080.
>
> Negative prompt : text labels, brand names, people, harsh shadows.

#### Cible : `/images/features/materials/illustration-1.webp` (ratio 4:3)

> Top-down photoreal sample of light oak parquet wood, visible grain patterns,
> warm tones, soft daylight, slight matte finish, 1280x960.
>
> Negative prompt : text, hands, gloss reflections of objects, watermark.

#### Cible : `/images/features/materials/illustration-2.webp` (ratio 4:3)

> Flat wall sample of grey polished concrete with subtle grain and faint
> circular polishing marks, soft side light revealing texture, photoreal PBR,
> 1280x960.
>
> Negative prompt : cracks, graffiti, text, oversaturated tones.

#### Cible : `/images/features/materials/illustration-3.webp` (ratio 4:3)

> Macro photoreal render of white Carrara marble countertop with delicate grey
> veining, matte finish, neutral diffuse studio lighting, no reflections of
> other objects, 1280x960.
>
> Negative prompt : kitchen utensils, hands, text, glossy highlights.

#### Cible : `/images/features/materials/illustration-4.webp` (ratio 4:3)

> Folded beige linen fabric resting on a neutral surface, natural wrinkles,
> soft window light from the left, photoreal texture detail, calm minimalist
> composition, 1280x960.
>
> Negative prompt : sewing labels, hands, branded tags, busy background.

#### Cible : `/images/features/materials/illustration-5.webp` (ratio 4:3)

> Grid of six photoreal terracotta and stone tile samples laid flat on a cream
> background, even soft lighting, slight spacing between tiles, subtle ground
> shadow, 1280x960.
>
> Negative prompt : text, numbering, hands, broken edges.

### 2.3 `intelligent-lighting`

#### Cible : `/images/features/intelligent-lighting/hero.webp` (ratio 16:9)

> Triptych composition of the same modern living room rendered in three
> lighting moods : cool morning blue light on the left, warm midday glow in
> the middle, golden hour amber light on the right, seamless vertical
> dividers, photoreal architectural visualization, 1920x1080.
>
> Negative prompt : people, text, label overlays, harsh contrast.

#### Cible : `/images/features/intelligent-lighting/illustration-1.webp` (ratio 4:3)

> Photoreal dining room bathed in late afternoon golden light, long warm
> shadows on a light wood table, ceramic plates, dried wheat bouquet,
> japandi style, 1280x960.
>
> Negative prompt : people, brand logos, text on plates.

#### Cible : `/images/features/intelligent-lighting/illustration-2.webp` (ratio 4:3)

> Photoreal bedroom at dusk with two warm bedside lamps casting soft amber
> light, deep navy walls, white linen bedding, calm intimate mood, 1280x960.
>
> Negative prompt : people, text, electronic device screens.

#### Cible : `/images/features/intelligent-lighting/illustration-3.webp` (ratio 4:3)

> Photoreal modern kitchen lit by a large north-facing window, soft diffuse
> daylight, white cabinets, light wood counter, ceramic mugs, indoor plant,
> japandi vibe, 1280x960.
>
> Negative prompt : people, branded appliances, text.

#### Cible : `/images/features/intelligent-lighting/illustration-4.webp` (ratio 4:3)

> Top-down architectural plan of an apartment with small glowing dots
> representing smart light placements, faint isolux lines around each dot,
> minimalist line drawing style with warm yellow glow highlights, white
> background, 1280x960.
>
> Negative prompt : photographic textures, people, brand logos.

#### Cible : `/images/features/intelligent-lighting/illustration-5.webp` (ratio 4:3)

> Macro photoreal detail of a single sunbeam passing through a sheer linen
> curtain, visible dust particles, soft warm color, shallow depth of field,
> calm contemplative mood, 1280x960.
>
> Negative prompt : people, hands, text, oversaturated colors.

### 2.4 `360-views`

#### Cible : `/images/features/360-views/hero.webp` (ratio 2:1, équirectangulaire)

> Equirectangular 360 panorama (2:1 aspect ratio) of a contemporary loft with
> exposed wood beams, mezzanine floor, large industrial windows, warm daylight,
> photoreal architectural rendering, no people, 2048x1024.
>
> Negative prompt : people, text, brand logos, lens artifacts.

#### Cible : `/images/features/360-views/illustration-1.webp` (ratio 16:9)

> Photoreal 3D living room with small floating circular hotspots positioned on
> a sofa, a lamp, and a side table, hotspots rendered as soft cream glowing
> discs, warm interior light, 1280x720.
>
> Negative prompt : text inside hotspots, people, brand logos.

#### Cible : `/images/features/360-views/illustration-2.webp` (ratio 4:3)

> Wide-angle photoreal view from the center of a master bedroom, low-mounted
> camera perspective, soft pastel walls, light oak floor, calm morning
> ambiance, 1280x960.
>
> Negative prompt : people, lens distortion, watermark, text.

#### Cible : `/images/features/360-views/illustration-3.webp` (ratio 4:3)

> Editorial product shot of a modern VR headset resting on a light oak desk
> next to a small succulent plant, soft window light, shallow depth of field,
> neutral palette, no brand visible, 1280x960.
>
> Negative prompt : visible brand logos, people, text, plastic glare.

#### Cible : `/images/features/360-views/illustration-4.webp` (ratio 4:3)

> Top-down minimal architectural minimap of a 3-room apartment with subtle
> dotted lines representing navigation paths between rooms, cream background,
> warm grey lines, no labels, 1280x960.
>
> Negative prompt : text, room labels, photographic textures, people.

#### Cible : `/images/features/360-views/illustration-5.webp` (ratio 4:3)

> Photoreal hand-held tablet (no hands visible, tablet floating on a soft
> shadow) displaying a virtual tour of a living room, generic minimalist
> bezel, soft studio lighting, neutral background, 1280x960.
>
> Negative prompt : visible brand, hands, text on the bezel, watermark.

### 2.5 `collaboration`

#### Cible : `/images/features/collaboration/hero.webp` (ratio 16:9)

> Photoreal scene of four silhouetted figures (no faces) gathered around a
> large tilted touchscreen displaying a 3D apartment render, soft ambient
> studio light, neutral office with cream walls and a single indoor plant,
> calm focused mood, 1920x1080.
>
> Negative prompt : visible faces, brand logos, on-screen text, harsh lighting.

#### Cible : `/images/features/collaboration/illustration-1.webp` (ratio 4:3)

> Photoreal 3D kitchen with small floating cream-colored comment bubbles
> anchored to specific elements (a faucet, a backsplash tile, a cabinet),
> bubbles empty without text, soft daylight, 1280x960.
>
> Negative prompt : readable text inside bubbles, people, brand logos.

#### Cible : `/images/features/collaboration/illustration-2.webp` (ratio 4:3)

> Photoreal 3D top-down view of an apartment plan with three soft glowing
> cursor arrows in different muted colors (sage, terracotta, dusty blue),
> small generic name tags next to each cursor (no readable text), 1280x960.
>
> Negative prompt : real names, brand logos, harsh saturation.

#### Cible : `/images/features/collaboration/illustration-3.webp` (ratio 16:9)

> Side-by-side photoreal comparison of two versions of the same living room :
> version A with light oak floor and beige sofa on the left, version B with
> dark walnut floor and sage sofa on the right, seamless vertical divider,
> warm daylight, 1280x720.
>
> Negative prompt : text labels, people, watermark.

#### Cible : `/images/features/collaboration/illustration-4.webp` (ratio 4:3)

> Photoreal 3D bedroom with a faint translucent vertical column on the right
> showing stacked semi-transparent thumbnails representing version history,
> soft daylight, neutral palette, 1280x960.
>
> Negative prompt : readable text, people, dates visible, brand logos.

#### Cible : `/images/features/collaboration/illustration-5.webp` (ratio 4:3)

> Editorial shot of a slim laptop on a light oak desk displaying a generic
> project sharing notification (no readable text, just abstract UI shapes),
> soft window light, plant in the background, 1280x960.
>
> Negative prompt : visible brand on laptop, real text, people, glare.

### 2.6 `mobile-apps`

#### Cible : `/images/features/mobile-apps/hero.webp` (ratio 16:9)

> Editorial photoreal scene of a smartphone and a tablet (no visible brand)
> resting on a warm oak desk, both screens displaying the VizHome 3D editor
> as abstract UI panels (no readable text), soft natural light from a side
> window, ceramic mug and a small plant nearby, neutral palette, 1920x1080.
>
> Negative prompt : visible brand logos, real text, hands, glare on screens.

#### Cible : `/images/features/mobile-apps/illustration-1.webp` (ratio 4:3)

> Photoreal smartphone (no visible brand) floating on a soft cream background,
> screen showing an abstract project gallery with thumbnails of 3D rooms, no
> readable text, soft studio lighting, 1280x960.
>
> Negative prompt : brand logos, readable text, hands.

#### Cible : `/images/features/mobile-apps/illustration-2.webp` (ratio 4:3)

> Photoreal tablet on a wood surface displaying a 3D living room being edited,
> a faint finger gesture (no hand visible, just a soft glow) suggesting touch
> interaction, soft daylight, 1280x960.
>
> Negative prompt : visible hand, brand logos, readable text, glare.

#### Cible : `/images/features/mobile-apps/illustration-3.webp` (ratio 4:3)

> Photoreal scene of a smartphone held in mid-air (no hand visible) scanning
> an empty room, faint LIDAR-style blue dot grid appearing on the walls and
> floor, calm cinematic mood, 1280x960.
>
> Negative prompt : hands, faces, brand logos, sci-fi neon.

#### Cible : `/images/features/mobile-apps/illustration-4.webp` (ratio 16:9)

> Editorial photoreal composition with a smartphone on the left and a laptop
> on the right, a soft glowing arc connecting the two screens to suggest
> synchronization, neutral cream background, soft side light, 1280x720.
>
> Negative prompt : visible brand, readable text on screens, people.

#### Cible : `/images/features/mobile-apps/illustration-5.webp` (ratio 4:3)

> Photoreal smartphone lock screen (no brand visible) showing an abstract
> notification banner suggesting a finished render, soft warm bokeh
> background, calm minimal mood, 1280x960.
>
> Negative prompt : readable text, brand logos, hands, neon colors.

---

## 3. Hero homepage

### Cible : `/images/marketing/homepage/hero.webp` (ratio 16:9)

> Cinematic photorealistic 3D render of a bright contemporary living room with
> a panoramic view of pine trees through floor-to-ceiling windows, light oak
> floor, beige linen sofa, sage armchair, ceramic vases, soft warm morning
> light, calm minimalist scandinavian mood, Octane render quality, 1920x1080.
>
> Negative prompt : people, brand logos, text, oversaturation, fisheye.

### Cible : `/images/marketing/homepage/hero-alt-1.webp` (ratio 16:9)

> Photoreal modern open-plan kitchen and dining area with a long oak table, six
> minimalist chairs, large pendant lamp, soft golden hour light, neutral
> palette, japandi style, 1920x1080.
>
> Negative prompt : people, brand logos, food on the table, text.

### Cible : `/images/marketing/homepage/hero-alt-2.webp` (ratio 16:9)

> Photoreal cozy bedroom with cathedral ceiling, exposed wood beams, large
> window facing snowy mountains, beige linen bedding, terracotta throw,
> evening warm interior light, 1920x1080.
>
> Negative prompt : people, brand logos, watermark, neon colors.

### Cible : `/images/marketing/homepage/hero-alt-3.webp` (ratio 16:9)

> Photoreal urban loft with industrial windows, polished concrete floor, light
> oak mezzanine staircase, large indoor plants, soft daylight from the left,
> calm contemplative mood, 1920x1080.
>
> Negative prompt : people, graffiti, brand logos, text overlay.

### Cible : `/images/marketing/homepage/hero-alt-4.webp` (ratio 16:9)

> Photoreal bright home office with a wood desk facing a window with a garden
> view, low monitor (no brand visible), woven rug, ceramic mug, neutral
> palette, 1920x1080.
>
> Negative prompt : visible brand logos on monitor, readable text, people.

---

## 4. Bonus : empty states et Open Graph

### 4.1 Empty states (ratio 4:3 sauf indication)

#### Cible : `/images/empty-states/gallery.webp`

> Photoreal floating empty cream picture frames on a soft beige wall, calm
> studio lighting, minimal shadows, evocative of an empty gallery, 800x600.
>
> Negative prompt : text, people, brand logos.

#### Cible : `/images/empty-states/projects.webp`

> Photoreal miniature white architectural house model placed on a white plan
> surface, soft top light, gentle shadow, minimalist composition, 800x600.
>
> Negative prompt : text, people, brand logos, busy background.

#### Cible : `/images/empty-states/forum.webp`

> Photoreal empty cream speech bubble shape resting on a warm beige textured
> surface, soft directional light, minimal shadow, 800x600.
>
> Negative prompt : text inside the bubble, people, brand logos.

#### Cible : `/images/empty-states/notifications.webp`

> Photoreal small ceramic bell shape resting on a cream pedestal, soft studio
> lighting, gentle shadow, minimalist composition, 800x600.
>
> Negative prompt : text, people, brand logos, glare.

#### Cible : `/images/empty-states/search.webp`

> Photoreal magnifying glass with a wooden handle resting on a white surface,
> soft directional light, gentle long shadow, evocative of a fruitless search,
> 800x600.
>
> Negative prompt : text, people, brand logos, busy background.

#### Cible : `/images/empty-states/error-404.webp`

> Photoreal miniature fragmented architectural house model split into pieces,
> placed on a cream background, soft top light, minimal shadow, evocative of
> a missing page, 800x600.
>
> Negative prompt : text, people, brand logos.

### 4.2 Open Graph (ratio 1.91:1, 1200x630)

#### Cible : `/images/og/default.webp`

> Cinematic photoreal 3D living room composition framed for social sharing,
> centered subject, plenty of breathing room on top and bottom for potential
> text overlay added in post, warm scandinavian mood, 1200x630.
>
> Negative prompt : embedded text, brand logos, people, busy edges.

#### Cible : `/images/og/pricing.webp`

> Photoreal floating composition of three stacked cubes in oak, linen and
> marble representing pricing tiers, cream background, soft directional light,
> centered with margins for text overlay, 1200x630.
>
> Negative prompt : embedded text, prices, brand logos, people.

#### Cible : `/images/og/features.webp`

> Photoreal mosaic of six small architectural scenes arranged in a 3x2 grid on
> a cream background, soft studio lighting, calm neutral palette, centered with
> margins for text overlay, 1200x630.
>
> Negative prompt : embedded text, captions, brand logos, people.

---

## 5. Workflow de génération

### 5.1 Choix du modèle

* `Gemini 2.5 Flash Image` (alias "Nano Banana") via Google AI Studio ou
  l'API REST : bon rapport coût / qualité pour les illustrations secondaires
  et les empty states.
* `Imagen 3` (Google) pour les hero photoreal qui demandent un niveau
  cinématographique. Ratios natifs : 1:1, 3:4, 4:3, 16:9, 9:16.
* `Stable Diffusion XL` (local ou Replicate) + LoRA `archviz` pour les
  textures de matériaux. Avantage : reproductibilité et seed contrôlable.

### 5.2 Pipeline conseillé

1. Copier le prompt depuis ce document.
2. Générer 4 candidats par cible. Garder le meilleur.
3. Upscale 2x si nécessaire (par exemple via `Real-ESRGAN` ou
   `Topaz Gigapixel`).
4. Optimiser : conversion WebP qualité 80 via `sharp` (CLI) ou `cwebp` :

   ```bash
   # Conversion + redimensionnement en 1 commande (sharp)
   npx sharp-cli -i input.png -o output.webp \
     --format webp --quality 80 \
     resize 1920 1080 --fit cover
   ```

5. Vérifier le poids cible : hero sous 250 Ko, illustration sous 120 Ko,
   empty state sous 60 Ko.
6. Déposer le fichier dans le chemin exact attendu par `lib/imageCatalog.ts`.
   Par exemple : `public/images/features/auto-3d/hero.webp`.
7. Lancer `npm run dev` et vérifier visuellement la page concernée.

### 5.3 Validation finale par image

* Aucun visage humain identifiable.
* Aucun logo ou marque visible.
* Aucun texte intégré dans l'image (sauf si explicitement demandé).
* Cohérence palette VizHome (cream, beige, sage, terracotta, oak).
* Poids respecté.
* Nom de fichier exact (sensible à la casse, kebab-case).

### 5.4 Mise à jour du catalogue

Si un nouveau visuel n'a pas encore d'entrée dans `lib/imageCatalog.ts`,
ajouter une entrée correspondante et un prompt ici dans la même PR. Ces deux
fichiers évoluent toujours ensemble.

---

## 6. Récapitulatif des cibles

| Section | Nombre de prompts |
|---|---|
| Features (6 pages x 6 prompts) | 36 |
| Hero homepage (1 principal + 4 alternatives) | 5 |
| Empty states | 6 |
| Open Graph | 3 |
| Total | 50 |

Tous les chemins de sortie sont déjà déclarés dans `lib/imageCatalog.ts`.
Aucun chemin nouveau ne doit être inventé sans mise à jour du catalogue.
