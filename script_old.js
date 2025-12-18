// Global state
let currentScreen = 1;
let settings = {
    style: 'cinematic',
    duration: 24,
    dialogueLanguage: 'vi-VN'
};

// Style file mapping
const styleFiles = {
    'cinematic': 'prompts/styles/cinematic.md',
    'cyberpunk': 'prompts/styles/cyberpunk.md',
    'realistic': 'prompts/styles/realistic.md',
    'horror': 'prompts/styles/horror.md',
    'fantasy': 'prompts/styles/fantasy.md',
    '3d_pixar': 'prompts/styles/3d_pixar.md',
    '2d_cartoon': 'prompts/styles/2d_cartoon.md',
    '2d_anime': 'prompts/styles/2d_anime.md',
    'retro': 'prompts/styles/retro.md',
    'vintage': 'prompts/styles/vintage.md'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateSceneCount();
});

// Event Listeners
function initializeEventListeners() {
    // Screen 1 events
    document.getElementById('durationInput').addEventListener('input', updateSceneCount);
    document.getElementById('styleSelect').addEventListener('change', updateSettings);
    document.getElementById('dialogueLanguageSelect').addEventListener('change', updateSettings);
    document.getElementById('copyScriptAnalysisBtn').addEventListener('click', copyScriptAnalysisPrompt);
    document.getElementById('goToScreen2Btn').addEventListener('click', () => goToScreen(2));

    // Screen 2 events
    document.getElementById('copyStylePromptBtn').addEventListener('click', copyStylePrompt);
    document.getElementById('goToScreen3Btn').addEventListener('click', () => goToScreen(3));

    // Screen 3 events
    document.getElementById('parseJsonBtn').addEventListener('click', parseJson);
    document.getElementById('jsonInput').addEventListener('input', decodeJsonInput);
    document.getElementById('jsonInput').addEventListener('paste', decodeJsonInputOnPaste);
}

// Update scene count based on duration
function updateSceneCount() {
    const duration = parseInt(document.getElementById('durationInput').value);
    const sceneCount = Math.ceil(duration / 8);
    document.getElementById('sceneCount').textContent = sceneCount;
}

// Update settings
function updateSettings() {
    settings.style = document.getElementById('styleSelect').value;
    settings.duration = parseInt(document.getElementById('durationInput').value);
    settings.dialogueLanguage = document.getElementById('dialogueLanguageSelect').value;
}

