const Post = require("../models/postModel");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json([...posts]);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    res.json({ post: post.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ content, author: req.user._id, comments: [] });
    await newPost.save();
    res.status(201).json({ message: "Successfully created." });
  } catch (error) {
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
