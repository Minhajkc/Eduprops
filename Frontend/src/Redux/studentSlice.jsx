// src/features/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentId: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    logoutStudentRedux: (state) => {
        state.studentId = null; // Set student data to null upon logout
    },
  },
});

export const { setStudentId, logoutStudentRedux } = studentSlice.actions;

export default studentSlice.reducer;
