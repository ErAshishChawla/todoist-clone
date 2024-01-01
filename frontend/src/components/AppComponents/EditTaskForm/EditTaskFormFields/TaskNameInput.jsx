import { Input } from "antd";

import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";

const { TextArea } = Input;

const TaskNameInput = forwardRef(function TaskNameInput(props, ref) {
  const { className, formik, ...rest } = props;

  return (
    <TextArea
      bordered={false}
      autoSize
      placeholder="Task Name"
      className={useClasses(
        "text-xl font-semibold p-0 transition-none",
        className
      )}
      autoFocus
      name="taskName"
      value={formik.values.taskName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      {...rest}
      ref={ref}
    />
  );
});

export default TaskNameInput;
