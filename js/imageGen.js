// Image Generation Screen - Tab 4

// Get API key from localStorage
let GEMINI_API_KEY = localStorage.getItem('GEMINI_API_KEY') || '';

// Save API key to localStorage
function saveApiKey(apiKey) {
  localStorage.setItem('GEMINI_API_KEY', apiKey);
  GEMINI_API_KEY = apiKey;
}

// Prompt user to enter API key
async function promptApiKey() {
  const userKey = await showPrompt(
    'Nhập API Key',
    '🔑 Vui lòng nhập GEMINI_API_KEY:\n\n📍 Lấy API key tại:\nhttps://makersuite.google.com/app/apikey\n\n💡 API key sẽ được lưu trong trình duyệt.',
    'Nhập API key...'
  );

  if (userKey && userKey.trim()) {
    saveApiKey(userKey.trim());
    await showAlert('Đã lưu API key thành công!', 'success');
    return true;
  }
  return false;
}

// Check if API key exists, prompt if not
async function ensureApiKey() {
  if (!GEMINI_API_KEY) {
    return await promptApiKey();
  }
  return true;
}

// Parse and analyze JSON input for image generation
async function parseImageJsonInput() {
  const jsonInput = document.getElementById("imageJsonInput")?.value.trim();

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

    // Store data globally for image generation
    window.currentImageJsonData = data;

    // Display references first
    displayImageReferences(data);

    // Display scenes
    displayImageScenes(data.scenePrompts);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    await showAlert(
      "JSON không hợp lệ! Vui lòng kiểm tra lại.\n\nLỗi: " + error.message,
      "error"
    );
  }
}

// Display references with image generation capability
function displayImageReferences(data) {
  const output = document.getElementById("imageReferencesOutput");
  if (!output) return;

  output.innerHTML = "";

  let allProfiles = [];

  // Add character profiles
  if (
    data.masterConfig.characterProfiles &&
    data.masterConfig.characterProfiles.length > 0
  ) {
    data.masterConfig.characterProfiles.forEach((char) => {
      allProfiles.push({
        type: 'character',
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
        type: 'background',
        id: bg.id,
        description: bg.description || "N/A",
      });
    });
  }

  if (allProfiles.length > 0) {
    allProfiles.forEach((profile, index) => {
      const card = document.createElement("div");
      card.className = "image-card";
      card.innerHTML = `
        <div class="image-card-header">
          <h4>${profile.type === 'character' ? '👤' : '🏞️'} ${profile.id}</h4>
          <button class="btn btn-primary btn-sm" onclick="generateReferenceImage(${index})">
            🖼️ Tạo Ảnh
          </button>
        </div>
        <div class="image-card-body">
          <div class="image-text">
            <strong>Description:</strong>
            <p>${profile.description}</p>
          </div>
          <div class="image-preview" id="refImage${index}">
            <div class="image-placeholder">Chưa có ảnh</div>
          </div>
        </div>
      `;
      output.appendChild(card);
    });
  } else {
    output.innerHTML = '<p class="placeholder">Không có dữ liệu tham chiếu.</p>';
  }
}

// Display scenes with image generation capability
function displayImageScenes(scenePrompts) {
  const output = document.getElementById("imageScenesOutput");
  if (!output) return;

  output.innerHTML = "";

  scenePrompts.forEach((scene, index) => {
    const videoPrompt = scene.finalVideoPrompt;
    const description = videoPrompt.descriptiveProse || "N/A";

    const card = document.createElement("div");
    card.className = "image-card";
    card.innerHTML = `
      <div class="image-card-header">
        <h4>🎬 Scene ${scene.sceneNumber} (${scene.estimatedDuration}s)</h4>
        <button class="btn btn-primary btn-sm" onclick="generateSceneImage(${index})">
          🖼️ Tạo Ảnh
        </button>
      </div>
      <div class="image-card-body">
        <div class="image-text">
          <strong>Description:</strong>
          <p>${description.substring(0, 200)}${description.length > 200 ? '...' : ''}</p>
        </div>
        <div class="image-preview" id="sceneImage${index}">
          <div class="image-placeholder">Chưa có ảnh</div>
        </div>
      </div>
    `;
    output.appendChild(card);
  });
}

