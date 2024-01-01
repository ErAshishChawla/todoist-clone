import React, { useCallback } from "react";
import upcomingFilterFn from "../../../util/upcomingFilterFn";

import TodoAccordion from "./TodoAccordion";

function UpcomingAccordion({ todos }) {
  const filterFn = useCallback(upcomingFilterFn, []);
  return (
    <TodoAccordion
      filterFn={filterFn}
      todos={todos}
      accordionTitle="Upcoming"
    />
  );
}

export default UpcomingAccordion;
