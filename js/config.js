const CONFIG = {
  // Same Vercel project = same domain = /api works perfectly.
  // No CORS issues. No absolute URL needed in production.
  BASE_URL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000/api"
      : "/api",
};
