import { isBefore, parseISO } from "date-fns";

const overdueFilterFn = (todo) => {
  if (todo.isCompleted) {
    return false;
  } else {
    if (!todo.dueDate) {
      return false;
    } else {
      return isBefore(parseISO(todo.dueDate), new Date());
    }
  }
};

export default overdueFilterFn;
