import { createSlice } from "@reduxjs/toolkit";

const appBarSlice = createSlice({
  name: "appBar",
  initialState: {
    appBarWidth: 220,
    showAppBar: true,
    isResizing: false,
    showAddTaskForm: false,
    showEditTaskForm: false,
    editTaskFormTodo: null,
  },
  reducers: {
    setShowAppBar(state, action) {
      state.showAppBar = action.payload;
    },
    setAppBarWidth(state, action) {
      state.appBarWidth = action.payload;
    },
    setIsResizing(state, action) {
      state.isResizing = action.payload;
    },
    setShowAddTaskForm(state, action) {
      state.showAddTaskForm = action.payload;
    },
    setShowAddTaskFormWithAppBar(state, action) {
      console.log(action);
      state.showAddTaskForm = action.payload.showAddTaskForm;
      state.showAppBar = action.payload.showAppBar;
    },
    setShowEditTaskForm(state, action) {
      state.showEditTaskForm = action.payload;
    },
    setEditTaskFormTodo(state, action) {
      state.editTaskFormTodo = action.payload;
    },
    setShowEditTaskFormWithTodoData(state, action) {
      state.showEditTaskForm = action.payload.showEditTaskForm;
      state.editTaskFormTodo = action.payload.todo;
    },
  },
});

export const {
  setShowAppBar,
  setAppBarWidth,
  setIsResizing,
  setShowAddTaskForm,
  setShowAddTaskFormWithAppBar,
  setShowEditTaskForm,
  setShowEditTaskFormWithTodoData,
} = appBarSlice.actions;

export const appBarReducer = appBarSlice.reducer;

export const editTaskFormTodoSelector = (state) =>
  state.appBar.editTaskFormTodo;
