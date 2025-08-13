import { create } from "zustand";

export const useSidebarStore = create((set) => ({
    isOpen: false,

    setOpening: () => {
        set((state) => ({isOpen: !state.isOpen}))
    },
    close: () => {
        set({isOpen: false})
    }
}))