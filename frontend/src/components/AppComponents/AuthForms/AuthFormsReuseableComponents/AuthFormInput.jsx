import { forwardRef } from "react";
import useClasses from "../../../../hooks/useClasses";

const AuthFormInput = forwardRef(function AuthFormInput(
  { formik, className, ...rest },
  ref
) {
  const classNames = useClasses(
    "w-full outline-none font-semibold bg-transparent",
    className
  );
  return (
    <input
      className={classNames}
      ref={ref}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      {...rest}
    />
  );
});

export default AuthFormInput;
