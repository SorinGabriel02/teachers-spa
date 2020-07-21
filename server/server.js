require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const usersRouter = require("./routes/usersRoutes");
const postsRouter = require("./routes/postsRoutes");
const mediaRouter = require("./routes/mediaRoutes");

const app = express();

// middleware
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.0" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// static directory that servers images to the rich text editor
// when "/api/media/images" endpoint is requested
// serve images from "/upload/images" directory
app.use("/api/media/images", express.static(`${__dirname}/upload/images/`));
app.use(fileUpload());

// routes
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/media", mediaRouter);

const port = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(err);
    console.log("Successfully connected to the database.");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  }
);
