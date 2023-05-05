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
      res.status(200).json({ post: post });
    })
    .catch((err) => handleError(err));
};

exports.getComment = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .populate([
      { path: "author", select: "email" },
      {
        path: "comments",
        populate: { path: "author" },
      },
    ])
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "nothing here" });
      }
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.postComment = (req, res, next) => {
  const { comment, userId, postId } = req.body;
  console.log(comment, userId, postId);
  const newUserId = new mongoose.Types.ObjectId(userId);
  const newPostId = new mongoose.Types.ObjectId(postId);
  const newComment = new Comment({
    content: comment.toLowerCase(),
    author: newUserId,
    post: newPostId,
  });
  newComment.save();

  Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: "something went wrong" });
      }
      return res
        .status(200)
        .json({ message: "content saved successfully", post: result });
    })
    .catch((err) => console.error(err));
};

exports.getPost = (req, res, next) => {
  Post.find()
    .populate({ path: "author", options: { strictPopulate: false } })
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(201).json({ message: "No post found" });
      }

      return res.status(200).json({ post });
    })
    .catch((err) => handleError(err));
};
exports.postPost = (req, res, next) => {
  const { title, content, userId } = req.body;

  if (title == false || content == false) {
    return res.status(404).json({ message: "You returned an empty string" });
  }
  const userIDM = new mongoose.Types.ObjectId(userId);
  const newPost = new Post({
    title: title.toLowerCase(),
    content: content.toLowerCase(),
    author: userIDM,
  });
  newPost.save();
  return res.status(200).json({
    message: "Post updated sucessfully",
  });
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          user: null,
          message: "User not found in our database",
        });
      }

      return res.status(200).json({
        handle: user.handle,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "Post does not exist" });
      }
      res.status(200).json({ post: { ...post._doc } });
    })
    .catch((err) => handleError(err));
};

exports.postProfile = async (req, res, next) => {
  const { email, firstname, lastname, handle, userId } = req.body;

  if (userId == false) {
    return res.status(400).json("One field is falsy");
  }

  const updates = {
    firstname,
    lastname,
    handle,
  };
  const updatedDoc = User.findOneAndUpdate(
    { _id: userId },
    { $set: updates },
    { new: true }
  ).exec();
  return res.status(200).json({ message: "Update successful" });
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

exports.sendHealth = (req, res, next) => {
  res.sendStatus(200);
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndDelete(postId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
};

// exports.editPost = async (req, res, next) => {
//   const { title, content, userId } = req.body;
//   const postId = req.params.postId;

//   const update = {
//     title,
//     content,
//   };
//   Post.findByIdAndUpdate({ _id: postId }, { $set: update }, { new: true })
//     .exec()
//     .then((result) => {
//       if (!result) {
//         return res.staus(400).json({ message: "Post Edit unsuccessful" });
//       }
//       res.status(200).json({ message: "Post Edit succesful" });
//     });

//   const updatedDoc = User.findOneAndUpdate(
//     { _id: userId },
//     { $set: update },
//     { new: true }
//   ).exec();
//   return res.status(200).json({ message: "Update successful" });
// };
exports.editPost = async (req, res, next) => {
  const { title, content, userId } = req.body;
  const postId = req.params.postId;

  const update = {
    title,
    content,
  };

  Promise.all([
    Post.findByIdAndUpdate(
      { _id: postId },
      { $set: update },
      { new: true }
    ).exec(),
    User.findOneAndUpdate(
      { _id: userId },
      { $set: update },
      { new: true }
    ).exec(),
  ])
    .then(([postResult, userResult]) => {
      if (!postResult || !userResult) {
        return res.status(400).json({ message: "Post edit unsuccessful" });
      }
      return res.status(200).json({ message: "Update successful" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
