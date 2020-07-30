const Post = require("../models/postModel");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json([...posts]);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPostById = (req, res, next) => {
  res.json({
    postId: req.params.postId,
    message: "get a post by id and it's comments",
  });
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ post: newPost });
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
