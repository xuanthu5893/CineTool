// Navigation management for tab switching

// Switch between main screens (Script Input, Analyzed Input, JSON Filter)
function switchScreen(screenId) {
    // Hide all tab panels
    const allPanels = document.querySelectorAll('.tab-panel');
    allPanels.forEach(panel => panel.classList.remove('active'));

    // Show selected panel
    const selectedPanel = document.getElementById(screenId);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }

    // Update nav tab states
    const allTabs = document.querySelectorAll('.nav-tab');
    allTabs.forEach(tab => {
        if (tab.dataset.tab === screenId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Switch between sub-tabs (Scenes/References)
function switchTab(tabName) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    const scenesTab = document.getElementById('scenesTab');
    const referencesTab = document.getElementById('referencesTab');

    if (tabName === 'scenes') {
        scenesTab.classList.add('active');
        referencesTab.classList.remove('active');
    } else if (tabName === 'references') {
        referencesTab.classList.add('active');
        scenesTab.classList.remove('active');
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    // Set initial screen
    switchScreen('scriptInput');
});
