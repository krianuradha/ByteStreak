const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection

const uri = "mongodb+srv://krianuradha:anu12345@cluster0.rbfqvce.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri)   // no options needed
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

// Routes
const problemRoutes = require("./routes/problems");
app.use("/problems", problemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CodeDaily backend running 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});