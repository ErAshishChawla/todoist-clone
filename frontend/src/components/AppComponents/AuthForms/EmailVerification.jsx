import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useVerifyEmailMutation } from "../../../store";

import LoadingPage from "../../../pages/LoadingPage";
import dispatchToast from "../../../util/dispatchToast";

function EmailVerification() {
  const { verificationToken } = useParams();
  const [verifyEmail, results] = useVerifyEmailMutation();
  const { isLoading, error, data, isSuccess } = results;

  useEffect(() => {
    verifyEmail(verificationToken);
  }, []);

  let content;

  if (!verificationToken) {
    content = <Navigate to="/" replace={true} />;
  } else if (isLoading) {
    content = <LoadingPage />;
  } else if (error) {
    content = <Navigate to="/" replace={true} />;
    dispatchToast("Invalid Verification Token!", "error");
  } else if (data && isSuccess) {
    content = <Navigate to="/" replace={true} />;
    dispatchToast("Email Verified Successfully", "success");
  }

  return content;
}

export default EmailVerification;
