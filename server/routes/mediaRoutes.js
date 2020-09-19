const multer = require("multer");
const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");

const { uploadImage } = require("../controllers/mediaController");

const withAuth = passport.authenticate("jwt", { session: false });

const withAdmin = (req, res, next) => {
  if (req.user.admin) return next();
  res.status(403).json({
    errorMessage: "Această acțiune nu este permisă. Te rog autentifică-te.",
  });
};

const router = express.Router();

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("file-0");

// save a new image file on the server at upload/images
// check for admin before uploading image !
router.post("/images/new", withAuth, withAdmin, upload, uploadImage);

module.exports = router;
