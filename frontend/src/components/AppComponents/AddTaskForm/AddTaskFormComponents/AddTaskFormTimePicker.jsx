import { forwardRef } from "react";

import useClasses from "../../../../hooks/useClasses";
import updateTime from "../../../../util/updateTime";
import formatDateStringToDate from "../../../../util/formatDateStringToDate";
import formatDateToCompleteString from "../../../../util/formatDateToCompleteString";

import CustomTimePicker from "../../../ReusableComponents/CustomTimePicker";

const AddTaskFormTimePicker = forwardRef(function AddTaskFormTimePicker(
  props,
  ref
) {
  const { className, formik, ...rest } = props;

  const classNames = useClasses("", className);

  const handleChange = (date) => {
    const dueDateObj = formatDateStringToDate(formik.values.dueDate);
    const updatedDate = updateTime(dueDateObj, date);
    const updatedDateString = formatDateToCompleteString(updatedDate);
    return formik.handleChange({
      target: {
        name: "dueDate",
        value: updatedDateString,
      },
    });
  };

  return (
    <CustomTimePicker
      value={formatDateStringToDate(formik.values.dueDate)}
      format="HH:mm"
      className={classNames}
      onChange={handleChange}
      name="dueDate"
      ref={ref}
      disabled={!formik.values.dueDate ? true : false}
      {...rest}
    />
  );
});

export default AddTaskFormTimePicker;
