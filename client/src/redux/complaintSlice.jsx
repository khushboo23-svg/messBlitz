import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    complaints: [],
};

const complaintSlice = createSlice({
    name: "complaints",
    initialState,
    reducers: {
        add_complaint: (state, action) => {
            state.complaints.push(action.payload);
        }
    }
});

export const { add_complaint } = complaintSlice.actions;
export default complaintSlice.reducer;
