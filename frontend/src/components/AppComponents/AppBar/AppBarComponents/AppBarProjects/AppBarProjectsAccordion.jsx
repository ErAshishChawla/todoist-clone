import React from "react";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { userProjectsSelector } from "../../../../../store";

import CustomAccordion from "../../../../ReusableComponents/CustomAccordion";

import { setShowProjectForm } from "../../../../../store";

import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import Button from "../../../../ReusableComponents/Button";
import AppBarProject from "./AppBarProject";

function AppBarProjectsAccordion() {
  const userProjects = useSelector(userProjectsSelector);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setShowProjectForm(true));
  };

  const header = (
    <FlexContainer className="font-bold justify-between items-center text-md">
      <FlexContainer className="">My Projects</FlexContainer>
      <Button
        className="flex-none p-1 hover:bg-appbar-item-hover"
        onClick={handleClick}
      >
        <IoAddSharp />
      </Button>
    </FlexContainer>
  );

  const renderedUserProjects = userProjects.map((project) => {
    return <AppBarProject project={project} key={project.randomId} />;
  });

  const data = (
    <FlexContainer className="flex-col gap-0.5">
      {!userProjects ? "No Projects Found" : renderedUserProjects}
    </FlexContainer>
  );
  return (
    <FlexContainer className="flex-col p-2">
      <CustomAccordion
        header={header}
        data={data}
        containerClassName="rounded-lg ps-2 py-2"
      />
    </FlexContainer>
  );
}

export default AppBarProjectsAccordion;
