import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


// Registration Thunk
export const registration = createAsyncThunk(
    "userSlice/registration",
    async ({ name, email, password, confirmPass }, { rejectWithValue }) => {
        name = name.trim();
        email = email.trim();
        password = password.trim();
        confirmPass = confirmPass.trim();

        const nameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (name === "" || email === "" || password === "" || confirmPass === "") {
            return rejectWithValue("All the fields are required!");
        } else if (!nameRegex.test(name)) {
            return rejectWithValue("Name must be between 3 to 20 characters and contain only letters!");
        } else if (!emailRegex.test(email)) {
            return rejectWithValue("Invalid email address!");
        } else if (password.length < 6) {
            return rejectWithValue("Password must be at least 6 characters long!");
        } else if (password !== confirmPass) {
            return rejectWithValue("Password and confirm password do not match!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/signup`, { name, email, password });
                if (response.data.message === "User already exists") {
                    return rejectWithValue("User already exists");
                } else {
                    return "OTP sent to your email";
                }
            } catch (error) {
                return rejectWithValue("Registration failed, try again");
            }
        }
    }
);

// Signup Verification Thunk
export const signupVerification = createAsyncThunk(
    "userSlice/signupVerification",
    async ({ completeOtp, temperoryEmail }, { rejectWithValue }) => {
        if (completeOtp.length < 4) {
            return rejectWithValue("All the fields are required!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/verify`, { completeOtp, temperoryEmail });
                if (response.data.message === "OTP verified") {
                    return response.data.userData;
                } else {
                    return rejectWithValue(response.data.message);
                }
            } catch (error) {
                return rejectWithValue("Verification failed, try again");
            }
        }
    }

);

// User Login
export const userLogin = createAsyncThunk(
    "userSlice/userLogin",
    async ({ email }, { rejectWithValue }) => {
      try {
        email = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          return rejectWithValue("Please enter a valid email address");
        }
  
        const response = await axios.post(`${localhostURL}/login`, { email });
        if (response.data.success === false) {
          return rejectWithValue("Invalid email");
        } else {
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


export const loginVerification = createAsyncThunk(
    "userSlice/loginVerification",
    async ({ completeOtp, temperoryEmail }, { rejectWithValue }) => {
        if (completeOtp.length < 4) {
            return rejectWithValue("All the fields are required!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/login-verify`, { completeOtp, temperoryEmail });
                if (response.data.message === "OTP verified") {
                    return response.data.userData;
                } else {
                    return rejectWithValue(response.data.message);
                }
            } catch (error) {
                return rejectWithValue("Verification failed, try again");
            }
        }
    }
)
