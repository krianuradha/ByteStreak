const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProblems,
  getProblem,
  getDailyProblem,
  addProblem,
  deleteProblem
} = require("../controllers/problemControllers");

// Public routes — anyone can see problems
router.get("/", getProblems);
router.get("/daily-problem", getDailyProblem);
router.get("/:id", getProblem);

// Protected routes — must be logged in
router.post("/", authMiddleware, addProblem);
router.delete("/:id", authMiddleware, deleteProblem);

module.exports = router;