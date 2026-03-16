const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");

// Add a new problem
router.post("/add-problem", async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();

    res.json({
      message: "Problem added successfully",
      problem: newProblem
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;