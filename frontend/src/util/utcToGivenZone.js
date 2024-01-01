import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

function utcToGivenZone(date, timeZone) {
  if (!date) {
    return null;
  }

  if (!timeZone) {
    return date;
  }

  return format(utcToZonedTime(date, timeZone), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export default utcToGivenZone;
