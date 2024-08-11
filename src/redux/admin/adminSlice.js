import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminLogin, handleBlockTrainer, handleUnblockTrainer,handleBlockUser, handleUnblockUser } from "./adminThunk";

const usersData = localStorage.getItem("usersData") ? JSON.parse(localStorage.getItem("usersData")) : [];
const trainersData = localStorage.getItem("trainersData") ? JSON.parse(localStorage.getItem("trainersData")) : [];

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        usersData: usersData,
        trainersData: trainersData,
        error: null,
    },
    reducers: {
        adminLogout: (state) => {
            sessionStorage.removeItem("adminAccessToken");
            localStorage.removeItem("adminRefreshToken");
            state.usersData = [];
            state.trainersData = [];
            toast.error("Logged out successfully", { hideProgressBar: true, autoClose: 3000 });
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
                console.log("action : ",action);
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
                console.log("action : ",action);
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
            });
    }
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

