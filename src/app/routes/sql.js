import { SqlController } from "../controller/sqlController";
import { authJwt } from "../services/authService";
import { Router } from "express";

export function SqlRoutes() {
  const sqlController = new SqlController();
  const routes = new Router();
  if (process.env.NODE_ENV === "test") {
    routes.post("/insert", async (req, res) => {
      await sqlController.insert(req, res);
    });
    routes.post("/query", async (req, res) => {
      await sqlController.query(req, res);
    });
    routes.post("/update", async (req, res) => {
      await sqlController.update(req, res);
    });
    routes.post("/delete", async (req, res) => {
      await sqlController.delete(req, res);
    });
  } else {
    routes.post("/insert", authJwt, async (req, res) => {
      await sqlController.insert(req, res);
    });
    routes.post("/query", authJwt, async (req, res) => {
      await sqlController.query(req, res);
    });
    routes.post("/update", authJwt, async (req, res) => {
      await sqlController.update(req, res);
    });
    routes.post("/delete", authJwt, async (req, res) => {
      await sqlController.delete(req, res);
    });
  }
  return routes;
}
