import passport from "passport";
import localStragegy from "passport-local";
import { UserModel, UserRoles } from "../models/userModel";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

//https://medium.com/@kris101/building-rest-api-in-nodejs-mongodb-passport-jwt-6c557332d4ca
//https://github.com/krissnawat/nodejs-restapi/blob/ep-12/src/services/auth.services.js
//https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js/

const localOpts = {
  usernameField: "name"
};

const localStrategy = new localStragegy(
  localOpts,
  async (name, password, done) => {
    try {
      var user = new UserModel();
      user.userName = name;
      if (name.toUpperCase() === "MPRATTINGE") {
        user.role = UserRoles.ADMIN;
      } else {
        user.role = UserRoles.USER;
      }
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  }
);

// Jwt strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader("authorization"),
  secretOrKey: process.env.JWT_KEY
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    var user = new UserModel();
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localStragegy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });
