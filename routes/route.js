const express = require("express");
const { logout } = require("../controller/auth,js");
const { postSignup, postLogin } = require("../controller/auth,js");
const router = express.Router();
const {
  getLandingPage,
  getComment,
  postComment,
  postPost,
  getProfile,
  getAllUsers,
} = require("../controller/user");
const setCurrentUser = require("../middleware/setCurrentUser");

router.get("/", setCurrentUser, getLandingPage);
router.get("/comment/:postId", setCurrentUser, getComment);
router.get("/profile", setCurrentUser, getProfile);
router.get("/getuser", setCurrentUser, getAllUsers);
router.get("/logout", setCurrentUser, logout);

router.post("/login", postLogin);
router.post("/signup", postSignup);
router.post("/comment", setCurrentUser, postComment);
router.post("/post", setCurrentUser, postPost);

module.exports = router;
