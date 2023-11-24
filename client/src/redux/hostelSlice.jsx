// chiefWardenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const hostelSlice = createSlice({
  name: 'hostels', 
  initialState: { 
    hostels : []
   },
  reducers: {
    create_hostel: (state, action) => {
        state.hostels.push(action.payload)
    },
    get_hostels_data: (state,action) => {
        state.hostels = action.payload
    }
  },
});

export const {  create_hostel,get_hostels_data} = hostelSlice.actions;

export default hostelSlice.reducer;
