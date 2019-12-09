import express from "express";
import { logger } from "../logger";
import { SqlService, SQLTypes } from "../services/SqlService";
import bodyParser from "body-parser";
import { UserController } from "./controller/userController";

export class App {
  constructor() {
    this.sqlService = new SqlService(false);
    this.uController = new UserController();
    this.express = express();
    this.mountRoutes();
  }

  mountRoutes() {
    const router = express.Router();
    logger.debug("Mounting routes...");
    router.get("/", (req, res) => {
      res.write("Hello World!");
      res.status(200);
      res.end();
    });
    router.get("/ping", (req, res) => {
      res.write("pong");
      res.status(200);
      res.end();
    });

    router.post("/query", async (req, res) => {
      const query = req.body;
      if (this.sqlService.checkSqlStatement(SQLTypes.SELECT, query)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(500);
          res.end();
        });
        if (data) res.json(data);
      } else {
        logger.error(
          `Error unsupported SQL Statement: ${query.substring(0, 6)}`
        );
        res.status(501);
        res.end();
      }
    });
    router.post("/update", async (req, res) => {
      const query = req.body;
      if (this.sqlService.checkSqlStatement(SQLTypes.UPDATE, query)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(500);
          res.end();
        });
        if (data) res.json(data);
      } else {
        logger.error(
          `Error unsupported SQL Statement: ${query.substring(0, 6)}`
        );
        res.status(501);
        res.end();
      }
    });
    router.post("/insert", async (req, res) => {
      const query = req.body;
      if (this.sqlService.checkSqlStatement(SQLTypes.INSERT, query)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(500);
          res.end();
        });
        if (data) res.json(data);
      } else {
        logger.error(
          `Error unsupported SQL Statement: ${query.substring(0, 6)}`
        );
        res.status(501);
        res.end();
      }
    });
    router.post("/delete", async (req, res) => {
      const query = req.body;
      if (this.sqlService.checkSqlStatement(SQLTypes.DELETE, query)) {
        let data = await this.sqlService.executeSql(query).catch(err => {
          logger.error(`Error querying database: ${err}`);
          res.status(500);
          res.end();
        });
        if (data) res.json(data);
      } else {
        logger.error(
          `Error unsupported SQL Statement: ${query.substring(0, 6)}`
        );
        res.status(501);
        res.end();
      }
    });
    this.express.use("/sql", router);

    const authRouter = express.Router();
    authRouter.route("/users").post(this.uController.add);
    authRouter.route("/login").post(this.uController.login);
    this.express.use("/", authRouter);

    this.express.use(bodyParser.json());
    this.express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    this.express.use(function(req, res, next) {
      var data = "";
      req.setEncoding("utf8");
      req.on("data", function(chunk) {
        data += chunk;
      });

      req.on("end", function() {
        req.body = data;
        next();
      });
    });

    logger.debug("Routes mounted!");
  }
}
