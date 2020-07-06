const Post = require("../models/postModel");

const getPosts = (req, res, next) => {
  res.json({ message: "get a list of posts..." });
};

const getPostById = (req, res, next) => {
  res.json({
    postId: req.params.postId,
    message: "get a post by id and it's comments",
  });
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, author, createdAt } = req.body;
    const newPost = new Post({ title, content, author, createdAt });
    await newPost.save();
    res.json({ message: "Post successfully created" });
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

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
