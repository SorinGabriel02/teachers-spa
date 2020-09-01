const mongoose = require("mongoose");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { post } = require("../routes/commentsRoutes");

const newComment = async (req, res, next) => {
  // user is authenticated
  const user = req.user;
  const { postId } = req.params;
  try {
    const { content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        errorMessage:
          "Articolul legat de acest comentariu nu a fost găsit. Comentariul nu poate fi salvat.",
      });
    }

    const newComment = new Comment({
      content,
      author: user.id,
      post: post.id,
    });
    // start a session where a comment is saved and it's reference
    // added to that particular post's comments array
    // and also added to the user itself
    const session = await mongoose.startSession();
    session.startTransaction();

    await newComment.save({ session });
    // this push() belongs to mongoose, not standard JS push()
    post.comments.push(newComment);
    await post.save({ session });
    user.comments.push(newComment);
    await user.save({ session });

    await session.commitTransaction();
    // send back new comment with an extra "id" prop = to "_id"
    res.status(201).json({ comment: newComment.toObject({ getters: true }) });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Eroare de server. Comentariul nu a putut fi creat.",
    });
  }
};

const updateComment = (req, res) => {
  // update if user is admin OR user is comment author
  const { postId, commentId } = req.params;
  const { content } = req.body;
  console.log(req.user, postId, commentId, content);
  res.json({ message: "updating comment" });
};

const deleteComment = async (req, res) => {
  // delete if user is admin OR user is comment author
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId).populate("author");
    // error back if post or comment can't be found
    if (!post || !comment) {
      return res.status(404).json({
        errorMessage: "404 A intervenit o eroare. Te rog încearcă mai târziu.",
      });
    }
    // error back if the request did not come from comment author or admin
    if (
      req.user._id.toString() !== comment.author._id.toString() ||
      !req.user.admin
    ) {
      return res
        .status(401)
        .json({ errorMessage: "Datele de autentificare nu sunt valide." });
    }
    // in the same session,
    const session = await mongoose.startSession();
    session.startTransaction();
    // - remove comment reference from author
    comment.author.comments.pull(commentId);
    await comment.author.save({ session });
    // - remove comment reference from "post"
    post.comments.pull(commentId);
    await post.save({ session });
    // - delete comment
    await Comment.findByIdAndDelete(commentId, { session });
    await session.commitTransaction();

    res.json({ message: "Success" });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Eroare de server. Comentariul nu a putut fi șters.",
    });
  }
};

module.exports = { newComment, updateComment, deleteComment };
