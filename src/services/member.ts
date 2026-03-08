import type { Member } from "@/schemas";
import BaseService from "./base";
import type Http from "./http";

export default class MemberService extends BaseService<Member> {
  constructor(props: { http: Http }) {
    super({ ...props, url: "/member" });
  }

  async register(payload) {
    console.log(payload);

    return this.http.post(`${this.url}/register`, payload);
  }
}
