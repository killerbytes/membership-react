import { apiClient } from "@/lib/axios";
import type { UserBase } from "../types";

export const userApi = {
  create: (data: UserBase): Promise<any> => apiClient.post("/user", data),
  changePassword: (data: any): Promise<any> =>
    apiClient.post("/user/changePassword", data),
};
