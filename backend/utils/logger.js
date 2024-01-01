const winston = require("winston");
const expressWinston = require("express-winston");

const path = require("path");

const root = require("./rootDirectory.js");

const logger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  expressFormat: true,
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(root, "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(root, "logs", "combined.log"),
    }),
  ],
});

module.exports = logger;
