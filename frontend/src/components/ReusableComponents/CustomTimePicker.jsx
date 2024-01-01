import { forwardRef } from "react";
import { DatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const CustomDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);

const CustomTimePicker = forwardRef((props, ref) => (
  <CustomDatePicker {...props} picker="time" ref={ref} />
));

CustomTimePicker.displayName = "TimePicker";

export default CustomTimePicker;
