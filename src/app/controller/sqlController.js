import { SqlService } from "../services/SqlService";
import { SQLTypes } from "../models/sqlTypes";
import { logger } from "../../logger";
import httpStatus from "http-status";

export class SqlController {
  constructor() {
    this.sqlService = new SqlService(false);
  }

  async query(req, res) {
    const query = req.body;
    if (SqlService.checkSqlStatement(SQLTypes.SELECT, query)) {
      if (SqlService.checkAuthorization(SQLTypes.SELECT, req.user)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          res.end();
        });
        if (data) res.status(httpStatus.OK).json(data);
      } else {
        logger.warn(
          `User not authorized to execute a ${query.substring(0, 6)} statement`
        );
        res.status(httpStatus.UNAUTHORIZED);
        res.end();
      }
    } else {
      logger.warn(
        `In query only select is supported! SQL Statement: ${query.substring(
          0,
          6
        )}`
      );
      res.status(httpStatus.BAD_REQUEST);
      res.end();
    }
  }

  async update(req, res) {
    const query = req.body;
    if (SqlService.checkSqlStatement(SQLTypes.UPDATE, query)) {
      if (SqlService.checkAuthorization(SQLTypes.UPDATE, req.user)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          res.end();
        });
        if (data) res.status(httpStatus.OK).json(data);
      } else {
        logger.warn(
          `User not authorized to execute a ${query.substring(0, 6)} statement`
        );
        res.status(httpStatus.UNAUTHORIZED);
        res.end();
      }
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(httpStatus.BAD_REQUEST);
      res.end();
    }
  }

  async insert(req, res) {
    const query = req.body;
    if (SqlService.checkSqlStatement(SQLTypes.INSERT, query)) {
      if (SqlService.checkAuthorization(SQLTypes.INSERT, req.user)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          res.end();
        });
        if (data) res.status(httpStatus.OK).json(data);
      } else {
        logger.warn(
          `User not authorized to execute a ${query.substring(0, 6)} statement`
        );
        res.status(httpStatus.UNAUTHORIZED);
        res.end();
      }
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(httpStatus.BAD_REQUEST);
      res.end();
    }
  }

  async delete(req, res) {
    const query = req.body;
    if (SqlService.checkSqlStatement(SQLTypes.DELETE, query)) {
      if (SqlService.checkAuthorization(SQLTypes.DELETE, req.user)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          res.end();
        });
        if (data) res.status(httpStatus.OK).json(data);
      } else {
        logger.warn(
          `User not authorized to execute a ${query.substring(0, 6)} statement`
        );
        res.status(httpStatus.UNAUTHORIZED);
        res.end();
      }
    } else {
      logger.error(`Error unsupported SQL Statement: ${query.substring(0, 6)}`);
      res.status(httpStatus.BAD_REQUEST);
      res.end();
    }
  }
}
