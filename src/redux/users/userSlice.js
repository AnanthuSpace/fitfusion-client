import { createSlice } from "@reduxjs/toolkit";
import { registration, signupVerification, userLogin, loginVerification, editUserData, changeUserPassword, addUserDetails, fetchTrainersData, createCheckoutSession, fetchUserAndTrainer, fetchChatMessages } from "./userThunk";
import { toast } from "sonner";

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
const trainersData = localStorage.getItem("trainersData") ? JSON.parse(localStorage.getItem("trainersData")) : [];


const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: userData,
    isLoading: false,
    error: null,
    temperoryEmail: "",
    trainersData: trainersData,
    chatMessage: {}
  },
  reducers: {
    userLogout: (state) => {
      state.userData = null;
      sessionStorage.removeItem("userAccessToken");
      localStorage.removeItem("userRefreshToken");
      localStorage.removeItem('userData');
      toast.success("Logout successfully", { hideProgressBar: true, autoClose: 3000 });
    },
    setTemporaryData: (state, action) => {
      state.temperoryEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder


      // Registration
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.temperoryEmail = action.meta.arg.email;
        toast.success(action.payload, { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || "Registration failed", { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })


      // Signup verification
      .addCase(signupVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupVerification.fulfilled, (state, action) => {
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(state.userData));
        toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 3000 });
        state.temperoryEmail = ""
        state.isLoading = false;
      })
      .addCase(signupVerification.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || "Verification failed", { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })


      // User Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.temperoryEmail = action.meta.arg.email;
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })


      // Login verification
      .addCase(loginVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginVerification.fulfilled, (state, action) => {
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(state.userData));
        toast.success("Login verification completed successfully", { hideProgressBar: true, autoClose: 3000 });
        state.temperoryEmail = ""
        state.isLoading = false;
      })
      .addCase(loginVerification.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || "Verification failed", { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })


      // Edit user Data
      .addCase(editUserData.rejected, (state, action) => {
        toast.error(action.payload || "Updat error", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        state.userData.name = localStorage.getItem(`userData.name`)
        state.userData.phone = localStorage.getItem(`userData.phone`)
        state.userData.address = localStorage.getItem(`userData.address`)
        state.userData.gender = localStorage.getItem(`userData.gender`)
        toast.success("Update successfully", { hideProgressBar: true, autoClose: 3000 });
      })

      // Change password
      .addCase(changeUserPassword.fulfilled, (state) => {
        toast.success("Password updated successfully", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || "Reset error", { hideProgressBar: true, autoClose: 3000 });
      })


      .addCase(addUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isLoading = false;
        toast.success("User details added successfully", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(addUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        toast.error(action.payload || "Failed to add user details", { hideProgressBar: true, autoClose: 3000 });
      })



      .addCase(fetchTrainersData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainersData.fulfilled, (state, action) => {
        state.trainersData = action.payload;
        localStorage.setItem("trainersData", JSON.stringify(action.payload))
        state.isLoading = false;
      })
      .addCase(fetchTrainersData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })



      .addCase(fetchUserAndTrainer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAndTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("trainersData", JSON.stringify(action.payload.trainersData))
        localStorage.setItem("userData", JSON.stringify(action.payload.userData))
      })
      .addCase(fetchUserAndTrainer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })


      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.isLoading = false;
        toast.success(action.payload || "Payment successfully completed", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Payment failed please try again", { hideProgressBar: true, autoClose: 3000 });
      })



      .addCase(fetchChatMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.chatMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.warning(action.payload || "Verification failed", { hideProgressBar: true, autoClose: 3000 });
      });
  },
});

export const { userLogout, setTemporaryData } = userSlice.actions;
export default userSlice.reducer;
