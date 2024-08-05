import { configureStore } from '@reduxjs/toolkit';
import userSlice from './users/userSlice';
import adminSlice from './admin/adminSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice
    }
})

export default store;