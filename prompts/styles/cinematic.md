# Cinematic Style Guide

## ⚠️ CRITICAL: USE DIRECTOR/CINEMATOGRAPHER REFERENCES

**ALWAYS apply director techniques, not just list them:**

❌ WRONG: "Close-up with shallow depth of field and natural lighting"
✅ CORRECT: "Close-up using Roger Deakins' single-source window technique (Blade Runner 2049 style), Lubezki's natural light philosophy"

**In descriptiveProse, reference directors:**
- "Deakins-style single-source lighting"
- "Villeneuve slow-burn tension"
- "Nolan IMAX epic scale"

---

## 📐 QUICK REFERENCE

**DIRECTOR INFLUENCES:**
- **Roger Deakins** (DP): Single-source motivated lighting, negative fill, natural window preference, 32mm lens
- **Denis Villeneuve**: Wide symmetry, slow-burn tension, epic intimacy, minimalist sound
- **Christopher Nolan**: IMAX practical effects, architectural framing, non-linear narratives
- **Ridley Scott**: Volumetric haze beams, atmospheric smoke, immersive world-building
- **Emmanuel Lubezki**: Natural light only, continuous long takes, 360° oner lighting

**BASE PROMPT:**
"Cinematic, photorealistic, high contrast, Teal & Orange grading, film grain, vignette, 8K"

---

## 🎬 STYLE ELEMENTS

**SHOT SIZE:** ECU (eyes/lips) | CU (face) | MCU (head-chest) | MS (waist up) | MWS (knees up) | WS (full body) | EWS (landscape)

**CAMERA ANGLE - Pick by emotion:**

| Need | Use | Effect |
|------|-----|--------|
| Power/Hero | Low Angle | Strong, commanding |
| Vulnerable/Sad | High Angle | Small, weak |
| Chaos/Unease | Dutch Tilt 15-45° | Disoriented |
| Normal | Eye Level | Neutral, relatable |
| Artistic | Overhead 90° | God's view |
| Dialogue | OTS | Relationship |

**CAMERA MOVEMENT:** Static | Dolly In/Out | Tracking | Crane | Handheld | Zoom | Arc/Orbit | Whip Pan | Gimbal

**LIGHTING:**
- Golden Hour (2500-3500K warm rim)
- Three-Point Studio (key 45°, fill, rim)
- Rembrandt Triangle (90° window)
- Volumetric Haze (5600K through smoke)
- Blue Hour (9000K+ cool)
- Practical Motivated (visible sources)

**COLOR GRADING:**
Teal & Orange | Bleach Bypass | Green/Yellow Digital (Fincher) | Warm Nostalgic 2900K | Cool Futuristic 7000K+ | Natural Filmic 5600K

**DEPTH OF FIELD:** Shallow (blurry BG) | Medium (some BG) | Deep (all sharp)

---

## 🎯 MOOD QUICK GUIDE

**CONTEMPLATIVE:** Static/slow dolly, MS/CU eye level, soft window light, desaturated warm/cool, minimal audio
**SUSPENSE:** Slow push-in, low/high angle, underexposed, green/yellow grading, low drone 40-60Hz
**HEROIC:** Low angle crane up, WS/MWS, golden hour backlight, warm nostalgic, orchestral 25%
**INTIMATE:** Handheld CU/MCU, shallow DOF, natural eye level, filmic 5600K, dialogue 80%
**ACTION:** Handheld follow, MS/WS, deep DOF, bleach bypass, pure SFX 80%+

---

## 🎬 CONCRETE EXAMPLES

### EXAMPLE 1: Deakins Contemplative Drama

**Short Version (100 words):**
Medium shot of 40-year-old man in navy suit at office window at dusk. Single 90° window creates Rembrandt triangle on left cheek (Deakins signature). Static locked camera. Man stands motionless facing window [0-2s], slow head turn toward camera catching window light in eyes [2-4s], direct eye contact showing internal conflict [4-6s], head lowers breaking contact [6-8s]. Natural filmic grading 5600K desaturated, warm-cool contrast, natural vignette. City lights intensify as dusk deepens. Subtle film grain. Contemplative mood.

**Keywords:** cinematic, Deakins style, contemplative, 40-year-old man, navy suit, office dusk, single window light, Rembrandt triangle 90°, static locked, 32mm f/4, natural filmic 5600K, desaturated, warm cool contrast, internal conflict, slow head turn, eye contact, film grain, 8K

**Negative Prompt:** blurry, pixelated, changing face, morphing features, talking, lip movement, scene cuts, teleportation, inconsistent lighting, camera movement, dolly, pan, zoom

**Audio:** No music. Pure ambient. Distant city traffic hum 40-60Hz muffled through window. Man's slow breathing, fabric rustle, subtle shoe creak. Mix: 0% music, 100% ambient.

---

### EXAMPLE 2: Nolan IMAX Epic Action

**Short Version (100 words):**
Wide shot of 32-year-old pilot in olive flight suit, fighter cockpit interior. Harsh direct sunlight 45° creates dramatic shadows (no diffusion). Handheld follow 2 ft/sec matching cockpit vibration. Pilot's gloved hands grip throttle white-knuckled [0-2s], turbulence hits with violent shake [2-4s], eyes snap forward and hand slams throttle [4-6s], G-forces pull skin back with labored breathing [6-8s]. Bleach Bypass grading desaturated with retained highlights, deep blacks, natural IMAX 65mm grain. Practical instrument lights 3200K warm accents. Intense action mood.

**Keywords:** cinematic, Nolan IMAX style, epic action, 32-year-old pilot, olive flight suit, fighter cockpit, handheld 2ft/sec, harsh sunlight 5600K 45°, no diffusion, hard shadows, turbulence shake, G-force effect, Bleach Bypass, desaturated, deep blacks, IMAX 65mm grain, practical lights 3200K, 8K

**Negative Prompt:** blurry, pixelated, changing face, talking under oxygen mask, scene cuts, teleportation, inconsistent lighting, flight suit color change, broken physics

**Audio:** Orchestral 25%, fast tempo 140-160 BPM, brass and percussion. No dialogue. SFX 75%: Jet engine roar 80-200Hz, cockpit beeps 2-4kHz, air rushing, hydraulics hissing, gloved hand grip, harness creaking, labored breathing.

---

## 📝 OUTPUT FORMAT RULES

**descriptiveProse (80-120 words max):**
- Start with shot type + angle + director reference
- Describe visual details: colors, textures, lighting quality
- Include emotional tone keywords
- Timeline: [0-2s], [2-4s], [4-6s], [6-8s]
- End with color grading + mood

**keywords (30-50 keywords):**
- Include: director references, technical specs, colors, mood, "8K"
- Don't repeat descriptiveProse verbatim

**negativePrompt:**
- Keep short: quality issues, consistency issues, unwanted behaviors

**finalAudioPrompt (2-3 sentences):**
- Include: BPM, instruments, mix percentages
- Be specific about SFX frequencies

---

**AI VIDEO TIP:** Focus on WHAT it looks/feels like (visual, emotional), not technical camera specs (exact mm/f-stop). AI interprets naturally.
