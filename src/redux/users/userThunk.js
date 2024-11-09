import axios from "axios";
const localhostURL = import.meta.env.VITE_BASE_URL
import { createAsyncThunk } from "@reduxjs/toolkit";
import userAxiosInstance from "../../config/axiosConfig";
import { loadStripe } from '@stripe/stripe-js';
import { PublishableKey } from "../../utils/publishKey";

// Registration Thunk
export const registration = createAsyncThunk(
    "userSlice/registration",
    async ({ name, email, password, confirmPass }, { rejectWithValue }) => {
        name = name.trim();
        email = email.trim();
        password = password.trim();
        confirmPass = confirmPass.trim();

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        const passwordStrengthCriteria = {
            minLength: 8,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasNumber: /[0-9]/
        };

        if (name === "" || email === "" || password === "" || confirmPass === "") {
            return rejectWithValue("All the fields are required!");
        } else if (name.length < 3 || name.length > 20) {
            return rejectWithValue("Name must be between 3 to 20 characters and contain only letters!");
        } else if (!emailRegex.test(email)) {
            return rejectWithValue("Invalid email address!");
        }
        else if (password.length < passwordStrengthCriteria.minLength) {
            return rejectWithValue(`Password must be at least ${passwordStrengthCriteria.minLength} characters long!`);
        } else if (!passwordStrengthCriteria.hasUpperCase.test(password)) {
            return rejectWithValue("Password must contain at least one uppercase letter!");
        } else if (!passwordStrengthCriteria.hasLowerCase.test(password)) {
            return rejectWithValue("Password must contain at least one lowercase letter!");
        } else if (!passwordStrengthCriteria.hasNumber.test(password)) {
            return rejectWithValue("Password must contain at least one number!");
        } else if (password !== confirmPass) {
            return rejectWithValue("Password and confirm password do not match!");
        }
        else {
            try {
                const response = await axios.post(`${localhostURL}/signup`, { name, email, password });
                if (response.data.message === "User already exists") {
                    return rejectWithValue("User already exists");
                } else {
                    await localStorage.setItem("timer", response.data.validity);
                    return { validity: response.data.validity, msg: "OTP sent to your email" };
                }
            } catch (error) {
                return rejectWithValue("Registration failed, try again");
            }
        }
    }
);


