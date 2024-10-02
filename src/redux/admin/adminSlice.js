import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { adminLogin, handleBlockTrainer, handleUnblockTrainer, handleBlockUser, handleUnblockUser, verifyTrainer, fetchUser, fetchTrainers, fetchIndividualTrainer } from "./adminThunk";

const usersDataString = localStorage.getItem("usersData");
const usersData = usersDataString ? JSON.parse(usersDataString) : [];

const trainersDataString = localStorage.getItem("trainersData");
const trainersData = trainersDataString ? JSON.parse(trainersDataString) : [];

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        usersData: usersData,
        trainersData: trainersData,
        error: null,
        isLoading: false,
    },
    reducers: {
        adminLogout: (state) => {
            sessionStorage.removeItem("adminAccessToken");
            localStorage.removeItem("adminRefreshToken");
            state.usersData = [];
            state.trainersData = [];
            toast.success("Logged out successfully", { hideProgressBar: true, autoClose: 3000 });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.usersData = action.payload.usersData;
                state.trainersData = action.payload.trainersData;
                toast.success("Login successful!", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.error = action.payload || "Login failed";
                toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(handleBlockTrainer.fulfilled, (state, action) => {
                const updatedTrainerId = action.payload.trainerId;
                state.trainersData = state.trainersData.map((trainer) =>
                    trainer.trainerId === updatedTrainerId
                        ? { ...trainer, isBlocked: true }
                        : trainer
                );
                toast.success("Trainer blocked successfully", { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(handleBlockTrainer.rejected, (state, action) => {
                console.log("action : ", action);
                state.error = action.payload || "Something went wrong while blocking the trainer";
                toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(handleUnblockTrainer.fulfilled, (state, action) => {
                const updatedTrainerId = action.payload.trainerId;
                state.trainersData = state.trainersData.map((trainer) =>
                    trainer.trainerId === updatedTrainerId
                        ? { ...trainer, isBlocked: false }
                        : trainer
                );
                toast.success("Trainer unblocked successfully", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(handleUnblockTrainer.rejected, (state, action) => {
                state.error = action.payload || "Something went wrong while unblocking the trainer";
                toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(handleBlockUser.fulfilled, (state, action) => {
                const updatedUserId = action.payload.userId;
                state.usersData = state.usersData.map((user) =>
                    user.userId === updatedUserId
                        ? { ...user, isBlocked: true }
                        : user
                );
                toast.success("Trainer blocked successfully", { hideProgressBar: true, autoClose: 3000 });
            })


            .addCase(handleBlockUser.rejected, (state, action) => {
                console.log("action : ", action);
                state.error = action.payload || "Something went wrong while blocking the trainer";
                toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
            })



            .addCase(handleUnblockUser.fulfilled, (state, action) => {
                const updatedUserId = action.payload.userId;
                state.usersData = state.usersData.map((user) =>
                    user.userId === updatedUserId
                        ? { ...user, isBlocked: false }
                        : user
                );
                toast.success("Trainer unblocked successfully", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(handleUnblockUser.rejected, (state, action) => {
                state.error = action.payload || "Something went wrong while unblocking the trainer";
                toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
            })

            .addCase(verifyTrainer.pending, (state, action) => {
                state.isLoading = true;
            })

            .addCase(verifyTrainer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainersData = state.trainersData.map((trainer) =>
                    trainer.trainerId === action.payload.trainerId
                        ? { ...trainer, verified: action.payload.isVerified }
                        : trainer
                );
            })
            .addCase(verifyTrainer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchTrainers.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchTrainers.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Error while fetching load the trainers", { hideProgressBar: true, autoClose: 3000 })
            })

            .addCase(fetchUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Error while fetching load the users", { hideProgressBar: true, autoClose: 3000 })
            })

            .addCase(fetchIndividualTrainer.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchIndividualTrainer.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Error while fetching load the users", { hideProgressBar: true, autoClose: 3000 })
            })
    }
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

