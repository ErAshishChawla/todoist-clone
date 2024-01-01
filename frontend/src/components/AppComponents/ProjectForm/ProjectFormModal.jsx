import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  useAddProjectMutation,
  updateUserData,
  setProjectFormState,
  useUpdateProjectMutation,
} from "../../../store";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import ProjectForm from "./ProjectForm";

import dispatchToast from "../../../util/dispatchToast";

const ProjectFormContext = createContext();

function ProjectFormModal() {
  const { projectFormData, projectFormMode } = useSelector((state) => {
    return state.projectForm;
  });

  const dispatch = useDispatch();
  const [addProject, addResults] = useAddProjectMutation();
  const [updateProject, updateResults] = useUpdateProjectMutation();
  const handleOverlayClick = () => {
    dispatch(
      setProjectFormState({
        showProjectForm: false,
        projectFormData: null,
        projectFormMode: "add",
      })
    );
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    iconSearch: Yup.string(),
    iconName: Yup.string(),
  });

  let formik = useFormik({
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

  let formTitle = "Add Project";

  if (projectFormMode === "edit") {
    formTitle = "Edit Project";
    const { title, icon } = projectFormData;
    formik = useFormik({
      initialValues: {
        title,
        iconSearch: "",
        iconName: icon,
      },
      validationSchema,
      onSubmit: (values) => {
        updateProject({
          randomId: projectFormData.randomId,
          icon: values.iconName,
          title: values.title,
        });
      },
    });
  }

  useEffect(() => {
    if (projectFormMode === "edit") {
      if (updateResults.isSuccess) {
        dispatch(updateUserData(updateResults.data));
        dispatchToast("Project Updated Successfully", "success");
        handleOverlayClick();
      }

      if (updateResults.isError) {
        dispatchToast("Error Updating Project", "error");
      }
    }

    if (projectFormMode === "add") {
      if (addResults.isSuccess) {
        dispatch(updateUserData(addResults.data));
        dispatchToast("Project Created Successfully", "success");
        handleOverlayClick();
      }

      if (addResults.isError) {
        dispatchToast("Error Creating Project", "error");
      }
    }
  }, [
    updateResults.isSuccess,
    updateResults.isError,
    addResults.isSuccess,
    addResults.isError,
    projectFormMode,
  ]);

  const contextValues = {
    formTitle,
    dispatch,
    handleOverlayClick,
    formik,
    projectFormData,
    projectFormMode,
  };

  const modalContent = (
    <FlexContainer className="justify-center items-center absolute inset-0">
      <FlexContainer
        className="absolute inset-0 z-10 bg-overlay"
        onClick={handleOverlayClick}
      ></FlexContainer>
      <ProjectFormContext.Provider value={contextValues}>
        <ProjectForm />
      </ProjectFormContext.Provider>
    </FlexContainer>
  );

  return createPortal(modalContent, document.querySelector(".modal-container"));
}

export default ProjectFormModal;

export { ProjectFormContext };
