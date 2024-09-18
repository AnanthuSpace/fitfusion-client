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
                console.log(temperoryEmail)
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
    async ({ name, phone, address, gender, qualification, achivements, feePerMonth, experience }, { rejectWithValue }) => {
        name = name.trim();
        phone = phone.trim();
        address = address.trim();
        gender = gender.trim();
        qualification = qualification.trim();
        achivements = achivements.trim();
        feePerMonth = feePerMonth.trim();
        experience = experience.trim();
        const phoneRegex = /^\d{10}$/;
        if (name === "" || phone === "" || address === "" || gender === "" || achivements === "" || qualification === "" || feePerMonth === "" || experience === "") {
            return rejectWithValue("All fields are required!");
        } else if (!phoneRegex.test(phone)) {
            return rejectWithValue("Invalid phone number. It should be a 10-digit number.");
        } else {
            try {
                console.log("wrking");
                const response = await trainerAxiosInstance.put(`${localhostURL}/trainer/edit-trainer`, {
                    name,
                    phone,
                    address,
                    gender,
                    qualification,
                    achivements,
                    feePerMonth,
                    experience
                });
                localStorage.setItem(`trainerData.name: `, name)
                localStorage.setItem(`trainerData.phone: `, phone)
                localStorage.setItem(`trainerData.address: `, address)
                localStorage.setItem(`trainerData.gender: `, gender)
                localStorage.setItem(`trainerData.qualification: `, qualification)
                localStorage.setItem(`trainerData.achivements: `, achivements)
                localStorage.setItem(`trainerData.feePerMonth: `, feePerMonth)
                localStorage.setItem(`trainerData.experience: `, experience)
                return response.data
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("trainerAccessToken");
                    return rejectWithValue("Invalid or expired token");
                } else if (error.response && error.response.status === 403) {
                    return rejectWithValue("Invalid password");
                }
                return rejectWithValue("Update failed, try again");
            }
        }
    }
);

export const changeTrainerPassword = createAsyncThunk(
    "trainerSlice/changeTrainerPassword",
    async ({ oldPass, newPass }, { rejectWithValue }) => {
        const oldPassword = oldPass.trim();
        const newPassword = newPass.trim();
        if (oldPassword === "" || newPassword === "") {
            return rejectWithValue("All fields are required!");
        } else if (oldPassword === newPassword) {
            return rejectWithValue("Old password and new password cannot be the same!");
        } else if (oldPassword.length < 6) {
            return rejectWithValue("Enter the correct old password");
        } else if (newPassword.length < 6) {
            return rejectWithValue("New password must be at least 6 characters long!");
        } else {
            try {
                const response = await trainerAxiosInstance.patch(`${localhostURL}/trainer/change-trainerpass`, { oldPassword, newPassword });
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("userAccessToken");
                    return rejectWithValue("Unauthorized: Invalid or expired token");
                }
                return rejectWithValue(error.response?.data?.message || "Update failed, try again");
            }
        }
    }
);

export const requestOtp = createAsyncThunk(
    'trainer/requestOtp',
    async (email, { rejectWithValue }) => {
        try {
            email = email.trim()
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (email === "") {
                return rejectWithValue("Email Required")
            } else if (!emailRegex.test(email)) {
                return rejectWithValue("Invalid email address!");
            }
            const response = await axios.post(`${localhostURL}/trainer/request-otp`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfilePicture = createAsyncThunk(
    'trainer/updateProfilePicture',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('profileImage', file);
            const response = await trainerAxiosInstance.put(`${localhostURL}/trainer/profile-picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.profileImage);

            return response.data.profileImage;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchDeitPlans = createAsyncThunk(
    'trainer/fetchDeitPlans',
    async () => {
        try {
            const diets = await trainerAxiosInstance.get(`${localhostURL}/trainer/fetch-deit`)
            localStorage.setItem("dietPlans", JSON.stringify(diets.data.diet))
            return diets
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const AddDietPlan = createAsyncThunk(
    'trainer/AddDietPlan',
    async ({ dietPlan }, { rejectWithValue }) => {
        try {
            const response = await trainerAxiosInstance.post(`${localhostURL}/trainer/add-diet`, { dietPlan });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchAlreadyChattedCustomer = createAsyncThunk(
    "trainer/fetchAlreadyChattedCustomer",
    async (alreadyChatted, { rejectWithValue }) => {
        try {
            const response = await trainerAxiosInstance.post(`${localhostURL}/trainer/getUsersByIds`, { alreadyChatted });
            if (response.data && response.data.users) {
                localStorage.setItem('alreadyChattedCustomer', JSON.stringify(response.data.users));
                return response.data.users;
            }
            throw new Error("Invalid response data");
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const uploadVideo = createAsyncThunk(
    "trainers/uploadVideo",
    async (videoData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("title", videoData.title);
            formData.append("description", videoData.description);
            formData.append("videoFile", videoData.videoFile);
            formData.append("thumbnail", videoData.thumbnail);
            
            const response = await trainerAxiosInstance.put(`${localhostURL}/trainer/upload-video`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTrainerProfile = createAsyncThunk(
    "trainers/fetchTrainerProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await trainerAxiosInstance.get(`${localhostURL}/trainer/get-profile`)
            console.log(`trainerData.profileIMG: `, response.data.result)
            return response.data.result
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)