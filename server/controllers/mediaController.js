require("dotenv").config();
const AWS = require("aws-sdk");
const uuid = require("uuid").v4;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "eu-central-1",
});
// save an image file and send back response
// is the user admin ??
const uploadImage = (req, res) => {
  // permitted myme types
  const mymeTypes = ["image/png", "image/jpeg", "image/webp"];
  const myme = req.file.mimetype;

  const fileToArray = req.file.originalname.split(".");
  const fileExtention = fileToArray[fileToArray.length - 1];
  const fileSize = req.file.size;

  correctType = mymeTypes.some((img) => img === myme);
  if (!correctType) {
    return res.status(422).json({
      errorMessage: "Only .png, .jpeg, .jpg or .webp types are allowed.",
    });
  }

  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${uuid()}.${fileExtention}`,
    Body: req.file.buffer,
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ errorMessage: "Server error, please try again later." });
    }
    res.json({
      result: [
        {
          url: data.Location,
          name: data.key,
          size: fileSize,
        },
      ],
    });
  });
};

module.exports = { uploadImage };
