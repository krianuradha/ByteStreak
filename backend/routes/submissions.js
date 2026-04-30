const express = require("express");
const router = express.Router();
const { submitSolution, getUserSubmissions, getProblemSubmissions, getSubmission, getUserStats } = require("../controllers/submissions");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Submit a solution
router.post("/submit", submitSolution);

// Get user's submission history
router.get("/", getUserSubmissions);

// Get user's stats
router.get("/stats", getUserStats);

// Get submissions for a specific problem
router.get("/problem/:problemId", getProblemSubmissions);

// Get single submission
router.get("/:id", getSubmission);

module.exports = router;