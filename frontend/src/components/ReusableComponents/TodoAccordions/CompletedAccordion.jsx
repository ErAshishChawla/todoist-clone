import React, { useCallback } from "react";
import TodoAccordion from "./TodoAccordion";

import completedFilterFn from "../../../util/completedFilterFn";

function CompletedAccordion({ todos }) {
  const filterFn = useCallback(completedFilterFn, []);

  return (
    <TodoAccordion
      todos={todos}
      filterFn={filterFn}
      accordionTitle="Completed"
    />
  );
}

export default CompletedAccordion;
