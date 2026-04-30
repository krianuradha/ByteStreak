
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: "user" },
  createdAt:{ type: Date, default: Date.now }
});

// Method to hash password
UserSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

// Method to check password
UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);