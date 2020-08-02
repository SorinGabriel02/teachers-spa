const mongoose = require("mongoose");
const User = require("../models/userModel");
const Post = require("../models/postModel");

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
  try {
    const { content } = req.body;
    const { id } = req.user;
    const user = await User.findById(id, "-password");

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Datele utilizatorului nu sunt valide." });
    }

    const newPost = new Post({ content, author: user.id, comments: [] });
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

const deletePost = (req, res, next) => {
  res.json({ message: "deleting post..." });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
