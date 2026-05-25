function initDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isDark = document.body.classList.contains("dark");
  btn.textContent = isDark ? "☀️" : "🌙";
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function checkAuth() {
  const token = getToken();
  const user = getUser();

  const navUsername = document.getElementById("nav-username");
  const navProfile = document.getElementById("nav-profile");
  const navLogout = document.getElementById("nav-logout");
  const navLogin = document.getElementById("nav-login");
  const navSignup = document.getElementById("nav-signup");

  if (token && user) {
    if (navUsername) {
      navUsername.textContent = user.username;
      navUsername.style.display = "inline";
    }
    if (navProfile) navProfile.style.display = "inline";
    if (navLogout) navLogout.style.display = "inline";
    if (navLogin) navLogin.style.display = "none";
    if (navSignup) navSignup.style.display = "none";
  } else {
    if (navUsername) navUsername.style.display = "none";
    if (navProfile) navProfile.style.display = "none";
    if (navLogout) navLogout.style.display = "none";
    if (navLogin) navLogin.style.display = "inline";
    if (navSignup) navSignup.style.display = "inline";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    logout();
    return null;
  }
  return response;
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = "/login";
  }
}

function showToast(message, type = "success") {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast toast-" + type;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("toast-show"), 10);
  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDifficultyClass(difficulty) {
  const map = { Easy: "badge-easy", Medium: "badge-medium", Hard: "badge-hard" };
  return map[difficulty] || "badge-easy";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function difficultyBadge(difficulty) {
  return `<span class="badge ${getDifficultyClass(difficulty)}">${escapeHtml(difficulty)}</span>`;
}

async function apiJson(path, options = {}) {
  try {
    const response = await fetchWithAuth(CONFIG.BASE_URL + path, options);
    if (!response) return null;
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }
    return data;
  } catch (err) {
    showToast(err.message || "Network error", "error");
    throw err;
  }
}

function setButtonLoading(button, text) {
  if (!button) return;
  button.dataset.originalText = button.textContent;
  button.disabled = true;
  button.textContent = text;
}

function resetButton(button) {
  if (!button) return;
  button.disabled = false;
  button.textContent = button.dataset.originalText || button.textContent;
}

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  checkAuth();
});

window.ByteStreak = {
  apiJson,
  difficultyBadge,
  escapeHtml,
  fetchWithAuth,
  formatDate,
  getDifficultyClass,
  getToken,
  getUser,
  requireAuth,
  resetButton,
  setButtonLoading,
  showToast,
};
