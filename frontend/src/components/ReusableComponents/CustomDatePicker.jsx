import { DatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const CustomDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);

export default CustomDatePicker;
