import { useEffect } from "react";
import { useDeleteProjectMutation, updateUserData } from "../../../../../store";
import Button from "../../../../ReusableComponents/Button";
import { useNavigate } from "react-router-dom";

import dispatchToast from "../../../../../util/dispatchToast";
import { useDispatch } from "react-redux";

function DeleteProject({ project }) {
  const [deleteProject, results] = useDeleteProjectMutation();
  const { isLoading, isError, isSuccess, data } = results;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    deleteProject(project.randomId);
  };

  useEffect(() => {
    if (isError) {
      dispatchToast("Error in deleting Project", "error");
    }
    if (isSuccess) {
      navigate("/app/today", { replace: true });
      dispatch(updateUserData(data));
      dispatchToast("Project Deleted Successfully", "success");
    }
  }, [isSuccess, isError]);

  return (
    <Button className="p-0 text-form-error" onClick={handleClick}>
      Delete
    </Button>
  );
}

export default DeleteProject;
