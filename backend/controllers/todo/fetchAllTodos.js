const Todo = require("../../models/todo");

async function fetchAllTodos(req, res, next) {
  try {
    console.log("Fetch al todos request recieved");
    const userId = req.user;

    const todos = await Todo.find({ user: userId });

    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

module.exports = fetchAllTodos;
