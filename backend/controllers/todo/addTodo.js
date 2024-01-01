const Todo = require("../../models/todo.js");

const { formatISO } = require("date-fns");

//Error Codes for different errors
const errorCodes = {
  addTodo1: "Missing Form Fields",
};

let errorCode;

async function addTodo(req, res, next) {
  try {
    console.log("Add todo request Received");
    console.log("Extracting data from body");
    const { taskName, taskDescription, dueDate, listTypeId } = req.body;

    if (!taskName || !listTypeId) {
      errorCode = errorCodes.addTodo1;
      throw new Error("Missing Form Fields");
    }

    const user = req.user;
    let isoDueDate;

    if (dueDate) {
      console.log("here");
      isoDueDate = formatISO(dueDate);
    }

    let listType = listTypeId;
    if (listTypeId !== "inbox") {
      console.log("List type is not inbox");
      if (!req.user?.projects) {
        console.log("No user projects");
        return res.status(400).json({
          errorMessage: "Invalid Request",
        });
      }

      const matchedProject = req.user.projects.find((project) => {
        return project.randomId === listTypeId;
      });

      console.log("Matched Project found");

      listType = matchedProject?.title;
    }

    if (!listType) {
      console.log("No list Type found");
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    const todo = await Todo.create({
      taskName,
      taskDescription,
      dueDate: isoDueDate,
      listType,
      listTypeId,
      user: user._id,
    });

    console.log("todo created successfully");

    return res.status(201).json({
      ...todo._doc,
    });
  } catch (error) {
    console.log(error);
    if (errorCode === errorCodes.addTodo1) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  }
}

module.exports = addTodo;
