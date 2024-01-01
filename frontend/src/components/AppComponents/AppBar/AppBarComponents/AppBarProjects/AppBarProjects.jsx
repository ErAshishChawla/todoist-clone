import React from "react";
import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import AppBarProjectsAccordion from "./AppBarProjectsAccordion";

function AppBarProjects() {
  return (
    <FlexContainer className="flex-none w-full">
      <AppBarProjectsAccordion />
    </FlexContainer>
  );
}

export default AppBarProjects;
