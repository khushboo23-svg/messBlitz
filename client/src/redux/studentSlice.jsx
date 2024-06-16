import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  token: null,
  name: null,
  email: null,
  regNo: null,
  hostelName: null,
  roomNo: null,
  password: null,
  recoveryEmail: null,
  feeAmount:null,
  Amount:null,
  image:null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    register_student: (state, action) => {
      state.students.push(action.payload);
    },
    redirect_to_dashboard: (state, action) => {
      // console.log(action.payload.token);
      state.name = action.payload.name; 
      state.email = action.payload.email;
      state.feeAmount = action.payload.feeAmount;
      state.regNo = action.payload.regNo;
      state.hostelName = action.payload.hostelName;
      state.roomNo = action.payload.roomNo;
      state.token = action.payload.token;
    },
    change_fee: (state, action) =>{
      state.Amount = action.payload.Amount;
    },
    change_in_prof_img: (state, action) =>{
      state.image = action.payload.image;
    },
    logoutStudent: (state) => {
      // Reset user-related information on logout
      state.name = null;
      state.email = null;
      state.regNo = null;
      state.hostelName = null;
      state.roomNo = null;
      state.token = null;
      state.feeAmount = null;
    },
  },
});

export const { change_in_prof_img,register_student, redirect_to_dashboard, logoutStudent,change_fee } = studentSlice.actions;
export default studentSlice.reducer;
