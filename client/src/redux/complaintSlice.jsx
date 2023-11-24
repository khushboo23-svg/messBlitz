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
      state.complaints.push(action.payload);
      console.log(state.complaints.complaints);
      if (action.payload.studentName === state.myComplaints) {
        state.myComplaints.push(action.payload);
      }
    },
    get_all_complaints: (state, action) => {
      console.log(action.payload);
      state.complaints = action.payload;
    },
    get_my_complaints: (state, action) => {
      state.myComplaints = action.payload;
    },
    delete_complaint: (state, action) => {
      console.log("Complaint id is : "+action.payload);
      const id = action.payload;
      state.myComplaints = Array.isArray(state.myComplaints)
        ? state.myComplaints.filter((complaint) => complaint.id !== id)
        : [];
    },
    add_comment: (state,action) => {
      console.log(action.payload);
      state.complaints.comments = (action.payload)
    },
    get_comments: (state,action) => {
      console.log("getting comments");
    }
  },
});

export const { add_complaint, get_all_complaints, get_my_complaints, delete_complaint,add_comment,get_comments } = complaintSlice.actions;

export default complaintSlice.reducer;
