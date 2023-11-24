import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wardens: [],
};

const wardenSlice = createSlice({
  name: "wardens",
  initialState,
  reducers: {
    create_warden: (state, action) => {
      console.log(action.payload);
      state.wardens.push(action.payload);
    },
    redirect_to_dashboard: (state, action) => {
      
    },
    logout: (state) => {
      
    },
  },
});

export const {  redirect_to_dashboard, logout, create_warden } = wardenSlice.actions;
export default wardenSlice.reducer;
