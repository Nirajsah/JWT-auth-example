const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
