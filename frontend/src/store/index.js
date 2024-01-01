import { appBarReducer } from "./slice/appBarSlice";
import { appSliceReducer } from "./slice/appSlice";
import { usersSliceReducer } from "./slice/usersSlice";
import { todosSliceReducer } from "./slice/todosSlice";
import { projectFormReducer } from "./slice/projectFormSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { todoApi } from "./api/todoApi";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    appBar: appBarReducer,
    app: appSliceReducer,
    user: usersSliceReducer,
    todos: todosSliceReducer,
    projectForm: projectFormReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(todoApi.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
export * from "./slice/appBarSlice";
export * from "./slice/appSlice";
export * from "./slice/usersSlice";
export * from "./slice/todosSlice";
export * from "./slice/projectFormSlice";

export * from "./api/authApi";
export * from "./api/userApi";
export * from "./api/todoApi";
