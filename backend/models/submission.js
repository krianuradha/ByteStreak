const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ["javascript", "python", "java", "cpp", "c"]
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "wrong_answer", "time_limit", "runtime_error", "compile_error"],
    default: "pending"
  },
  runtime: {
    type: Number, // in milliseconds
    default: null
  },
  memory: {
    type: Number, // in KB
    default: null
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  totalTestCases: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
SubmissionSchema.index({ user: 1, submittedAt: -1 });
SubmissionSchema.index({ problem: 1, submittedAt: -1 });

module.exports = mongoose.model("Submission", SubmissionSchema);