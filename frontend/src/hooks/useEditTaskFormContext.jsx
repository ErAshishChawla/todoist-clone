import { EditTaskFormContext } from "../context/EditTaskFormContextProvider";

import { useContext } from "react";

function useEditTaskFormContext() {
  return useContext(EditTaskFormContext);
}

export default useEditTaskFormContext;
