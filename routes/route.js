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
  getPost,
  postProfile,
} = require("../controller/user");
const setCurrentUser = require("../middleware/setCurrentUser");

router.get("/", getLandingPage);
router.get("/comment/:postId", setCurrentUser, getComment);
router.get("/profile/:userId", setCurrentUser, getProfile);
router.get("/getuser", getAllUsers);
router.get("/logout", setCurrentUser, logout);
router.get("/getpost", setCurrentUser, getPost);

router.post("/login", postLogin);
router.post("/signup", postSignup);
router.post("/comment", setCurrentUser, postComment);
router.post("/post", setCurrentUser, postPost);
router.patch("/profile", setCurrentUser, postProfile);

module.exports = router;
