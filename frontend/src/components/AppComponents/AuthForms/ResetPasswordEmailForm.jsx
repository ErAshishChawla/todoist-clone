import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import EmailInput from "./AuthFormsReuseableComponents/EmailInput";
import Button from "../../ReusableComponents/Button";

import dispatchToast from "../../../util/dispatchToast";

import { useSendResetPasswordEmailMutation } from "../../../store";

function ResetPasswordEmailForm() {
  const [sendResetPasswordEmail, results] = useSendResetPasswordEmailMutation();
  const { isError, isLoading, isSuccess, isUninitialized, error } = results;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendResetPasswordEmail(values.email);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/", {
        replace: true,
      });
      dispatchToast(`Reset password e-mail sent successfully`, "success");
    }
  }, [isSuccess]);

  return (
    <FlexContainer className="flex-none w-full flex-col gap-4">
      <FlexContainer className="text-4xl font-bold text-app-text mb-4">
        Reset Password
      </FlexContainer>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-1 flex-col gap-3"
      >
        <FlexContainer className="flex-col w-full gap-6">
          <EmailInput formik={formik} />
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
          Send Reset Password Link
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

export default ResetPasswordEmailForm;
