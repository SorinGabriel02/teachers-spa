const mongoose = require("mongoose");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json([...posts.map((post) => post.toObject({ getters: true }))]);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate("comments");
    res.json({ post: post.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createPost = async (req, res, next) => {
  // user is authenticated, admin and passed on by passport
  const user = req.user;
  try {
    const { content } = req.body;

    const newPost = new Post({ content, author: req.user.id, comments: [] });
    // save post and add it's id as reference to it's creator
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    user.posts.push(newPost);
    await user.save({ session });
    session.commitTransaction();
    res.status(201).json({ message: "Successfully created." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePost = (req, res, next) => {
  res.json({ message: "updating post..." });
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    // find the post ->populate with all comments and user references
    const toDelete = await Post.findById(postId, "-content")
      .populate({
        path: "author",
        select: "_id posts",
      })
      .populate({
        path: "comments",
        model: "Comment",
        select: "_id author",
        populate: {
          path: "author",
          model: "User",
          select: "_id comments",
        },
      });

    console.log(toDelete);

    if (!toDelete) {
      return res
        .status(404)
        .json({ errorMessage: "Articolul nu a fost găsit." });
    }
    // start a session
    const session = await mongoose.startSession();
    session.startTransaction();
    // delete post reference from author
    toDelete.author.posts.pull({ _id: toDelete._id });
    // check to see if the author has comments
    toDelete.author.save({ session });

    // delete each comment reference from their respective user/author
    for (let comment of toDelete.comments) {
      // forEach comment delete it's reference from the respective user
      await User.findByIdAndUpdate(
        comment.author._id,
        {
          comments: comment.author.comments.pull({ _id: comment._id }),
        },
        { session }
      );

      // delete the related comment document from database
      await Comment.findByIdAndDelete(comment._id, { session });
    }

    // delete the actual post
    await Post.findByIdAndDelete(toDelete._id, { session });

    await session.commitTransaction();

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
