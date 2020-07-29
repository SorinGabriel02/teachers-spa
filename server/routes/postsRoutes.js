require("dotenv").config();
const express = require("express");
const passport = require("passport");
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
  res.status(403).json({
    errorMessage: "Această acțiune nu este permisă. Te rog autentifică-te.",
  });
};

router.get("/", getPosts);

router.get("/:postId", getPostById);

router.post("/new", requireAuth, requireAdmin, createPost);

router.patch("/update", requireAuth, requireAdmin, updatePost);

router.delete("/delete", requireAuth, requireAdmin, deletePost);

module.exports = router;
