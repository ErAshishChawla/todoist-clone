import { useSelector } from "react-redux";
import { useMemo } from "react";

import DataPageSkeleton from "./DataPageSkeleton";

import { todosSelector } from "../../store";

import OverdueAccordion from "../../components/ReusableComponents/TodoAccordions/OverdueAccordion";
import TodayAccordion from "../../components/ReusableComponents/TodoAccordions/TodayAccordion";

function TodayPage() {
  const allTodos = useSelector(todosSelector);

  const inboxTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (todo.listType !== "inbox") {
        return false;
      }
      return true;
    });
  }, [allTodos]);

  return (
    <DataPageSkeleton title="Today">
      <OverdueAccordion todos={inboxTodos} />
      <TodayAccordion todos={inboxTodos} />
    </DataPageSkeleton>
  );
}

export default TodayPage;
