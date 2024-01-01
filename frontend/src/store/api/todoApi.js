import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appendTodo, setTodos } from "../slice/todosSlice";
import utcToGivenZone from "../../util/utcToGIvenZone";

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      addTodo: builder.mutation({
        query: ({ taskName, taskDescription, dueDate, listTypeId }) => {
          return {
            url: "/todo/create",
            body: {
              taskName,
              taskDescription,
              dueDate,
              listTypeId,
            },
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(appendTodo(data));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      editTodo: builder.mutation({
        query: (todo) => {
          return {
            url: "/todo/edit",
            body: {
              todo,
            },
            method: "PUT",
          };
        },
      }),
      deleteTodo: builder.mutation({
        query: (todo) => {
          return {
            url: "/todo/delete",
            body: {
              todo,
            },
            method: "DELETE",
          };
        },
      }),
      fetchAllTodos: builder.query({
        providesTags: ["allTodos"],
        query: () => {
          return {
            url: "/todo",
            method: "GET",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const modifiedData = data.map((todo) => {
              return {
                ...todo,
                dueDate: utcToGivenZone(todo.dueDate, timeZone),
              };
            });
            dispatch(setTodos(modifiedData));
          } catch (error) {
            console.log(error);
          }
        },
      }),
    };
  },
});

export const {
  useAddTodoMutation,
  useFetchAllTodosQuery,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApi;

export { todoApi };
