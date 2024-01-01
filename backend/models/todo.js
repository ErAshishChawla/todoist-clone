const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  listType: {
    type: String,
    default: "inbox",
  },
  listTypeId: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
