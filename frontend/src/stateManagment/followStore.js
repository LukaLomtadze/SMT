import { create } from "zustand";
import axios from "axios";

export const useFowllowStore = create((set, get) => ({
    isLoadingg: false,

    followUser: async (id) => {
        set({isLoadingg: true,})
        try {
            const res = await axios.post(
                `http://localhost:4040/api/auth/follow/${id}`,
                {},
                { withCredentials: true }
            );
            const { user } = get();
            if (user && user._id !== id) {
                set({isLoadingg: false,
                    user: {
                        ...user,
                        following: [...(user.following || []), id]
                    }
                });
            }

            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    unFollowUser: async (id) => {
        set({isLoadingg: true,})
        try {
            const res = await axios.post(
                `http://localhost:4040/api/auth/unfollow/${id}`,
                {},
                { withCredentials: true }
            );

            const { user } = get();
            if (user && user._id !== id) {
                set({isLoadingg: false,
                    user: {
                        ...user,
                        following: (user.following || []).filter(uid => uid !== id)
                    }
                });
            }

            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}));
