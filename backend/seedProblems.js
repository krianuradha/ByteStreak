// filepath: backend/seedProblems.js
const mongoose = require("mongoose");

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://krianuradha:anu12345@cluster0.rbfqvce.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection Error:", err));

// Problem Schema
const ProblemSchema = new mongoose.Schema({
  title:       { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags:        [String],
  starterCode: { type: String, default: "" },
  testCases:   [{ input: String, expectedOutput: String }],
  examples:   { type: String, default: "" },
  constraints: { type: String, default: "" },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes:       { type: Number, default: 0 }
});

const Problem = mongoose.model("Problem", ProblemSchema);

// Sample problems data
const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    examples: `Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    starterCode: `function twoSum(nums, target) {
    // Your code here
}`,
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\nFor example, 121 is a palindrome while 123 is not.",
    difficulty: "Easy",
    tags: ["Math"],
    examples: `Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Thus it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left.`,
    constraints: "-2^31 <= x <= 2^31 - 1",
    starterCode: `function isPalindrome(x) {
    // Your code here
}`,
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" },
      { input: "10", expectedOutput: "false" }
    ]
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    examples: `Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
    constraints: "1 <= s.length <= 10^5\ns[i] is a printable ascii character.",
    starterCode: `function reverseString(s) {
    // Your code here
}`,
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' }
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    examples: `Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`,
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    starterCode: `function isValid(s) {
    // Your code here
}`,
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" }
    ]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    examples: `Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23`,
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    starterCode: `function maxSubArray(nums) {
    // Your code here
}`,
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" }
    ]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    tags: ["Dynamic Programming", "Math"],
    examples: `Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step`,
    constraints: "1 <= n <= 45",
    starterCode: `function climbStairs(n) {
    // Your code here
}`,
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" }
    ]
  },
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    examples: `Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1`,
    constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
    starterCode: `function search(nums, target) {
    // Your code here
}`,
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    examples: `Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]`,
    constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
    starterCode: `function mergeTwoLists(list1, list2) {
    // Your code here
}`,
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    tags: ["String", "Sliding Window", "Hash Table"],
    examples: `Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.`,
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    starterCode: `function lengthOfLongestSubstring(s) {
    // Your code here
}`,
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" }
    ]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    examples: `Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The max area is obtained by taking lines at index 1 and 8.

Example 2:
Input: height = [1,1]
Output: 1`,
    constraints: "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    starterCode: `function maxArea(height) {
    // Your code here
}`,
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" }
    ]
  }
];

// Seed the database
async function seedProblems() {
  try {
    // Clear existing problems
    await Problem.deleteMany({});
    console.log("🗑️  Cleared existing problems");

    // Insert new problems
    await Problem.insertMany(problems);
    console.log("✅ Successfully added 10 problems!");

    // List all problems
    const allProblems = await Problem.find({}, "title difficulty tags");
    console.log("\n📋 Current problems in database:");
    allProblems.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title} - ${p.difficulty} [${p.tags.join(", ")}]`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding problems:", error);
    process.exit(1);
  }
}

seedProblems();