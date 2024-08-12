import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { trainerRegistration, trainerVerification, trainerLogin, editTrainer, changeTrainerPassword } from "./trainerThunk";


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
            state.trainerData = null;
            sessionStorage.removeItem("trainerAccessToken");
            localStorage.removeItem("trainerRefreshToken");
            localStorage.removeItem('trainerData');
            toast.success("Logout successfully", { hideProgressBar: true, autoClose: 3000 });
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
                state.trainerData = action.payload;
                localStorage.setItem('trainerData', JSON.stringify(state.trainerData));
                toast.success(action.payload, { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(trainerVerification.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload, { hideProgressBar: true, autoClose: 3000 });
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



            .addCase(editTrainer.rejected, (state, action) => {
                toast.error(action.payload || "Updat error", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(editTrainer.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.trainerData.name = sessionStorage.getItem(`trainerData.name`)
                state.trainerData.phone = sessionStorage.getItem(`trainerData.phone`)
                state.trainerData.address = sessionStorage.getItem(`trainerData.address`)
                state.trainerData.gender = sessionStorage.getItem(`trainerData.gender`)
                state.trainerData.qualification = sessionStorage.getItem(`trainerData.qualification`)
                state.trainerData.achivements = sessionStorage.getItem(`trainerData.achivements`)
                toast.success(action.payload.message, { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(changeTrainerPassword.fulfilled, (state) => {
                toast.success("Password updated successfully", { hideProgressBar: true, autoClose: 3000 });
              })
              .addCase(changeTrainerPassword.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Reset error", { hideProgressBar: true, autoClose: 3000 });
              });
    }
})


export const { trainerLogout } = trainerSlice.actions;
export default trainerSlice.reducer;