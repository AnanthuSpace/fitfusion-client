import { createSlice } from "@reduxjs/toolkit";
import { registration, signupVerification, userLogin, forgotOtpUser, unsubscribeTrainer, googleSignUpUser,resendOtp, singleVideo, googleLoginUser, transactionnHistory, editUserData, fetchVideos, fetchDeitPlans, fetchFilteredVideos, fetchSingleTrainer, fetchReviewFeedback, inactive, addReview, changeUserPassword, fetchAlreadyChattedTrainer, addUserDetails, fetchTrainersData, createCheckoutSession, fetchUserAndTrainer, fetchChatMessages } from "./userThunk";
import { toast } from "sonner";

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
const trainersData = localStorage.getItem("trainersData") ? JSON.parse(localStorage.getItem("trainersData")) : [];
const alreadyChattedTrainer = localStorage.getItem("alreadyChattedTrainer") ? JSON.parse(localStorage.getItem("alreadyChattedTrainer")) : []
const trainerDiet = localStorage.getItem("trainerDiet") ? JSON.parse(localStorage.getItem("trainerDiet")) : {}

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: userData,
    isLoading: false,
    error: null,
    temperoryEmail: "",
    trainersData: trainersData,
    alreadyChattedTrainer: alreadyChattedTrainer,
    trainerDiet: trainerDiet,
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
        toast.success(action.payload.msg, { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload;
        if (action.payload == "User already exists" || action.payload == "User already exists" || action.payload == "Registration failed, try again" || action.payload == "All the fields are required!") {
          toast.error(action.payload || "Registration failed", { hideProgressBar: true, autoClose: 3000 });
        }
        state.isLoading = false;
      })

      .addCase(resendOtp.fulfilled, (state, action) => {
        toast.success(action.payload.message, { hideProgressBar: true, autoClose: 3000 })
      })
      .addCase(resendOtp.rejected, (state, action)=> {
        state.error = action.payload
        toast.error(action.payload.message, { hideProgressBar: true, autoClose: 3000 })
      })

      .addCase(forgotOtpUser.fulfilled, (state, action) => {
        toast.success(action.payload.message, { hideProgressBar: true, autoClose: 3000 })
      })
      .addCase(forgotOtpUser.rejected, (state, action)=> {
        state.error = action.payload
        toast.error(action.payload.message, { hideProgressBar: true, autoClose: 3000 })
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

      .addCase(googleSignUpUser.fulfilled, (state, action) => {
        state.userData = action.payload.result;
        localStorage.setItem('userData', JSON.stringify(state.userData));
        toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(googleSignUpUser.rejected, (state, action) => {
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
        // state.temperoryEmail = action.meta.arg.email;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload));
        toast.success("Login verification completed successfully", { hideProgressBar: true, autoClose: 3000 });
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        toast.error(state.error, { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(state.userData));
        toast.success("Login verification completed successfully", { hideProgressBar: true, autoClose: 3000 });
        state.temperoryEmail = ""
        state.isLoading = false;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || "Login failed", { hideProgressBar: true, autoClose: 3000 });
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
      })

      .addCase(fetchAlreadyChattedTrainer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlreadyChattedTrainer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAlreadyChattedTrainer.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchDeitPlans.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDeitPlans.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchDeitPlans.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addReview.pending, (state) => {
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Review added successfully", { hideProgressBar: true, autoClose: 3000 });
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to add review", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(inactive.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(inactive.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to add review", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(fetchReviewFeedback.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchReviewFeedback.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to add review", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(fetchSingleTrainer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleTrainer.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to add review", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(fetchVideos.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch videos", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(fetchFilteredVideos.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilteredVideos.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch videos", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(transactionnHistory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(transactionnHistory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch history", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(unsubscribeTrainer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(unsubscribeTrainer.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch history", { hideProgressBar: true, autoClose: 3000 });
      })

      .addCase(singleVideo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(singleVideo.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch video", { hideProgressBar: true, autoClose: 3000 });
      })


  },
});

export const { userLogout, setTemporaryData } = userSlice.actions;
export default userSlice.reducer;
