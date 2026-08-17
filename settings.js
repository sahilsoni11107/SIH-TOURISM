// LocalStorage Persistence Keys
const SETTINGS_KEY = 'yatraSettings';
const AUTH_KEY = 'yatraUser';

// Default App Settings
let appSettings = {
  darkMode: false,
  highContrast: false,
  fontScale: 'normal',
  language: 'hi',
  screenReader: false
};

document.addEventListener('DOMContentLoaded', () => {
  loadSavedSettings();
  loadUserProfile();
});

// Load and Apply Settings
function loadSavedSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    appSettings = JSON.parse(saved);
  }

  // Apply Dark Mode
  document.getElementById('darkModeToggle').checked = appSettings.darkMode;
  toggleDarkMode(appSettings.darkMode, false);

  // Apply High Contrast
  document.getElementById('highContrastToggle').checked = appSettings.highContrast;
  toggleHighContrast(appSettings.highContrast, false);

  // Apply Font Scale
  setFontScale(appSettings.fontScale, false);

  // Apply Language
  document.getElementById('preferredLanguage').value = appSettings.language || 'hi';
}

// Dark Mode Toggle
function toggleDarkMode(enabled, save = true) {
  appSettings.darkMode = enabled;
  if (enabled) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  if (save) saveSettingsToStorage();
}

// High Contrast Mode Toggle
function toggleHighContrast(enabled, save = true) {
  appSettings.highContrast = enabled;
  if (enabled) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
  if (save) saveSettingsToStorage();
}

// Font Scaling Adjustment
function setFontScale(scale, save = true) {
  appSettings.fontScale = scale;
  const buttons = document.querySelectorAll('.scale-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (scale === 'small') {
    document.documentElement.style.setProperty('--font-scale', '0.9rem');
    buttons[0].classList.add('active');
  } else if (scale === 'large') {
    document.documentElement.style.setProperty('--font-scale', '1.1rem');
    buttons[2].classList.add('active');
  } else if (scale === 'xlarge') {
    document.documentElement.style.setProperty('--font-scale', '1.25rem');
    buttons[3].classList.add('active');
  } else {
    document.documentElement.style.setProperty('--font-scale', '1rem');
    buttons[1].classList.add('active');
  }

  if (save) saveSettingsToStorage();
}

// Language Update
function updateLanguagePref(lang) {
  appSettings.language = lang;
  saveSettingsToStorage();
}

// Save All to LocalStorage
function saveSettingsToStorage() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(appSettings));
}

function saveAllSettings() {
  saveSettingsToStorage();
  alert('✓ Preferences and accessibility configurations saved successfully.');
}

// User Profile & Authentication State (Login / Logout)
function loadUserProfile() {
  const user = sessionStorage.getItem(AUTH_KEY);
  const authBtn = document.getElementById('authBtn');
  const profileName = document.getElementById('profileName');
  const profileAvatar = document.getElementById('profileAvatar');
  const headerAvatar = document.getElementById('headerAvatar');

  if (user) {
    profileName.textContent = user;
    const initials = user.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    profileAvatar.textContent = initials || 'JS';
    headerAvatar.textContent = initials || 'JS';
    authBtn.textContent = 'Logout';
    authBtn.style.backgroundColor = 'var(--status-red)';
  } else {
    profileName.textContent = 'Guest Tourist';
    profileAvatar.textContent = 'GT';
    headerAvatar.textContent = 'GT';
    document.getElementById('profileContact').textContent = 'Not Logged In • Offline Mode';
    authBtn.textContent = 'Login / Register';
    authBtn.style.backgroundColor = 'var(--brand)';
  }
}

function handleAuthAction() {
  const user = sessionStorage.getItem(AUTH_KEY);
  if (user) {
    if (confirm('Are you sure you want to log out from YatraSathi?')) {
      sessionStorage.removeItem(AUTH_KEY);
      alert('Logged out successfully.');
      window.location.href = 'auth.html';
    }
  } else {
    window.location.href = 'auth.html';
  }
}

function editProfile() {
  const newName = prompt('Enter your name as per government ID:');
  if (newName && newName.trim()) {
    sessionStorage.setItem(AUTH_KEY, newName.trim());
    loadUserProfile();
  }
}

// Offline Cache Actions
function downloadAllPacks() {
  alert('💾 Downloading Rajasthan Heritage Circuit offline pack (Maps, 3D Models, and Audio Guides: 142 MB)...');
  document.getElementById('cacheSize').textContent = '190.2 MB Used';
}

function clearOfflineData() {
  if (confirm('Clear offline map tiles and audio cache?')) {
    document.getElementById('cacheSize').textContent = '0.0 MB Used';
    alert('✓ Offline cache cleared.');
  }
}