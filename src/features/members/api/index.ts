import { apiClient } from "@/lib/axios";
import type { Member } from "../types/member.schema";

export const memberApi = {
  get: (id: number): Promise<Member> => {
    return apiClient.get(`/member/${id}`);
  },
  create: (data: Partial<Member>): Promise<Member> => {
    return apiClient.post("/member/register", data);
  },

  uploadFile: (data: FormData, type: "selfie" | "id") => {
    return apiClient.post(`/member/upload/${type}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
