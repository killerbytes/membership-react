import { apiClient } from "@/lib/axios";

export const locationApi = {
  getCities: async () => {
    return (await apiClient.get("/location/cities")) as any[];
  },
  getBarangays: async (city: string) => {
    return (await apiClient.get(`/location/barangays/${city}`)) as any[];
  },
};
