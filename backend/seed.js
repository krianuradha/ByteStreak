const mongoose = require("./atlas"); // import connection from atlas.js
const Problem = require("./models/problem");

// Generate 100 problems
const problems = [];

for (let i = 1; i <= 100; i++) {
  problems.push({
    title: `Problem ${i}`,
    description: `This is the description for problem number ${i}`,
    difficulty: i % 3 === 0 ? "Hard" : i % 3 === 1 ? "Easy" : "Medium"
  });
}

// Insert problems into MongoDB
Problem.insertMany(problems)
  .then(() => {
    console.log("✅ 100 problems added successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));