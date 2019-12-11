import { SqlController } from "../controller/sqlController";
import { authJwt } from "../services/authService";

export function SqlRoutes(router) {
  const sqlController = new SqlController();
  if (process.env.NODE_ENV === "test") {
    router
      .route("/sql/query")
      .post(async (req, res) => await sqlController.query(req, res));
    router
      .route("/sql/insert")
      .post(async (req, res) => await sqlController.insert(req, res));
    router
      .route("/sql/update")
      .post(async (req, res) => await sqlController.update(req, res));
    router
      .route("/sql/delete")
      .post(async (req, res) => await sqlController.delete(req, res));
  } else {
    router
      .route("/sql/query")
      .post(authJwt, async (req, res) => await sqlController.query(req, res));
    router
      .route("/sql/insert")
      .post(async (req, res) => await sqlController.insert(req, res));
    router
      .route("/sql/update")
      .post(async (req, res) => await sqlController.update(req, res));
    router
      .route("/sql/delete")
      .post(async (req, res) => await sqlController.delete(req, res));
  }
}