export const resendOtp = createAsyncThunk(
    "user/resendOtp",
    async(temperoryEmail, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${localhostURL}/resent-otp`, { emailId: temperoryEmail });
            await localStorage.setItem("timer", response.data.validity);
            return response.data
        } catch (error) {
            return rejectWithValue("Verification failed, try again");
        }
    }
)

export const googleSignUpUser = createAsyncThunk(
    "user/googleSignUpUser",
    async ({ token, password, confirmPass }, { rejectWithValue }) => {

        const passwordStrengthCriteria = {
            minLength: 8,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasNumber: /[0-9]/
        };

        try {
            if (password !== confirmPass) {
                return rejectWithValue("Passwords do not match");
            } else if (password.length < passwordStrengthCriteria.minLength) {
                return rejectWithValue(`Password must be at least ${passwordStrengthCriteria.minLength} characters long!`);
            } else if (!passwordStrengthCriteria.hasUpperCase.test(password)) {
                return rejectWithValue("Password must contain at least one uppercase letter!");
            } else if (!passwordStrengthCriteria.hasLowerCase.test(password)) {
                return rejectWithValue("Password must contain at least one lowercase letter!");
            } else if (!passwordStrengthCriteria.hasNumber.test(password)) {
                return rejectWithValue("Password must contain at least one number!");
            } else {
                const response = await axios.post(`${localhostURL}/google-signup`, { token, password });
                const { accessToken, refreshToken } = response.data.data;

                sessionStorage.setItem("userAccessToken", accessToken);
                localStorage.setItem("userRefreshToken", refreshToken);

                return response.data.data;
            }
        } catch (error) {
            if (error.response.data.message === "Internal server error") {
                return rejectWithValue("Verification failed, try again");
            }
            return rejectWithValue(error.response.data.message);
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


export const googleLoginUser = createAsyncThunk(
    "trainer/googleLoginUser",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${localhostURL}/google-login`, { token })
            if (response.data.success === false) {
                return rejectWithValue(response.data.message);
            } else {
                const { accessToken, refreshToken } = response.data;
                sessionStorage.setItem("userAccessToken", accessToken);
                localStorage.setItem("userRefreshToken", refreshToken);
                return response.data.userData;
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const fetchTrainersData = createAsyncThunk(
    "userSlice/fetchTrainersData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${localhostURL}/fetch-trainers`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch trainers data");
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
    async ({ name, phone, address, gender, password, weight, height, activityLevel, dietary, goals, medicalDetails }, { rejectWithValue }) => {

        name = name.trim();
        phone = phone.trim();
        address = address.trim();
        gender = gender.trim();
        password = password.trim();
        weight = weight.trim();
        height = height.trim();
        activityLevel = activityLevel.trim()
        goals = goals.trim()
        dietary = dietary.trim()
        const phoneRegex = /^\d{10}$/;

        if (password.length < 6) {
            return rejectWithValue("Password must be at least 6 characters long!");
        }
        if (name === "" || phone === "" || address === "" || gender === "" || weight === "" || height === "" || activityLevel === "" || goals === "" || dietary === "") {
            return rejectWithValue("All the fields are required!");
        } else if (!phoneRegex.test(phone)) {
            return rejectWithValue("Invalid phone number. It should be a 10-digit number.");
        } else {
            try {
                const response = await userAxiosInstance.put("/edit-user", { name, phone, address, gender, password, weight, height, activityLevel, goals });
                localStorage.setItem(`userData.name`, name)
                localStorage.setItem(`userData.phone`, phone)
                localStorage.setItem(`userData.address`, address)
                localStorage.setItem(`userData.gender`, gender)
                localStorage.setItem(`userData.weight`, weight)
                localStorage.setItem(`userData.height`, height)
                localStorage.setItem(`userData.activityLevel`, activityLevel)
                localStorage.setItem(`userData.goals`, goals)
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("userAccessToken")
                    return rejectWithValue("Invalid or expired token");
                } else if (error.response && error.response.status === 403) {
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
        const oldPassword = oldPass.trim();
        const newPassword = newPass.trim();

        const passwordStrengthCriteria = {
            minLength: 8,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasNumber: /[0-9]/
        };

        if (oldPassword === "" || newPassword === "") {
            return rejectWithValue("All fields are required!");
        }
        else if (oldPassword === newPassword) {
            return rejectWithValue("Old password and new password cannot be the same!");
        } else if (newPassword.length < passwordStrengthCriteria.minLength) {
            return rejectWithValue(`New password must be at least ${passwordStrengthCriteria.minLength} characters long!`);
        } else if (!passwordStrengthCriteria.hasUpperCase.test(newPassword)) {
            return rejectWithValue("New password must contain at least one uppercase letter!");
        } else if (!passwordStrengthCriteria.hasLowerCase.test(newPassword)) {
            return rejectWithValue("New password must contain at least one lowercase letter!");
        } else if (!passwordStrengthCriteria.hasNumber.test(newPassword)) {
            return rejectWithValue("New password must contain at least one number!");
        }
        else {
            try {
                const responds = await userAxiosInstance.patch("/change-userpass", { oldPassword, newPassword });
                return responds;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    sessionStorage.removeItem("userAccessToken");
                    return rejectWithValue("Unauthorized: Invalid or expired token");
                }
                return rejectWithValue("Update failed, try again");
            }
        }
    }
);



export const addUserDetails = createAsyncThunk(
    "user/addUserDetails",
    async (userDetails, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.put(`${localhostURL}/user-details`, { userDetails: userDetails });
            console.log(response);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);



export const createCheckoutSession = createAsyncThunk(
    'user/createCheckoutSession',
    async ({ trainerId, trainerName, amount, userName }, { rejectWithValue }) => {
        try {
            const stripe = await loadStripe(PublishableKey);
            const response = await userAxiosInstance.post(
                `${localhostURL}/create-checkout-session`,
                {
                    trainerId,
                    trainerName,
                    amount,
                    userName
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const { sessionId } = response.data;

            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                console.error(result.error.message);
                return rejectWithValue(result.error.message);
            }
            console.log("Hellowwwww")
            return result;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserAndTrainer = createAsyncThunk(
    'user/fetchUserAndTrainer',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetch-user-trainer`)
            const { trainersData, userData } = response.data;
            return { trainersData, userData };
        } catch (error) {
            console.error('Error creating checkout session:', error);
            return rejectWithValue(error.message);
        }
    }
)


export const fetchChatMessages = createAsyncThunk(
    'user/fetchChatMessages',
    async ({ userId, trainerId, isSubscribed }, { rejectWithValue }) => {
        try {
            if (!isSubscribed) {
                return rejectWithValue("Please Subscribe!");
            }
            const response = await userAxiosInstance.get(`${localhostURL}/chat/fetchChat`, {
                params: {
                    trainerId: trainerId,
                    userId: userId,
                }
            });
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch chat messages");
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAlreadyChattedTrainer = createAsyncThunk(
    "user/fetchAlreadyChattedTrainer",
    async (alreadyChatted, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.post(`${localhostURL}/getTrainerByIds`, { alreadyChatted });
            if (response.data && response.data.users) {
                localStorage.setItem('alreadyChattedTrainer', JSON.stringify(response.data.users));
                return response.data.users;
            }
            throw new Error("Invalid response data");
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchDeitPlans = createAsyncThunk(
    "user/fetchDeitPlans",
    async ({ trainerId }, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetchDeitPlans`, {
                params: {
                    trainerId: trainerId
                }
            });
            localStorage.setItem('trainerDiet', JSON.stringify(response.data.deit));
            return response.data.deit;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const addReview = createAsyncThunk(
    "user/addReview",
    async ({ trainerId, reviewDetails, curruntRating, reviewCount }, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.post(`${localhostURL}/add-review`, { trainerId, reviewData: reviewDetails, curruntRating, reviewCount })
            console.log("response : ", response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)
export const fetchReviewsByTrainer = createAsyncThunk(
    "user/fetchReviewsByTrainer",
    async ({ trainerId }, { rejectWithValue }) => {
        try {
            console.log(trainerId);
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const inactive = createAsyncThunk(
    "user/inactive",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.put(`${localhostURL}/inactive`, { userId: userId })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const fetchReviewFeedback = createAsyncThunk(
    "user/fetchReviewFeedback",
    async ({ trainerId }, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/get-review`, {
                params: { trainerId: trainerId }
            })
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const fetchSingleTrainer = createAsyncThunk(
    "user/fetchSingleTrainer",
    async ({ trainerId }, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetch-single-trainer`, {
                params: { trainerId: trainerId }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


export const fetchVideos = createAsyncThunk(
    "user/fetchVideos",
    async (trainerId, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetch-trainer-videos`, {
                params: { trainerId: trainerId }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const fetchAllVideos = createAsyncThunk(
    "user/fetchAllVideos",
    async (subcriptionList, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetch-all-videos`, {
                params: { subcriptionList: subcriptionList }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const transactionnHistory = createAsyncThunk(
    "user/transactionnHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/fetch-transaction-history`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)
export const singleVideo = createAsyncThunk(
    "user/singleVideo",
    async (videoUrl, { rejectWithValue }) => {
        try {
            const response = await userAxiosInstance.get(`${localhostURL}/single-video`, { params: { videoUrl: videoUrl } })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }

)