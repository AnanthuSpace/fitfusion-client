import axios from "axios";
import { localhostURL } from "../utils/url";

const adminAxiosInstance = axios.create({
    baseURL: localhostURL 
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("adminAccessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); 
    }
);

export default adminAxiosInstance;
