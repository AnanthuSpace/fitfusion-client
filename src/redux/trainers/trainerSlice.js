import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { trainerRegistration, trainerVerification, trainerLogin, EditVideos, googleLogin, TrainerransactionHistory, googleSignUp, getPersonalVideos, editTrainer, changeTrainerPassword, updateProfilePicture, fetchTrainerProfile, uploadVideo, fetchAlreadyChattedCustomer, AddDietPlan, fetchDeitPlans } from "./trainerThunk";


const trainerData = localStorage.getItem("trainerData") ? JSON.parse(localStorage.getItem("trainerData")) : null;
const dietPlans = localStorage.getItem("dietPlans") ? JSON.parse(localStorage.getItem("dietPlans")) : [];
const alreadyChattedCustomer = localStorage.getItem("alreadyChattedCustomer") ? JSON.parse(localStorage.getItem("alreadyChattedCustomer")) : []

const trainerSlice = createSlice({
    name: "trainerSlice",
    initialState: {
        trainerData: trainerData,
        isLoading: false,
        error: null,
        temperoryEmail: " ",
        diet: dietPlans,
        alreadyChattedCustomer: alreadyChattedCustomer,
    },
    reducers: {
        trainerLogout: (state) => {
            state.trainerData = null;
            sessionStorage.removeItem("trainerAccessToken");
            localStorage.removeItem("trainerRefreshToken");
            localStorage.removeItem('trainerData');
            localStorage.removeItem('dietPlans');
            localStorage.removeItem('alreadyChattedCustomer');
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

            .addCase(googleSignUp.fulfilled, (state, action) => {
                toast.success(action.payload, { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(googleSignUp.rejected, (state, action) => {
                state.error = action.payload;
                console.log(action.payload);
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

            .addCase(googleLogin.fulfilled, (state, action) => {
                state.trainerData = action.payload.trainerData;
                localStorage.setItem('trainerData', JSON.stringify(state.trainerData));
                toast.success("Login successfully", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload || "Authentication failed", { hideProgressBar: true, autoClose: 3000 });
                state.isLoading = false;
            })

            .addCase(editTrainer.rejected, (state, action) => {
                toast.error(action.payload || "Update error", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(editTrainer.fulfilled, (action) => {
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
            })

            .addCase(AddDietPlan.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(AddDietPlan.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Diet added successfully!');
            })
            .addCase(AddDietPlan.rejected, (state) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add Diet';
                toast.error(state.error);
            })

            .addCase(fetchDeitPlans.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDeitPlans.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchDeitPlans.rejected, (state) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add Diet';
                toast.error(state.error);
            })

            .addCase(fetchAlreadyChattedCustomer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAlreadyChattedCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchAlreadyChattedCustomer.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(uploadVideo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadVideo.fulfilled, (state) => {
                state.isLoading = false;
                toast.success("Video upload successfully", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchTrainerProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
                state.trainerData = action.payload
                localStorage.setItem('trainerData', JSON.stringify(state.trainerData));
                state.isLoading = false;
            })
            .addCase(fetchTrainerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getPersonalVideos.fulfilled, (state, action) => {
                state.trainerData = action.payload
                state.isLoading = false;
            })
            .addCase(getPersonalVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(TrainerransactionHistory.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(TrainerransactionHistory.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Failed to fetch history", { hideProgressBar: true, autoClose: 3000 });
            })

            .addCase(EditVideos.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(EditVideos.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Failed to update the video", { hideProgressBar: true, autoClose: 3000 });
            })
    }
})


export const { trainerLogout } = trainerSlice.actions;
export default trainerSlice.reducer;