// Collect reference images by IDs
async function collectReferenceImages(referenceIds) {
  const data = window.currentImageJsonData;
  if (!data || !referenceIds || referenceIds.length === 0) {
    return [];
  }

  const referenceImages = [];
  let allProfiles = [];

  // Build profile list with indices
  if (data.masterConfig.characterProfiles) {
    data.masterConfig.characterProfiles.forEach((char, idx) => {
      allProfiles.push({ id: char.id, index: idx });
    });
  }

  if (data.masterConfig.backgroundProfiles) {
    const charCount = data.masterConfig.characterProfiles?.length || 0;
    data.masterConfig.backgroundProfiles.forEach((bg, idx) => {
      allProfiles.push({ id: bg.id, index: charCount + idx });
    });
  }

  // Collect images for referenced IDs
  for (const refId of referenceIds) {
    const profile = allProfiles.find(p => p.id === refId);
    if (profile) {
      const element = document.getElementById(`refImage${profile.index}`);
      if (element && element.dataset.imageData) {
        referenceImages.push({
          mimeType: element.dataset.imageMimeType || 'image/jpeg',
          data: element.dataset.imageData
        });
      }
    }
  }

  return referenceImages;
}

// Generate image with reference images using Gemini API
async function generateImageWithReferences(text, elementId, itemId = null, referenceImages = []) {
  // Ensure API key exists before generating
  if (!(await ensureApiKey())) {
    return null;
  }

  const element = document.getElementById(elementId);
  if (!element) return null;

  // Show loading state
  element.innerHTML = '<div class="image-loading">⏳ Đang tạo ảnh...</div>';

  const MODEL_ID = "gemini-3-pro-image-preview";
  const GENERATE_CONTENT_API = "generateContent";

  // Build parts array: reference images first, then text
  const parts = [];

  // Add reference images
  for (const refImage of referenceImages) {
    parts.push({
      inlineData: {
        mimeType: refImage.mimeType,
        data: refImage.data
      }
    });
  }

  // Add text prompt
  parts.push({
    text: text
  });

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: parts
      }
    ],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: {
        image_size: "1K"
      }
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response
    const jsonData = await response.json();
    let imageData = null;

    // Extract image data from response format
    if (jsonData.candidates && jsonData.candidates[0]?.content?.parts) {
      const parts = jsonData.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          imageData = {
            mimeType: part.inlineData.mimeType,
            data: part.inlineData.data,
            id: itemId
          };
          break;
        }
      }
    }

    if (imageData) {
      // Display the generated image
      element.innerHTML = `<img src="data:${imageData.mimeType};base64,${imageData.data}" alt="Generated Image" style="max-width: 100%; border-radius: 8px;">`;

      // Store image data for download
      element.dataset.imageData = imageData.data;
      element.dataset.imageMimeType = imageData.mimeType;
      element.dataset.imageId = itemId || 'image';

      return imageData;
    } else {
      element.innerHTML = '<div class="image-error">❌ Không nhận được ảnh từ API</div>';
      return null;
    }

  } catch (error) {
    console.error('Image generation error:', error);
    element.innerHTML = `<div class="image-error">❌ Lỗi: ${error.message}</div>`;
    return null;
  }
}

