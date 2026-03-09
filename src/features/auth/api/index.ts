import type { User } from "@/features/members/types";
import { apiClient } from "@/lib/axios";

export type LoginFormData = {
  identifier: string;
  password?: string;
};

export const authApi = {
  login: async (data: LoginFormData) => {
    const response = await apiClient.post("/auth/login", data);

    localStorage.setItem(
      `${import.meta.env.VITE_APP_NAME}_TOKEN`,
      response.accessToken
    );
    return response;
  },
  logout: async () => {
    localStorage.removeItem(`${import.meta.env.VITE_APP_NAME}_TOKEN`);
    // await apiClient.post("/auth/logout");
  },
  changePassword: async (data: any) => {
    return apiClient.post("/auth/changePassword", data);
  },
  me: (): Promise<User> => apiClient.get("/auth/current-user"),
};
