import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
                console.log(response);
                
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
                console.log( temperoryEmail)
                const response = await axios.post(`${localhostURL}/trainer/verify`, { completeOtp, temperoryEmail });
                if (response.data.message === "OTP verified") {
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
    async ({ email, password }, { rejectWithValue }) => {
        try {
            email = email.trim()
            password = password.trim()
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                return rejectWithValue("Please enter a valid email address");
            } else if (password.length < 6) {
                return rejectWithValue("Password must be at least 6 characters long!");
            }
            
            const response = await axios.post(`${localhostURL}/trainer/login`, { email, password });
            
            if (response.data.success === false) {
                return rejectWithValue(response.data.message);
            } else {
                const { accessToken, refreshToken } = response.data;
                sessionStorage.setItem("trainerAccessToken", accessToken);
                localStorage.setItem("trainerRefreshToken", refreshToken);
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const editTrainer = createAsyncThunk(
    "trainerSlice/editTrainer",
    async ({ name, phone, address, gender, qualification, achivements  }, { rejectWithValue }) => {

        name = name.trim();
        phone = phone.trim();
        address = address.trim();
        gender = gender.trim();
        qualification = qualification.trim();
        achivements = achivements.trim();
        
        const phoneRegex = /^\d{10}$/;
        
        if (name === "" || phone === "" || address === "" || gender === "" || achivements === "" || qualification === "") {
            return rejectWithValue("All the fields are required!");
        } else if (!phoneRegex.test(phone)) {
            return rejectWithValue("Invalid phone number. It should be a 10-digit number.");
        } else {
            try {
                
                const response = await trainerAxiosInstance.put("/trainer/edit-trainer", { name, phone, address, gender, qualification, achivements });
                console.log("start", response);
                sessionStorage.setItem(`trainerData.name`, name)
                sessionStorage.setItem(`trainerData.phone`, phone)
                sessionStorage.setItem(`trainerData.address`, address)
                sessionStorage.setItem(`trainerData.gender`, gender)
                sessionStorage.setItem(`trainerData.qualification`, qualification)
                sessionStorage.setItem(`trainerData.achivements`, achivements)
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("trainerAccessToken")
                    return rejectWithValue("Invalid or expired token");
                } else if (error.response && error.response.status === 403){
                    return rejectWithValue("Invalid password");
                }
                return rejectWithValue("Update failed, try again");
            }
        }
    }

);