import { useStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { memberApi } from "../api";

export const useMember = () => {
  const {
    authState: { user },
  } = useStore();
  const id = user?.id;

  const query = useQuery({
    queryKey: ["member", id],
    queryFn: () => memberApi.get(id!),
    enabled: !!id,
  });

  return {
    ...query,
    isWaiting: !id || query.isPending,
  };
};
