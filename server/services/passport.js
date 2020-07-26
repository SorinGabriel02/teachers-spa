require("dotenv").config();
const bcrypt = require("bcrypt");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const User = require("../models/userModel");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // here token signature should be valid
  try {
    // check to see if the the user exists OR token is expired
    const match = await User.findById(payload.sub);
    if (!match || Math.floor(Date.now() / 1000) >= payload.exp)
      return done(null, false);
    done(null, match);
  } catch (error) {
    done(error, false);
  }
});

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(localLogin);
passport.use(jwtLogin);
