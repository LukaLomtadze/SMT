import { create } from "zustand";
import axios from "axios";

export const useFowllowStore = create((set, get) => ({
    // ... your existing state

    followUser: async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:4040/api/auth/follow/${id}`,
                {}, // no body needed
                { withCredentials: true }
            );

            // Optionally update local user state if this is the current user
            const { user } = get();
            if (user && user._id !== id) {
                set({
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
        try {
            const res = await axios.post(
                `http://localhost:4040/api/auth/unfollow/${id}`,
                {},
                { withCredentials: true }
            );

            // Optionally update local user state if this is the current user
            const { user } = get();
            if (user && user._id !== id) {
                set({
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
