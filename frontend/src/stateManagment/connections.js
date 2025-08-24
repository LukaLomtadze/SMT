import { create } from "zustand";

export const useConnectionsStore = create((set) => ({
    isLoading: true,
    error: null,
    isOpen: false,
    windowOpened: "",

    toggleOpen: () => {
        set((state) => ({isOpen: !state.isOpen}))
    },

    windowUpdate: (nextState) => {
        set({windowOpened: nextState})
    }
}))