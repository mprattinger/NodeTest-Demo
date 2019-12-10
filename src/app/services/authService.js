import * as jwt from "jsonwebtoken";

export class AuthService {
  findByCredentials(username, password) {
    if (username === "mprattinge" && password === "M_P2ttix") {
      return true;
    } else {
      return false;
    }
  }
  generateAuthToke(username) {
    const token = jwt.sign({ _id: username }, process.env.JWT_KEY);
    return token;
  }
}
