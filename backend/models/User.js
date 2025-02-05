const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  financialGoals: { type: String, default: "" },
  riskTolerance: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

