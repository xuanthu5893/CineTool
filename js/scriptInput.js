// Script Input Screen - Tab 1

// Load prompt files
async function loadPromptFile(filename) {
    try {
        const response = await fetch(`prompts/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return await response.text();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        alert(`⚠️ Không thể tải file prompt: ${filename}`);
        return '';
    }
}

// Generate script analysis prompt
async function generateScriptPrompt() {
    const settings = getSettings();
    const scriptText = document.getElementById('scriptInputArea')?.value.trim();

    if (!scriptText) {
        alert('⚠️ Vui lòng nhập nội dung kịch bản!');
        return null;
    }

    // Update display values
    updateDisplayValue('displayStyle', settings.style.charAt(0).toUpperCase() + settings.style.slice(1));
    updateDisplayValue('displayDialogueLanguage', settings.dialogueLanguage === 'vi-VN' ? 'Tiếng Việt' : settings.dialogueLanguage);
    updateDisplayValue('displayDuration', settings.duration);
    updateDisplayValue('displaySceneCount', calculateSceneCount(settings.duration));

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
    const userPrompt = `STORY SCRIPT: ${scriptText}\n\nPROJECT PARAMETERS:\n\nDuration: ${settings.duration}s → EXACTLY ${calculateSceneCount(settings.duration)} scenes (8s each)\n\nIf short: add establishing/transition shots | If long: split actions\n\n⚠️ BREVITY REQUIRED - Keep output concise:\n\nfinalVideoPrompt.descriptiveProse: ~200-300 words\n\nfinalVideoPrompt.keywords: 40-60 keywords\n\nfinalAudioPrompt: 2-3 sentences with BPM and mix %\n\n⚠️ LANGUAGE REQUIREMENT:\n- dialogueContent.text ONLY in ${settings.dialogueLanguage === 'vi-VN' ? 'Vietnamese' : settings.dialogueLanguage}\n- ALL other content (finalVideoPrompt, finalAudioPrompt) in ENGLISH\n\nVALIDATION:\n\nscenePrompts.length === ${calculateSceneCount(settings.duration)}\n\nEach scene: sceneNumber + references array + estimatedDuration + finalVideoPrompt {descriptiveProse, keywords, negativePrompt} + finalAudioPrompt\n\n⚠️ CRITICAL: Return ONLY pure JSON - NO markdown, NO explanation. Ensure JSON is valid.`;

    return { systemPrompt, userPrompt };
}

// Copy prompt to clipboard
async function copyScriptPrompt() {
    const prompts = await generateScriptPrompt();
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
        showNotification('copyNotification1');
    } else {
        alert('❌ Không thể copy. Vui lòng thử lại!');
    }
}

// Update scene count display when duration changes
function updateSceneCount() {
    const duration = parseInt(document.getElementById('durationInput')?.value || '24');
    updateDisplayValue('sceneCountDisplay', calculateSceneCount(duration));
}

// Initialize Script Input screen
document.addEventListener('DOMContentLoaded', () => {
    // Duration input listener
    const durationInput = document.getElementById('durationInput');
    if (durationInput) {
        durationInput.addEventListener('input', updateSceneCount);
    }

    // Generate prompt button
    const generateBtn = document.getElementById('generatePromptBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const prompts = await generateScriptPrompt();
            if (prompts) {
                alert('✓ Prompt đã được tạo! Nhấn "Copy Prompt" để sao chép.');
            }
        });
    }

    // Copy prompt button
    const copyBtn = document.getElementById('copyPromptBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyScriptPrompt);
    }
});
