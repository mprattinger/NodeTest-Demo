const logger = require("../logger");

class SqlService {
  constructor(pool) {
    this.pool = pool;
  }

  async executeSql(sql) {
    logger.info(`Requested to execute the sql statement ${sql}`);
    //const results = await this.pool.runSql(sql);
    logger.debug(`SQL Query Result: ${JSON.stringify(results)}`);
    return results;
  }
}

module.exports = SqlService;
