const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");

exports.getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("username score streak solvedProblems")
    .sort({ score: -1 })
    .limit(10);

  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    score: user.score,
    streak: user.streak,
    problemsSolved: user.solvedProblems.length,
  }));

  res.status(200).json(leaderboard);
});
