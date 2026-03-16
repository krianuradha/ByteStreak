

// test.js
const mongoose = require("./atlas");

mongoose.connection.once("open", () => {
  console.log("Connection works!");
});