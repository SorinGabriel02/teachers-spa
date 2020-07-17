const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");

const { getImageUrl, uploadImage } = require("../controllers/mediaController");

const router = express.Router();

// gen an image url by image name
router.get("/images/:imageName", getImageUrl);

// save a new image file on the server at upload/images
router.post("/images/new", uploadImage);

module.exports = router;
