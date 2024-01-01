import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import store from "./store/index.js";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";

import AuthPage from "./pages/AuthPages/AuthPage.jsx";
import LoginForm from "./components/AppComponents/AuthForms/LoginForm.jsx";
import SignUpForm from "./components/AppComponents/AuthForms/SignUpForm.jsx";
import TodoAppPage from "./pages/TodoAppPage/TodoAppPage.jsx";
import TodayPage from "./pages/DataPages/TodayPage.jsx";
import InboxPage from "./pages/DataPages/InboxPage.jsx";
import CheckSessionForAuth from "./components/ReusableComponents/CheckSessionForAuth.jsx";
import CheckSession from "./components/ReusableComponents/CheckSession.jsx";
import EmailVerification from "./components/AppComponents/AuthForms/EmailVerification.jsx";
import ResendVerificationEmail from "./components/AppComponents/AuthForms/ResendVerificationEmail/ResendVerificationEmail.jsx";
import ResetPasswordEmailForm from "./components/AppComponents/AuthForms/ResetPasswordEmailForm.jsx";
import ResetPasswordForm from "./components/AppComponents/AuthForms/ResetPasswordForm.jsx";
import ProjectPage from "./pages/DataPages/ProjectPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/app/today" replace={true} />,
    children: [
      {
        path: "",
        element: <Navigate to="/auth/login" replace={true} />,
      },
      {
        path: "auth",
        element: (
          <CheckSessionForAuth>
            <AuthPage />
          </CheckSessionForAuth>
        ),
        errorElement: <Navigate to="/app/today" replace={true} />,
        children: [
          {
            path: "",
            element: <Navigate to="auth" replace={true} />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "signup",
            element: <SignUpForm />,
          },
        ],
      },
      {
        path: "verify-email/resend",
        errorElement: <Navigate to="/app/today" replace={true} />,
        element: (
          <CheckSession>
            <ResendVerificationEmail />
          </CheckSession>
        ),
      },
      {
        path: "verify-email/:verificationToken",
        element: <EmailVerification />,
        errorElement: <Navigate to="/app/today" replace={true} />,
      },
      {
        path: "resetPassword",
        errorElement: <Navigate to="/app/today" replace={true} />,
        element: (
          <CheckSessionForAuth>
            <AuthPage />
          </CheckSessionForAuth>
        ),
        children: [
          {
            path: "",
            element: <ResetPasswordEmailForm />,
          },
          {
            path: ":resetToken",

            element: <ResetPasswordForm />,
          },
        ],
      },

      {
        path: "app",
        element: (
          <CheckSession>
            <TodoAppPage />
          </CheckSession>
        ),
        errorElement: <Navigate to="/app/today" replace={true} />,
        children: [
          {
            path: "",
            element: <Navigate to="/app/today" replace={true} />,
          },
          {
            path: "today",
            element: <TodayPage />,
          },
          {
            path: "inbox",
            element: <InboxPage />,
          },
          {
            path: "projects/:projectId",
            element: <ProjectPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
