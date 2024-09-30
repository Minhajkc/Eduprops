// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';


const persistedState = localStorage.getItem('ads') 
  ? { student: { ads: JSON.parse(localStorage.getItem('ads')) } } 
  : {};

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  preloadedState: persistedState,  
});

export default store;
