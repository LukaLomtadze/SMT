import { create } from "zustand";

export const useProfileRouterStore = create((set) => ({
    initialState: "posts",

    updateProfileState: (nextState) => {
        set({initialState: nextState})
    }
}))