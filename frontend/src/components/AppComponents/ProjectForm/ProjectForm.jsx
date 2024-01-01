import React from "react";
import { Input, Divider } from "antd";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import useProjectFormContext from "../../../hooks/useProjectFormContext";
import ProjectFormHeader from "./ProjectFormHeader";
import IconDisplay from "./IconDisplay";
import Button from "../../ReusableComponents/Button";

function ProjectForm() {
  const { formik, handleOverlayClick, projectFormMode } =
    useProjectFormContext();
  return (
    <FlexContainer className="z-20 bg-main-app max-w-[500px] rounded-lg overflow-hidden flex-col">
      <ProjectFormHeader />
      <FlexContainer className="flex-none w-full flex-col p-6">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full gap-4"
        >
          <FlexContainer className="flex-col flex-none w-full gap-1">
            <label
              htmlFor="title"
              className="font-bold after:content-['*'] after:ml-0.5 after:text-form-required-star"
            >
              Name
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Project Name"
            />
          </FlexContainer>

          <FlexContainer className="flex-col flex-none w-full gap-1">
            <label htmlFor="icon" className="font-bold">
              Icon Search
            </label>
            <Input
              type="text"
              id="icon"
              name="iconSearch"
              value={formik.values.iconSearch}
              onChange={formik.handleChange}
              placeholder="Icon Search"
            />
          </FlexContainer>
          <IconDisplay />
          <Divider className="m-0 bg-gray-300" />
          <FlexContainer className="flex-none w-full flex-row-reverse gap-4">
            <Button
              type="submit"
              className="flex-none disabled:cursor-not-allowed px-3 py-1.5 bg-addTask-form-button-addTask disabled:addTask-form-button-addTask-disabled text-white"
              disabled={formik.values.title ? false : true}
            >
              {projectFormMode === "add" ? "Add Project" : null}
              {projectFormMode === "edit" ? "Save Project" : null}
            </Button>
            <Button
              type="button"
              className="flex-none px-3 py-1.5 bg-addTask-form-button-cancel hover:bg-addTask-form-button-cancel-hover text-app-text"
              onClick={handleOverlayClick}
            >
              Cancel
            </Button>
          </FlexContainer>
        </form>
      </FlexContainer>
    </FlexContainer>
  );
}

export default ProjectForm;
