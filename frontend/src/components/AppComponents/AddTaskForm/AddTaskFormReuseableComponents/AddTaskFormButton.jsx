import Button from "../../../ReusableComponents/Button";

import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";

const AddTaskFormButton = forwardRef(function AddTaskFormButton(props, ref) {
  const { children, className, ...rest } = props;
  const classNames = useClasses("flex-none px-4 py-1.5 rounded-lg ", className);
  return (
    <Button className={classNames} ref={ref} {...rest}>
      {children}
    </Button>
  );
});

export default AddTaskFormButton;
