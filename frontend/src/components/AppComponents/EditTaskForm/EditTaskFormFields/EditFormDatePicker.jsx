import { forwardRef } from "react";

import CustomDatePicker from "../../../ReusableComponents/CustomDatePicker";

import useClasses from "../../../../hooks/useClasses";
import formatDateStringToDate from "../../../../util/formatDateStringToDate";
import updateDate from "../../../../util/updateDate";
import formatDateToCompleteString from "../../../../util/formatDateToCompleteString";
import disabledDate from "../../../../util/disabledDate";

const EditFormDatePicker = forwardRef(function AddTaskFormDatePicker(
  props,
  ref
) {
  const { className, formik, ...rest } = props;

  const classNames = useClasses("", className);

  const handleChange = (date) => {
    const dueDateObj = formatDateStringToDate(formik.values.dueDate);
    const updatedDate = updateDate(dueDateObj, date);
    const updatedDateString = formatDateToCompleteString(updatedDate);

    const customEventObject = {
      target: {
        name: "dueDate",
        value: updatedDateString,
      },
    };

    return formik.handleChange(customEventObject);
  };

  return (
    <CustomDatePicker
      value={formatDateStringToDate(formik.values.dueDate)}
      disabledDate={disabledDate}
      format="YYYY:MM:DD"
      className={classNames}
      onChange={handleChange}
      name="dueDate"
      ref={ref}
      {...rest}
    />
  );
});

export default EditFormDatePicker;
