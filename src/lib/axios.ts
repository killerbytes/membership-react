import { ROUTES } from "@/constants";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(`${import.meta.env.VITE_APP_NAME}_TOKEN`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${baseURL}/auth${ROUTES.REFRESH}`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem(
          `${import.meta.env.VITE_APP_NAME}_TOKEN`,
          data.accessToken
        );
        originalRequest.headers["x-access-token"] = data.accessToken;
        return apiClient(originalRequest);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error?.response?.data || error);
  }
);
