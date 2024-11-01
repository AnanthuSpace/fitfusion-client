import axios from "axios";
const localhostURL = import.meta.env.VITE_BASE_URL

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

userAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem("userRefreshToken");
            try {
                const response = await axios.post(`${localhostURL}/auth/refresh-token`, { refreshToken });
                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem("userAccessToken", newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                sessionStorage.removeItem("userAccessToken");
                sessionStorage.removeItem("userRefreshToken");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default userAxiosInstance;
