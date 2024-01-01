import React from "react";
import { IoCloseSharp } from "react-icons/io5";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import Button from "../../ReusableComponents/Button";
import CustomTooltip from "../../ReusableComponents/CustomTooltip";

import useProjectFormContext from "../../../hooks/useProjectFormContext";

function ProjectFormHeader() {
  const { title, handleOverlayClick } = useProjectFormContext();
  return (
    <FlexContainer className="bg-editTaskFormHeader flex-none w-full px-4 py-2 justify-between items-center border-b border-edit-form-header">
      <FlexContainer className="items-center flex-none text-lg font-bold">
        {title}
      </FlexContainer>
      <FlexContainer className="flex-none gap-4">
        <CustomTooltip title="Close" arrow={false}>
          <Button
            className="flex-none text-xl p-1 rounded-full hover:bg-editTask-form-header-listType-hover hover:text-todo-dueDate-expired active:scale-[1.1] "
            type="button"
            onClick={handleOverlayClick}
          >
            <IoCloseSharp />
          </Button>
        </CustomTooltip>
      </FlexContainer>
    </FlexContainer>
  );
}

export default ProjectFormHeader;
