import express from "express";
import { SqlService } from "./services/SqlService";
import bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import passport from "passport";
import expressWinston from "express-winston";
import winston from "winston";

export class App {
  constructor() {
    this.sqlService = new SqlService(false);
    this.express = express();
    this.router = express.Router();
    this.setupExpressLogging();
    this.express.use(passport.initialize());
    this.setupApi();
    AppRoutes(this.express);
  }

  setupApi() {
    this.express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    this.express.use((req, res, next) => {
      if (req.headers["content-type"] === "text/plain") {
        let data = "";
        req.setEncoding("utf8");
        req.on("data", chunk => {
          data += chunk;
        });

        req.on("end", () => {
          req.body = data;
          next();
        });
      } else {
        next();
      }
    });

    this.express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.express.use(bodyParser.json());
  }

  setupExpressLogging() {
    if (process.env.NODE_ENV !== "development") return;
    this.express.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
        meta: false, // optional: control whether you want to log the meta data about the request (default to true)
        msg:
          "{{res.statusCode}} HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      })
    );
  }
}
