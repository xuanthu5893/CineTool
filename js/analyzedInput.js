// Analyzed Script Input Screen - Tab 2

// Generate JSON generation prompt
async function generateJsonPrompt() {
  const settings = getSettings();
  const analyzedScript = document
    .getElementById("analyzedScriptInput")
    ?.value.trim();

  if (!analyzedScript) {
    await showAlert("Vui lòng nhập kịch bản đã được phân tích!", "warning");
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

⚠️ Your response must start with \`\`\`json and end with \`\`\` - nothing else before or after.`;

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
    await showAlert("Không thể copy. Vui lòng thử lại!", "error");
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
