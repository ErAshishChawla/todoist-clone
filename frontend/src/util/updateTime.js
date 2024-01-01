import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";
import { getHours, getMinutes } from "date-fns";

function updateTime(actualDate, newDate) {
  if (!actualDate || !newDate) {
    return null;
  }
  const newHours = getHours(newDate);
  const newMinutes = getMinutes(newDate);

  let updatedDate = actualDate;
  updatedDate = setHours(updatedDate, newHours);
  updatedDate = setMinutes(updatedDate, newMinutes);
  updatedDate = setSeconds(updatedDate, 0);
  updatedDate = setMilliseconds(updatedDate, 0);
  return updatedDate;
}

export default updateTime;
