import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import trainerAxiosInstance from "../../config/axiosTrainerConfig"


// Registration Thunk
export const trainerRegistration = createAsyncThunk(
    "trainerSlice/trainerRegistration",
    async ({ name, email, password, confirmPass }, { rejectWithValue }) => {
        name = name.trim();
        email = email.trim();
        password = password.trim();
        confirmPass = confirmPass.trim();
        

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (name === "" || email === "" || password === "" || confirmPass === "") {
            console.log("trigerd");
            return rejectWithValue("All the fields are required!");
        } else if (name.length < 3 || name.length > 20) {
            return rejectWithValue("Name must be between 3 to 20 characters and contain only letters!");
        } else if (!emailRegex.test(email)) {
            return rejectWithValue("Invalid email address!");
        } else if (password.length < 6) {
            return rejectWithValue("Password must be at least 6 characters long!");
        } else if (password !== confirmPass) {
            return rejectWithValue("Password and confirm password do not match!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/trainer/signup`, { name, email, password });
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

export const trainerVerification = createAsyncThunk(
    "trainerSlice/trainerVerification",
    async ({ completeOtp, temperoryEmail }, { rejectWithValue }) => {
        if (completeOtp.length < 4) {
            return rejectWithValue("All the fields are required!");
        } else {
            try {
                console.log("Fronend : ", temperoryEmail)
                const response = await axios.post(`${localhostURL}/trainer/verify`, { completeOtp, temperoryEmail });
                if (response.data.message === "OTP verified") {
                    console.log(response.data)
                    const { accessToken, refreshToken } = response.data;
                    sessionStorage.setItem("trainerAccessToken", accessToken);
                    localStorage.setItem("trainerRefreshToken", refreshToken);
                    return response.data.trainerData;
                } else {
                    return rejectWithValue(response.data.message);
                }
            } catch (error) {
                return rejectWithValue("Verification failed, try again");
            }
        }
    }
);

export const trainerLogin = createAsyncThunk(
    "trainerSlice/trainerLogin",
    async({email, password}, { rejectWithValue}) => {
        try {
            email = email.trim()
            password = password.trim()

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                return rejectWithValue("Please enter a valid email address");
            } else if(password.length < 6){
                return rejectWithValue("Password must be at least 6 characters long!");
            }

            const response = await axios.post(`${localhostURL}/trainer/login`, { email, password });
            if (response.data.success === false) {
                return rejectWithValue("Invalid email and password");
            } else {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)