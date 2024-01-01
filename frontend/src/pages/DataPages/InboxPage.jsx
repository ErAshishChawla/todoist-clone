import { useSelector } from "react-redux";
import { useMemo } from "react";

import DataPageSkeleton from "./DataPageSkeleton";

import { todosSelector } from "../../store";

import CompletedAccordion from "../../components/ReusableComponents/TodoAccordions/CompletedAccordion";
import OverdueAccordion from "../../components/ReusableComponents/TodoAccordions/OverdueAccordion";
import UpcomingAccordion from "../../components/ReusableComponents/TodoAccordions/UpcomingAccordion";

function InboxPage() {
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
    <DataPageSkeleton title="Inbox">
      <CompletedAccordion todos={inboxTodos} />
      <OverdueAccordion todos={inboxTodos} />
      <UpcomingAccordion todos={inboxTodos} />
    </DataPageSkeleton>
  );
}

export default InboxPage;
