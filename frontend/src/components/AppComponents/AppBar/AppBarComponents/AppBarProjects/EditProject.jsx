import React from "react";
import { useDispatch } from "react-redux";

import Button from "../../../../ReusableComponents/Button";
import { setProjectFormState } from "../../../../../store";

function EditProject({ project }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setProjectFormState({
        showProjectForm: true,
        projectFormData: project,
        projectFormMode: "edit",
      })
    );
  };
  return (
    <Button className="p-0" onClick={handleClick}>
      Edit
    </Button>
  );
}

export default EditProject;
