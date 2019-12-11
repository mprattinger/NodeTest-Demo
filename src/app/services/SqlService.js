import { logger } from "../../logger";
import { SQLTypes } from "../models/sqlTypes";
import { UserRoles } from "../models/userRoles";

export class SqlService {
  constructor(pool) {
    this.pool = pool;
  }

  async executeSql(sql) {
    this.pool = false;
    logger.info(`Requested to execute the sql statement ${sql}`);
    const results = []; // const results = await this.pool.runSql(sql);
    logger.debug(`SQL Query Result: ${JSON.stringify(results)}`);
    return results;
  }

  static checkSqlStatement(sqlType, query) {
    let ret = false;
    switch (sqlType) {
      case SQLTypes.SELECT:
        if (query.toUpperCase().startsWith("SELECT")) ret = true;
        break;
      case SQLTypes.INSERT:
        if (query.toUpperCase().startsWith("INSERT")) ret = true;
        break;
      case SQLTypes.UPDATE:
        if (query.toUpperCase().startsWith("UPDATE")) ret = true;
        break;
      case SQLTypes.DELETE:
        if (query.toUpperCase().startsWith("DELETE")) ret = true;
        break;
      default:
        break;
    }
    return ret;
  }

  static checkAuthorization(sqlType, user) {
    let ret = false;
    if (
      sqlType === SQLTypes.INSERT ||
      sqlType === SQLTypes.UPDATE ||
      sqlType === SQLTypes.DELETE
    ) {
      // Nur Admins dürfen diese SQL Befehle ausführen
      if (user.role === UserRoles.ADMIN) ret = true;
      else ret = false;
    } else {
      ret = true;
    }
    return ret;
  }
}
