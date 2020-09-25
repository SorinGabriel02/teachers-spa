require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");

const {
  getPosts,
  getPostById,
  getPostsByPage,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

const router = express.Router();

const requireAuth = passport.authenticate("jwt", { session: false });

const requireAdmin = (req, res, next) => {
  if (req.user.admin) return next();
  res.status(403).json({
    errorMessage: "Această acțiune nu este permisă. Te rog autentifică-te.",
  });
};

router.get("/:postId", getPostById);

router.get("/page/:pageName", getPostsByPage);

router.post(
  "/:pageName/new",
  [body("content").isString().notEmpty()],
  requireAuth,
  requireAdmin,
  createPost
);

router.patch(
  "/update/:postId",
  [body("content").isString().notEmpty()],
  requireAuth,
  requireAdmin,
  updatePost
);

router.delete("/delete/:postId", requireAuth, requireAdmin, deletePost);

module.exports = router;
