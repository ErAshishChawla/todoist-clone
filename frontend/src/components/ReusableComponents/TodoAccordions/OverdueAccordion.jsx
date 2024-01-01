import React, { useCallback } from "react";
import overdueFilterFn from "../../../util/overdueFilterFn";

import TodoAccordion from "./TodoAccordion";

function OverdueAccordion({ todos }) {
  const filterFn = useCallback(overdueFilterFn, []);

  return (
    <TodoAccordion todos={todos} filterFn={filterFn} accordionTitle="Overdue" />
  );
}

export default OverdueAccordion;
