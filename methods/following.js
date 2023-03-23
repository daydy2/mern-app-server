const { Following } = require('../model/relationship.model');

// Define a method for adding a following
const addFollowing = async (userId, followingId) => {
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