import { isBefore, startOfToday } from "date-fns";

function disabledDate(current) {
  if (!current) {
    return null;
  }

  return isBefore(current, startOfToday());
}

export default disabledDate;
