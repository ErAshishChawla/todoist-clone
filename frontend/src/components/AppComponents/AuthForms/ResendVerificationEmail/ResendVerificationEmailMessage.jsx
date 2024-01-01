import React from "react";
import { Link } from "react-router-dom";

import FlexContainer from "../../../ReusableComponents/FlexContainer";
import { toast } from "react-toastify";

function ResendVerificationEmailMessage() {
  const handleClick = () => {
    toast.dismiss("unVerifiedUserEmail");
  };
  return (
    <FlexContainer className="flex-col">
      Your email is not verified.
      <Link
        to="/verify-email/resend"
        className="underline"
        onClick={handleClick}
      >
        Resend Verification Email
      </Link>
    </FlexContainer>
  );
}

export default ResendVerificationEmailMessage;
