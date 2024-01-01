import extractDateData from "./extractDateData";

function disabledTime(dueDate) {
  if (!dueDate) {
    return null;
  }

  const now = new Date();

  const [dueDateYear, dueDateMonth, dueDateDate, dueDateHour, dueDateMinute] =
    extractDateData(dueDate);

  const [nowYear, nowMonth, nowDate, nowHour, nowMinute] = extractDateData(now);

  const handleDisabledHour = () => {
    if (
      dueDateDate === nowDate &&
      dueDateMonth === nowMonth &&
      dueDateYear === nowYear
    ) {
      return [...Array(24).keys()].splice(0, nowHour);
    } else {
      return null;
    }
  };
  const handleDisabledMinute = () => {
    if (
      dueDateDate === nowDate &&
      dueDateMonth === nowMonth &&
      dueDateYear === nowYear
    ) {
      return [...Array(60).keys()].splice(0, nowMinute);
    } else {
      return null;
    }
  };

  return {
    disabledHours: handleDisabledHour,
    disabledMinutes: handleDisabledMinute,
  };
}
export default disabledTime;
