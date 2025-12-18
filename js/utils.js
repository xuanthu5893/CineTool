// Utility functions shared across modules

// Show notification
function showNotification(notificationId) {
    const notification = document.getElementById(notificationId);
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

// Decode Unicode escape sequences
function decodeUnicode(str) {
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
}

// Format JSON with proper indentation
function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

// Parse JSON safely
function parseJSON(jsonString) {
    try {
        // Decode Unicode sequences first
        const decoded = decodeUnicode(jsonString);
        return JSON.parse(decoded);
    } catch (error) {
        throw new Error(`JSON Parse Error: ${error.message}`);
    }
}

// Calculate scene count from duration
function calculateSceneCount(duration) {
    return Math.ceil(duration / 8);
}

// Update display values
function updateDisplayValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Get settings from UI
function getSettings() {
    return {
        style: document.getElementById('styleSelect')?.value || 'cinematic',
        dialogueLanguage: document.getElementById('dialogueLanguageSelect')?.value || 'vi-VN',
        duration: parseInt(document.getElementById('durationInput')?.value || '24'),
        aspectRatio: document.getElementById('aspectRatioSelect')?.value || '16:9'
    };
}

// Global data storage
window.currentJsonData = null;
