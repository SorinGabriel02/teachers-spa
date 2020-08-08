require("dotenv").config();
const express = require("express");
const passport = require("passport");

const { newComment } = require("../controllers/commentsController");

const router = express.Router();

const withAuth = passport.authenticate("jwt", { session: false });

router.post("/:postId/new", withAuth, newComment);

module.exports = router;
