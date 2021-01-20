const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: String,
    email: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
