const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 200,
    },
    admin: { type: Boolean, required: true, default: false },
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
    comments: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Comment" },
    ],
  },
  { timestamps: true }
);

// password hash
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(user.password, 11);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
