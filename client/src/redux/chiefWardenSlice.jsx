// chiefWardenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chiefWardenSlice = createSlice({
  name: 'chiefwardens', 
  initialState: { token: null, email: null, password : null },
  reducers: {
    get_chiefWarden_data : (state,action) => {
      console.log(action.payload);
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    redirect_to_dashboard: (state, action) => {
      console.log(action.payload);
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { redirect_to_dashboard, logout,get_chiefWarden_data } = chiefWardenSlice.actions;

export default chiefWardenSlice.reducer;
