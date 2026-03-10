import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 mins
  });
};
