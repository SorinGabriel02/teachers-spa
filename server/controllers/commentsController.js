const Comment = require("../models/commentModel");

const newComment = async (req, res, next) => {
  try {
    const author = req.user._id;
    const { content, postId } = req.body;
    const comment = new Comment({
      content,
      author,
      post: postId,
    });
    await comment.save();
    res.json({ comment });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { newComment };
