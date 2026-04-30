const Problem = require("../models/problem");
const asyncHandler = require("../middleware/asyncHandler");

// Get all problems
exports.getProblems = asyncHandler(async (req, res) => {
  const { difficulty, tag, search } = req.query;
  
  let query = {};
  
  if (difficulty) {
    query.difficulty = difficulty;
  }
  if (tag) {
    query.tags = tag;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }
  
  const problems = await Problem.find(query).sort({ createdAt: -1 });
  res.status(200).json(problems);
});

// Get single problem
exports.getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  res.status(200).json(problem);
});

// Get daily problem (changes at midnight based on date)
exports.getDailyProblem = asyncHandler(async (req, res) => {
  const problems = await Problem.find();
  
  if (problems.length === 0) {
    return res.status(404).json({ message: "No problems available" });
  }
  
  // Use date to deterministically select a problem
  const today = new Date();
  const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
  const index = parseInt(dateString) % problems.length;
  
  const dailyProblem = problems[index];
  
  res.status(200).json({
    _id: dailyProblem._id,
    title: dailyProblem.title,
    description: dailyProblem.description,
    difficulty: dailyProblem.difficulty,
    tags: dailyProblem.tags,
    date: today.toISOString().split("T")[0]
  });
});

// Add new problem
exports.addProblem = asyncHandler(async (req, res) => {
  const problem = new Problem(req.body);
  await problem.save();
  res.status(201).json({ message: "Problem added!", problem });
});

// Delete problem
exports.deleteProblem = asyncHandler(async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Problem deleted!" });
});