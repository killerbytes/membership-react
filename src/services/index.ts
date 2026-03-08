import AuthService from "./auth";
import Http from "./http";
import LocationService from "./location";
import MemberService from "./member";
import UserService from "./user";

const http = new Http();

export const authServices = new AuthService({ http });
export const userServices = new UserService({ http });
export const memberServices = new MemberService({ http });
export const locationServices = new LocationService({ http });
