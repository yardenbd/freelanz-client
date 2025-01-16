import axios, {
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { config } from "./config";
import { getToken, saveToken } from "./secureStorage";
import { Alert } from "react-native";
import { router } from "expo-router";

export const apiClient = axios.create({
    baseURL: config.baseURL, // Replace with your backend URL
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = await getToken("accessToken");
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await getToken("refreshToken");
                if (!refreshToken) Alert.alert("Unable to authenticate");
                const { data, status } = await apiClient.post(
                    "/auth/refresh-token",
                    {
                        refreshToken,
                    }
                );
                saveToken("accessToken", data.accessToken);
                saveToken("refreshToken", data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                router.replace("/auth/sign-in");
                return Promise.reject(refreshError);
            }
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error("Access denied:", error.response?.data?.message);
        }

        return Promise.reject(error);
    }
);
