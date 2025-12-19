// JSON Filter Screen - Tab 3

// Parse and analyze JSON input
async function parseJsonInput() {
  const jsonInput = document.getElementById("jsonInput")?.value.trim();

  if (!jsonInput) {
    await showAlert("Vui lòng nhập JSON!", "warning");
    return;
  }

  try {
    // Decode Unicode escape sequences
    const decodedInput = decodeUnicode(jsonInput);
    const data = JSON.parse(decodedInput);

    // Validate JSON structure
    if (!data.masterConfig || !data.scenePrompts) {
      throw new Error(
        "Invalid JSON structure. Missing masterConfig or scenePrompts."
      );
    }

    // Store data globally first for copy functions
    window.currentJsonData = data;

    // Display scenes
    displayScenes(data.scenePrompts);

    // Display references
    displayReferences(data);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    await showAlert(
      "JSON không hợp lệ! Vui lòng kiểm tra lại.\n\nLỗi: " + error.message,
      "error"
    );
  }
}

// Display scenes in SCENES tab
function displayScenes(scenePrompts) {
  const scenesOutput = document.getElementById("scenesOutput");
  if (!scenesOutput) return;

  scenesOutput.innerHTML = "";

  scenePrompts.forEach((scene, index) => {
    const videoPrompt = scene.finalVideoPrompt;
    const references = scene.references ? scene.references.join(", ") : "N/A";

    // Preview of descriptive prose (first 150 chars)
    const prosePreview = videoPrompt.descriptiveProse
      ? videoPrompt.descriptiveProse.substring(0, 150) + "..."
      : "N/A";

    // Dialogue info
    let dialogueInfo = "";
    if (scene.dialogueContent) {
      dialogueInfo = `<p><strong>Dialogue:</strong> "${scene.dialogueContent.text}" (${scene.dialogueContent.speaker})</p>`;
    }

    const sceneCard = document.createElement("div");
    sceneCard.className = "scene-card";
    sceneCard.innerHTML = `
            <h4>🎬 Scene ${scene.sceneNumber} (${scene.estimatedDuration}s)</h4>
            <p><strong>References:</strong> ${references}</p>
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
  const masterConfigOutput = document.getElementById("masterConfigOutput");

  let allProfiles = [];

  // Add character profiles
  if (
    data.masterConfig.characterProfiles &&
    data.masterConfig.characterProfiles.length > 0
  ) {
    data.masterConfig.characterProfiles.forEach((char) => {
      allProfiles.push({
        id: char.id,
        description: char.description || "N/A",
      });
    });
  }

  // Add background profiles
  if (
    data.masterConfig.backgroundProfiles &&
    data.masterConfig.backgroundProfiles.length > 0
  ) {
    data.masterConfig.backgroundProfiles.forEach((bg) => {
      allProfiles.push({
        id: bg.id,
        description: bg.description || "N/A",
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

    allProfiles.forEach((profile) => {
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
    masterConfigOutput.innerHTML =
      '<p class="placeholder">Không có dữ liệu tham chiếu.</p>';
  }

  // Hide Character Profiles section since we're showing everything in Master Config
  const characterProfilesOutput = document.getElementById(
    "characterProfilesOutput"
  );
  if (characterProfilesOutput && characterProfilesOutput.parentElement) {
    characterProfilesOutput.parentElement.style.display = "none";
  }
}

// Copy all references to clipboard
async function copyAllReferences(event) {
  if (!window.currentJsonData || !window.currentJsonData.masterConfig) {
    await showAlert("Không có dữ liệu references để copy!", "error");
    return;
  }

  const masterConfig = window.currentJsonData.masterConfig;
  let allRefs = [];

  // Collect all character profiles
  if (
    masterConfig.characterProfiles &&
    masterConfig.characterProfiles.length > 0
  ) {
    masterConfig.characterProfiles.forEach((char) => {
      allRefs.push({
        id: char.id,
        description: char.description || "N/A",
      });
    });
  }

  // Collect all background profiles
  if (
    masterConfig.backgroundProfiles &&
    masterConfig.backgroundProfiles.length > 0
  ) {
    masterConfig.backgroundProfiles.forEach((bg) => {
      allRefs.push({
        id: bg.id,
        description: bg.description || "N/A",
      });
    });
  }

  if (allRefs.length === 0) {
    await showAlert("Không có references nào để copy!", "error");
    return;
  }

  // Format: description + ', "References": "' + id
  // Each ref separated by blank line
  let copyText = allRefs
    .map((ref) => {
      return `${ref.description}, "References": "${ref.id}"`;
    })
    .join("\n\n");

  // Copy to clipboard
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      // Visual feedback
      const btn = event.target;
      const originalText = btn.innerHTML;
      btn.innerHTML = "✅ Đã Copy!";
      btn.style.background = "#28a745";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 2000);
    })
    .catch(async (err) => {
      console.error("Copy failed:", err);
      await showAlert("Không thể copy. Vui lòng thử lại!", "error");
    });
}

// Copy all scenes to clipboard
async function copyAllScenes(event) {
  if (!window.currentJsonData || !window.currentJsonData.scenePrompts) {
    await showAlert("Không có dữ liệu scenes để copy!", "error");
    return;
  }

  const data = window.currentJsonData;
  const baseVisualPrompt = data.masterConfig?.baseVisualPrompt || "";
  const scenes = data.scenePrompts;

  if (scenes.length === 0) {
    await showAlert("Không có scenes nào để copy!", "error");
    return;
  }

  // Check if user wants to include reference details
  const includeReferenceDetails = document.getElementById("includeReferenceDetails")?.checked || false;

  // Build a map of all references for quick lookup
  let referenceMap = new Map();
  if (includeReferenceDetails) {
    // Add character profiles
    if (data.masterConfig.characterProfiles) {
      data.masterConfig.characterProfiles.forEach(char => {
        referenceMap.set(char.id, char.description || "N/A");
      });
    }
    // Add background profiles
    if (data.masterConfig.backgroundProfiles) {
      data.masterConfig.backgroundProfiles.forEach(bg => {
        referenceMap.set(bg.id, bg.description || "N/A");
      });
    }
  }

  // Format each scene: baseVisualPrompt + descriptiveProse + keywords + negativePrompt + 'Audio' + finalAudioPrompt + '. "References": ' + references + reference details
  let copyText = scenes
    .map((scene) => {
      const videoPrompt = scene.finalVideoPrompt;
      const audioPrompt = scene.finalAudioPrompt || "";
      const references = scene.references ? scene.references.join(", ") : "";

      // Combine all negative prompt fields
      let negativePromptText = "";
      if (videoPrompt.negativePrompt) {
        const np = videoPrompt.negativePrompt;
        negativePromptText = [
          np.visualQuality,
          np.characterConsistency,
          np.unwantedBehavior,
          np.sceneCoherence,
          np.technicalIssues,
        ]
          .filter(Boolean)
          .join(", ");
      }

      // Build the complete scene text
      let sceneText = baseVisualPrompt;
      if (videoPrompt.descriptiveProse)
        sceneText += " " + videoPrompt.descriptiveProse;
      if (videoPrompt.keywords) sceneText += " " + videoPrompt.keywords;
      if (negativePromptText) sceneText += " " + negativePromptText;
      if (audioPrompt) sceneText += " Audio " + audioPrompt;
      if (references) sceneText += '. "References": "' + references + '"';

      // Add reference details if checkbox is checked
      if (includeReferenceDetails && scene.references && scene.references.length > 0) {
        const referenceDetails = scene.references
          .map(refId => {
            const description = referenceMap.get(refId);
            return description ? `[${refId.toUpperCase()}]: ${description}` : null;
          })
          .filter(Boolean)
          .join(" | ");

        if (referenceDetails) {
          sceneText += ". CHARACTER/BACKGROUND REFERENCES: " + referenceDetails;
        }
      }

      return sceneText;
    })
    .join("\n\n");

  // Copy to clipboard
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      // Visual feedback
      const btn = event.target;
      const originalText = btn.innerHTML;
      btn.innerHTML = "✅ Đã Copy!";
      btn.style.background = "#28a745";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 2000);
    })
    .catch(async (err) => {
      console.error("Copy failed:", err);
      await showAlert("Không thể copy. Vui lòng thử lại!", "error");
    });
}

// Copy individual scene video prompt
async function copyScenePrompt(index) {
  if (!window.currentJsonData || !window.currentJsonData.scenePrompts[index]) {
    await showAlert("Không tìm thấy dữ liệu cảnh!", "error");
    return;
  }

  const scene = window.currentJsonData.scenePrompts[index];
  const videoPrompt = scene.finalVideoPrompt;

  if (!videoPrompt) {
    await showAlert("Cảnh này không có video prompt!", "error");
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
`;

  if (videoPrompt.negativePrompt) {
    const np = videoPrompt.negativePrompt;
    if (np.visualQuality) promptText += `\nVisual Quality: ${np.visualQuality}`;
    if (np.characterConsistency)
      promptText += `\nCharacter Consistency: ${np.characterConsistency}`;
    if (np.unwantedBehavior)
      promptText += `\nUnwanted Behavior: ${np.unwantedBehavior}`;
    if (np.sceneCoherence)
      promptText += `\nScene Coherence: ${np.sceneCoherence}`;
    if (np.technicalIssues)
      promptText += `\nTechnical Issues: ${np.technicalIssues}`;
  }

  // Copy to clipboard
  navigator.clipboard
    .writeText(promptText)
    .then(async () => {
      await showAlert("Đã copy video prompt vào clipboard!", "success");
    })
    .catch(async (err) => {
      console.error("Copy failed:", err);
      await showAlert("Không thể copy. Vui lòng thử lại!", "error");
    });
}

// Copy individual scene audio prompt
async function copySceneAudio(index) {
  if (!window.currentJsonData || !window.currentJsonData.scenePrompts[index]) {
    await showAlert("Không tìm thấy dữ liệu cảnh!", "error");
    return;
  }

  const scene = window.currentJsonData.scenePrompts[index];
  const audioPrompt = scene.finalAudioPrompt;

  if (!audioPrompt) {
    await showAlert("Cảnh này không có audio prompt!", "error");
    return;
  }

  const promptText = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔊 AUDIO PROMPT - SCENE ${scene.sceneNumber}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${audioPrompt}`;

  // Copy to clipboard
  navigator.clipboard
    .writeText(promptText)
    .then(async () => {
      await showAlert("Đã copy audio prompt vào clipboard!", "success");
    })
    .catch(async (err) => {
      console.error("Copy failed:", err);
      await showAlert("Không thể copy. Vui lòng thử lại!", "error");
    });
}

// Initialize JSON Filter screen
document.addEventListener("DOMContentLoaded", () => {
  // Parse JSON button
  const parseBtn = document.getElementById("parseJsonBtn");
  if (parseBtn) {
    parseBtn.addEventListener("click", parseJsonInput);
  }
});
