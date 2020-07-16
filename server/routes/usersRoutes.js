const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/usersController");
const passport = require("passport");
const passportService = require("../services/passport");

const router = express.Router();

const requireAuth = passport.authenticate("local", { session: false });

router.post(
  "/signup",
  [
    body("username").isLength({ min: 2, max: 100 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 250 }).escape(),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 250 }).escape(),
  ],
  requireAuth,
  login
);

module.exports = router;
