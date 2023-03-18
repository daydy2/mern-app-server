const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      trim: true,
      unique: [true, "email already exists in database!"],
      required: [true, "email not provided"],
    },
    password: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "admin"],
      //required: [true, "Please specify user role"]
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("user", userSchema);
