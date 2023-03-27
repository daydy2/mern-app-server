// First, import any required dependencies
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// Define middleware function to set the current user
const setCurrentUser = async (req, res, next) => {
  try {
    // Extract the JWT token from the request headers
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader.split(" ")[1];

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // Attach the user object to the request object
    req.currentUser = user;

    // Call the next middleware function
    next();
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Export the middleware function for use in your routes
module.exports = setCurrentUser;
