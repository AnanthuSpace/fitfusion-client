import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { trainerRegistration, trainerVerification, trainerLogin, editTrainer, changeTrainerPassword, updateProfilePicture } from "./trainerThunk";


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
                console.log("Action : ",action.payload);
                toast.success(action.payload.message, { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(changeTrainerPassword.fulfilled, (state) => {
                toast.success("Password updated successfully", { hideProgressBar: true, autoClose: 3000 });
              })
              .addCase(changeTrainerPassword.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Reset error", { hideProgressBar: true, autoClose: 3000 });
              })


              .addCase(updateProfilePicture.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainerData.profileIMG = action.payload
                localStorage.setItem("trainerData.profileIMG", JSON.stringify(action.payload));
                toast.success('Profile picture updated successfully!');
              })
              .addCase(updateProfilePicture.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update profile picture';
                toast.error(state.error);
              });
    }
})


export const { trainerLogout } = trainerSlice.actions;
export default trainerSlice.reducer;