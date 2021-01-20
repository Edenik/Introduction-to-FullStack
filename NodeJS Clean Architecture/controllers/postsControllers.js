//Data
const Post = require("../models/postModel");

/// Handlers
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNewPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatePost = (req, res) => {
  res.status(200).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deletePost = (req, res) => {
  res.status(200).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
