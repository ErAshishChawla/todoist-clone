import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "window",
  initialState: {
    windowWidth: window.innerWidth,
  },

  reducers: {
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
  },
});

export const { setWindowWidth } = appSlice.actions;
export const appSliceReducer = appSlice.reducer;
