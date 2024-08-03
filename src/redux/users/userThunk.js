import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userAxiosInstance from "../../config/axiosConfig";


// Registration Thunk
export const registration = createAsyncThunk(
    "userSlice/registration",
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
                    console.log(response.data)
                    const { accessToken, refreshToken } = response.data;
                    sessionStorage.setItem("userAccessToken", accessToken);
                    localStorage.setItem("userRefreshToken", refreshToken);
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
                    console.log(response.data)
                    const { accessToken, refreshToken } = response.data;
                    sessionStorage.setItem("userAccessToken", accessToken);
                    localStorage.setItem("userRefreshToken", refreshToken);
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


// Edit user data
export const editUserData = createAsyncThunk(
    "userSlice/editUserData",
    async ({ name, phone, address, gender, password }, { rejectWithValue }) => {

        name = name.trim();
        phone = phone.trim();
        address = address.trim();
        gender = gender.trim();
        password = password.trim();
        const phoneRegex = /^\d{10}$/;

        if(password.length < 6){
            return rejectWithValue("Password must be at least 6 characters long!");
        }
        // console.log(password)
        // const result = await userAxiosInstance.post("/verify-password", {password})
        if (name === "" || phone === "" || address === "" || gender === "") {
            return rejectWithValue("All the fields are required!");
        } else if (!phoneRegex.test(phone)) {
            return rejectWithValue("Invalid phone number. It should be a 10-digit number.");
        } else {
            try {
                const response = await userAxiosInstance.put("/edit-user", { name, phone, address, gender, password });
                sessionStorage.setItem(`userData.name`, name)
                sessionStorage.setItem(`userData.phone`, phone)
                sessionStorage.setItem(`userData.address`, address)
                sessionStorage.setItem(`userData.gender`, gender)
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("userAccessToken")
                    return rejectWithValue("Invalid or expired token");
                } else if (error.response && error.response.status === 403){
                    return rejectWithValue("Invalid password");
                }
                return rejectWithValue("Update failed, try again");
            }
        }
    }

);


export const changeUserPassword = createAsyncThunk(
    "userSlice/changeUserPassword",
    async ({ oldPass, newPass }, { rejectWithValue }) => {
        const oldPassword = oldPass.trim()
        const newPassword = newPass.trim()

        if (oldPassword === "" || newPassword === "") {
            return rejectWithValue("All the fields are required!");
        } else if (oldPassword === newPassword) {
            return rejectWithValue("Old password and new password cannot be the same!");
        } else if (oldPassword.length < 6) {
            return rejectWithValue("Enter the correct old password")
        } else if (newPassword.length < 6) {
            return rejectWithValue("New password must be at least 6 characters long!");
        } else {
            try {
                const responds = await userAxiosInstance.patch("/change-userpass", { oldPassword, newPassword })
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("userAccessToken")
                    return rejectWithValue("Unauthorized: Invalid or expired token");
                }
                return rejectWithValue("Update failed, try again");
            }
        }
    }
);
