import { isBefore, parseISO } from "date-fns";

const upcomingFilterFn = (todo) => {
  if (todo.isCompleted) {
    return false;
  } else {
    if (!todo.dueDate) {
      return true;
    } else if (isBefore(parseISO(todo.dueDate), new Date())) {
      return false;
    } else {
      return true;
    }
  }
};

export default upcomingFilterFn;
