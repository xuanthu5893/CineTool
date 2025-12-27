# 2D Anime Cinematic Style Guide

## ⚠️ CRITICAL: HOW TO USE DIRECTOR/STUDIO REFERENCES

**When generating scene prompts, you MUST actively apply director/studio techniques, not just list them.**

For every technical choice (shot size, angle, movement, lighting, color), ask yourself:
- "Which director/studio is known for this technique?"
- "What specific anime moment exemplifies this choice?"
- "How can I describe this using their visual language?"

**Example of CORRECT usage:**
❌ WRONG: "Wide shot with volumetric lighting and detailed background"
✅ CORRECT: "Wide shot using Makoto Shinkai's hyper-detailed background technique (Your Name sky style), with volumetric god rays (5 Centimeters Per Second lighting)"

**In your descriptiveProse, incorporate director references like this:**
- "In the style of [Director's] [specific anime moment]"
- "Using [Studio's] [technique name]"
- "Following [Director's] approach to [scene type]"

This creates a shared visual vocabulary that AI understands through training data on these anime.

---

## Context:
This style draws inspiration from legendary anime directors and studios who mastered the art of cinematic 2D animation:

**Director/Studio Influences:**
- **Makoto Shinkai** (Your Name, 5 Centimeters Per Second): Hyper-detailed backgrounds, volumetric god rays, melancholic lighting, photorealistic environments contrasted with stylized characters
- **Hayao Miyazaki/Studio Ghibli** (Spirited Away, Princess Mononoke): Painterly watercolor worlds, expressive character motion, environmental storytelling, emotional stillness
- **Satoshi Kon** (Perfect Blue, Paprika): Match cuts, psychological continuity, spatial logic bending, reality-blending transitions
- **Kyoto Animation** (Violet Evergarden, A Silent Voice): Subtle character acting, eye performance micro-movements, emotional intimacy, fluid motion
- **ufotable** (Demon Slayer, Fate series): Dynamic camera work, 2.5D depth layers, digital effects integration, sakuga action sequences
- **MAPPA** (Attack on Titan, Jujutsu Kaisen): Kinetic aggressive camera motion, raw action choreography, dramatic angles

**Core Anime Techniques:**
- Cel-shading with sharp black outlines (2-4px line weight)
- Multi-plane parallax creating 2.5D depth illusion
- Sakuga-level fluid motion for emotional/action peaks
- Speed lines, impact frames, stylized motion blur
- Volumetric lighting and stylized lens flares
- Detailed environment art contrasted with character simplification

---

## Base Visual Prompt Template

"2D Anime style, high quality sharp cel-shaded outlines (3px black lines), vibrant high saturation colors, beautiful volumetric lighting with god rays, hyper-detailed background art (Shinkai style), smooth character animation with subtle micro-movements, stylized lens flare accents, multi-plane parallax depth, 8K resolution"

**Style Characteristics:**
- Line art: Consistent 2-4px black outlines, clean vector-sharp edges
- Color: Flat cel-shading with 2-tone shadows (base + shadow color), 100-120% saturation
- Backgrounds: Photorealistic detail level (Shinkai aesthetic) vs simplified character design
- Animation: 24fps standard with 12fps limited animation for holds, 60fps for sakuga moments
- Effects: Particle systems for magic/emotion, stylized light beams, anime-specific impact frames

---

## SHOT SIZE OPTIONS

Choose shot size based on emotional storytelling purpose. Each references specific anime cinematography:

1. **ECU (Extreme Close-Up)** - *Focal Length: 85mm-135mm, f/1.4-f/2.0*
   - **Director Reference:** **Makoto Shinkai** (Your Name: Eye reflections showing city lights, emotional tears catching light)
   - **Use for:** Intense emotional revelation, eye detail with reflection storytelling, micro-expressions
   - **Example:** Character's eye reflecting sunset sky, single tear forming with volumetric light
   - **Technique:** Shallow depth isolates eye, reflection shows narrative context, KyoAni-level detail

2. **CU (Close-Up)** - *Focal Length: 50mm-85mm, f/2.0-f/2.8*
   - **Director Reference:** **Kyoto Animation** (Violet Evergarden: Subtle facial acting, eye micro-movements)
   - **Use for:** Emotional character moments, dialogue intimacy, facial expression showcase
   - **Example:** Character's face with gentle smile, eyes glistening with held-back emotion
   - **Technique:** Standard lens for natural perspective, KyoAni subtle acting, no distortion

