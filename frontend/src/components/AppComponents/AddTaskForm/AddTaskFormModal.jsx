import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { setShowAddTaskForm } from "../../../store";

import AddTaskForm from "./AddTaskForm";
import FlexContainer from "../../ReusableComponents/FlexContainer";

function AddTaskFormModal() {
  const dispatch = useDispatch();
  const handleOverlayClick = () => {
    dispatch(setShowAddTaskForm(false));
  };

  const modalContent = (
    <FlexContainer className="justify-center items-center absolute inset-0">
      <FlexContainer
        className="absolute inset-0 z-10"
        onClick={handleOverlayClick}
      ></FlexContainer>
      <AddTaskForm className="shadow-addTaskForm" />
    </FlexContainer>
  );

  return createPortal(modalContent, document.querySelector(".modal-container"));
}

export default AddTaskFormModal;
