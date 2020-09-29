require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/usersRoutes");
const postsRouter = require("./routes/postsRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const mediaRouter = require("./routes/mediaRoutes");
// save the base directory of the app as __basedir
// global.__basedir = __dirname;

const app = express();

if (process.env.NODE_ENV === "development") app.use(require("morgan")("dev"));

// middleware
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.8" }));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/media", mediaRouter);

const port = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) return console.log(err);
    console.log("Successfully connected to the database.");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  }
);
