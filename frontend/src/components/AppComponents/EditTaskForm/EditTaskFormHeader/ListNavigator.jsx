import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/tb";
import { HiOutlineInbox } from "react-icons/hi2";

import { userProjectsSelector } from "../../../../store";

import useEditTaskFormContext from "../../../../hooks/useEditTaskFormContext";

import FlexContainer from "../../../ReusableComponents/FlexContainer";

function ListNavigator() {
  const { editTaskFormTodo, handleCloseClick } = useEditTaskFormContext();

  const userProjects = useSelector(userProjectsSelector);

  const matchedProject = useMemo(() => {
    return userProjects?.find((project) => {
      return project.randomId === editTaskFormTodo.listTypeId;
    });
  }, [userProjects, editTaskFormTodo]);

  let content;

  if (editTaskFormTodo?.listTypeId === "inbox") {
    content = (
      <Link
        to={`/app/inbox`}
        className="px-2 py-1 hover:bg-editTask-form-header-listType-hover items-center rounded-lg"
        onClick={handleCloseClick}
      >
        <FlexContainer className="items-center gap-2">
          <HiOutlineInbox />
          Inbox
        </FlexContainer>
      </Link>
    );
  }

  if (editTaskFormTodo?.listTypeId !== "inbox") {
    <Link
      to={`/app/${matchedProject.randomId}`}
      className="px-2 py-1 hover:bg-editTask-form-header-listType-hover items-center rounded-lg"
      onClick={handleCloseClick}
    >
      <FlexContainer className="items-center gap-2 justify-start">
        <FlexContainer className="flex-none">
          {Icons[matchedProject.icon]()}
        </FlexContainer>

        <div className="capitalize overflow-hidden text-ellipsis whitespace-nowrap">
          {matchedProject.title}
        </div>
      </FlexContainer>
    </Link>;
  }

  return content;
}

export default ListNavigator;
