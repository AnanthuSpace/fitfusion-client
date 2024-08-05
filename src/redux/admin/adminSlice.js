import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminLogin } from "./adminThunk";

const usersData = localStorage.getItem("usersData")
    ? JSON.parse(localStorage.getItem("usersData"))
    : null;

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        usersData: usersData,
        error: null,
    },
    reducers: {
        adminLogout: (state) => {
            sessionStorage.removeItem("adminAccessToken");
            localStorage.removeItem("adminRefreshToken");
            toast.error("Logout successfully", { hideProgressBar: true, autoClose: 3000 });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.fulfilled, (state) => {
                toast.success("Login successfully", { hideProgressBar: true, autoClose: 3000 });
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log(action)
                toast.error(action.payload || "Login failed", { hideProgressBar: true, autoClose: 3000 });
            });
    }
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
