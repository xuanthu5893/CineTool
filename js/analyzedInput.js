// Analyzed Script Input Screen - Tab 2

// Generate JSON generation prompt
async function generateJsonPrompt() {
  const settings = getSettings();
  const analyzedScript = document
    .getElementById("analyzedScriptInput")
    ?.value.trim();

  if (!analyzedScript) {
    alert("⚠️ Vui lòng nhập kịch bản đã được phân tích!");
    return null;
  }

  // Load general and style-specific prompts
  const [generalPrompt, stylePrompt] = await Promise.all([
    loadPromptFile("styles/general.md"),
    loadPromptFile(`styles/${settings.style}.md`),
  ]);

  if (!generalPrompt || !stylePrompt) {
    return null;
  }

  // Combine prompts
  const systemPrompt = `${generalPrompt}\n\n${stylePrompt}`;
  const userPrompt = `Based on the following analyzed script, generate the complete production JSON following the exact structure specified:

ANALYZED SCRIPT:
${analyzedScript}

PROJECT PARAMETERS:
- Duration: ${settings.duration}s (${calculateSceneCount(
    settings.duration
  )} scenes × 8s each)
- Style: ${settings.style}
- Dialogue Language: ${
    settings.dialogueLanguage === "vi-VN"
      ? "Vietnamese"
      : settings.dialogueLanguage
  }
- Aspect Ratio: ${settings.aspectRatio}

⚠️ CRITICAL OUTPUT FORMAT REQUIREMENTS:
1. Wrap your JSON in a markdown code block with \`\`\`json at the start
2. Start the JSON with the opening brace: {
3. End the JSON with the closing brace: }
4. Close the code block with \`\`\` at the end
5. NO explanatory text before or after the code block
6. NO comments inside the JSON
7. The JSON inside the code block must be valid and parseable

CORRECT FORMAT:
\`\`\`json
{
  "masterConfig": { ... },
  "scenePrompts": [ ... ]
}
\`\`\`

INCORRECT FORMATS (DO NOT USE):
❌ { ... } (without code block)
❌ Here is the JSON:
\`\`\`json
{ ... }
\`\`\`
❌ \`\`\`json
{ ... }
\`\`\`
// end of JSON

⚠️ Your response must start with \`\`\`json and end with \`\`\` - nothing else before or after.

⚠️ CRITICAL LENGTH REQUIREMENTS (MANDATORY - ENFORCED):
- descriptiveProse: MINIMUM 200 words (target 250-300 words). MUST cover ENTIRE 8-second progression with [0.0s-2.0s-4.0s-6.0s-8.0s] timeline markers. If < 200 words, output is REJECTED.
- keywords: MINIMUM 40 keywords (target 50-60). Include technical camera specs, lighting details, character consistency markers, continuity anchors.
- finalAudioPrompt: MINIMUM 2 full sentences (target 3-4 sentences). Include BPM, instruments, sound layers, dialogue timing if applicable, mix percentages.
- negativePrompt: ALL 5 categories REQUIRED with comprehensive details per category.

**WHY EXTREME DETAIL IS MANDATORY:**
Your descriptiveProse feeds DIRECTLY into Veo3 video generation AI. Veo3 is LITERAL and needs EXHAUSTIVE detail to generate consistent 8-second videos. Short/vague descriptions like "character walks forward smiling" produce TERRIBLE results with morphing faces and inconsistent motion.

YOU MUST PROVIDE (study the examples in style prompts):
- Exact measurements: character height in cm, proportions, build type
- Precise camera specs: focal length (mm), aperture (f-stop), movement speed (ft/sec)
- Frame-by-frame breakdown: What happens at 0s, 2s, 4s, 6s, 8s with micro-details
- Detailed lighting: Color temperature (Kelvin), angles (degrees), bounce/fill sources
- Specific expressions: "slight furrow of brow", "dimples visible when smiling", "eyes catch window light creating subtle iris catchlight"
- Costume details: "white cotton shirt with visible fabric weave texture and small grass stain on left knee"

STUDY THESE EXAMPLES - THIS IS THE REQUIRED DETAIL LEVEL (200-300 words each):
- Cinematic style example in cinematic.md: 280+ words describing 8s scene
- Realistic style example in realistic.md: 270+ words for worker scene
- Horror style example in horror.md: 290+ words for child hallway scene

If you write less than 200 words, you are NOT following instructions.`;

  return { systemPrompt, userPrompt };
}

// Copy JSON generation prompt to clipboard
async function copyJsonPrompt() {
  const prompts = await generateJsonPrompt();
  if (!prompts) return;

  const fullPrompt = `━━━━━━━━━━━━━━━━━━
🎬 SYSTEM PROMPT (Paste this into AI System Prompt field)
━━━━━━━━━━━━━

${prompts.systemPrompt}

━━━━━━━━━━━━━━━━━━━━━━━━
👤 USER PROMPT (Paste this into AI Chat)
━━━━━━━━━━━━━━━━━━━━━━━━

${prompts.userPrompt}`;

  const success = await copyToClipboard(fullPrompt);
  if (success) {
    showNotification("copyNotification2");
  } else {
    alert("❌ Không thể copy. Vui lòng thử lại!");
  }
}

// Initialize Analyzed Input screen
document.addEventListener("DOMContentLoaded", () => {
  // Copy JSON prompt button
  const copyBtn = document.getElementById("copyJsonPromptBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", copyJsonPrompt);
  }
});
