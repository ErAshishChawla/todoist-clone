import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import EmailInput from "./AuthFormsReuseableComponents/EmailInput";
import PasswordInput from "./AuthFormsReuseableComponents/PasswordInput";
import FlexContainer from "../../ReusableComponents/FlexContainer";
import Button from "../../ReusableComponents/Button";

import { useLoginMutation } from "../../../store";

import dispatchToast from "../../../util/dispatchToast";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function LoginForm() {
  const [loginUser, results] = useLoginMutation();
  const { isError, isLoading, isSuccess, isUninitialized, error } = results;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email address"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginUser({
        email: values.email,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/", {
        replace: true,
      });
      dispatchToast(`Logged in! Let's get things done.`, "success");
    }
  }, [isSuccess]);

  return (
    <FlexContainer className="flex-none w-full flex-col gap-4">
      <FlexContainer className="text-4xl font-bold text-app-text mb-4">
        Log in
      </FlexContainer>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-1 flex-col gap-3"
      >
        <FlexContainer className="flex-col w-full gap-6">
          <EmailInput formik={formik} />
          <PasswordInput formik={formik} />
        </FlexContainer>

        {isError && (
          <FlexContainer className="text-xs text-form-error w-full flex-none justify-center">
            {error.data?.errorMessage}
          </FlexContainer>
        )}
        <FlexContainer className="flex-none w-full justify-end items-center text-xs underline">
          <Link to="/resetPassword">Reset Password?</Link>
        </FlexContainer>
        <Button
          className="bg-auth-button text-auth-button font-bold justify-center py-3 hover:bg-auth-button-hover active:scale-[0.98] relative items-center"
          type="submit"
        >
          Log in
          {isLoading && (
            <FlexContainer className="flex-none absolute right-4">
              <Spin
                indicator={
                  <LoadingOutlined
                    className="text-initialLoader text-sm"
                    spin
                  />
                }
              />
            </FlexContainer>
          )}
        </Button>
      </form>

      <FlexContainer className="flex-none w-full justify-center text-xs gap-1 text-app-text">
        Don't have an account?
        <Link className="underline" to="/auth/signup">
          Sign up
        </Link>
      </FlexContainer>
    </FlexContainer>
  );
}

export default LoginForm;