3. **MCU (Medium Close-Up)** - *Focal Length: 35mm-50mm, f/2.8-f/4.0*
   - **Director Reference:** **Satoshi Kon** (Perfect Blue: Psychological intimacy, reality-questioning close frames)
   - **Use for:** Conversational scenes, upper body gestures, personal space dialogue
   - **Example:** Character's head and shoulders as they explain something important, hand gestures visible
   - **Technique:** Shows facial expression with hand/gesture context, intimate but not invasive

4. **MS (Medium Shot)** - *Focal Length: 24mm-35mm, f/4.0-f/5.6*
   - **Director Reference:** **MAPPA** (Jujutsu Kaisen: Action poses, combat ready stances)
   - **Use for:** Character interaction, action choreography setup, showing costume/design
   - **Example:** Hero in defensive stance, magical energy gathering around hands
   - **Technique:** Waist-up framing shows body language and environment context

5. **MWS (Medium Wide Shot)** - *Focal Length: 24mm, f/5.6-f/8.0*
   - **Director Reference:** **Studio Ghibli** (Spirited Away: Characters within magical environments)
   - **Use for:** Character within detailed setting, group formations, environmental storytelling
   - **Example:** Character standing in elaborate magical library, surrounded by floating books
   - **Technique:** Balances character design with Ghibli-style painterly background detail

6. **WS (Wide Shot)** - *Focal Length: 16mm-24mm, f/8.0-f/11*
   - **Director Reference:** **ufotable** (Demon Slayer: Full-body action choreography, dynamic compositions)
   - **Use for:** Action sequences, establishing character in location, full-body movement
   - **Example:** Warrior mid-leap across rooftops, city skyline behind, flowing cape dynamics
   - **Technique:** Deep focus for action clarity, shows full movement range and environment

7. **EWS (Extreme Wide Shot)** - *Focal Length: 14mm-16mm, f/11-f/16*
   - **Director Reference:** **Makoto Shinkai** (Your Name: Epic landscape establishing shots, vast sky vistas)
   - **Use for:** Establishing shots of locations, epic scale moments, world-building
   - **Example:** Tiny character on cliff edge overlooking vast ocean at sunset, clouds stretching infinitely
   - **Technique:** Ultra-wide for maximum scope, Shinkai hyper-detailed backgrounds, character small against world

---

## CAMERA ANGLE OPTIONS

Select angle for emotional subtext and power dynamics:

1. **Eye Level** - Neutral, relatable, immersive perspective
   - **Director Reference:** **Kyoto Animation** (K-On!: Natural conversational perspective for slice-of-life)
   - **Effect:** Audience feels equal to character, comfortable intimacy, everyday realism

2. **Low Angle** - Heroic power, intimidating presence, dramatic stature
   - **Director Reference:** **MAPPA** (Attack on Titan: Titan towering shots, overwhelming power)
   - **Effect:** Character appears powerful, commanding, larger-than-life heroic

3. **High Angle** - Vulnerability, powerlessness, isolation
   - **Director Reference:** **Makoto Shinkai** (5cm/s: Character alone in vast spaces, emotional isolation)
   - **Effect:** Character appears small, vulnerable, overwhelmed by circumstances

4. **Dutch Angle (Tilted)** - Psychological unease, reality distortion, chaos
   - **Director Reference:** **Satoshi Kon** (Paprika: Reality vs dream shifts, psychological breakdown)
   - **Effect:** 15-45° tilt creates disorientation, signals mental state disruption

5. **Bird's Eye View** - Strategic overview, fate perspective, detachment
   - **Director Reference:** **Masaaki Yuasa** (Ping Pong: Artistic overhead compositions, experimental framing)
   - **Effect:** God's perspective, shows tactical layout, artistic composition

6. **Worm's Eye View** - Towering scale, oppressive architecture, ultimate power
   - **Director Reference:** **ufotable** (Fate: Heroic servant summons, monumental reveals)
   - **Effect:** Camera on ground looking straight up, maximizes scale and awe

