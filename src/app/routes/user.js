import { UserController } from "../controller/userController";
import { authLocal } from "../services/authService";
import { Router } from "express";

export function UserRoutes() {
  const routes = new Router();
  routes.post("/login", authLocal, UserController.login);
  return routes;
}
