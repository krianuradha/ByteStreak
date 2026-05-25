const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProblems,
  getProblem,
  getDailyProblem,
  addProblem,
  deleteProblem,
  filterProblems,
  likeProblem,
} = require("../controllers/problemControllers");

router.get("/daily", getDailyProblem);
router.get("/filter", filterProblems);
router.get("/", getProblems);
router.get("/:id", getProblem);
router.post("/", authMiddleware, addProblem);
router.post("/:id/like", authMiddleware, likeProblem);
router.delete("/:id", authMiddleware, deleteProblem);

module.exports = router;
