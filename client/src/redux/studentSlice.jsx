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
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    register_student: (state, action) => {
      state.students.push(action.payload);
    },
    redirect_to_dashboard: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.regNo = action.payload.regNo;
      state.hostelName = action.payload.hostelName;
      state.roomNo = action.payload.roomNo;
      state.token = action.payload.token;
    },
    logout: (state) => {
      // Reset user-related information on logout
      state.name = null;
      state.email = null;
      state.regNo = null;
      state.hostelName = null;
      state.roomNo = null;
      state.token = null;
    },
  },
});

export const { register_student, redirect_to_dashboard, logout } = studentSlice.actions;
export default studentSlice.reducer;
