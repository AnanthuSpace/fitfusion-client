import { configureStore } from '@reduxjs/toolkit';
import userSlice from './users/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export default store;