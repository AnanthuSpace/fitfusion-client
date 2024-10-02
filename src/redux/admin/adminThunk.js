import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import adminAxiosInstance from "../../config/axiosAdminConfig";

export const adminLogin = createAsyncThunk(
  "adminSlice/adminLogin",
  async ({ username, password }, { rejectWithValue }) => {
    username = username.trim();
    password = password.trim();
    console.log(password);

    if (username === "" || password === "") {
      return rejectWithValue("All the fields are required!");
    } else if (password.length < 6) {
      return rejectWithValue("Password must be at least 6 characters long!");
    } else {
      try {
        const response = await axios.post(`${localhostURL}/admin`, { username, password });

        const { accessToken, refreshToken, trainersData, usersData } = response.data;


        sessionStorage.setItem("adminAccessToken", accessToken);
        localStorage.setItem("adminRefreshToken", refreshToken);
        localStorage.setItem("usersData", JSON.stringify(usersData));

        return response.data;
      } catch (error) {
        return rejectWithValue("Login failed. Please try again.");
      }
    }
  }
);

export const handleBlockTrainer = createAsyncThunk(
  "admin/handleBlockTrainer",
  async ({ trainerId }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.patch(`${localhostURL}/admin/trainer-block`, { trainerId });
      return { data: response.data, trainerId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleUnblockTrainer = createAsyncThunk(
  "admin/handleUnblockTrainer",
  async ({ trainerId }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.patch(`${localhostURL}/admin/trainer-unblock`, { trainerId });
      return { data: response.data, trainerId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleBlockUser = createAsyncThunk(
  "admin/handleBlockUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.patch(`${localhostURL}/admin/user-block`, { userId });
      return { data: response.data, userId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleUnblockUser = createAsyncThunk(
  "admin/handleUnblockUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.patch(`${localhostURL}/admin/user-unblock`, { userId });
      return { data: response.data, userId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const verifyTrainer = createAsyncThunk(
  "admin/verifyTrainer",
  async ({ trainerId, isVerified, reason }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.patch(`${localhostURL}/admin/isverify`, { trainerId, isVerified, reason })
      console.log(response.data);

      return { data: response.data, trainerId, isVerified };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchTrainers = createAsyncThunk(
  "admin/fetchTrainers",
  async (newPage, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get(`${localhostURL}/admin/loadtrainer`, { params: { page: newPage } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchUser = createAsyncThunk(
  "admin/fetchUser",
  async (newPage, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get(`${localhostURL}/admin/loadusers`, { params: { page: newPage } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchIndividualTrainer = createAsyncThunk(
  "admin/fetchIndividualTrainer",
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get(`${localhostURL}/admin/get-individual-trainers`, { params: { trainerId: trainerId } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchDataForDashboard = createAsyncThunk(
  "admin/fetchDataForDashboard",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get(`${localhostURL}/admin/fetch-all`, { params: { startDate: startDate, endDate: endDate } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchNewUsersAndTrainers = createAsyncThunk(
  "admin/fetchNewUsersAndTrainers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get(`${localhostURL}/admin/find-user-trainer`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