// Screen Navigation
function goToScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    document.getElementById('screen' + screenNumber).classList.add('active');
    currentScreen = screenNumber;

    // Update settings display on screen 2
    if (screenNumber === 2) {
        updateScreen2Display();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Update Screen 2 display with current settings
function updateScreen2Display() {
    const styleNames = {
        'cinematic': 'Cinematic',
        'cyberpunk': 'Cyberpunk',
        'realistic': 'Realistic',
        'horror': 'Horror',
        'fantasy': 'Fantasy',
        '3d_pixar': '3D Pixar',
        '2d_cartoon': '2D Cartoon',
        '2d_anime': '2D Anime',
        'retro': 'Retro',
        'vintage': 'Vintage'
    };

    const languageNames = {
        'vi-VN': 'Tiếng Việt',
        'en-US': 'English',
        'zh-CN': '中文',
        'ja-JP': '日本語',
        'ko-KR': '한국어',
        'th-TH': 'ไทย',
        'fr-FR': 'Français',
        'es-ES': 'Español'
    };

    updateSettings();
    document.getElementById('displayStyle').textContent = styleNames[settings.style];
    document.getElementById('displayDuration').textContent = settings.duration;
    document.getElementById('displaySceneCount').textContent = Math.ceil(settings.duration / 8);
    document.getElementById('displayDialogueLanguage').textContent = languageNames[settings.dialogueLanguage];
}

// Copy Script Analysis Prompt (Screen 1)
async function copyScriptAnalysisPrompt() {
    const scriptContent = document.getElementById('scriptInput').value.trim();

    if (!scriptContent) {
        alert('⚠️ Vui lòng nhập nội dung kịch bản trước!');
        return;
    }

    updateSettings();

    try {
        // Load kichban.md
        const kichbanPrompt = await loadPromptFile('prompts/styles/kichban.md');

        // Combine kichban prompt with user's script
        const combinedPrompt = `${kichbanPrompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 USER'S SCRIPT CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${scriptContent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Desired Duration: ${settings.duration} seconds
Required Scenes: ${Math.ceil(settings.duration / 8)} scenes (8 seconds each)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analyze the script above and create a detailed scene breakdown following the exact format specified.`;

        // Copy to clipboard
        await navigator.clipboard.writeText(combinedPrompt);
        showNotification('copyNotification1');

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Có lỗi xảy ra khi tạo prompt. Vui lòng thử lại!');
    }
}

// Copy Style Prompt (Screen 2)
async function copyStylePrompt() {
    const analyzedScript = document.getElementById('analyzedScriptInput').value.trim();

    if (!analyzedScript) {
        alert('⚠️ Vui lòng nhập kịch bản đã phân tích trước!');
        return;
    }

    try {
        // Load general rules and style-specific prompt files
        const generalPrompt = await loadPromptFile('prompts/styles/general.md');
        const stylePrompt = await loadPromptFile(styleFiles[settings.style]);

        // Get language name
        const languageNames = {
            'vi-VN': 'Vietnamese',
            'en-US': 'English',
            'zh-CN': 'Chinese',
            'ja-JP': 'Japanese',
            'ko-KR': 'Korean',
            'th-TH': 'Thai',
            'fr-FR': 'French',
            'es-ES': 'Spanish'
        };

        // Combine general rules + style-specific prompt with analyzed script
        const combinedPrompt = `${generalPrompt}

${stylePrompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ANALYZED SCRIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analyzedScript}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ DETAILED SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Style: ${settings.style.toUpperCase()}
Duration: ${settings.duration} seconds
Scene Count: ${Math.ceil(settings.duration / 8)} scenes
Dialogue Language: ${languageNames[settings.dialogueLanguage]}

⚠️ LANGUAGE REQUIREMENT:
- Dialogue text (embedded in descriptiveProse and finalAudioPrompt) ONLY must be in ${languageNames[settings.dialogueLanguage]}
- ALL other content (finalVideoPrompt technical descriptions, character descriptions, etc.) must be in ENGLISH

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create complete Production JSON Data following the ${settings.style} style and the analyzed script above.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ CRITICAL OUTPUT FORMAT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**MANDATORY JSON OUTPUT FORMAT:**
1. Start your response with the opening brace: {
2. End your response with the closing brace: }
3. NO markdown code blocks (no \`\`\`json or \`\`\`)
4. NO explanatory text before or after the JSON
5. NO comments inside the JSON
6. The ENTIRE response must be valid, parseable JSON that can be directly copied

**CORRECT FORMAT:**
{
  "masterConfig": { ... },
  "scenePrompts": [ ... ]
}

**INCORRECT FORMATS (DO NOT USE):**
❌ \`\`\`json
{ ... }
\`\`\`
❌ Here is the JSON:
{ ... }
❌ { ... }
// end of JSON

⚠️ Your response must start with { and end with } - nothing else before or after.`;

        // Copy to clipboard
        await navigator.clipboard.writeText(combinedPrompt);
        showNotification('copyNotification2');

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Có lỗi xảy ra khi tạo prompt. Vui lòng thử lại!');
    }
}

// Load prompt file from local
async function loadPromptFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading prompt file:', error);
        throw error;
    }
}

// Show notification
function showNotification(notificationId) {
    const notification = document.getElementById(notificationId);
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Decode Unicode escape sequences in textarea input
function decodeUnicodeEscapes(text) {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
}

// Auto-decode on paste event
function decodeJsonInputOnPaste() {
    // Wait for paste to complete, then decode
    setTimeout(() => {
        const textarea = document.getElementById('jsonInput');
        const decoded = decodeUnicodeEscapes(textarea.value);
        if (decoded !== textarea.value) {
            textarea.value = decoded;
        }
    }, 10);
}

// Auto-decode on input change
function decodeJsonInput() {
    const textarea = document.getElementById('jsonInput');
    const cursorPosition = textarea.selectionStart;
    const decoded = decodeUnicodeEscapes(textarea.value);

    if (decoded !== textarea.value) {
        textarea.value = decoded;
        // Restore cursor position
        textarea.setSelectionRange(cursorPosition, cursorPosition);
    }
}

// Parse JSON (Screen 3)
function parseJson() {
    let jsonInput = document.getElementById('jsonInput').value.trim();

    if (!jsonInput) {
        alert('⚠️ Vui lòng nhập JSON trước!');
        return;
    }

    try {
        // Sanitize JSON: Decode ALL Unicode escape sequences like \uXXXX
        // This handles both punctuation (quotes, dashes) and international characters (Vietnamese, Chinese, etc.)
        jsonInput = jsonInput.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        });

        const data = JSON.parse(jsonInput);

        // Validate JSON structure
        if (!data.masterConfig || !data.scenePrompts) {
            throw new Error('Invalid JSON structure. Missing masterConfig or scenePrompts.');
        }

        // Store data globally first for copy functions
        window.currentJsonData = data;

        // Display scenes
        displayScenes(data.scenePrompts);

        // Display references
        displayReferences(data);

    } catch (error) {
        console.error('JSON Parse Error:', error);
        alert('❌ JSON không hợp lệ! Vui lòng kiểm tra lại.\n\nLỗi: ' + error.message);
    }
}

