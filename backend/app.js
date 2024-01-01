const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const logger = require("./utils/logger.js");
const connectToMongoDB = require("./utils/database.js");

const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const todoRouter = require("./routes/todo.js");
const iconsRouter = require("./routes/iconFinder.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(logger);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/todo", todoRouter);

app.use("/api/iconSearch", iconsRouter);

connectToMongoDB()
  .then((result) => {
    console.log("Mongo DB Connected");
    app.listen(port, () => {
      console.log(`Server Started ON PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Server Failed");
  });
