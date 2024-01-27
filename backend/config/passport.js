require("dotenv").config();
const User = require("../models/User");

module.exports = (passport) => {
  const JwtStrategy = require("passport-jwt").Strategy;
  const { ExtractJwt } = require("passport-jwt");
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.load(payload.id)
        .then((u) => done(null, u))
        .catch(() => done(null, false));
    })
  );
};