import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { createContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  setShowProjectForm,
  useAddProjectMutation,
  updateUserData,
} from "../../../store";
import FlexContainer from "../../ReusableComponents/FlexContainer";
import ProjectForm from "./ProjectForm";

import dispatchToast from "../../../util/dispatchToast";

const ProjectFormContext = createContext();

function ProjectFormModal({ project, title }) {
  const dispatch = useDispatch();
  const [addProject, results] = useAddProjectMutation();
  const { isSuccess, isError, data } = results;

  const handleOverlayClick = () => {
    dispatch(setShowProjectForm(false));
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    iconSearch: Yup.string(),
    iconName: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      iconSearch: "",
      iconName: "TbHash",
    },
    validationSchema,
    onSubmit: (values) => {
      addProject({
        icon: values.iconName,
        title: values.title,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(updateUserData(data));
      dispatchToast("Project Created Successfully", "success");
      handleOverlayClick();
    }

    if (isError) {
      dispatchToast("Error Creating Project", "error");
    }
  }, [isSuccess, isError]);

  const contextValues = {
    title,
    project,
    dispatch,
    handleOverlayClick,
    formik,
  };

  const modalContent = (
    <FlexContainer className="justify-center items-center absolute inset-0">
      <FlexContainer
        className="absolute inset-0 z-10 bg-overlay"
        onClick={handleOverlayClick}
      ></FlexContainer>
      <ProjectFormContext.Provider value={contextValues}>
        <ProjectForm title={title} />
      </ProjectFormContext.Provider>
    </FlexContainer>
  );

  return createPortal(modalContent, document.querySelector(".modal-container"));
}

export default ProjectFormModal;

export { ProjectFormContext };
