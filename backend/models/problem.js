const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title:       { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags:        [String],
  starterCode: { type: String, default: "" },
  testCases:   [{ input: String, expectedOutput: String }],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes:       { type: Number, default: 0 }
});

module.exports = mongoose.model("Problem", ProblemSchema);