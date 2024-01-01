import React from "react";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import EditTaskFormHeader from "./EditTaskFormHeader/EditTaskFormHeader";
import EditTaskFormContent from "./EditTaskFormContent";

import useEditTaskFormContext from "../../../hooks/useEditTaskFormContext";

function EditTaskForm() {
  const { formik } = useEditTaskFormContext();
  return (
    <FlexContainer className="max-w-[700px] w-full bg-main-app h-full rounded-xl z-20 flex-col">
      <form
        className="flex flex-1 flex-col bg-transparent overflow-y-auto"
        onSubmit={formik.handleSubmit}
      >
        <EditTaskFormHeader />
        <EditTaskFormContent />
      </form>
    </FlexContainer>
  );
}

export default EditTaskForm;
