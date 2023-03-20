const express = require("express");
const { postSignup } = require("../controller/auth,js");
const { postLogin } = require("../controller/auth,js");
const router = express.Router();
const {
  getLandingPage,
  getComment,
  postComment,
  postPost,
  getProfile,
} = require("../controller/user");

router.get("/", getLandingPage);
router.get("/comment", getComment);
router.get("/profile", getProfile);

router.post("/login", postLogin);
router.post('/signup', postSignup)
router.post("/comment", postComment);
router.post("/post", postPost);

module.exports = router;
