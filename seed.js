require("dotenv").config();
const mongoose = require("mongoose");
const Problem = require("./lib/models/problem");

const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    starterCode: "function twoSum(nums, target) {\n  \n}",
    testCases: [{ input: "[2,7,11,15], 9", expectedOutput: "[0,1]" }],
    dailyDate: todayStart,
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    starterCode: "function maxSubArray(nums) {\n  \n}",
    testCases: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }],
  },
  {
    title: "Contains Duplicate",
    description: "Return true if any value appears at least twice in the array, and false if every element is distinct.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    starterCode: "function containsDuplicate(nums) {\n  \n}",
    testCases: [{ input: "[1,2,3,1]", expectedOutput: "true" }],
  },
  {
    title: "Best Time to Buy Stock",
    description: "Given prices where prices[i] is the price of a stock on day i, return the maximum profit from one buy and one sell.",
    difficulty: "Easy",
    tags: ["Array"],
    starterCode: "function maxProfit(prices) {\n  \n}",
    testCases: [{ input: "[7,1,5,3,6,4]", expectedOutput: "5" }],
  },
  {
    title: "Product of Array Except Self",
    description: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",
    difficulty: "Medium",
    tags: ["Array", "Prefix Product"],
    starterCode: "function productExceptSelf(nums) {\n  \n}",
    testCases: [{ input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" }],
  },
  {
    title: "Valid Anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    difficulty: "Easy",
    tags: ["String", "Hash Table"],
    starterCode: "function isAnagram(s, t) {\n  \n}",
    testCases: [{ input: '"anagram", "nagaram"', expectedOutput: "true" }],
  },
  {
    title: "Reverse String",
    description: "Reverse the given array of characters and return the reversed array.",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    starterCode: "function reverseString(s) {\n  \n}",
    testCases: [{ input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' }],
  },
  {
    title: "Longest Common Prefix",
    description: "Write a function to find the longest common prefix string amongst an array of strings.",
    difficulty: "Easy",
    tags: ["String"],
    starterCode: "function longestCommonPrefix(strs) {\n  \n}",
    testCases: [{ input: '["flower","flow","flight"]', expectedOutput: '"fl"' }],
  },
  {
    title: "Reverse Linked List",
    description: "Given a linked list represented as an array, reverse it and return the reversed list.",
    difficulty: "Easy",
    tags: ["Linked List"],
    starterCode: "function reverseList(head) {\n  \n}",
    testCases: [{ input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" }],
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists represented as arrays and return one sorted list.",
    difficulty: "Easy",
    tags: ["Linked List"],
    starterCode: "function mergeTwoLists(list1, list2) {\n  \n}",
    testCases: [{ input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }],
  },
  {
    title: "Linked List Cycle",
    description: "Given linked list values and a position where the tail connects, return true if the list has a cycle.",
    difficulty: "Easy",
    tags: ["Linked List", "Two Pointers"],
    starterCode: "function hasCycle(values, pos) {\n  \n}",
    testCases: [{ input: "[3,2,0,-4], 1", expectedOutput: "true" }],
  },
  {
    title: "Valid Parentheses",
    description: "Given a string containing brackets, determine if every opening bracket is closed in the correct order.",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    starterCode: "function isValid(s) {\n  \n}",
    testCases: [{ input: '"()[]{}"', expectedOutput: "true" }],
  },
  {
    title: "Min Stack",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Return outputs for operations.",
    difficulty: "Medium",
    tags: ["Stack"],
    starterCode: "function minStack(operations, values) {\n  \n}",
    testCases: [{ input: '["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]', expectedOutput: "[null,null,null,null,-3,null,0,-2]" }],
  },
  {
    title: "Daily Temperatures",
    description: "Given daily temperatures, return how many days you would have to wait until a warmer temperature.",
    difficulty: "Medium",
    tags: ["Stack", "Array"],
    starterCode: "function dailyTemperatures(temperatures) {\n  \n}",
    testCases: [{ input: "[73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]" }],
  },
  {
    title: "Binary Search",
    description: "Given a sorted array and a target, return the index of target or -1 if it does not exist.",
    difficulty: "Easy",
    tags: ["Binary Search", "Array"],
    starterCode: "function search(nums, target) {\n  \n}",
    testCases: [{ input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" }],
  },
  {
    title: "Search Insert Position",
    description: "Return the index if target is found. Otherwise, return the index where it would be inserted in order.",
    difficulty: "Easy",
    tags: ["Binary Search", "Array"],
    starterCode: "function searchInsert(nums, target) {\n  \n}",
    testCases: [{ input: "[1,3,5,6], 2", expectedOutput: "1" }],
  },
  {
    title: "Find Minimum in Rotated Array",
    description: "Given a rotated sorted array with unique values, return the minimum element.",
    difficulty: "Medium",
    tags: ["Binary Search", "Array"],
    starterCode: "function findMin(nums) {\n  \n}",
    testCases: [{ input: "[3,4,5,1,2]", expectedOutput: "1" }],
  },
  {
    title: "Climbing Stairs",
    description: "You can climb either 1 or 2 steps at a time. Return the number of distinct ways to reach the top.",
    difficulty: "Easy",
    tags: ["Dynamic Programming"],
    starterCode: "function climbStairs(n) {\n  \n}",
    testCases: [{ input: "5", expectedOutput: "8" }],
  },
  {
    title: "House Robber",
    description: "Given money in houses along a street, return the maximum amount you can rob without robbing adjacent houses.",
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Array"],
    starterCode: "function rob(nums) {\n  \n}",
    testCases: [{ input: "[2,7,9,3,1]", expectedOutput: "12" }],
  },
  {
    title: "Coin Change",
    description: "Given coin denominations and an amount, return the fewest number of coins needed to make up that amount, or -1 if impossible.",
    difficulty: "Medium",
    tags: ["Dynamic Programming"],
    starterCode: "function coinChange(coins, amount) {\n  \n}",
    testCases: [{ input: "[1,2,5], 11", expectedOutput: "3" }],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Problem.deleteMany({});
    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems successfully`);
    await mongoose.disconnect();
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
