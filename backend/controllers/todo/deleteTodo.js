const Todo = require("../../models/todo");

// error Codes:
const errorCodes = {
  editTodo1: "No Matching todo found",
};

async function deleteTodo(req, res, next) {
  let errorCode;
  try {
    console.log("Delete todo request started");

    const { todo } = req.body;
    console.log(todo);

    const user = req.user;
    console.log(user._id);

    const matchedTodo = await Todo.findOne({ _id: todo._id, user: user._id });

    if (!matchedTodo) {
      errorCode = errorCodes.editTodo1;
      throw new Error("No Matching todo Found");
    }

    const deletedTodo = await Todo.findByIdAndDelete(matchedTodo._id);

    return res.status(200).json(deletedTodo._doc);
  } catch (error) {
    console.log(error);

    if (errorCode === errorCodes.editTodo1) {
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }
  }
}

module.exports = deleteTodo;
