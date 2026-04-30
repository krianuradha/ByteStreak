require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bytestreak";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problems");
const submissionRoutes = require("./routes/submissions");

app.use("/auth", authRoutes);
app.use("/problems", problemRoutes);
app.use("/submissions", submissionRoutes);

app.get("/", (req, res) => {
  res.send("ByteStreak backend running 🚀");
});

app.use((err, req, res, next) => {
  console.log("ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});