import { parseISO } from "date-fns";

function formatDateStringToDate(dateString) {
  if (!dateString) {
    return null;
  }

  const dateObj = parseISO(dateString);

  return dateObj;
}

export default formatDateStringToDate;
