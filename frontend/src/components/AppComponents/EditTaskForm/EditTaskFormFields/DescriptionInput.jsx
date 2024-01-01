import { Input } from "antd";

import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";

const { TextArea } = Input;

const DescriptionInput = forwardRef(function DescriptionInput(props, ref) {
  const { className, formik, ...rest } = props;

  return (
    <TextArea
      placeholder="Description"
      autoSize
      bordered={false}
      className={useClasses("p-0", className)}
      value={formik.values.taskDescription}
      onChange={formik.handleChange}
      name="taskDescription"
      {...rest}
      ref={ref}
    />
  );
});

export default DescriptionInput;
