import { SqlController } from "../controller/sqlController";

export function SqlRoutes(router) {
  const sqlController = new SqlController();
  router.route("/sql/query").post(sqlController.query);
  router.route("/sql/insert").post(sqlController.insert);
  router.route("/sql/update").post(sqlController.update);
  router.route("/sql/delete").post(sqlController.delete);
}
