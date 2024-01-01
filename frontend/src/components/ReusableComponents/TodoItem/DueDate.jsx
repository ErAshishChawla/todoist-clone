import React from "react";
import { TbCalendarStats } from "react-icons/tb";
import { isBefore, format, getYear, parseISO } from "date-fns";

import FlexContainer from "../FlexContainer";

import useClasses from "../../../hooks/useClasses";

function DueDate({ todoItem }) {
  let dateFormat;

  let todoDueDate = parseISO(todoItem.dueDate);

  if (getYear(todoDueDate) !== getYear(new Date())) {
    dateFormat = "MMM dd yyyy hh:mm a";
  } else {
    dateFormat = "MMM dd hh:mm a";
  }

  let formattedDueDate = format(todoDueDate, dateFormat);

  return (
    <FlexContainer
      className={useClasses("text-todo-dueDate items-center flex-none gap-1", {
        "text-todo-dueDate-expired": isBefore(todoDueDate, new Date()),
      })}
    >
      <TbCalendarStats /> {formattedDueDate}
    </FlexContainer>
  );
}

export default DueDate;
