import { apiClient } from "@/lib/axios";

export const locationApi = {
  getCities: () => apiClient.get("/location/cities"),
  getBarangays: (city: string) => apiClient.get(`/location/barangays/${city}`),
};
