import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const registration = createAsyncThunk(
    "userSlice/registration",
    async ({ name, email, password, confirmPass, toast }, { rejectWithValue }) => {
        name = name.trim();
        email = email.trim();
        password = password.trim();
        confirmPass = confirmPass.trim();

        const nameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (name === "" || email === "" || password === "" || confirmPass === "") {
            toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("All the fields are required!");
        } else if (!nameRegex.test(name)) {
            toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("Name must be between 3 to 20 characters and contain only letters!");
        } else if (!emailRegex.test(email)) {
            toast.warning("Invalid email address!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("Invalid email address!");
        } else if (password.length < 6) {
            toast.warning("Password must be at least 6 characters long!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("Password must be at least 6 characters long!");
        } else if (password !== confirmPass) {
            toast.warning("Password and confirm password do not match!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("Password and confirm password do not match!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/signup`, { name, email, password });
                if (response.data === "UserExist") {
                    toast.error("User already exist", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("User already exist");
                } else {
                    toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 2500 });
                    return "success";
                }
            } catch (error) {
                toast.error("Registration failed", { hideProgressBar: true, autoClose: 2500 });
                return rejectWithValue("Registration failed");
            }
        }
    }
);

export const signupVerification = createAsyncThunk(
    "userSlice/signupVerification",

    async ({ completeOtp, toast }) => {
        console.log("Thunk", completeOtp);
        if (completeOtp.length < 4) {
            toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("All the fields are required!");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/verify`, { completeOtp });
                toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 2500 });
                return "success";
            } catch (error) {
                toast.error("Veification failed try again", { hideProgressBar: true, autoClose: 2500 });
                return rejectWithValue("Registration failed");
            }
        }
    }
)
