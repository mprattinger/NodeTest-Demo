import { SqlService, SQLTypes } from "../services/SqlService";

export class SqlController {
  constructor() {
    this.sqlService = new SqlService(false);
  }

  async query(req, res) {
    const query = req.body;
    if (this.sqlService.checkSqlStatement(SQLTypes.SELECT, query)) {
      let data = await this.sqlService.executeSql(query).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(501);
      res.end();
    }
  }
  async update(req, res) {
    const query = req.body;
    if (this.sqlService.checkSqlStatement(SQLTypes.UPDATE, query)) {
      let data = await this.sqlService.executeSql(query).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(501);
      res.end();
    }
  }
  async insert(req, res) {
    const query = req.body;
    if (this.sqlService.checkSqlStatement(SQLTypes.INSERT, query)) {
      let data = await this.sqlService.executeSql(query).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(501);
      res.end();
    }
  }
  async delete(req, res) {
    const query = req.body;
    if (this.sqlService.checkSqlStatement(SQLTypes.DELETE, query)) {
      let data = await this.sqlService.executeSql(query).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(501);
      res.end();
    }
  }
}
