// Load .env only in local development (Vercel uses environment variables from dashboard)
const path = require("path");
const envPath = path.resolve(__dirname, "../backend/.env");
require("dotenv").config({ path: envPath });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Cache the MongoDB connection across warm serverless invocations
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    mongoose.set("bufferCommands", false);
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    throw err;
  }
}

// Connect to DB before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Import routes from backend directory
const authRoutes = require("../backend/routes/auth");
const problemRoutes = require("../backend/routes/problems");
const submissionRoutes = require("../backend/routes/submissions");
const userRoutes = require("../backend/routes/users");

// Mount all routes under /api
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/users", userRoutes);

app.get("/api", (req, res) => res.json({ message: "ByteStreak API running" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Export for Vercel serverless
module.exports = app;
