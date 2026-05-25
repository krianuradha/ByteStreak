const Problem = require("../models/problem");
const asyncHandler = require("../middleware/asyncHandler");

exports.getProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find();
  res.status(200).json(problems);
});

exports.getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  res.status(200).json(problem);
});

exports.getDailyProblem = asyncHandler(async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  let problem = await Problem.findOne({
    dailyDate: { $gte: startOfDay, $lt: endOfDay },
  });

  if (!problem) {
    const count = await Problem.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No problems available" });
    }
    const random = Math.floor(Math.random() * count);
    problem = await Problem.findOne().skip(random);
  }

  res.status(200).json(problem);
});

exports.addProblem = asyncHandler(async (req, res) => {
  const problem = new Problem(req.body);
  await problem.save();
  res.status(201).json(problem);
});

exports.deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findByIdAndDelete(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  res.status(200).json({ message: "Problem deleted successfully" });
});

exports.filterProblems = asyncHandler(async (req, res) => {
  const { difficulty, tag, search } = req.query;
  const filter = {};

  if (difficulty) filter.difficulty = difficulty;
  if (tag) filter.tags = { $in: [tag] };
  if (search) filter.title = { $regex: search, $options: "i" };

  const problems = await Problem.find(filter);
  res.status(200).json(problems);
});

exports.likeProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  problem.likes += 1;
  await problem.save();
  res.status(200).json(problem);
});
