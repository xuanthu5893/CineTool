// Analyzed Script Input Screen - Tab 2

// Generate JSON generation prompt
async function generateJsonPrompt() {
    const settings = getSettings();
    const analyzedScript = document.getElementById('analyzedScriptInput')?.value.trim();

    if (!analyzedScript) {
        alert('⚠️ Vui lòng nhập kịch bản đã được phân tích!');
        return null;
    }

    // Load general and style-specific prompts
    const [generalPrompt, stylePrompt] = await Promise.all([
        loadPromptFile('styles/general.md'),
        loadPromptFile(`styles/${settings.style}.md`)
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
- Duration: ${settings.duration}s (${calculateSceneCount(settings.duration)} scenes × 8s each)
- Style: ${settings.style}
- Dialogue Language: ${settings.dialogueLanguage === 'vi-VN' ? 'Vietnamese' : settings.dialogueLanguage}
- Aspect Ratio: ${settings.aspectRatio}

⚠️ CRITICAL OUTPUT FORMAT REQUIREMENTS:
1. Start your response with the opening brace: {
2. End your response with the closing brace: }
3. NO markdown code blocks (no \`\`\`json or \`\`\`)
4. NO explanatory text before or after the JSON
5. NO comments inside the JSON
6. The ENTIRE response must be valid, parseable JSON that can be directly copied

CORRECT FORMAT:
{
  "masterConfig": { ... },
  "scenePrompts": [ ... ]
}

INCORRECT FORMATS (DO NOT USE):
❌ \`\`\`json
{ ... }
\`\`\`
❌ Here is the JSON:
{ ... }
❌ { ... }
// end of JSON

⚠️ Your response must start with { and end with } - nothing else before or after.`;

    return { systemPrompt, userPrompt };
}

// Copy JSON generation prompt to clipboard
async function copyJsonPrompt() {
    const prompts = await generateJsonPrompt();
    if (!prompts) return;

    const fullPrompt = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 SYSTEM PROMPT (Paste this into AI System Prompt field)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${prompts.systemPrompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 USER PROMPT (Paste this into AI Chat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${prompts.userPrompt}`;

    const success = await copyToClipboard(fullPrompt);
    if (success) {
        showNotification('copyNotification2');
    } else {
        alert('❌ Không thể copy. Vui lòng thử lại!');
    }
}

// Initialize Analyzed Input screen
document.addEventListener('DOMContentLoaded', () => {
    // Generate JSON prompt button
    const generateBtn = document.getElementById('generateJsonPromptBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const prompts = await generateJsonPrompt();
            if (prompts) {
                alert('✓ Prompt đã được tạo! Nhấn "Copy Prompt" để sao chép.');
            }
        });
    }

    // Copy JSON prompt button
    const copyBtn = document.getElementById('copyJsonPromptBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyJsonPrompt);
    }
});
