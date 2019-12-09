const winston = require("winston");
const drf = require("winston-daily-rotate-file");

export var logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      name: "console",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new drf({
      name: "drf",
      filename: "prodvis-%DATE%.log",
      dirname: "logs",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    })
  ]
});
