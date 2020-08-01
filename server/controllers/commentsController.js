const mongoose = require("mongoose");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const newComment = async (req, res, next) => {
  try {
    const author = req.user.id;
    const { content, postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        errorMessage:
          "Articolul legat de acest comentariu nu a fost găsit. Comentariul nu poate fi salvat.",
      });
    }

    const newComment = new Comment({
      content,
      author,
      post: postId,
    });
    // start a session where a comment is saved and it's reference
    // added to that particular post's comments array
    const session = await mongoose.startSession();
    session.startTransaction();
    await newComment.save({ session });
    // this push() belongs to mongoose, not standard JS push()
    post.comments.push(newComment);
    await post.save({ session });
    await session.commitTransaction();

    res.json({ comment: newComment });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { newComment };