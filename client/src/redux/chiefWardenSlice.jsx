// chiefWardenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chiefWardenSlice = createSlice({
  name: 'chiefwardens',
  initialState: { token: null, email: null },
  reducers: {
    redirect_to_dashboard: (state, action) => {
      console.log(action.payload.email);
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { redirect_to_dashboard, logout } = chiefWardenSlice.actions;

export default chiefWardenSlice.reducer;
