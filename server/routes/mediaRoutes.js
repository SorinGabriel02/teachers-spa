const multer = require("multer");
const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");

const { uploadImage } = require("../controllers/mediaController");

const router = express.Router();

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("file-0");

// save a new image file on the server at upload/images
// check for admin before uploading image !
router.post("/images/new", upload, uploadImage);

module.exports = router;
