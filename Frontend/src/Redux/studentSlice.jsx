// src/features/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentId: null,
  membershipType: null,
  ads: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
      state.membershipType = action.payload.membershipType;
    },
    logoutStudentRedux: (state) => {
        state.studentId = null;
        state.membershipType = null; // Set student data to null upon logout
    },
    setAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const { setStudentId, logoutStudentRedux, setAds } = studentSlice.actions;

export default studentSlice.reducer;
