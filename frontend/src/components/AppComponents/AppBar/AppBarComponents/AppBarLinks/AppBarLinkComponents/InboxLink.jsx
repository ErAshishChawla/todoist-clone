import CustomTooltip from "../../../../../ReusableComponents/CustomTooltip";
import AppBarLink from "../../ReusableAppBarComponents/AppBarLink";

import { HiOutlineInbox } from "react-icons/hi2";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { todosSelector } from "../../../../../../store";

import upcomingFilterFn from "../../../../../../util/upcomingFilterFn";
import overdueFilterFn from "../../../../../../util/overdueFilterFn";
import completedFilterFn from "../../../../../../util/completedFilterFn";

function InboxLink() {
  const allTodos = useSelector(todosSelector);

  const inboxTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (todo.listTypeId !== "inbox") {
        return false;
      }
      return true;
    });
  }, [allTodos]);

  const label = useMemo(() => {
    const overDueTodos = inboxTodos.filter(overdueFilterFn);
    const upcomingTodos = inboxTodos.filter(upcomingFilterFn);
    const completedTodos = inboxTodos.filter(completedFilterFn);
    return overDueTodos.length + upcomingTodos.length + completedTodos.length;
  }, [allTodos]);

  return (
    <CustomTooltip title="Go to inbox" arrow={false} placement="right">
      <AppBarLink
        to="/app/inbox"
        text="Inbox"
        icon={<HiOutlineInbox />}
        label={label || ""}
      />
    </CustomTooltip>
  );
}

export default InboxLink;
