import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import Button from "../../ReusableComponents/Button";
import PasswordInput from "./AuthFormsReuseableComponents/PasswordInput";

import dispatchToast from "../../../util/dispatchToast";

import { useSetNewPasswordMutation } from "../../../store";

function ResetPasswordForm() {
  const { resetToken } = useParams();

  if (!resetToken) {
    content = <Navigate to="/" replace={true} />;
  }

  const [setNewPassword, results] = useSetNewPasswordMutation();
  const { isError, isLoading, isSuccess, isUninitialized, error } = results;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
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
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setNewPassword({
        resetToken,
        newPassword: values.password,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/", {
        replace: true,
      });
      dispatchToast(`Password Reset Successfull`, "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatchToast(`Password Reset Failed`, "error");
    }
  }, [isError]);

  return (
    <FlexContainer className="flex-none w-full flex-col gap-4">
      <FlexContainer className="text-4xl font-bold text-app-text mb-4">
        Enter New Password
      </FlexContainer>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-1 flex-col gap-3"
      >
        <FlexContainer className="flex-col w-full gap-6">
          <PasswordInput formik={formik} />
        </FlexContainer>

        <Button
          className="bg-auth-button text-auth-button font-bold justify-center py-3 hover:bg-auth-button-hover active:scale-[0.98] relative items-center mt-3"
          type="submit"
        >
          Set New Password
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
    </FlexContainer>
  );
}

export default ResetPasswordForm;
