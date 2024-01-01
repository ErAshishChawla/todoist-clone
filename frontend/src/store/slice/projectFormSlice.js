import { createSlice } from "@reduxjs/toolkit";

const projectFormSlice = createSlice({
  name: "appBar",
  initialState: {
    showProjectForm: false,
    projectFormData: null,
    projectFormMode: "add",
  },
  reducers: {
    setShowProjectForm(state, action) {
      state.showProjectForm = action.payload;
    },
    setProjectFormData(state, action) {
      state.projectFormData = action.payload;
    },
    setProjectFormMode(state, action) {
      state.projectFormMode = action.payload;
    },
    setProjectFormState(state, action) {
      state.showProjectForm = action.payload?.showProjectForm;
      state.projectFormData = action.payload?.projectFormData;
      state.projectFormMode = action.payload?.projectFormMode;
    },
  },
});

export const {
  setShowProjectForm,
  setProjectFormData,
  setProjectFormMode,
  setProjectFormState,
} = projectFormSlice.actions;

export const projectFormReducer = projectFormSlice.reducer;

export const showProjectFormSelector = (state) => {
  return state.projectForm.showProjectForm;
};

export const projectFormDataSelector = (state) => {
  return state.projectForm.projectFormData;
};

export const projectFormModeSelector = (state) => {
  return state.projectForm.projectFormMode;
};
