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

    // Load screenplay analysis prompt (kichban.md)
    const kichbanPrompt = await loadPromptFile('styles/kichban.md');

    if (!kichbanPrompt) {
        return null;
    }

    // System prompt is the kichban.md content
    const systemPrompt = kichbanPrompt;

    // User prompt with the story idea
    const userPrompt = `Ý TƯỞNG CỐT LÕI:
${scriptText}

THÔNG SỐ DỰ ÁN:
- Thời lượng: ${settings.duration} giây (${calculateSceneCount(settings.duration)} cảnh × 8 giây/cảnh)
- Phong cách dự kiến: ${settings.style}
- Ngôn ngữ đối thoại: ${settings.dialogueLanguage === 'vi-VN' ? 'Tiếng Việt' : settings.dialogueLanguage}

Hãy phân tích ý tưởng và viết kịch bản phân cảnh chi tiết theo đúng format đã nêu trong hướng dẫn.`;

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

    // Copy prompt button
    const copyBtn = document.getElementById('copyPromptBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyScriptPrompt);
    }
});
