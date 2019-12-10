import { SqlRoutes } from "./sql";
import { UserRoutes } from "./user";

export function MyRouter(router) {
  SqlRoutes(router);
  UserRoutes(router);
  return router;
}
