const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const appRouter = require("./routes");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/access.log"),
  { flags: "a" }
);

const configApp = (app) => {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(morgan("combined", { stream: accessLogStream }));

  app.use("/api", appRouter);

  app.use((_, __, next) => {
    const error = new Error("path not found");
    error.code = 404;
    next(error);
  });

  app.use((error, _, res, __) => {
    console.log(error);
    res.status(error.code || 500).json({
      success: false,
      info: {
        message: error.message,
        code: error.code,
      },
    });
  });

  return app;
};

module.exports = configApp(app);
