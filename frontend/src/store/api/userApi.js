import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserData, updateUserData } from "../slice/usersSlice";
import { todoApi } from "./todoApi";

const pause = (duration) => {
  return new Promise(
    (resolve) => {
      setTimeout(resolve, duration);
    },
    (reject) => {
      console.log("Pause function Failed");
    }
  );
};

const userApi = createApi({
  reducerPath: "userApi",
  keepUnusedDataFor: 30 * 24 * 60,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    credentials: "include",
    fetchFn: async (...args) => {
      // Remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query({
        providesTags: ["user"],
        query: () => {
          return {
            url: "/user",
            method: "GET",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUserData(data));
            dispatch(todoApi.endpoints.fetchAllTodos.initiate());
          } catch (error) {
            console.log(error);
          }
        },
      }),
      addProject: builder.mutation({
        query: ({ icon, title }) => {
          return {
            url: "/user/addProject",
            method: "POST",
            body: {
              icon,
              title,
            },
          };
        },
      }),
      deleteProject: builder.mutation({
        query: (projectId) => {
          return {
            url: "/user/deleteProject",
            method: "DELETE",
            body: {
              projectId,
            },
          };
        },
      }),
      updateProject: builder.mutation({
        query: (project) => {
          return {
            url: "/user/updateProject",
            method: "PATCH",
            body: {
              project,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = userApi;

export { userApi };
