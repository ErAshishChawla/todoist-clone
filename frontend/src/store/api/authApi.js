import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserData } from "../slice/usersSlice";
import { userApi } from "./userApi";

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

const authApi = createApi({
  reducerPath: "authApi",
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
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/auth/login",
            body: {
              email,
              password,
            },
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(userApi.util.invalidateTags(["user"]));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      signup: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/auth/signup",
            body: {
              email,
              password,
            },
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(userApi.util.invalidateTags(["user"]));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: "/auth/logout",
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(userApi.util.invalidateTags(["user"]));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      verifyEmail: builder.mutation({
        query: (verificationToken) => {
          return {
            url: "/auth/verify-email",
            method: "POST",
            body: {
              verificationToken,
            },
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(userApi.util.invalidateTags(["user"]));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      resendVerificationEmail: builder.mutation({
        query: () => {
          return {
            url: "/auth/verify-email/resend",
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(userApi.util.invalidateTags(["user"]));
          } catch (error) {
            console.log(error);
          }
        },
      }),
      sendResetPasswordEmail: builder.mutation({
        query: (email) => {
          return {
            url: "/auth/resetPassword",
            method: "POST",
            body: {
              email,
            },
          };
        },
      }),
      setNewPassword: builder.mutation({
        query: ({ resetToken, newPassword }) => {
          return {
            url: "/auth/setNewPassword",
            method: "POST",
            body: {
              resetToken,
              newPassword,
            },
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useSendResetPasswordEmailMutation,
  useSetNewPasswordMutation,
} = authApi;

export { authApi };
