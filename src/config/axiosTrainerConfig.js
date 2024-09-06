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
        console.error("Request error:", error);
        return Promise.reject(error); 
    }
);

trainerAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem("trainerRefreshToken");
            if (refreshToken) {
                try {
                    const response = await axios.post(`${localhostURL}/auth/refresh-token`, { refreshToken });
                    const newAccessToken = response.data.accessToken;

                    sessionStorage.setItem("trainerAccessToken", newAccessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error("Token refresh error:", refreshError);
                    sessionStorage.removeItem("trainerAccessToken");
                    sessionStorage.removeItem("trainerRefreshToken");
                    return Promise.reject(refreshError);
                }
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default trainerAxiosInstance;
