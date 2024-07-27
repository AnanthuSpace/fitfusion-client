import { createSlice } from "@reduxjs/toolkit";
import { registration, signupVerification } from "./userThunk";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // Registration
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // signup verification
            .addCase(signupVerification.pending, (state) => {
                // state.isLoading = true
            })
            .addCase(signupVerification.fulfilled, (state) => {
                // state.isLoading = false
            })
            .addCase(signupVerification.rejected, (state) => {
                // state.isLoading = false
                state.error = action.error.message;
            })
    },
});

export default userSlice.reducer;
