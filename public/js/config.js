const CONFIG = {
  BASE_URL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "" ||
    window.location.protocol === "file:"
      ? "http://localhost:5000"
      : "/api",
};

