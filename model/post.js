const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: {
    type: String,
  },
  postImg: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},{
  timestamp: true
});

module.exports = mongoose.model("post", postSchema);
