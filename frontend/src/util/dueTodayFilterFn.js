import { isAfter, isBefore, endOfDay, parseISO } from "date-fns";

const dueTodayFilterFn = (todo) => {
  if (todo.isCompleted) {
    return false;
  } else {
    if (!todo.dueDate) {
      return false;
    } else {
      const now = new Date();
      const endOfToday = endOfDay(now);

      return (
        isAfter(parseISO(todo.dueDate), now) &&
        isBefore(parseISO(todo.dueDate), endOfToday)
      );
    }
  }
};

export default dueTodayFilterFn;
