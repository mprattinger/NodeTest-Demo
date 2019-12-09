import express from "express";
import { logger } from "../logger";
import { SqlService, SQLTypes } from "./services/SqlService";
import bodyParser from "body-parser";
import { UserController } from "./controller/userController";
import { MyRouter } from "./routes";

export class App {
  constructor() {
    this.sqlService = new SqlService(false);
    //this.uController = new UserController();
    this.express = express();
    this.router = express.Router();
    this.setupApi();
  }

  setupApi() {
    this.express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.express.use(bodyParser.json());

    this.express.use("/api/v1", MyRouter(this.router));

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
  }
}
