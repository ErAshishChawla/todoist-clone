import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    data: null,
    token: null,
  },
  reducers: {
    setUserData(state, action) {
      const token = action.payload?.token;
      const user = action.payload?.user;
      state.data = user;
      state.token = token;
    },
    updateUserData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setUserData, updateUserData } = usersSlice.actions;
export const usersSliceReducer = usersSlice.reducer;

export const userTokenSelector = (state) => {
  return state.user.token;
};

export const userEmailSelector = (state) => {
  return state.user.data?.email;
};

export const userIsVerifiedSelector = (state) => {
  return state.user.data?.isVerified;
};

export const userProjectsSelector = (state) => {
  return state.user.data?.projects;
};
