import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createAuthSlice } from "./authSlice";
import { StoreState } from "./store.types";
import { createUserSlice } from "./userSlice";

export const useStore = create<StoreState>()(
  immer((...a) => ({
    ...createAuthSlice(...a),
    ...createUserSlice(...a),
  }))
);
