import type { Member } from "@/schemas";
import BaseService from "./base";
import type Http from "./http";

export default class LocationService extends BaseService<Member> {
  constructor(props: { http: Http }) {
    super({ ...props, url: "/location" });
  }

  async getCities() {
    return this.http.get(`${this.url}/cities`);
  }

  async getBarangays(city: string) {
    return this.http.get(`${this.url}/barangays/${city}`);
  }
}
