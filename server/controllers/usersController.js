require("dotenv").config();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const tokenForUser = (user) =>
  jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

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
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    // send back a token
    res.status(201).json({ token: tokenForUser(savedUser) });
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

  if (req.user.id === process.env.SORIN)
    return res.json({ token: tokenForUser(req.user), admin: true });
  res.json({ token: tokenForUser(req.user) });
};

module.exports = { signup, login };
