// complaintSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  complaints: [],
  myComplaints: [],
};

const complaintSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    add_complaint: (state, action) => {
      // Add the new complaint to the state
      state.complaints.push(action.payload);

      // If the complaint belongs to the current user, add it to myComplaints
      if (action.payload.studentName === state.myComplaints) {
        state.myComplaints.push(action.payload);
      }
    },
    get_all_complaints: (state, action) => {
      // Update the state with all complaints
      state.complaints = action.payload;
    },
    get_my_complaints: (state, action) => {
      // Update the state with user-specific complaints
      state.myComplaints = action.payload;
    },
  },
});

export const { add_complaint, get_all_complaints, get_my_complaints } = complaintSlice.actions;

export default complaintSlice.reducer;
