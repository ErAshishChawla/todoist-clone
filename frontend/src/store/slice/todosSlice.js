import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos(state, action) {
      // used when we will refetch all the todos
      return [...action.payload];
    },
    appendTodo(state, action) {
      return [...state, action.payload];
    },
    updateTodo(state, action) {
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
    },
    deleteTodo(state, action) {
      return state.filter((todo) => {
        return todo._id !== action.payload._id;
      });
    },
  },
});

export const { setTodos, appendTodo, updateTodo, deleteTodo } =
  todosSlice.actions;
export const todosSliceReducer = todosSlice.reducer;

export const todosSelector = (state) => state.todos;
