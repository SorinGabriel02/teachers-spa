const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comments: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Comment" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
