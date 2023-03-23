// Import the Follower model
const { Follower } = require('../model/relationship.model');

// Define a method for adding a follower
const addFollower = async (userId, followerId) => {
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