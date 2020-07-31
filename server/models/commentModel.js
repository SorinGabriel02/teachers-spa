const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    post: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
