// ByteStreak Frontend API Configuration
const API_URL = "http://localhost:5000";

// Helper function to get auth token
function getToken() {
  return localStorage.getItem("token");
}

// Helper function to get current user
function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Helper function to check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Update navbar based on auth state
function updateNavbar() {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks) return;

  if (isLoggedIn()) {
    const user = getUser();
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="problems.html">Problems</a>
      <a href="daily.html">Daily Challenge</a>
      <a href="profile.html">Profile</a>
      <a href="#" id="logoutBtn">Logout (${user?.username || "User"})</a>
    `;
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
  } else {
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="problems.html">Problems</a>
      <a href="daily.html">Daily Challenge</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }
}

// API helper with auth
async function apiCall(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API call failed");
  }

  return data;
}

// Load all problems
async function loadProblems(filters = {}) {
  try {
    const params = new URLSearchParams(filters).toString();
    const data = await apiCall(`/problems${params ? `?${params}` : ""}`);
    return data;
  } catch (error) {
    console.error("Failed to load problems:", error);
    return [];
  }
}

// Load single problem
async function loadProblem(id) {
  try {
    return await apiCall(`/problems/${id}`);
  } catch (error) {
    console.error("Failed to load problem:", error);
    return null;
  }
}

// Load daily problem
async function loadDailyProblem() {
  try {
    const problem = await apiCall("/problems/daily-problem");
    return problem;
  } catch (error) {
    console.error("Failed to load daily problem:", error);
    return null;
  }
}

// Submit solution
async function submitSolution(problemId, code, language) {
  try {
    return await apiCall("/submissions/submit", {
      method: "POST",
      body: JSON.stringify({ problemId, code, language }),
    });
  } catch (error) {
    console.error("Failed to submit solution:", error);
    throw error;
  }
}

// Get user submissions
async function getUserSubmissions() {
  try {
    const data = await apiCall("/submissions");
    return data.data;
  } catch (error) {
    console.error("Failed to load submissions:", error);
    return [];
  }
}

// Get user stats
async function getUserStats() {
  try {
    const data = await apiCall("/submissions/stats");
    return data.data;
  } catch (error) {
    console.error("Failed to load stats:", error);
    return null;
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
});

// Export functions for use in other scripts
window.ByteStreak = {
  API_URL,
  getToken,
  getUser,
  isLoggedIn,
  logout,
  loadProblems,
  loadProblem,
  loadDailyProblem,
  submitSolution,
  getUserSubmissions,
  getUserStats,
  apiCall,
};