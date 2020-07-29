const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  login,
  refreshAccessToken,
  logout,
} = require("../controllers/usersController");
const passport = require("passport");

const router = express.Router();

const requireLocalAuth = passport.authenticate("local", { session: false });
const requireJwtAuth = passport.authenticate("jwt", { session: false });

// refresh token route
router.get("/refresh", refreshAccessToken);

// an user is able to logout if he has a valid token
router.get("/logout", requireJwtAuth, logout);

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
  requireLocalAuth,
  login
);

module.exports = router;