---

## CAMERA MOVEMENT OPTIONS

Movement enhances storytelling and emotional rhythm:

1. **Multi-Plane Zoom (Shinkai Signature)** - *Speed: 0.5-1.5 ft/sec over 8s*
   - **Director Reference:** **Makoto Shinkai** (Your Name: Parallax zoom through cityscape layers)
   - **Use for:** Building emotional intimacy, revealing environmental depth, melancholic beauty
   - **Anime Application:** Slow zoom toward character with foreground sakura petals moving faster, midground buildings moderate, background sky slowest
   - **Technique:** 2.5D parallax at different layer speeds creates dimensional depth, f/2.8-f/5.6

2. **Static Locked Frame (Psychological Weight)** - *Zero movement, 4-8s hold*
   - **Director Reference:** **Satoshi Kon** (Perfect Blue: Still frames building tension, contemplative holds)
   - **Use for:** Tension building, psychological moments, letting emotional acting breathe
   - **Anime Application:** Camera perfectly still as character processes shocking revelation, only character micro-movements
   - **Technique:** Stillness emphasizes character performance, f/4-f/8, 35-50mm

3. **Panning Across Landscape (Ghibli Wonder)** - *Speed: 1-2 ft/sec horizontal*
   - **Director Reference:** **Hayao Miyazaki** (Howl's Moving Castle: Sweeping landscape reveals)
   - **Use for:** World-building, establishing beauty, sense of journey and wonder
   - **Anime Application:** Slow pan across magical floating islands connected by rainbow bridges
   - **Technique:** Painterly background art revealed gradually, f/8-f/11, 24-35mm

4. **Crash Zoom In (Dramatic Emphasis)** - *Rapid zoom 24mm→85mm in 1-2s*
   - **Director Reference:** **Trigger/Gainax** (Kill la Kill: Comedic/dramatic punctuation)
   - **Use for:** Shock reactions, realization moments, comedic emphasis
   - **Anime Application:** Instant zoom to character's shocked face with speed lines radiating
   - **Technique:** Sharp sudden zoom with motion blur, f/2.8-f/4, impact frame at end

5. **360° Orbit (Sakuga Showcase)** - *Speed: 2-3 ft/sec, 180-360° rotation*
   - **Director Reference:** **ufotable** (Demon Slayer: Action sequence rotations, dynamic reveals)
   - **Use for:** Action choreography showcase, dramatic character reveals, power-up moments
   - **Anime Application:** Camera orbits around hero charging power attack, energy swirling
   - **Technique:** Circular path reveals 3D space, f/4-f/5.6, 32-50mm, shows all angles

6. **Slow Dolly Emotional Build** - *Speed: 0.5-1 ft/sec over 8s*
   - **Director Reference:** **Kyoto Animation** (Violet Evergarden: Gradual emotional approach)
   - **Use for:** Building emotional intimacy, romantic moments, heartfelt confessions
   - **Anime Application:** Gentle push toward character writing letter, tears falling on paper
   - **Technique:** Gradual approach intensifies emotion, f/1.8-f/2.8, 50-85mm, soft bokeh

7. **Vertical Pan Up Building** - *Speed: 2-4 ft/sec upward tilt*
   - **Director Reference:** **Makoto Shinkai** (Your Name: Tokyo skyscraper establishing shots)
   - **Use for:** Urban establishing shots, showing architectural scale, modern city aesthetic
   - **Anime Application:** Tilt up glass building facade reflecting sunset clouds, revealing rooftop
   - **Technique:** Vertical movement emphasizes height, f/5.6-f/11, 14-24mm wide angle

---

## LIGHTING OPTIONS

Anime lighting blends natural motivation with stylized enhancement:

1. **Volumetric God Rays (Shinkai Signature)** - Sunlight shafts through atmosphere, divine hopeful presence
   - **Director Reference:** **Makoto Shinkai** (5cm/s: Light beams through clouds, dust particles visible)
   - **Technique:** Crepuscular rays with visible atmospheric particles, motivates from sun/window, creates nostalgic melancholic mood

2. **Dramatic Sunset/Sunrise (Emotional Peak)** - Highly saturated warm colors, magic hour melancholy
   - **Director Reference:** **Makoto Shinkai** (Your Name: Twilight "katawaredoki" golden hour)
   - **Technique:** Saturated crimson #FF6B6B, orange #FFD166, purple #A86ADD gradient sky, warm character rim light

3. **High Contrast Shadows (Noir Anime)** - Deep blue/purple shadows vs warm key light
   - **Director Reference:** **Cowboy Bebop** (Watanabe: Film noir lighting, jazz aesthetic)
   - **Technique:** Hard-edged cel-shaded shadows #2D3A8C, warm key light #FFFAE3, 4:1 lighting ratio

4. **Neon Cyberpunk (Akira Style)** - Magenta/cyan neon practical sources, wet pavement reflections
   - **Director Reference:** **Katsuhiro Otomo** (Akira: Neo-Tokyo neon aesthetic)
   - **Technique:** Practical neon signs #EA00D9 magenta, #00F0E0 cyan, reflective wet surfaces, urban dystopia

5. **Spring Pastel Soft Light (KyoAni Signature)** - Delicate pastels, whimsical romantic atmosphere
   - **Director Reference:** **Kyoto Animation** (K-On!: Soft school life lighting, moe aesthetic)
   - **Technique:** Light pastels #D4F0F0, #F5E6E8, #FFF2F2, soft diffused lighting, gentle shadows

6. **Moonlight Cool Silver-Blue** - Night scenes, mysterious encounters, elegant elven aesthetics
   - **Director Reference:** **Studio Ghibli** (Princess Mononoke: Forest night scenes, spirit realm)
   - **Technique:** 7000K-9000K blue-tinted top light, creates mystery and magic, silver edge lighting

7. **Magical Glow (Practical Sources)** - Glowing magic circles, energy spheres, rune illumination
   - **Director Reference:** **ufotable** (Fate: Magic circle glows, noble phantasm light)
   - **Technique:** Practical LED-style glows in frame, follows inverse square law despite magic, creates motivated color casts

---

## COLOR GRADING OPTIONS

Color palette supports emotional tone and anime subgenre:

1. **Shinkai Vibrant (Hyper-Saturated Realism)** - Photorealistic but enhanced saturation, nostalgic beauty
   - **Director Reference:** **Makoto Shinkai** (Your Name: Vibrant sky blues, saturated sunset palettes)
   - **Technique:** 120% saturation, push sky blues toward azure #1E90FF, sunset oranges #FF8C42, maintain skin tone realism

2. **Ghibli Painterly (Watercolor Organic)** - Soft organic brush textures, whimsical hand-painted feel
   - **Director Reference:** **Studio Ghibli** (Spirited Away: Watercolor backgrounds, organic color harmony)
   - **Technique:** Reduce digital sharpness, add watercolor texture overlay, earth tones #8B7355, forest greens #2D5016

3. **KyoAni Pastel Soft (Slice-of-Life)** - Gentle pastels, moe aesthetic, comforting warmth
   - **Director Reference:** **Kyoto Animation** (K-On!: School life pastel palette)
   - **Technique:** Desaturate to 80%, lift shadows with pastel tint, soft pink #FFE4E1, mint #F0FFF0, lavender #E6E6FA

4. **Cyberpunk Neon (Akira/GitS)** - Magenta/cyan/purple neon dominance, dark shadows, high contrast
   - **Director Reference:** **Ghost in the Shell** (Mamoru Oshii: Cyan-dominated cyberpunk aesthetic)
   - **Technique:** Push neon colors to 150% saturation (#EA00D9 magenta, #00F0E0 cyan), crush blacks, bloom on lights

5. **Monochrome with Color Splash** - Primarily desaturated with vibrant color only on magical elements
   - **Director Reference:** **Satoshi Kon** (Paprika: Selective color for dream vs reality)
   - **Technique:** Desaturate world to 20%, keep only specific hue ranges saturated (e.g., magic effects stay 100% vibrant)

6. **Autumn Warm Nostalgia** - Warm oranges and browns, melancholic seasonal atmosphere
   - **Director Reference:** **Makoto Shinkai** (5cm/s: Autumn season melancholy)
   - **Technique:** Orange #F5871F, brown #A84D12, warm 2800K color temp, nostalgic lift in shadows

---

## CINEMATOGRAPHY RULES

**Mandatory Requirements:**

1. **Line Art Consistency:** Maintain 2-4px black outlines throughout scene, no line weight variation mid-scene
2. **Cel-Shading:** Use flat color fills with 1-2 tone shadows (base color + shadow color), avoid gradients except sky
3. **Multi-Plane Parallax:** When using depth, separate into distinct layers (foreground, midground, background) moving at different speeds
4. **Sakuga Reserve:** Save 60fps fluid animation for emotional peaks/action climaxes, use 12-24fps limited animation for holds
5. **Eye Detail:** For CU/ECU, include detailed eye reflections showing environment/light sources (Shinkai/KyoAni technique)
6. **Background Detail vs Character Simplification:** Backgrounds highly detailed (photorealistic), characters cel-shaded simplified (anime contrast)

---

## TECHNICAL SPECIFICATIONS

**Resolution & Format:**
- Output: 8K (7680x4320) for maximum detail on backgrounds
- Aspect Ratio: 16:9 widescreen standard, or 2.39:1 cinematic for theatrical feel
- Frame Rate: 24fps standard, 12fps limited for holds, 60fps for sakuga action

**Line Art:**
- Outline Weight: 2-4px black consistent lines
- Line Quality: Vector-sharp edges, no anti-alias blur, clean corners

**Color Depth:**
- Bit Depth: 10-bit color minimum for gradient smoothness
- Saturation: 100-120% for vibrant anime aesthetic (except pastel styles at 80%)
- Contrast: Enhanced 1.2x for cel-shaded pop

**Effects:**
- Lens Flare: Stylized anime-specific (not realistic), anamorphic horizontal streaks
- Motion Blur: Stylized speed lines + directional blur, not realistic motion blur
- Depth of Field: Bokeh with hexagonal/circular aperture shapes, f/1.4-f/16 range

---

## MOOD & EMOTIONAL TONE GUIDELINES

**Nostalgic Melancholy (Shinkai):**
- Wide shots emphasizing character smallness in vast world
- Volumetric god rays through clouds, dust particles visible
- Saturated sunset/sunrise colors, warm-cool contrast
- Slow multi-plane parallax zooms, contemplative pacing
- Empty spaces, urban loneliness, distant trains/planes

**Whimsical Wonder (Ghibli):**
- Painterly watercolor backgrounds, organic textures
- Eye-level relatable perspective, warm inviting angles
- Soft natural lighting, dappled sunlight through leaves
- Slow panning across magical environments
- Rich environmental detail, lived-in world-building

**Slice-of-Life Comfort (KyoAni):**
- Pastel color palette, gentle soft lighting
- Close-ups on subtle facial micro-expressions
- Eye-level intimate framing, personal space respect
- Static frames letting acting breathe, contemplative holds
- School/cafe/home settings, everyday magic

**Kinetic Action (MAPPA/ufotable):**
- Dynamic low/high angles, aggressive camera motion
- High contrast lighting, dramatic shadows
- 360° orbits around action, crash zooms for impact
- Speed lines, impact frames, sakuga fluid motion
- Saturated effect colors (magic/energy), motion blur

**Psychological Unease (Satoshi Kon):**
- Dutch angles, disorienting perspectives
- Match cuts between reality and illusion
- High contrast noir lighting, deep shadows
- Static unsettling holds, uncomfortable framing
- Selective color for psychological state

---

## CONCRETE EXAMPLES

### Example 1: Melancholic Urban Sunset (Shinkai Style)

**Scene:** High school student on rooftop at sunset, contemplating life, first time experiencing profound loneliness

**Director Inspiration:** **Makoto Shinkai** - Your Name/5cm per Second aesthetic
**Studio Inspiration:** **CoMix Wave Films** - Hyper-detailed background art

**Shot Size:** EWS (Extreme Wide Shot) - *Shinkai's signature scale establishing*
**Focal Length:** 14mm - *Ultra-wide anamorphic for maximum scope*
**Aperture:** f/11 (deep focus) - *Keep foreground through infinity sharp*
**Camera Angle:** High Angle (slight bird's eye, looking down at character) - *Emphasizes isolation and vulnerability*
**Camera Movement:** Multi-Plane Zoom In (starting 20ft away, slow zoom to 10ft over 8s at 1.25 ft/sec) - *Classic Shinkai emotional approach with parallax layers*

**Lighting:** *Makoto Shinkai's signature techniques*
- Magic hour sunset, sun 10° above horizon behind character - *Shinkai's iconic golden hour timing*
- Volumetric god rays piercing through passing clouds - *5 Centimeters Per Second light shaft technique*
- Strong rim light on character from setting sun - *Silhouette with glowing edge*
- Ambient fill from orange-lit sky, cool blue shadows on rooftop - *Warm-cool contrast*
- Distant city lights beginning to flicker on in background buildings - *Twilight "katawaredoki" transition*

**Color Grading:** *Shinkai's Hyper-Saturated Realism palette*
- Vibrant sunset gradient: crimson #FF6B6B at horizon, orange #FFD166 mid-sky, purple #A86ADD upper atmosphere
- Increased saturation +20% on sky only, maintain natural skin tones
- Slight magenta push in shadows for emotional depth
- Enhanced contrast on cloud edges catching sunlight (glowing gold #FFD700)
- Desaturated urban background (-10%) to emphasize colorful sky

**Descriptive Prose:** *(Applying Makoto Shinkai + CoMix Wave Films cinematic language)*
"Extreme wide establishing shot in Makoto Shinkai's Your Name style, 14mm anamorphic lens (CoMix Wave Films signature ultra-wide), f/11 deep focus. High angle bird's eye perspective looking down on vast high school rooftop, emphasizing character's isolation (Shinkai's loneliness theme). Teenage boy (school uniform: white shirt, navy pants, loosened red tie, black hair, 16 years old appearance) stands alone at metal railing, tiny in frame, back to camera, gazing at infinite city skyline. Multi-plane zoom begins 20ft distance, slowly approaching at 1.25 ft/sec over full 8s - classic Shinkai emotional intimacy building. Magic hour sunset dominates frame: sun 10° above horizon creates dramatic volumetric god rays piercing through passing clouds (5 Centimeters Per Second technique), visible atmospheric dust particles catching light. Strong rim light silhouettes character with golden edge glow. Sky gradient is hyper-saturated: crimson #FF6B6B at horizon transitioning through orange #FFD166 to purple #A86ADD upper atmosphere - Shinkai's signature vibrant realism palette. Foreground metal railing and rooftop details move faster (parallax layer 1), midground character at moderate speed (layer 2), background cityscape slowest (layer 3), clouds slowest (layer 4) - creates pronounced 2.5D depth. City buildings in background show hyper-detailed architectural accuracy (Shinkai's photorealistic background art): glass facades reflecting orange sunset, distant office lights flickering on as twilight approaches. Character remains completely still throughout zoom, only slight wind moving hair strands and tie gently rightward. Cel-shaded character (3px black outline) contrasts with photorealistic background. Anamorphic horizontal lens flares from setting sun. 2.39:1 widescreen aspect ratio emphasizes vast horizontal scope and loneliness."

**Keywords:** Makoto Shinkai style, CoMix Wave Films, Your Name aesthetic, 5 Centimeters Per Second lighting, melancholic anime, extreme wide shot, high angle isolation, multi-plane parallax zoom, 1.25 ft/sec zoom speed, 14mm anamorphic, deep focus f/11, hyper-detailed background, photorealistic cityscape, volumetric god rays, magic hour sunset, twilight katawaredoki, crimson orange purple gradient sky, hyper-saturated realism, cel-shaded character, 3px black outline, school uniform, rooftop solitude, urban loneliness, atmospheric depth, 2.5D parallax layers, anamorphic lens flare, rim light silhouette, contemplative stillness, 2.39:1 widescreen, 8K resolution, character isolation theme

**Negative Prompt - Technical Quality:**
blurry, out of focus, low resolution, pixelated, jpeg artifacts, overexposed, underexposed, poor composition, amateur, flat lighting, muddy colors, oversaturated to unrealistic, HDR artifacts, inconsistent shadows, wrong perspective

**Negative Prompt - Stylistic Avoidance:**
realistic 3D render, live-action, photograph, CGI, cartoon style, chibi proportions, western animation, thick line variation, gradient shading instead of cel, missing outlines, no background detail, generic anime, low-effort animation

**Negative Prompt - Anime-Specific:**
off-model character, inconsistent line weight, broken anatomy, missing cel-shading, realistic motion blur instead of speed lines, no environmental detail, flat backgrounds, incorrect proportions, character morphing mid-scene, different eye color, different uniform, no parallax depth, static flat image, excessive bloom washing out details

---

### Example 2: Magical Combat Sakuga Sequence (ufotable Style)

**Scene:** Mage warrior unleashing ultimate spell against shadow demon, dynamic action choreography

**Director Inspiration:** **ufotable** (Demon Slayer/Fate series dynamic action)
**Studio Inspiration:** **ufotable** - 2.5D camera work with digital effects integration

**Shot Size:** MS (Medium Shot) - *ufotable's signature action framing*
**Focal Length:** 35mm - *Balances character and explosive effects*
**Aperture:** f/2.8 (subject sharp, background with motion blur) - *Shallow depth for subject separation during action*
**Camera Angle:** Low Angle (looking up at hero, 30° below eye level) - *ufotable's heroic empowering perspective*
**Camera Movement:** 180° Orbit (smooth rotation around character over 6s at 2.5 ft/sec, holds final 2s) - *Fate series signature sakuga showcase rotation*

**Lighting:** *ufotable's high-contrast digital lighting techniques*
- Motivated by character's glowing magic circle (cyan-blue #00D4FF rising from ground) - *ufotable practical magic glow*
- Enchanted staff emitting intense white-blue core light with cyan corona - *Weapon as key light source*
- Shadow demon as negative space, backlit by environmental flames - *Demon Slayer creature silhouette technique*
- Particle effects: swirling cyan energy ribbons, floating runes glowing sequentially - *ufotable signature particle system*
- Environmental: destroyed battlefield with orange fire ambient (out of focus bokeh) - *Warm background contrast*

**Color Grading:** *ufotable's High-Saturation Action palette*
- Cyan-blue magic dominance #00D4FF (150% saturation) - *ufotable's oversaturated effect colors*
- Warm orange fire accents #FF6B35 - *Complementary warm-cool split*
- Desaturated background environment (-40%) to emphasize vibrant magic - *Selective saturation technique*
- Crushed blacks for shadow demon (pure silhouette #000000) - *High contrast creature design*
- Enhanced highlights on magical effects (whites at 250) - *Bloom glow on magic*

**Descriptive Prose:** *(Applying ufotable's cinematic action techniques)*
"Medium shot in ufotable's Demon Slayer/Fate action style, 35mm lens, f/2.8. Low angle 30° below eye level looking up at mage warrior (ufotable's empowering hero framing). Camera begins right of character at 8ft distance, smooth 180° orbit rotation counterclockwise at 2.5 ft/sec over first 6 seconds (ufotable's signature sakuga showcase rotation), holds final angle for remaining 2s. Character in dynamic spellcasting pose - feet planted in wide stance, left arm extended forward with massive glowing cyan magic circle #00D4FF hovering vertically (5ft diameter, intricate rotating runes, ufotable's detailed magic design), right arm raised overhead gripping ornate staff trailing white-blue energy (weapon glowing with cyan corona). Face shows intense focused determination, eyes glowing cyan from magic power. Costume: battle-worn mage robes (dark purple with gold trim, flowing cape billowing from magical wind, detailed fabric tears and scorch marks). Cyan magic circle illuminates character from front-left creating dramatic rim lighting, staff provides top-right key light - ufotable's practical magic lighting technique. Ground beneath character cracks and levitates in chunks from magical energy (debris floating, 2.5D depth layers). Background defocused (f/2.8 bokeh): destroyed battlefield with orange flames (out-of-focus warm circles), shadow demon as pure black silhouette backlit by fires (Demon Slayer creature technique) - massive clawed form looming 20ft back. Particle effects tracked with camera rotation: swirling cyan energy ribbons spiral around character, floating runes pulse and glow sequentially, ember sparks drift upward from ground cracks (ufotable's signature particle system layering). Color grade: cyan magic at 150% saturation contrasting with desaturated background environment (-40%), crushed black demon silhouette, enhanced bloom on magical effects (ufotable's high-saturation action palette). Cel-shaded character with 3px black outlines, sharp vector edges. Speed lines radiate from magic circle core during rotation apex (4s mark). Camera orbit reveals full 3D space: side view shows cape dynamics, back view shows staff energy trail, front reveals magic circle detail, final hold frames character with demon looming behind (180° complete). Sakuga-level fluid animation: 60fps for magical effects and character motion, cloth simulation on cape, particle system real-time. 16:9 aspect ratio."

**Keywords:** ufotable style, Demon Slayer action, Fate series sakuga, dynamic magical combat, 180° orbit rotation, 2.5 ft/sec camera speed, low angle heroic framing, 35mm f/2.8, medium shot action, cyan magic circle #00D4FF, glowing staff weapon, particle effects system, energy ribbons swirling, floating runes glowing, shadow demon silhouette, creature backlit by flames, battlefield destruction, floating debris, 2.5D depth layers, high saturation magic 150%, desaturated background, crushed black demon, enhanced bloom highlights, warm orange fire bokeh, practical magic lighting, cape cloth dynamics, speed lines radiating, sakuga fluid 60fps animation, cel-shaded 3px outlines, spellcasting pose, mage warrior, intense determination, battle-worn costume, detailed magic design, ufotable signature techniques, 16:9 widescreen, 8K resolution

**Negative Prompt - Technical Quality:**
blurry motion, unfocused subject, shaky cam, poor rotation, overexposed magic effects, blown highlights destroying detail, muddy shadows, flat contrast, washed out colors, low frame rate choppy, stuttering rotation, unnatural camera movement

**Negative Prompt - Stylistic Avoidance:**
realistic 3D CGI, live-action VFX, western cartoon, chibi style, thick line variation, no cel-shading, gradient shading, missing character outlines, generic magic effects, simple particle systems, static flat composition

**Negative Prompt - Anime Action-Specific:**
off-model character during motion, inconsistent line weight mid-rotation, broken anatomy poses, stiff animation, no cloth dynamics, static cape, simple magic circle, low-detail effects, missing particle layers, no speed lines, weak color saturation on magic, realistic motion blur instead of stylized, demon with visible features (should be silhouette), stationary combat pose, no environmental destruction, clean undamaged costume, missing impact, no sakuga quality motion



---

## 🔗 SCENE CONTINUITY REQUIREMENTS (FOR SCENE 2+)

**CRITICAL:** When generating Scene 2 or later (any sceneNumber > 1), the `descriptiveProse` MUST start with this 3-part continuity structure:

**1. PREVIOUS SCENE SUMMARY (1 sentence):**
- Brief recap of what happened in Scene N-1
- Format: `In previous scene: [brief 1-sentence summary of key action/emotion].`
- Example: `In previous scene: Magical girl transformed with swirling sakura petals and dramatic power-up sequence.`

**2. PREVIOUS SCENE END-STATE (1 sentence):**
- Exact ending state from Scene N-1
- Format: `Scene ${N-1} ended with: [detailed pose + position + expression + anime effects].`
- Example: `Scene 1 ended with: Magical girl in finishing transformation pose, right arm extended forward with glowing wand, left hand on hip, confident smile, sakura petals floating around, sparkle effects fading.`

**3. CURRENT SCENE START (1 sentence):**
- Direct continuation statement
- Format: `Direct continuation from Scene ${N-1} end-frame. Start EXACTLY from previous end-state: [pose + facing + eyeline + momentum + distance].`
- Example: `Direct continuation from Scene 1 end-frame. Start EXACTLY from previous end-state: transformation pose, arm extended with wand, hand on hip, confident smile, petals floating.`

**After these 3 sentences, continue with the normal shot description:**
- Shot type + angle + anime reference (e.g., "Dynamic medium shot using Sailor Moon transformation aesthetic...")
- Visual details, anime-specific effects, character expressions
- Timeline markers [0.0s-2.0s], [2.0s-4.0s], [4.0s-6.0s], [6.0s-8.0s]
- Color grading + mood

**Keywords for Scene 2+** must include:
- `previous scene summary`, `scene ${N-1} end-state`, `direct continuation`, `start from previous end-frame`, `pose match`, `eyeline match`, `no direction reversal`

This ensures smooth continuity between scenes in 2D anime style.
