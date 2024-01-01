import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import EmailInput from "./AuthFormsReuseableComponents/EmailInput";
import PasswordInput from "./AuthFormsReuseableComponents/PasswordInput";
import FlexContainer from "../../ReusableComponents/FlexContainer";
import Button from "../../ReusableComponents/Button";

import { useSignupMutation } from "../../../store/api/authApi";

import dispatchToast from "../../../util/dispatchToast";

function SignUpForm() {
  const [signupUser, results] = useSignupMutation();
  const { data, isError, isLoading, isSuccess, isUninitialized, error } =
    results;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email address"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signupUser({
        email: values.email,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (isUninitialized || isLoading) {
      return;
    } else if (isSuccess) {
      dispatchToast("Sign up Successful", "success");
      dispatchToast(
        `A confirmation email has been sent to ${data.email}. Please verify your email`,
        "info"
      );
      navigate("/auth/login", {
        replace: true,
      });
    } else if (isError) {
      console.log(error);
      dispatchToast(error.data.errorMessage, "error");
    }
  }, [isLoading, isError, isSuccess, isUninitialized]);

  return (
    <FlexContainer className="flex-none w-full flex-col gap-4">
      <FlexContainer className="text-4xl font-bold text-app-text mb-4">
        Sign up
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

        <Button
          className="bg-auth-button text-auth-button font-bold justify-center py-3 hover:bg-auth-button-hover active:scale-[0.98] relative items-center mt-3"
          type="submit"
        >
          Sign up
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
        Already signed up?
        <Link className="underline" to="/auth/login">
          Go to login
        </Link>
      </FlexContainer>
    </FlexContainer>
  );
}

export default SignUpForm;
