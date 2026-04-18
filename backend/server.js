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

const MONGO_URI = process.env.MONGO_URI ;
const JWT_SECRET = process.env.JWT_SECRET;
const port=process.env.PORT;

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

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