// Generate image using Gemini API (without references)
async function generateImage(text, elementId, itemId = null) {
  // Ensure API key exists before generating
  if (!(await ensureApiKey())) {
    return null;
  }

  const element = document.getElementById(elementId);
  if (!element) return null;

  // Show loading state
  element.innerHTML = '<div class="image-loading">⏳ Đang tạo ảnh...</div>';

  const MODEL_ID = "gemini-3-pro-image-preview";
  const GENERATE_CONTENT_API = "generateContent";

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Generate an image based on this description: ${text}`
          }
        ]
      }
    ],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: {
        image_size: "1K"
      }
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response (not streaming)
    const jsonData = await response.json();
    let imageData = null;

    // Extract image data from new response format
    if (jsonData.candidates && jsonData.candidates[0]?.content?.parts) {
      const parts = jsonData.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          imageData = {
            mimeType: part.inlineData.mimeType,
            data: part.inlineData.data,
            id: itemId
          };
          break;
        }
      }
    }

    if (imageData) {
      // Display the generated image
      element.innerHTML = `<img src="data:${imageData.mimeType};base64,${imageData.data}" alt="Generated Image" style="max-width: 100%; border-radius: 8px;">`;

      // Store image data for download
      element.dataset.imageData = imageData.data;
      element.dataset.imageMimeType = imageData.mimeType;
      element.dataset.imageId = itemId || 'image';

      return imageData;
    } else {
      element.innerHTML = '<div class="image-error">❌ Không nhận được ảnh từ API</div>';
      return null;
    }

  } catch (error) {
    console.error('Image generation error:', error);
    element.innerHTML = `<div class="image-error">❌ Lỗi: ${error.message}</div>`;
    return null;
  }
}

// Generate single reference image
async function generateReferenceImage(index) {
  const data = window.currentImageJsonData;
  if (!data) {
    await showAlert('Không có dữ liệu JSON!', 'error');
    return;
  }

  let allProfiles = [];

  if (data.masterConfig.characterProfiles) {
    data.masterConfig.characterProfiles.forEach(char => {
      allProfiles.push({ id: char.id, description: char.description });
    });
  }

  if (data.masterConfig.backgroundProfiles) {
    data.masterConfig.backgroundProfiles.forEach(bg => {
      allProfiles.push({ id: bg.id, description: bg.description });
    });
  }

  if (index >= allProfiles.length) return;

  const profile = allProfiles[index];
  await generateImage(profile.description, `refImage${index}`, profile.id);
}

// Download single image
async function downloadImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element || !element.dataset.imageData) {
    await showAlert('Chưa có ảnh để tải!', 'error');
    return;
  }

  const imageData = element.dataset.imageData;
  const mimeType = element.dataset.imageMimeType || 'image/jpeg';
  const extension = mimeType.split('/')[1] || 'jpg';

  // Convert base64 to blob
  const byteCharacters = atob(imageData);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  // Create download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download all reference images
async function downloadAllReferenceImages() {
  const data = window.currentImageJsonData;
  if (!data) {
    await showAlert('Không có dữ liệu JSON!', 'error');
    return;
  }

  let allProfiles = [];

  if (data.masterConfig.characterProfiles) {
    data.masterConfig.characterProfiles.forEach(char => {
      allProfiles.push({ id: char.id });
    });
  }

  if (data.masterConfig.backgroundProfiles) {
    data.masterConfig.backgroundProfiles.forEach(bg => {
      allProfiles.push({ id: bg.id });
    });
  }

  let downloadedCount = 0;

  for (const [index, profile] of allProfiles.entries()) {
    const element = document.getElementById(`refImage${index}`);
    if (element && element.dataset.imageData) {
      await downloadImage(`refImage${index}`, profile.id);
      downloadedCount++;
    }
  }

  if (downloadedCount === 0) {
    await showAlert('Chưa có ảnh nào được tạo!', 'error');
  } else {
    await showAlert(`Đã tải ${downloadedCount} ảnh!`, 'success');
  }
}

// Download all scene images
async function downloadAllSceneImages() {
  const data = window.currentImageJsonData;
  if (!data || !data.scenePrompts) {
    await showAlert('Không có dữ liệu scenes!', 'error');
    return;
  }

  const scenes = data.scenePrompts;
  let downloadedCount = 0;

  for (const [index, scene] of scenes.entries()) {
    const element = document.getElementById(`sceneImage${index}`);
    if (element && element.dataset.imageData) {
      await downloadImage(`sceneImage${index}`, `scene_${scene.sceneNumber}`);
      downloadedCount++;
    }
  }

  if (downloadedCount === 0) {
    await showAlert('Chưa có ảnh nào được tạo!', 'error');
  } else {
    await showAlert(`Đã tải ${downloadedCount} ảnh!`, 'success');
  }
}

// Generate all reference images sequentially
async function generateAllReferenceImages(event) {
  const data = window.currentImageJsonData;
  if (!data) {
    await showAlert('Không có dữ liệu JSON!', 'error');
    return;
  }

  // Disable button during generation
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⏳ Đang tạo...';

  let allProfiles = [];

  if (data.masterConfig.characterProfiles) {
    data.masterConfig.characterProfiles.forEach(char => {
      allProfiles.push({ id: char.id, description: char.description });
    });
  }

  if (data.masterConfig.backgroundProfiles) {
    data.masterConfig.backgroundProfiles.forEach(bg => {
      allProfiles.push({ id: bg.id, description: bg.description });
    });
  }

  // Generate images sequentially
  for (let i = 0; i < allProfiles.length; i++) {
    await generateImage(allProfiles[i].description, `refImage${i}`, allProfiles[i].id);
    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Re-enable button
  btn.disabled = false;
  btn.innerHTML = originalText;
}

// Generate single scene image with references
async function generateSceneImage(index) {
  const data = window.currentImageJsonData;
  if (!data || !data.scenePrompts[index]) {
    await showAlert('Không có dữ liệu scene!', 'error');
    return;
  }

  const scene = data.scenePrompts[index];
  const description = scene.finalVideoPrompt.descriptiveProse;
  const keywords = scene.finalVideoPrompt.keywords;
  const negativePrompt = scene.finalVideoPrompt.negativePrompt;
  const audioPrompt = scene.finalAudioPrompt;
  const references = scene.references || [];
  const sceneId = `scene_${scene.sceneNumber}`;

  // Combine all negative prompt fields
  let negativePromptText = "";
  if (negativePrompt) {
    negativePromptText = [
      negativePrompt.visualQuality,
      negativePrompt.characterConsistency,
      negativePrompt.unwantedBehavior,
      negativePrompt.sceneCoherence,
      negativePrompt.technicalIssues,
    ]
      .filter(Boolean)
      .join(", ");
  }

  // Build full text prompt
  const fullPrompt = `${data.masterConfig.baseVisualPrompt} ${description} ${keywords} ${negativePromptText} ${audioPrompt}. "References": "${references.join(", ")}"`;

  // Collect reference images
  const referenceImages = await collectReferenceImages(references);

  await generateImageWithReferences(fullPrompt, `sceneImage${index}`, sceneId, referenceImages);
}

// Generate all scene images sequentially
async function generateAllSceneImages(event) {
  const data = window.currentImageJsonData;
  if (!data || !data.scenePrompts) {
    await showAlert('Không có dữ liệu scenes!', 'error');
    return;
  }

  // Disable button during generation
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⏳ Đang tạo...';

  const scenes = data.scenePrompts;

  // Generate images sequentially
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const description = scene.finalVideoPrompt.descriptiveProse;
    const keywords = scene.finalVideoPrompt.keywords;
    const negativePrompt = scene.finalVideoPrompt.negativePrompt;
    const audioPrompt = scene.finalAudioPrompt;
    const references = scene.references || [];
    const sceneId = `scene_${scene.sceneNumber}`;

    // Combine all negative prompt fields
    let negativePromptText = "";
    if (negativePrompt) {
      negativePromptText = [
        negativePrompt.visualQuality,
        negativePrompt.characterConsistency,
        negativePrompt.unwantedBehavior,
        negativePrompt.sceneCoherence,
        negativePrompt.technicalIssues,
      ]
        .filter(Boolean)
        .join(", ");
    }

    // Build full text prompt
    const fullPrompt = `${data.masterConfig.baseVisualPrompt} ${description} ${keywords} ${negativePromptText} ${audioPrompt}. "References": "${references.join(", ")}"`;

    // Collect reference images
    const referenceImages = await collectReferenceImages(references);

    await generateImageWithReferences(fullPrompt, `sceneImage${i}`, sceneId, referenceImages);

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Re-enable button
  btn.disabled = false;
  btn.innerHTML = originalText;
}

// Show API key manager dialog
async function showApiKeyManager() {
  const currentKey = GEMINI_API_KEY || '(Chưa cấu hình)';
  const maskedKey = currentKey.length > 10
    ? currentKey.substring(0, 6) + '...' + currentKey.substring(currentKey.length - 4)
    : currentKey;

  const action = await showConfirm(
    'Quản Lý API Key',
    `🔑 API Key hiện tại: ${maskedKey}\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nChọn OK để đổi API key mới, hoặc Cancel để giữ nguyên.`
  );

  if (action) {
    await promptApiKey();
  }
}

// Switch between tabs in image generation view
function switchImageTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('#imageGen .tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all tab buttons
  document.querySelectorAll('#imageGen .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const selectedTab = document.getElementById(`${tabName}Tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

// Initialize Image Generation screen
document.addEventListener("DOMContentLoaded", () => {
  // Parse JSON button
  const parseBtn = document.getElementById("parseImageJsonBtn");
  if (parseBtn) {
    parseBtn.addEventListener("click", parseImageJsonInput);
  }
});
