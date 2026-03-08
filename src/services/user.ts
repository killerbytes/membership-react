// import { ChangePassword, Login, User } from "@/schemas";
import type { UserBase } from "@/schemas/user.schema";
import BaseService from "./base";
import type Http from "./http";

export default class UserService extends BaseService<UserBase> {
  constructor(props: { http: Http }) {
    super({ ...props, url: "/user" });
  }

  login = async (data) => {
    console.log(data);

    const response = await this.http.post(`${this.url}/login`, data);
    return response;
  };

  me = async () => {
    const response = await this.http.get(`${this.url}/current-user`);
    return response;
  };

  changePassword = async (data) => {
    const response = await this.http.post(`${this.url}/changePassword`, data);
    return response;
  };
}
