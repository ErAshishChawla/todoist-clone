import AppBarLink from "../../ReusableAppBarComponents/AppBarLink";
import CalendarIconInactive from "../../CalendarIcon/CalendarIconInactive";

import CustomTooltip from "../../../../../ReusableComponents/CustomTooltip";

import { useSelector } from "react-redux";
import { todosSelector } from "../../../../../../store/slice/todosSlice";

import overdueFilterFn from "../../../../../../util/overdueFilterFn";
import dueTodayFilterFn from "../../../../../../util/dueTodayFilterFn";

import { useMemo } from "react";

function TodayLink() {
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
    const dueTodayTodos = inboxTodos.filter(dueTodayFilterFn);
    return overDueTodos.length + dueTodayTodos.length;
  }, [allTodos]);

  return (
    <CustomTooltip title="Go to today" placement="right" arrow={false}>
      <AppBarLink
        to="/app/today"
        icon={<CalendarIconInactive date={new Date().getDate()} />}
        text="Today"
        label={label || ""}
      />
    </CustomTooltip>
  );
}

export default TodayLink;