// Display scenes in SCENES tab
function displayScenes(scenePrompts) {
    const scenesOutput = document.getElementById('scenesOutput');
    scenesOutput.innerHTML = '';

    scenePrompts.forEach((scene, index) => {
        const sceneCard = document.createElement('div');
        sceneCard.className = 'scene-card';

        // Extract dialogue from descriptiveProse if it exists
        let dialogueInfo = '';
        const descriptiveProse = scene.finalVideoPrompt?.descriptiveProse || '';
        const dialogueMatch = descriptiveProse.match(/At \[[\d.]+s?-[\d.]+s?\].*?(?:speaks|speaking).*?['"]([^'"]+)['"]/i);

        if (dialogueMatch) {
            dialogueInfo = `<p><strong>Dialogue:</strong> "${dialogueMatch[1]}"</p>`;
        }

        // Get references info
        const referencesText = scene.references ? scene.references.join(', ') : 'N/A';

        // Get short preview of descriptiveProse (first 150 chars)
        const prosePreview = descriptiveProse.substring(0, 150) + (descriptiveProse.length > 150 ? '...' : '');

        sceneCard.innerHTML = `
            <h4>🎬 Cảnh ${scene.sceneNumber} (${scene.estimatedDuration}s)</h4>
            <p><strong>References:</strong> ${referencesText}</p>
            ${dialogueInfo}
            <p><strong>Description:</strong> ${prosePreview}</p>
            <button class="btn btn-primary copy-btn" onclick="copyScenePrompt(${index})">📋 Copy Video Prompt</button>
            <button class="btn btn-secondary copy-btn" onclick="copySceneAudio(${index})">🔊 Copy Audio Prompt</button>
        `;

        scenesOutput.appendChild(sceneCard);
    });
}

