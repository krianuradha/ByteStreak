const vm = require("vm");
const User = require("../models/user");
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const asyncHandler = require("../middleware/asyncHandler");

const functionMap = {
  "Two Sum": "twoSum",
  "Maximum Subarray": "maxSubArray",
  "Contains Duplicate": "containsDuplicate",
  "Best Time to Buy Stock": "maxProfit",
  "Product of Array Except Self": "productExceptSelf",
  "Valid Anagram": "isAnagram",
  "Reverse String": "reverseString",
  "Longest Common Prefix": "longestCommonPrefix",
  "Reverse Linked List": "reverseList",
  "Merge Two Sorted Lists": "mergeTwoLists",
  "Linked List Cycle": "hasCycle",
  "Valid Parentheses": "isValid",
  "Min Stack": "minStack",
  "Daily Temperatures": "dailyTemperatures",
  "Binary Search": "search",
  "Search Insert Position": "searchInsert",
  "Find Minimum in Rotated Array": "findMin",
  "Climbing Stairs": "climbStairs",
  "House Robber": "rob",
  "Coin Change": "coinChange",
};

function getFunctionCall(title, input) {
  const functionName = functionMap[title];
  if (!functionName) {
    throw new Error("No function mapping found for this problem");
  }
  return `${functionName}(${input})`;
}

function getStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a, b) {
  return getStartOfDay(a).getTime() === getStartOfDay(b).getTime();
}

async function updateProgress(user, problemId) {
  const alreadySolved = user.solvedProblems.some(
    (id) => id.toString() === problemId.toString()
  );

  if (!alreadySolved) {
    user.solvedProblems.push(problemId);
    user.score += 10;

    const today = getStartOfDay(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (user.lastSolvedDate && isSameDay(user.lastSolvedDate, yesterday)) {
      user.streak += 1;
    } else if (user.lastSolvedDate && isSameDay(user.lastSolvedDate, today)) {
      user.streak = user.streak;
    } else {
      user.streak = 1;
    }

    user.lastSolvedDate = today;
    await user.save();
  }
}

exports.submitSolution = asyncHandler(async (req, res) => {
  const { code, language, problemId } = req.body;

  if (!code || !language || !problemId) {
    return res.status(400).json({ message: "code, language, and problemId are required" });
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let status = "Accepted";
  let output = "";

  if (language === "javascript") {
    try {
      const testCase = problem.testCases[0];
      if (!testCase) {
        throw new Error("No test cases available");
      }

      const testCall =
        "\nconst __result = JSON.stringify(" +
        getFunctionCall(problem.title, testCase.input) +
        ");__result;";

      const script = new vm.Script(code + testCall);
      const context = vm.createContext({
        JSON,
        Math,
        Array,
        Object,
        String,
        Number,
        Boolean,
        parseInt,
        parseFloat,
        console: { log: () => {} },
      });

      output = String(script.runInContext(context, { timeout: 5000 }));
      const expected = testCase.expectedOutput.trim();
      status = output.trim() === expected ? "Accepted" : "Wrong Answer";
    } catch (err) {
      status = "Error";
      output = err.message;
    }
  } else {
    status = "Accepted";
    output = "Code saved successfully";
  }

  const submission = new Submission({
    userId: req.user.userId,
    problemId,
    code,
    language,
    status,
    output,
  });
  await submission.save();

  if (status === "Accepted") {
    await updateProgress(user, problem._id);
  }

  res.status(201).json({
    status,
    output,
    message: status,
    score: user.score,
    streak: user.streak,
  });
});

exports.getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ userId: req.user.userId })
    .populate("problemId", "title difficulty")
    .sort({ submittedAt: -1 })
    .limit(20);

  res.status(200).json(submissions);
});

exports.getProblemSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ problemId: req.params.problemId })
    .populate("userId", "username")
    .sort({ submittedAt: -1 })
    .limit(10);

  res.status(200).json(submissions);
});
