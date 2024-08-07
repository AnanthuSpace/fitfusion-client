import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { trainerRegistration, trainerVerification, trainerLogin } from "./trainerThunk";


const trainerData = localStorage.getItem("trainerData") ? JSON.parse(localStorage.getItem("trainerData")) : null;


const trainerSlice = createSlice({
    name: "trainerSlice",
    initialState: {
        trainerData: trainerData,
        isLoading: false,
        error: null,
        temperoryEmail: " ",
    },
    reducers: {
        trainerLogout: (state) => {
            state.userData = null;
            sessionStorage.removeItem("trainerAccessToken");
            localStorage.removeItem("trainerRefreshToken");
            localStorage.removeItem('trainerData');
            toast.error("Logout successfully", { hideProgressBar: true, autoClose: 3000 });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(trainerRegistration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trainerRegistration.fulfilled, (state, action) => {
                state.temperoryEmail = action.meta.arg.email;
                toast.success(action.payload, { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(trainerRegistration.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Registration failed", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })


            // Signup verification
            .addCase(trainerVerification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trainerVerification.fulfilled, (state, action) => {
                localStorage.setItem('userData', JSON.stringify(state.userData));
                toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(trainerVerification.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Verification failed", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })

            .addCase(trainerLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trainerLogin.fulfilled, (state, action) => {
                state.trainerData = action.payload.trainerData;
                localStorage.setItem('trainerData', JSON.stringify(state.trainerData));
                toast.success("Login successfully", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(trainerLogin.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Authentication failed", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
              })
    }
})


export const { trainerLogout } = trainerSlice.actions;
export default trainerSlice.reducer;