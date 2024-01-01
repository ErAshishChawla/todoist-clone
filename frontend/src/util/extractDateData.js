import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from "date-fns";

function extractDateData(date) {
  if (!date) {
    return null;
  }
  return [
    getYear(date),
    getMonth(date),
    getDate(date),
    getHours(date),
    getMinutes(date),
    getSeconds(date),
    getMilliseconds(date),
  ];
}

export default extractDateData;
