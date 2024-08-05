import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAction, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import adminAxiosInstance from "../../config/axiosAdminConfig";


export const adminLogin = createAsyncThunk(
    "adminSlice/adminLogin",
    async({ username, password }, {rejectWithValue}) => {
        username = username.trim();
        password = password.trim();
        console.log(password);
        
        if(username === "" || password === ""){
            return rejectWithValue("All the fields are required!");
        } else if (password.length < 6){
            return rejectWithValue("Password must be at least 6 characters long!");
        } else {
            const respones = await axios.post(`${localhostURL}/admin`, {username,password})
            sessionStorage.setItem("adminAccessToken", respones.data.accessToken)
            localStorage.setItem("adminRefreshToken", respones.data.refreshToken)
        }
    }
)