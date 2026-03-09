import { apiClient } from "@/lib/axios";
import type { Member } from "../types/member.schema";

export const memberApi = {
  getMember: (id: number): Promise<Member> => {
    return apiClient.get(`/member/${id}`);
  },
  createMember: (data: Partial<Member>): Promise<Member> => {
    return apiClient.post("/member/register", data);
  },
};
