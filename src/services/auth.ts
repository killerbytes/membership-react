// import { ChangePassword, Login, User } from "@/schemas";
import BaseService from "./base";
import type Http from "./http";

export default class AuthService extends BaseService {
  constructor(props: { http: Http }) {
    super({ ...props, url: "/auth" });
  }

  login = async (data) => {
    try {
      const response = await this.http.post(`${this.url}/login`, data);
      this.http.setToken(response.accessToken);
      return response;
    } catch (error) {
      throw error;
    }
  };
  logout = async () => {
    try {
      // await this.http.post(`${this.url}/logout`); //TODO remove server session
      this.http.removeToken();
    } catch (error) {
      throw error;
    }
  };
  changePassword = async (data) => {
    const response = await this.http.post(`${this.url}/changePassword`, data);
    return response;
  };
}
