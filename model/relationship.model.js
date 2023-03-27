const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

userSchema.methods.followUser = async function (userIdToFollow) {
  // Check if the user is already following the target user
  const existingFollower = await Follower.findOne({
    follower: this._id,
    following: userIdToFollow,
  });

  if (existingFollower) {
    throw new Error("User is already following the target user");
  }

  // Create a new Follower document to represent the follower/following relationship
  const newFollower = new Follower({
    follower: this._id,
    following: userIdToFollow,
  });

  await newFollower.save();
};

userSchema.methods.unfollowUser = async function (userIdToUnfollow) {
  // Find the Follower document representing the follower/following relationship
  const follower = await Follower.findOne({
    follower: this._id,
    following: userIdToUnfollow,
  });

  if (!follower) {
    throw new Error("User is not currently following the target user");
  }

  // Delete the Follower document to remove the follower/following relationship
  await follower.remove();
};

module.exports = mongoose.model("Follower", followerSchema);
