const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profile: {
      firstName: { type: String, default: "", required: true },
      lastName: { type: String, default: "", required: false },
      bio: { type: String, default: "Something about me.", required: false },
      avatarUrl: { type: String, default: "", required: false },
    },
    roles: { type: [String], default: ["user"], required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
