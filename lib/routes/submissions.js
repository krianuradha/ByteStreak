const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitSolution,
  getMySubmissions,
  getProblemSubmissions,
} = require("../controllers/submissionController");

router.post("/", authMiddleware, submitSolution);
router.get("/me", authMiddleware, getMySubmissions);
router.get("/:problemId", getProblemSubmissions);

module.exports = router;
