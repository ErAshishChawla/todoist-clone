import React, { useEffect } from "react";
import FlexContainer from "../../../ReusableComponents/FlexContainer";

import { useResendVerificationEmailMutation } from "../../../../store";
import LoadingPage from "../../../../pages/LoadingPage";
import { Navigate } from "react-router-dom";
import dispatchToast from "../../../../util/dispatchToast";

function ResendVerificationEmail() {
  const [resendVerificationEmail, results] =
    useResendVerificationEmailMutation();

  useEffect(() => {
    resendVerificationEmail();
  }, []);

  const { isLoading, isUninitialized, data, error, isSuccess } = results;

  let content;
  if (isLoading || isUninitialized) {
    content = <LoadingPage />;
  } else if (error) {
    content = <Navigate to="/" replace={true} />;
    dispatchToast("Error! couldn't send the verification email.", "error");
  } else if (isSuccess) {
    content = <Navigate to="/" replace={true} />;
    dispatchToast("Verification email was sent successfully.", "success");
  }
  return content;
}

export default ResendVerificationEmail;
