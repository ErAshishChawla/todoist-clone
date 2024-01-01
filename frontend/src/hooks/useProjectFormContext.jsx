import { useContext } from "react";

import { ProjectFormContext } from "../components/AppComponents/ProjectForm/ProjectFormModal";

function useProjectFormContext() {
  return useContext(ProjectFormContext);
}

export default useProjectFormContext;