// Display references in REFERENCES tab
function displayReferences(data) {
    // Combine all profiles (characters + backgrounds) into one unified 2-column table
    const masterConfigOutput = document.getElementById('masterConfigOutput');

    let allProfiles = [];

    // Add character profiles
    if (data.masterConfig.characterProfiles && data.masterConfig.characterProfiles.length > 0) {
        data.masterConfig.characterProfiles.forEach(char => {
            allProfiles.push({
                id: char.id,
                description: char.description || 'N/A'
            });
        });
    }

    // Add background profiles
    if (data.masterConfig.backgroundProfiles && data.masterConfig.backgroundProfiles.length > 0) {
        data.masterConfig.backgroundProfiles.forEach(bg => {
            allProfiles.push({
                id: bg.id,
                description: bg.description || 'N/A'
            });
        });
    }

    if (allProfiles.length > 0) {
        let html = `
            <table class="references-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">ID</th>
                        <th style="width: 75%;">Description</th>
                    </tr>
                </thead>
                <tbody>
        `;

        allProfiles.forEach(profile => {
            html += `
                <tr>
                    <td><code class="ref-id">${profile.id}</code></td>
                    <td class="ref-description">${profile.description}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        masterConfigOutput.innerHTML = html;
    } else {
        masterConfigOutput.innerHTML = '<p class="placeholder">Không có dữ liệu tham chiếu.</p>';
    }

    // Hide Character Profiles section since we're showing everything in Master Config
    const characterProfilesOutput = document.getElementById('characterProfilesOutput');
    if (characterProfilesOutput && characterProfilesOutput.parentElement) {
        characterProfilesOutput.parentElement.style.display = 'none';
    }
}

// Copy all references to clipboard
function copyAllReferences(event) {
    if (!window.currentJsonData || !window.currentJsonData.masterConfig) {
        alert('❌ Không có dữ liệu references để copy!');
        return;
    }

    const masterConfig = window.currentJsonData.masterConfig;
    let allRefs = [];

    // Collect all character profiles
    if (masterConfig.characterProfiles && masterConfig.characterProfiles.length > 0) {
        masterConfig.characterProfiles.forEach(char => {
            allRefs.push({
                id: char.id,
                description: char.description || 'N/A'
            });
        });
    }

    // Collect all background profiles
    if (masterConfig.backgroundProfiles && masterConfig.backgroundProfiles.length > 0) {
        masterConfig.backgroundProfiles.forEach(bg => {
            allRefs.push({
                id: bg.id,
                description: bg.description || 'N/A'
            });
        });
    }

    if (allRefs.length === 0) {
        alert('❌ Không có references nào để copy!');
        return;
    }

    // Format: description + ', "References": "' + id
    // Each ref separated by blank line
    let copyText = allRefs.map(ref => {
        return `${ref.description}, "References": "${ref.id}"`;
    }).join('\n\n');

    // Copy to clipboard
    navigator.clipboard.writeText(copyText).then(() => {
        // Visual feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Đã Copy!';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('❌ Không thể copy. Vui lòng thử lại!');
    });
}

// Copy all scenes to clipboard
function copyAllScenes(event) {
    if (!window.currentJsonData || !window.currentJsonData.scenePrompts) {
        alert('❌ Không có dữ liệu scenes để copy!');
        return;
    }

    const data = window.currentJsonData;
    const baseVisualPrompt = data.masterConfig?.baseVisualPrompt || '';
    const scenes = data.scenePrompts;

    if (scenes.length === 0) {
        alert('❌ Không có scenes nào để copy!');
        return;
    }

    // Format each scene: baseVisualPrompt + descriptiveProse + keywords + negativePrompt + 'Audio' + finalAudioPrompt + '. "References": ' + references
    let copyText = scenes.map(scene => {
        const videoPrompt = scene.finalVideoPrompt;
        const audioPrompt = scene.finalAudioPrompt || '';
        const references = scene.references ? scene.references.join(', ') : '';

        // Combine all negative prompt fields
        let negativePromptText = '';
        if (videoPrompt.negativePrompt) {
            const np = videoPrompt.negativePrompt;
            negativePromptText = [
                np.visualQuality,
                np.characterConsistency,
                np.unwantedBehavior,
                np.sceneCoherence,
                np.technicalIssues
            ].filter(Boolean).join(', ');
        }

        // Build the complete scene text
        let sceneText = baseVisualPrompt;
        if (videoPrompt.descriptiveProse) sceneText += ' ' + videoPrompt.descriptiveProse;
        if (videoPrompt.keywords) sceneText += ' ' + videoPrompt.keywords;
        if (negativePromptText) sceneText += ' ' + negativePromptText;
        if (audioPrompt) sceneText += ' Audio ' + audioPrompt;
        if (references) sceneText += '. "References": ' + references;

        return sceneText;
    }).join('\n\n');

    // Copy to clipboard
    navigator.clipboard.writeText(copyText).then(() => {
        // Visual feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Đã Copy!';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('❌ Không thể copy. Vui lòng thử lại!');
    });
}

// Copy individual scene video prompt
function copyScenePrompt(index) {
    if (!window.currentJsonData || !window.currentJsonData.scenePrompts[index]) {
        alert('❌ Không tìm thấy dữ liệu cảnh!');
        return;
    }

    const scene = window.currentJsonData.scenePrompts[index];
    const videoPrompt = scene.finalVideoPrompt;

    if (!videoPrompt) {
        alert('❌ Cảnh này không có video prompt!');
        return;
    }

    // Build prompt text
    let promptText = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 VIDEO PROMPT - SCENE ${scene.sceneNumber}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${videoPrompt.descriptiveProse}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️ KEYWORDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${videoPrompt.keywords}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 NEGATIVE PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Visual Quality: ${videoPrompt.negativePrompt.visualQuality}
Character Consistency: ${videoPrompt.negativePrompt.characterConsistency}
Unwanted Behavior: ${videoPrompt.negativePrompt.unwantedBehavior}
Scene Coherence: ${videoPrompt.negativePrompt.sceneCoherence}
Technical Issues: ${videoPrompt.negativePrompt.technicalIssues}`;

    navigator.clipboard.writeText(promptText).then(() => {
        alert('✓ Đã copy Video Prompt của Cảnh ' + scene.sceneNumber + '!');
    }).catch(err => {
        console.error('Copy error:', err);
        alert('❌ Không thể copy. Vui lòng thử lại!');
    });
}

// Copy individual scene audio prompt
function copySceneAudio(index) {
    if (!window.currentJsonData || !window.currentJsonData.scenePrompts[index]) {
        alert('❌ Không tìm thấy dữ liệu cảnh!');
        return;
    }

    const scene = window.currentJsonData.scenePrompts[index];
    const audioPrompt = scene.finalAudioPrompt;

    if (!audioPrompt) {
        alert('❌ Cảnh này không có audio prompt!');
        return;
    }

    const promptText = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔊 AUDIO PROMPT - SCENE ${scene.sceneNumber}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${audioPrompt}`;

    navigator.clipboard.writeText(promptText).then(() => {
        alert('✓ Đã copy Audio Prompt của Cảnh ' + scene.sceneNumber + '!');
    }).catch(err => {
        console.error('Copy error:', err);
        alert('❌ Không thể copy. Vui lòng thử lại!');
    });
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}
