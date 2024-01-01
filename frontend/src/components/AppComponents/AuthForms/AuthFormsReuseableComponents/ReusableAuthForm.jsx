import React from "react";
import FlexContainer from "../../../ReusableComponents/FlexContainer";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

function ReusableAuthForm() {
  return (
    <>
      <EmailInput />
      <PasswordInput />
    </>
  );
}

export default ReusableAuthForm;
