import * as Icons from "react-icons/tb";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { todosSelector } from "../../../../../store";

import AppBarLink from "../ReusableAppBarComponents/AppBarLink";

import overdueFilterFn from "../../../../../util/overdueFilterFn";
import upcomingFilterFn from "../../../../../util/upcomingFilterFn";
import completedFilterFn from "../../../../../util/completedFilterFn";
import ProjectOptionsDropdown from "./ProjectOptionsDropdown";
import FlexContainer from "../../../../ReusableComponents/FlexContainer";

function AppBarProject({ project }) {
  const allTodos = useSelector(todosSelector);

  const projectTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (todo.listTypeId !== project.randomId) {
        return false;
      }
      return true;
    });
  }, [allTodos]);

  const totalCount = useMemo(() => {
    const overDueTodos = projectTodos.filter(overdueFilterFn);
    const upcomingTodos = projectTodos.filter(upcomingFilterFn);
    const completedTodos = projectTodos.filter(completedFilterFn);
    return overDueTodos.length + upcomingTodos.length + completedTodos.length;
  }, [allTodos]);

  let label;

  label = (
    <FlexContainer className="flex-none items-center gap-3">
      <div>{totalCount || ""}</div>
      <ProjectOptionsDropdown project={project} />
    </FlexContainer>
  );

  return (
    <AppBarLink
      to={`/app/projects/${project.randomId}`}
      icon={Icons[project.icon]()}
      text={project.title}
      label={label}
      textClassName="text-ellipsis overflow-hidden whitespace-nowrap block"
      iconClassName="text-xl"
    />
  );
}

export default AppBarProject;
