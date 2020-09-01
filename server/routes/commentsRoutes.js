require("dotenv").config();
const express = require("express");
const passport = require("passport");

const {
  newComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");

const router = express.Router();

const withAuth = passport.authenticate("jwt", { session: false });

router.post("/:postId/new", withAuth, newComment);

router.patch("/:commentId", withAuth, updateComment);

router.delete("/:commentId", withAuth, deleteComment);

module.exports = router;
