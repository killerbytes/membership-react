import type { User } from "@/schemas";
import type { StateCreator } from "zustand";
import type { StoreState } from "./store.types";

export type UserState = {
  userState: {
    users: User[];
    setUsers: (users: User[]) => void;
    hasLoaded: boolean;
    invalidate: () => void;
  };
};

export const createUserSlice: StateCreator<StoreState, [], [], UserState> = (
  set
) => ({
  userState: {
    users: [],
    hasLoaded: false,
    invalidate: () =>
      set(({ userState }) => {
        userState.hasLoaded = false;
      }),
    setUsers: (users: User[]) =>
      set(({ userState }) => {
        userState.users = users;
        userState.hasLoaded = true;
      }),
  },
});
