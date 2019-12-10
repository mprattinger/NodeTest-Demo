import { UserController } from "../controller/userController";

export function UserRoutes(router) {
  const userController = new UserController();
  router
    .route("/user/login")
    .post((req, res) => userController.login(req, res));
}
