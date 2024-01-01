import { getYear, getMonth, getDate } from "date-fns";
import { setYear, setMonth, setDate } from "date-fns";
import updateTime from "./updateTime";

function updateDate(actualDate, newDate) {
  let updatedDate;
  if (!newDate) {
    return null;
  }

  if (!actualDate) {
    updatedDate = newDate;
    updatedDate = updateTime(updatedDate, new Date());
  } else {
    updatedDate = actualDate;
    const newYear = getYear(newDate);
    const newMonth = getMonth(newDate);
    const newDay = getDate(newDate);

    updatedDate = setYear(updatedDate, newYear);
    updatedDate = setMonth(updatedDate, newMonth);
    updatedDate = setDate(updatedDate, newDay);
  }

  return updatedDate;
}

export default updateDate;
