const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const setCurrentUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({ error: "Token undefined" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    req.token = token;
    req.currentUser = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = setCurrentUser;
