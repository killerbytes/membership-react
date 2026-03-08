import type { AuthState } from "./authSlice";
import type { UserState } from "./userSlice";

export type StoreState = AuthState & UserState;
