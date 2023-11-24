import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wardens: [],
  email: null,
  token : null,
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
      console.log(action.payload);
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      
    },
    get_unassigned_wardens: (state,action) => {

      state.wardens = action.payload.wardens;
      console.log(action.payload.wardens);
    }
  },
});

export const {  redirect_to_dashboard, logout, create_warden,get_unassigned_wardens } = wardenSlice.actions;
export default wardenSlice.reducer;
