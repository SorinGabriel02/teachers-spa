const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");

const { uploadImage } = require("../controllers/mediaController");

const router = express.Router();

// save a new image file on the server at upload/images
router.post("/images/new", uploadImage);

module.exports = router;
