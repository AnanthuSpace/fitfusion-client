import axios from "axios";
import { localhostURL } from "../utils/url";

const userAxiosInstance = axios.create({
    baseURL: localhostURL 
});

userAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("userAccessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); 
    }
);

export default userAxiosInstance;
