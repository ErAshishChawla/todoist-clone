import React from "react";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import CustomCheckBox from "../../ReusableComponents/TodoItem/CustomCheckBox";
import TaskNameInput from "./EditTaskFormFields/TaskNameInput";
import DescriptionInput from "./EditTaskFormFields/DescriptionInput";
import EditFormDatePicker from "./EditTaskFormFields/EditFormDatePicker";
import EditFormTimePicker from "./EditTaskFormFields/EditFormTimePicker";
import ListTypeDropDown from "./EditTaskFormFields/ListTypeDropDown";

import useEditTaskFormContext from "../../../hooks/useEditTaskFormContext";
import { Divider } from "antd";

function EditTaskFormContent() {
  const { editTaskFormTodo, formik } = useEditTaskFormContext();

  return (
    <FlexContainer className="flex-col px-6 py-4 gap-4">
      <FlexContainer className="flex-none items-center gap-4 w-full">
        <CustomCheckBox
          todoItem={editTaskFormTodo}
          className="w-6 h-6 text-xl disabled:cursor-not-allowed"
          disabled={!formik.values?.taskName ? true : false}
        />
        <FlexContainer className="flex-col">
          <FlexContainer className="break-all">
            <TaskNameInput formik={formik} />
          </FlexContainer>
          <FlexContainer>
            <DescriptionInput formik={formik} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <Divider className="m-0" />
      <FlexContainer className="flex-none w-full gap-4">
        <EditFormDatePicker formik={formik} />
        <EditFormTimePicker formik={formik} />
        <ListTypeDropDown formik={formik} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default EditTaskFormContent;
