require("dotenv").config();
const express = require("express");
const { body } = require("express-validator");
const passport = require("passport");
const passportService = require("../services/passport");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

const router = express.Router();

const requireAuth = passport.authenticate("jwt", { session: false });

const requireAdmin = (req, res, next) => {
  if (req.user.id === process.env.SORIN) return next();
  res.sendStatus(401);
};

router.get("/", getPosts);

router.get("/:postId", getPostById);

router.post("/new", requireAuth, requireAdmin, createPost);

router.patch("/update", requireAuth, requireAdmin, updatePost);

router.delete("/delete", requireAuth, requireAdmin, deletePost);

module.exports = router;
