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

// ===============================================
// MODAL/POPUP UTILITIES
// ===============================================

// Show custom modal dialog
function showModal(type, title, message, buttons = null) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('modalOverlay');
        const modal = overlay.querySelector('.modal-content');
        const iconEl = modal.querySelector('.modal-icon');
        const titleEl = modal.querySelector('.modal-title');
        const bodyEl = modal.querySelector('.modal-body');
        const buttonsEl = modal.querySelector('.modal-buttons');

        // Set icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        iconEl.textContent = icons[type] || icons.info;
        iconEl.className = `modal-icon ${type}`;

        // Set title and message
        titleEl.textContent = title;
        bodyEl.innerHTML = `<p>${message}</p>`;

        // Set buttons
        if (buttons) {
            buttonsEl.innerHTML = '';
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = `modal-btn ${btn.primary ? 'modal-btn-primary' : 'modal-btn-secondary'}`;
                button.textContent = btn.text;
                button.onclick = () => {
                    closeModal();
                    resolve(btn.value);
                };
                buttonsEl.appendChild(button);
            });
        } else {
            // Default OK button
            buttonsEl.innerHTML = '<button class="modal-btn modal-btn-primary" onclick="closeModal()">OK</button>';
        }

        // Show modal
        overlay.classList.add('active');
    });
}

// Show alert dialog
function showAlert(message, type = 'info') {
    return showModal(type, type === 'error' ? 'Lỗi' : type === 'success' ? 'Thành công' : type === 'warning' ? 'Cảnh báo' : 'Thông báo', message);
}

// Show confirm dialog
function showConfirm(title, message) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('modalOverlay');
        const modal = overlay.querySelector('.modal-content');
        const iconEl = modal.querySelector('.modal-icon');
        const titleEl = modal.querySelector('.modal-title');
        const bodyEl = modal.querySelector('.modal-body');
        const buttonsEl = modal.querySelector('.modal-buttons');

        iconEl.textContent = '❓';
        iconEl.className = 'modal-icon info';
        titleEl.textContent = title;
        bodyEl.innerHTML = `<p>${message}</p>`;

        buttonsEl.innerHTML = `
            <button class="modal-btn modal-btn-secondary" id="modalCancelBtn">Cancel</button>
            <button class="modal-btn modal-btn-primary" id="modalOkBtn">OK</button>
        `;

        document.getElementById('modalOkBtn').onclick = () => {
            closeModal();
            resolve(true);
        };
        document.getElementById('modalCancelBtn').onclick = () => {
            closeModal();
            resolve(false);
        };

        overlay.classList.add('active');
    });
}

// Show prompt dialog
function showPrompt(title, message, placeholder = '') {
    return new Promise((resolve) => {
        const overlay = document.getElementById('modalOverlay');
        const modal = overlay.querySelector('.modal-content');
        const iconEl = modal.querySelector('.modal-icon');
        const titleEl = modal.querySelector('.modal-title');
        const bodyEl = modal.querySelector('.modal-body');
        const buttonsEl = modal.querySelector('.modal-buttons');

        iconEl.textContent = '🔑';
        iconEl.className = 'modal-icon info';
        titleEl.textContent = title;
        bodyEl.innerHTML = `
            <p>${message}</p>
            <input type="text" class="modal-input" id="modalInput" placeholder="${placeholder}" />
        `;

        buttonsEl.innerHTML = `
            <button class="modal-btn modal-btn-secondary" id="modalCancelBtn">Cancel</button>
            <button class="modal-btn modal-btn-primary" id="modalOkBtn">OK</button>
        `;

        const inputEl = document.getElementById('modalInput');

        document.getElementById('modalOkBtn').onclick = () => {
            const value = inputEl.value.trim();
            closeModal();
            resolve(value || null);
        };
        document.getElementById('modalCancelBtn').onclick = () => {
            closeModal();
            resolve(null);
        };

        // Focus input and handle Enter key
        setTimeout(() => {
            inputEl.focus();
            inputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('modalOkBtn').click();
                }
            });
        }, 100);

        overlay.classList.add('active');
    });
}

// Close modal
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
}
