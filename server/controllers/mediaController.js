// save an image file and send back response
const uploadImage = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  // permitted myme types
  const mymeTypes = ["image/png", "image/jpeg", "image/jpg"];
  // img object sent from client
  let image = req.files["file-0"];
  console.log(image);

  if (!mymeTypes.some((img) => img.mymetype === image.mymetype)) {
    return res.status(422).json({ error: "Invalid type of image." });
  }

  image.mv(`${__dirname}/../upload/images/${image.name}`, (err) => {
    if (err) return res.status(500).send(err);
    res.json({
      result: [
        {
          url: `http://localhost:8080/api/media/images/${image.name}`,
          name: image.name,
          size: image.size,
        },
      ],
    });
  });
};

// send back an image url
const getImageUrl = (req, res, next) => {
  const imageName = req.params;
  res.send(`http://localhost:8080/upload/images/${imageName}`);
};

module.exports = { uploadImage, getImageUrl };
