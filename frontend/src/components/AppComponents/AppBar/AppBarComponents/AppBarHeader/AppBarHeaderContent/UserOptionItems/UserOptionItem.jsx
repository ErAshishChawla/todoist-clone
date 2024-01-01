import React, { forwardRef } from "react";

import Button from "../../../../../../ReusableComponents/Button";

import useClasses from "../../../../../../../hooks/useClasses";

const UserOptionItem = forwardRef(function UserOptionItem(
  { children, className, ...rest },
  ref
) {
  const classNames = useClasses("", className);
  return (
    <Button ref={ref} className={classNames} {...rest}>
      {children}
    </Button>
  );
});

export default UserOptionItem;
