const Post = require("../models/postModel");
const { compareSync } = require("bcrypt");

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

const uploadImage = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  // permitted myme types
  const mymeTypes = ["image/png", "image/jpeg", "image/jpg"];
  // img object sent from client
  let image = req.files["file-0"];
  console.log(image);

  if (!mymeTypes.some((img) => img.mymetype === image.mymetype)) {
    return res.status(422).json({ error: "Invalid type of image." });
  }

  image.mv(`${__dirname}/../upload/images/${image.name}`, (err) => {
    if (err) return res.status(500).send(err);
    res.json({
      result: [
        {
          url: `/upload/images/${image.name}`,
          name: image.name,
          size: image.size,
        },
      ],
    });
  });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  uploadImage,
};
