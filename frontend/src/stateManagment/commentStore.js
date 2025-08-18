import { create } from "zustand";

export const useCommentStore = create((set) => ({
    isOpen: false,

    toggleOpen: (state) => {
        set({isOpen: !state})
    }
}))