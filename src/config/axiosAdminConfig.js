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

adminAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = sessionStorage.getItem("adminRefreshToken");

            try {
                const response = await axios.post(`${localhostURL}/auth/refresh-token`, { refreshToken });
                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem("adminAccessToken", newAccessToken);

                
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                
                sessionStorage.removeItem("adminAccessToken");
                sessionStorage.removeItem("adminRefreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default adminAxiosInstance;
