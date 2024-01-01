import AddTaskFormButton from "../AddTaskFormReuseableComponents/AddTaskFormButton";

import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";

const CancelButton = forwardRef(function CancelButton(props, ref) {
  const { className, ...rest } = props;

  const classNames = useClasses(
    "bg-addTask-form-button-cancel hover:bg-addTask-form-button-cancel-hover",
    className
  );

  return (
    <AddTaskFormButton className={classNames} {...rest}>
      Cancel
    </AddTaskFormButton>
  );
});

export default CancelButton;
