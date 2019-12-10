import { UserModel, UserRoles } from "../models/userModel";
import jsonwebtoken from "jsonwebtoken";
import randToken from "rand-token";

export class UserController {
  constructor() {
    this.refreshTokens = [];
  }
  add(req, res) {}
  login(req, res) {
    let result = {};
    let status = 200;
    const { username, password } = req.body;
    let user = {};
    user.userName = username;
    if (user.userName.toUpperCase() === "MPRATTINGE") {
      user.role = UserRoles.ADMIN;
    } else {
      user.role = UserRoles.USER;
    }
    let token = jsonwebtoken.sign(user, process.env.JWT_KEY, {
      expiresIn: 300
    });
    let refreshToken = randToken.uid(256);
    this.refreshTokens[refreshToken] = username;
    res.json({ token: "JWT " + token, refreshToken: refreshToken });
  }
}
