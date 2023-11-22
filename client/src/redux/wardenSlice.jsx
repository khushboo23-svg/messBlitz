import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chiefwardens: [],
  token: null,
  name: null,
  email: null,
  password: null,
  recoveryEmail: null,
};

const wardenSlice = createSlice({
  name: "chiefwardens",
  initialState,
  reducers: {
    redirect_to_dashboard: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      // Reset user-related information on logout
      state.name = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const {  redirect_to_dashboard, logout } = wardenSlice.actions;
export default wardenSlice.reducer;
