const winston = require("winston");
const { format } = require("winston");

require("express-async-errors");

module.exports = () => {
  process.on("uncaughtException", (ex) => {
    winston.error(`Uncaught Exception: ${ex.message}`, ex);
    process.exit(1);
  });
  process.on("unhandledRejection", (ex) => {
    winston.error(`Unhandled Rejection at: ${ex.message}`, ex);
    process.exit(1);
  });
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
