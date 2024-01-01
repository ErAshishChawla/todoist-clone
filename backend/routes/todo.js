const express = require("express");

const {
  fetchAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todo");
const isAuth = require("../middlewares/isAuth.js");
const decodeJWT = require("../middlewares/decodeJWT.js");

const todoRouter = express.Router();

todoRouter.post("/create", isAuth, decodeJWT, addTodo);
todoRouter.get("/", isAuth, decodeJWT, fetchAllTodos);
todoRouter.put("/edit", isAuth, decodeJWT, editTodo);
todoRouter.delete("/delete", isAuth, decodeJWT, deleteTodo);

module.exports = todoRouter;
