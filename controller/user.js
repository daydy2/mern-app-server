const Post = require("../model/post");
const Comment = require("../model/comment");
const User = require("../model/user");

const handleError = (err) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

exports.getLandingPage = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => handleError(err));
};

exports.getComment = (req, res, next) => {
  const postId = req.params.postId;

  Comment.find({ postId: postId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      handleError(err);
    });
};
exports.postComment = (req, res, next) => {
  const { comment, commenterId } = req.body;

  const newComment = new Comment({
    comment: comment,
    userId: commenterId,
  });
  return newComment.save();
};
exports.postPost = (req, res, next) => {
  const { post, postImg, userId } = req.body;

  const newPost = new Post({
    post: post,
    userId: userId,
  });
  return newPost.save();
};

exports.getProfile = (req, res, next) => {
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      if (!doMatch) {
        return req.status(401).json({
          user: null,
          message: "User not found in our database",
        });
      }
      return res.status(200).json({
        firstname: user.firstname,
        userId: user._id.toString(),
        email: user.email,
        lastname: user.lastname,
        bio: user.bio ? user.bio : null,
        userImg: user.userImg ? user.userImg : null,
      });
    })
    .catch((err) => handleError(err));
};
