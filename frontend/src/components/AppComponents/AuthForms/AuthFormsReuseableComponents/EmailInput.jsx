import FlexContainer from "../../../ReusableComponents/FlexContainer";
import AuthFormInput from "./AuthFormInput";

import useClasses from "../../../../hooks/useClasses";

import { useState, useRef } from "react";

function EmailInput({ formik }) {
  const [isFocused, setIsFocused] = useState();
  const ref = useRef();

  const containerClasses = useClasses(
    "flex-col border rounded-lg p-1.5 text-app-text cursor-text",
    {
      "border-form-input":
        !isFocused && !formik.errors?.email && !formik.touched?.email,
      "border-form-input-focus":
        isFocused && !formik.errors?.email && !formik.touched?.email,
      "border-form-error": formik.errors?.email && formik.touched?.email,
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
          Email
        </FlexContainer>
        <FlexContainer>
          <AuthFormInput
            type="text"
            name="email"
            placeholder="Enter your email..."
            onFocus={() => {
              setIsFocused(true);
            }}
            ref={ref}
            formik={formik}
          />
        </FlexContainer>
      </FlexContainer>
      {formik.touched.email && formik.errors.email ? (
        <FlexContainer className="flex-none w-full text-form-error text-xs px-1.5">
          {formik.errors.email}
        </FlexContainer>
      ) : null}
    </FlexContainer>
  );
}

export default EmailInput;
