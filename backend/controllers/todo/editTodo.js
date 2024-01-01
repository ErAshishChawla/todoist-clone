const Todo = require("../../models/todo");

// error Codes:
const errorCodes = {
  editTodo1: "No Matching todo found",
};

async function editTodo(req, res, next) {
  let errorCode;
  try {
    console.log("Edit todo request started");

    const { todo } = req.body;

    const user = req.user;

    const matchedTodo = await Todo.findOne({ _id: todo._id, user: user._id });

    if (!matchedTodo) {
      errorCode = errorCodes.editTodo1;
      throw new Error("No Matching todo Found");
    }

    let listType = todo.listTypeId;
    if (todo.listTypeId !== "inbox") {
      if (!req.user?.projects) {
        return res.status(400).json({
          errorMessage: "Invalid Request",
        });
      }

      const matchedProject = req.user.projects.find((project) => {
        return project.randomId === todo.listTypeId;
      });

      listType = matchedProject?.title;
    }

    if (!listType) {
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    matchedTodo.taskName = todo.taskName;
    matchedTodo.taskDescription = todo.taskDescription;
    matchedTodo.dueDate = todo.dueDate;
    matchedTodo.isCompleted = todo.isCompleted;
    matchedTodo.listType = listType;
    matchedTodo.listTypeId = todo.listTypeId;

    await matchedTodo.save();

    return res.status(200).json(matchedTodo._doc);
  } catch (error) {
    console.log(error);

    if (errorCode === errorCodes.editTodo1) {
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }
  }
}

module.exports = editTodo;
