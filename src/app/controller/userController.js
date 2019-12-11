import { UserModel, UserRoles } from "../models/userModel";
import jsonwebtoken from "jsonwebtoken";
import randToken from "rand-token";
import httpStatus from "http-status";

export class UserController {
  constructor() {
    this.refreshTokens = [];
  }
  add(req, res) {}
  login(req, res) {
    let user = req.user;
    let id = user.userName + user.role;
    let jwt = jsonwebtoken.sign(
      {
        _id: id
      },
      process.env.JWT_KEY,
      { expiresIn: "5m" }
    );
    let auth = {
      _id: id,
      userName: user.userName,
      token: `JWT ${jwt}`
    };
    res.status(httpStatus.OK).json(auth);
  }
}
