import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { todosSelector, userProjectsSelector } from "../../store";

import CompletedAccordion from "../../components/ReusableComponents/TodoAccordions/CompletedAccordion";
import OverdueAccordion from "../../components/ReusableComponents/TodoAccordions/OverdueAccordion";
import UpcomingAccordion from "../../components/ReusableComponents/TodoAccordions/UpcomingAccordion";
import DataPageSkeleton from "./DataPageSkeleton";

function ProjectPage() {
  const allTodos = useSelector(todosSelector);
  const { projectId } = useParams();

  const userProjects = useSelector(userProjectsSelector);

  const matchedUserProject = useMemo(() => {
    return userProjects?.filter((project) => {
      return project?.randomId === projectId;
    })[0];
  }, [userProjects, projectId]);

  const projectTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (todo.listTypeId !== matchedUserProject.randomId) {
        return false;
      }
      return true;
    });
  }, [allTodos, projectId]);

  return (
    <DataPageSkeleton title={matchedUserProject?.title}>
      <CompletedAccordion todos={projectTodos} />
      <OverdueAccordion todos={projectTodos} />
      <UpcomingAccordion todos={projectTodos} />
    </DataPageSkeleton>
  );
}

export default ProjectPage;
