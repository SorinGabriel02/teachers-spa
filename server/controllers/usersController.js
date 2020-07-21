require("dotenv").config();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const expiresTimestamp = Date.now() + 60 * 1000;

const tokenForUser = (userId) =>
  jwt.sign({ sub: userId, exp: expiresTimestamp }, process.env.JWT_SECRET);

// send refresh token as httpOnly cookie
const refreshTokenAsCookie = (userId, res) => {
  // create token
  const token = jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "4m",
  });
  // set cookie expiration === token expiresIn
  const cookieExpiresIn = 4 * 60 * 1000;
  return res.cookie("refresh", token, {
    maxAge: cookieExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refresh;
  if (!refreshToken) {
    return res.status(401).json({ errorMessage: "Autentificare necesară." });
  }
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const decodedId = jwt.decode(refreshToken).sub;
    // check if it's admin
    if (decodedId === process.env.SORIN) {
      res.json({
        token: tokenForUser(decodedId),
        admin: true,
        expiresIn: expiresTimestamp,
      });
    } else {
      res.json({ token: tokenForUser(decodedId), expiresIn: expiresTimestamp });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ errorMessage: "Autentificare necesară" });
    }
    res.sendStatus(500);
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errorMessage: errors.array() });

  try {
    const { username, email, password } = req.body;
    // check if email is in use before trying to create a new user
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(409).json({
        errorMessage: "Un cont cu acest email există deja.",
      });
    // create and save the new user
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    // send back a token and a refresh token as cookie
    refreshTokenAsCookie(savedUser.id, res);
    res
      .status(201)
      .json({ token: tokenForUser(savedUser.id), expiresIn: expiresTimestamp });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Eroare de server. Te rog să încerci din nou mai târziu.",
    });
  }
};

const login = async (req, res, next) => {
  const userId = req.user.id;
  // send back refresh token as cookie
  refreshTokenAsCookie(userId, res);
  // and token
  if (userId === process.env.SORIN) {
    return res.json({
      token: tokenForUser(userId),
      admin: true,
      expiresIn: expiresTimestamp,
    });
  }

  res.json({ token: tokenForUser(userId), expiresIn: expiresTimestamp });
};

module.exports = { signup, login, refreshAccessToken };
