const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
    },
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
