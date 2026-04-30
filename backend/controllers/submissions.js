const Submission = require("../models/submission");
const Problem = require("../models/problem");
const asyncHandler = require("../middleware/asyncHandler");

// Submit a solution
exports.submitSolution = asyncHandler(async (req, res) => {
  const { problemId, code, language } = req.body;
  const userId = req.user.id;

  // Verify problem exists
  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  // Create submission
  const submission = await Submission.create({
    user: userId,
    problem: problemId,
    code,
    language,
    status: "pending",
    submittedAt: new Date()
  });

  // For now, auto-accept submissions (in production, you'd run test cases)
  // This is a placeholder - real implementation would evaluate the code
  submission.status = "accepted";
  submission.testCasesPassed = problem.testCases?.length || 1;
  submission.totalTestCases = problem.testCases?.length || 1;
  await submission.save();

  res.status(201).json({
    success: true,
    data: submission
  });
});

// Get user's submission history
exports.getUserSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ user: req.user.id })
    .populate("problem", "title difficulty")
    .sort({ submittedAt: -1 })
    .limit(50);

  res.json({
    success: true,
    count: submissions.length,
    data: submissions
  });
});

// Get submissions for a specific problem
exports.getProblemSubmissions = asyncHandler(async (req, res) => {
  const { problemId } = req.params;

  const submissions = await Submission.find({ problem: problemId })
    .populate("user", "username")
    .sort({ submittedAt: -1 })
    .limit(20);

  res.json({
    success: true,
    count: submissions.length,
    data: submissions
  });
});

// Get single submission by ID
exports.getSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id)
    .populate("problem")
    .populate("user", "username email");

  if (!submission) {
    return res.status(404).json({ error: "Submission not found" });
  }

  // Only allow the owner or admin to view full code
  if (submission.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized to view this submission" });
  }

  res.json({
    success: true,
    data: submission
  });
});

// Get user's stats
exports.getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const stats = await Submission.aggregate([
    { $match: { user: require("mongoose").Types.ObjectId.createFromHexString(userId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const totalSubmissions = stats.reduce((acc, s) => acc + s.count, 0);
  const accepted = stats.find(s => s._id === "accepted")?.count || 0;
  const problemsAttempted = await Submission.distinct("problem", { user: userId });

  res.json({
    success: true,
    data: {
      totalSubmissions,
      accepted,
      problemsAttempted: problemsAttempted.length,
      successRate: totalSubmissions > 0 ? ((accepted / totalSubmissions) * 100).toFixed(2) : 0
    }
  });
});