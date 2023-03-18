const express = require("express");
const { postLogin } = require("../controller/auth,js");
const router = express.Router();
const {getLandingPage, getComment} = require('../controller/user')

router.get("/", getLandingPage);
router.get('/comment', getComment);


router.post('/login', postLogin);


module.exports = router;
