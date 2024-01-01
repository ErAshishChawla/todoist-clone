import AddTaskFormButton from "../AddTaskFormReuseableComponents/AddTaskFormButton";

import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";

const AddTaskButton = forwardRef(function AddTaskButton(props, ref) {
  const { className, formik, isFormSubmitting, ...rest } = props;

  const classNames = useClasses(
    "bg-addTask-form-button-addTask text-white hover:bg-addTask-form-button-addTask-hover disabled:bg-addTask-form-button-addTask-disabled disabled:cursor-not-allowed",
    className
  );

  return (
    <AddTaskFormButton
      className={classNames}
      {...rest}
      disabled={!formik.values.taskName || isFormSubmitting ? true : false}
    >
      Add task
    </AddTaskFormButton>
  );
});

export default AddTaskButton;
