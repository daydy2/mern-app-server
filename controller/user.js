const Post = require("../model/post.model");
const Comment = require("../model/comment.model");
const User = require("../model/user.model");
const { default: mongoose } = require("mongoose");
const handleError = (err) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((user) => {
      res.status(200).json({
        message: "All user",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLandingPage = (req, res, next) => {
  Post.find()
    .then((post) => {
      if (!post) {
        throw new Error("No Post");
      }
      res.json({ post: post });
    })
    .catch((err) => handleError(err));
};

exports.getComment = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .populate({ path: "comments", options: { strictPopulate: false } })
    .exec()
    .then((comment) => {
      if (!comment) {
        return res.json({ message: "nothing here" });
      }
      return res.json({ post: comment });
    })
    .catch((err) => console.log(err));
};

exports.postComment = (req, res, next) => {
  const { content, userId, postId } = req.body;
  const newUserId = new mongoose.Types.ObjectId(userId);
  const newPostId = new mongoose.Types.ObjectId(postId);
  const newComment = new Comment({
    content: content.toLowerCase(),
    author: newUserId,
    post: newPostId,
  });
  newComment.save();
  res.status(200).json({ message: "content saved successfully" });
};

exports.postPost = (req, res, next) => {
  const { title, content, userId } = req.body;

  const userIDM = new mongoose.Types.ObjectId(userId);
  const newPost = new Post({
    title: title.toLowerCase(),
    content: content.toLowerCase(),
    author: userIDM,
  });
  newPost.save();
  return res.json({
    message: "Post updated sucessfully",
  });
};

exports.getProfile = (req, res, next) => {
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return req.status(401).json({
          user: null,
          message: "User not found in our database",
        });
      }
      F;
      return res.status(200).json({
        handle: user.handle,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        postCount: user.posts.length,
        commentCount: user.comments.length,
      });
    })
    .catch((err) => handleError(err));
};

exports.addFollower = (req, res, next) => {
  const { userIdToFollow } = require.body;
  User.findOne({ _id: userIdToFollow })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });

        // user.followUser(userIdToFollow);
        // return res.status(20);
      }
    })
    .catch((err) => {
      handleError(err);
    });
};
