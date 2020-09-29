require("dotenv").config();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { transporter, mailOptions } = require("../services/nodemailer");

// expiry time in 15min token should be refreshed by a frontend call
const tokenForUser = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

// add refresh token as httpOnly cookie
const refreshTokenAsCookie = (userId, admin, res) => {
  // create token
  const token = jwt.sign(
    { sub: userId, adm: admin },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "3d",
    }
  );
  // set cookie expiration === token expiresIn === 3 days
  const cookieExpiresIn = 3 * 24 * 60 * 60 * 1000;
  return res.cookie("refresh", token, {
    maxAge: cookieExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : null,
    sameSite: process.env.NODE_ENV === "production" ? true : null,
  });
};

const logout = (req, res) => {
  // access token is valid at this point
  // if refresh token is valid, log the user out by emptying cookie
  try {
    refreshToken = req.cookies.refresh;
    if (!refreshToken)
      return res.status(401).json({ error: "Date incomplete." });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    res.cookie("refresh", "", {
      maxAge: 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : null,
      sameSite: process.env.NODE_ENV === "production" ? true : null,
    });
    res.json({ msg: "Delogare completă." });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Date incorecte." });
    }
    res.sendStatus(500);
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({
      errorMessage:
        "Datele introduse nu sunt valide. Te rog verifică și încearcă din nou.",
    });

  try {
    const { username, email, password } = req.body;
    // check if email is in use before trying to create a new user
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(409).json({
        errorMessage:
          "Un cont cu acest email există deja. Dacă ești deja înregistrat, loghează-te.",
      });
    // create and save the new user
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    // send back a token and a refresh token as cookie
    refreshTokenAsCookie(savedUser.id, savedUser.admin, res);
    // send info email to admins -> new account
    transporter.sendMail(
      {
        ...mailOptions,
        subject: "profesoridesprijin cont nou",
        text: `Un nou cont tocmai a fost creat. Nume: ${username}`,
      },
      (err) => {
        if (err) console.log(err);
      }
    );

    res.status(201).json({ token: tokenForUser(savedUser.id) });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Eroare de server. Te rog să încerci din nou mai târziu.",
    });
  }
};

const login = async (req, res, next) => {
  const { id, admin } = req.user;
  // send back refresh token as cookie
  refreshTokenAsCookie(id, admin, res);
  // and token
  if (admin) {
    return res.json({
      token: tokenForUser(id),
      admin: true,
    });
  }

  res.json({ token: tokenForUser(id) });
};

const refreshAccessToken = (req, res, next) => {
  // send back both --> token and refreshToken
  // keep the user in until refreshToken expires
  const refreshToken = req.cookies.refresh;
  if (!refreshToken) {
    return res.status(401).json({ errorMessage: "Autentificare necesară." });
  }
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const decodedId = jwt.decode(refreshToken).sub;
    const isAdmin = jwt.decode(refreshToken).adm;
    // add new refreshToken as cookie
    refreshTokenAsCookie(decodedId, isAdmin, res);
    // check if it's admin
    if (isAdmin) {
      res.json({
        token: tokenForUser(decodedId),
        admin: true,
      });
    } else {
      res.json({ token: tokenForUser(decodedId) });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ errorMessage: "Autentificare necesară" });
    }
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { signup, login, refreshAccessToken, logout };
