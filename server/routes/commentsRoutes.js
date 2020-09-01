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

router.patch("/:postId/:commentId", withAuth, updateComment);

router.delete("/:postId/:commentId", withAuth, deleteComment);

module.exports = router;
