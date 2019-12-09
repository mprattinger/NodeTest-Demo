import { UserModel } from "../models/userModel";

export class UserController {
  add(req, res) {}
  login(req, res) {
    let result = {};
    let status = 200;
    const { name, password } = req.body;
    if (name === "mprattinge" && password === "M_P2ttix") {
      result.status = status;
      let user = new UserModel();
      user.userName = name;
      result.result = user;
    } else {
      status = 401;
      result.status = status;
      result.error = "Authentication error";
    }
    res.status(status).send(result);
  }
}
