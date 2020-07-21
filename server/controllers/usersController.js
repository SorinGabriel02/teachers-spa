require("dotenv").config();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const tokenForUser = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "1m" });

// send refresh token as httpOnly cookie
const refreshTokenAsCookie = (userId, res) => {
  // create token
  const token = jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "10m",
  });
  // set cookie expiration === token expiresIn
  const cookieExpiresIn = 10 * 60 * 1000;
  return res.cookie("refresh", token, {
    maxAge: cookieExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

const refreshAccess = async (req, res, next) => {
  const expiredToken = req.headers.authorization.split(" ")[1];

  try {
    const verify = jwt.verify(expiredToken, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const userId = jwt.decode(expiredToken).sub;
      console.log(decoded);
      return res.json({ token: tokenForUser(userId) });
    }
    if (err.name === "")
  }
  res.json({ token: "send token soon" });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  try {
    const { username, email, password } = req.body;
    // check if email is in use before trying to create a new user
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(409).json({
        error:
          "An account with this email already exists. Please login instead.",
      });
    // create and save the new user
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    // send back a token and refresh token as cookie
    refreshTokenAsCookie(savedUser, res);
    res.status(201).json({ token: tokenForUser(savedUser.id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log("got here");
  //   return res.status(422).json({ errors: errors.array() });
  // }
  // send back a token and refresh token as cookie
  refreshTokenAsCookie(req.user, res);
  if (req.user.id === process.env.SORIN)
    return res.json({ token: tokenForUser(req.user.id), admin: true });
  res.json({ token: tokenForUser(req.user.id) });
};

module.exports = { signup, login, refreshAccess };
