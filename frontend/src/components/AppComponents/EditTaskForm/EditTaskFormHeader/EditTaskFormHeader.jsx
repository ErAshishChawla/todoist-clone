import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { HiOutlineInbox } from "react-icons/hi2";
import { Link } from "react-router-dom";

import FlexContainer from "../../../ReusableComponents/FlexContainer";
import Button from "../../../ReusableComponents/Button";
import CustomTooltip from "../../../ReusableComponents/CustomTooltip";

import useEditTaskFormContext from "../../../../hooks/useEditTaskFormContext";
import ListNavigator from "./ListNavigator";

function EditTaskFormHeader() {
  const { handleCloseClick } = useEditTaskFormContext();

  return (
    <FlexContainer className="bg-editTaskFormHeader flex-none w-full px-4 py-2 justify-between items-center border-b border-edit-form-header">
      <FlexContainer className="items-center flex-none cursor-pointer">
        <ListNavigator />
      </FlexContainer>
      <FlexContainer className="flex-none gap-4">
        <CustomTooltip title="Save Todo" arrow={false}>
          <Button
            type="submit"
            className="flex-none text-xl p-1 rounded-full  hover:bg-editTask-form-header-listType-hover active:scale-[1.1] "
          >
            <MdSaveAlt />
          </Button>
        </CustomTooltip>

        <CustomTooltip title="Close" arrow={false}>
          <Button
            className="flex-none text-xl p-1 rounded-full  hover:bg-editTask-form-header-listType-hover hover:text-todo-dueDate-expired active:scale-[1.1] "
            onClick={handleCloseClick}
            type="button"
          >
            <IoCloseSharp />
          </Button>
        </CustomTooltip>
      </FlexContainer>
    </FlexContainer>
  );
}

export default EditTaskFormHeader;
