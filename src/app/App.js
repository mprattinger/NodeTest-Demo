const express = require("express");
const logger = require("../logger");
const SqlService = require("../services/SqlService");

class App {
  constructor() {
    this.express = express();
    this.mountRoutes();
    this.sqlService = new SqlService(false);
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
      let data = await this.sqlService.executeSql(req.body).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    });
    router.post("/update", async (req, res) => {
      let data = await this.sqlService.executeSql(req.body).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    });
    router.post("/insert", async (req, res) => {
      let data = await this.sqlService.executeSql(req.body).catch(err => {
        logger.error(`Error querying database: ${err}`);
        res.status(500);
        res.end();
      });
      if (data) res.json(data);
    });

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
    this.express.use("/sql", router);
    logger.debug("Routes mounted!");
  }
}

module.exports = App;
