import type { User } from "@/schemas";
import type { StateCreator } from "zustand";
import type { StoreState } from "./store.types";

export type AuthState = {
  authState: {
    user: User;
    setUser: (user: User) => void;
  };
};

export const createAuthSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  AuthState
> = (set) => ({
  authState: {
    user: {} as User,
    setUser: (user: User) =>
      set((state) => {
        state.authState.user = user;
      }),
  },
});
