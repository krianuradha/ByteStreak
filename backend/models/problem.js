const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  topic: String,
  description: String,
  starterCode: String
});

module.exports = mongoose.model("Problem", ProblemSchema);