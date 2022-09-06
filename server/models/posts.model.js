const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  message: { type: String, requried: true },
});
const Post = mongoose.model("Post", posts);
module.exports = Post;
