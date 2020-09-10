require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");

const {
  newComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");

const router = express.Router();

const withAuth = passport.authenticate("jwt", { session: false });

router.post(
  "/:postId/new",
  [body("content").isString().notEmpty().escape()],
  withAuth,
  newComment
);

router.patch(
  "/:commentId",
  [body("content").isString().notEmpty().escape()],
  withAuth,
  updateComment
);

router.delete("/:commentId", withAuth, deleteComment);

module.exports = router;
