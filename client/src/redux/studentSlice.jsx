import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  token: null,
  email: null,
  name: null,
  regNo: null,
  roomNo: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    register_student: (state, action) => {
      state.students.push(action.payload);
    },
    redirect_to_dashboard: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.regNo = action.payload.regNo;
      state.token = action.payload.token;
    },
    logout: (state) => {
      // Reset user-related information on logout
      state.email = null;
      state.name = null;
      state.regNo = null;
      state.token = null;
    },
  },
});

export const { register_student, redirect_to_dashboard, logout } = studentSlice.actions;
export default studentSlice.reducer;
