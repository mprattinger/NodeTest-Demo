import { SqlController } from "../controller/sqlController";

export function SqlRoutes(router) {
  const sqlController = new SqlController();
  router.route("/query").post(sqlController.query);
  router.route("/insert").post(sqlController.insert);
  router.route("/update").post(sqlController.update);
  router.route("/delete").post(sqlController.delete);
}
