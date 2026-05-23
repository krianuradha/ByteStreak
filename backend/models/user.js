const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  score: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSolvedDate: { type: Date },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
