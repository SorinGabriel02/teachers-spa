require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require("./routes/usersRoutes");

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/users", userRouter);

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
