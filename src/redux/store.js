import { configureStore } from '@reduxjs/toolkit';
import userSlice from './users/userSlice';
import adminSlice from './admin/adminSlice';
import trainerSlice from "./trainers/trainerSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice,
        trainer: trainerSlice,
    }
})

export default store;