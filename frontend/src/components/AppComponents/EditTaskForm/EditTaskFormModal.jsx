import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { setShowEditTaskFormWithTodoData } from "../../../store";

import EditTaskForm from "./EditTaskForm";
import FlexContainer from "../../ReusableComponents/FlexContainer";
import EditTaskFormContextProvider from "../../../context/EditTaskFormContextProvider";

function EditTaskFormModal() {
  const dispatch = useDispatch();

  const handleOverlayClick = () => {
    dispatch(
      setShowEditTaskFormWithTodoData({
        showEditTaskForm: false,
        todo: null,
      })
    );
  };

  const modalContent = (
    <FlexContainer className="justify-center items-center absolute inset-0 p-12">
      <FlexContainer
        className="absolute inset-0 z-10 bg-overlay"
        onClick={handleOverlayClick}
      ></FlexContainer>
      <EditTaskFormContextProvider>
        <EditTaskForm />
      </EditTaskFormContextProvider>
    </FlexContainer>
  );

  return createPortal(modalContent, document.querySelector(".modal-container"));
}

export default EditTaskFormModal;
