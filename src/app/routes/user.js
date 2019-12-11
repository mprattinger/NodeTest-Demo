import { UserController } from "../controller/userController";
import { authLocal } from "../services/authService";

export function UserRoutes(router) {
  const userController = new UserController();
  router
    .route("/user/login")
    .post(authLocal, (req, res) => userController.login(req, res));
}
