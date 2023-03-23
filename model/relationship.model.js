const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for "follower" model
const FollowerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Define schema for "following" model
const FollowingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});



// Import the Follower model


// Define a method for adding a follower
FollowerSchema.methods.addFollower = async (userId, followerId) => {
  try {
    // Create a new "follower" document
    const follower = new Follower({
      user: userId,
      follower: followerId
    });

    // Save the "follower" document to the database
    await follower.save();

    // Return the saved "follower" document
    return follower;
  } catch (error) {
    throw new Error(`Could not add follower: ${error.message}`);
  }
};

FollowingSchema.methods.addFollowing = async (userId, followingId) => {
    try {
      // Create a new "following" document
      const following = new Following({
        user: userId,
        following: followingId
      });
  
      // Save the "following" document to the database
      await following.save();
  
      // Return the saved "following" document
      return following;
    } catch (error) {
      throw new Error(`Could not add following: ${error.message}`);
    }
  };

// Export the models
module.exports = {
  Follower: mongoose.model('Follower', FollowerSchema),
  Following: mongoose.model('Following', FollowingSchema)
};
