import FlexContainer from "../../../ReusableComponents/FlexContainer";
import AuthFormInput from "./AuthFormInput";

import useClasses from "../../../../hooks/useClasses";

import { useState, useRef } from "react";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function PasswordInput({ formik }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef();

  const containerClasses = useClasses(
    "flex-col border rounded-lg p-1.5 text-app-text cursor-text",
    {
      "border-form-input":
        !isFocused && !formik.errors?.password && !formik.touched?.password,
      "border-form-input-focus":
        isFocused && !formik.errors?.password && !formik.touched?.password,
      "border-form-error": formik.errors?.password && formik.touched?.password,
    }
  );

  const handleContainerClick = () => {
    if (!ref.current) {
      return;
    }
    ref.current.focus();
  };

  const formikPrevBlur = formik.handleBlur;

  formik.handleBlur = (e) => {
    setIsFocused(false);
    formikPrevBlur(e);
  };

  return (
    <FlexContainer className="flex-col gap-1">
      <FlexContainer
        className={containerClasses}
        onClick={handleContainerClick}
      >
        <FlexContainer className="text-sm after:content-['*'] after:ml-0.5 after:text-form-required-star">
          Password
        </FlexContainer>
        <FlexContainer className="items-center">
          <FlexContainer>
            <AuthFormInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              onFocus={() => {
                setIsFocused(true);
              }}
              ref={ref}
              formik={formik}
            />
          </FlexContainer>
          <FlexContainer
            className="flex-none text-xl cursor-pointer hover:scale-110"
            onClick={() => {
              setShowPassword((c) => !c);
            }}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      {formik.touched.password && formik.errors.password ? (
        <FlexContainer className="flex-none w-full text-form-error text-xs px-1.5">
          {formik.errors.password}
        </FlexContainer>
      ) : null}
    </FlexContainer>
  );
}

export default PasswordInput;
