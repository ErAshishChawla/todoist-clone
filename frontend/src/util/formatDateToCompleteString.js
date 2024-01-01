import { format } from "date-fns";

function formatDateToCompleteString(dateObj) {
  if (!dateObj) {
    return null;
  }
  const completeDateString = format(dateObj, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  return completeDateString;
}

export default formatDateToCompleteString;
