import { SqlRoutes } from "./sql";
import { UserRoutes } from "./user";

export function AppRoutes(expressApp) {
  expressApp.use("/api/v1/user", UserRoutes());
  expressApp.use("/api/v1/sql", SqlRoutes());
}
