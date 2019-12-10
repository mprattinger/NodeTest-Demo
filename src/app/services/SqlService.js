import { logger } from "../../logger";

export class SQLTypes {
  static get SELECT() {
    return "select";
  }

  static get INSERT() {
    return "insert";
  }

  static get UPDATE() {
    return "update";
  }

  static get DELETE() {
    return "delete";
  }
}

export class SqlService {
  constructor(pool) {
    this.pool = pool;
  }

  async executeSql(sql) {
    logger.info(`Requested to execute the sql statement ${sql}`);
    const results = []; //const results = await this.pool.runSql(sql);
    logger.debug(`SQL Query Result: ${JSON.stringify(results)}`);
    return results;
  }

  checkSqlStatement(sqlType, query) {
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
}
