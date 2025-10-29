import { configureStore } from '@reduxjs/toolkit';
import authReducer from './pages/reducer/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;