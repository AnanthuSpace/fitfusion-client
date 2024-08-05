import axios from "axios";
import { localhostURL } from "../utils/url";

const trainerAxiosInstance = axios.create({
    baseURL: localhostURL 
});

trainerAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("trainerAccessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); 
    }
);

export default trainerAxiosInstance;
