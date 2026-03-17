require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

const MONGO_URI = "mongodb+srv://krianuradha:anu12345@cluster0.rbfqvce.mongodb.net/test?retryWrites=true&w=majority";
const JWT_SECRET = "bytestreak_super_secret_key_2026";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

const problemRoutes = require("./routes/problems");
const authRoutes = require("./routes/auth");

app.use("/problems", problemRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CodeDaily backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
