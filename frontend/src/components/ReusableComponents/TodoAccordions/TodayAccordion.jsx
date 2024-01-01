import React, { useCallback } from "react";

import dueTodayFilterFn from "../../../util/dueTodayFilterFn";

import TodoAccordion from "./TodoAccordion";

function TodayAccordion({ todos }) {
  const filterFn = useCallback(dueTodayFilterFn, []);

  return (
    <TodoAccordion
      filterFn={filterFn}
      todos={todos}
      accordionTitle="Due Today"
    />
  );
}

export default TodayAccordion;
