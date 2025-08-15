import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:4040/api/auth"

export const usePostStore = create((set) => ({
    posts: [],
    isLoading: false,
    error: null,

    createPost: async () => {
        set({isLoading: true, error: null})
        try{
            const response = await axios.post(`${API_URL}/newPost`)
            set((state) => ({
                isLoading: false,
                posts: [response.data.data, ...state.posts],
                error: null,
            }))
        }catch(error){
            set({ 
                error: error.response?.data?.message || error.message,
                isLoading: false 
              });
            throw error;
        }
    },
    getPosts: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.get(`${API_URL}/getPosts` );
            set({
                posts: response.data.data,
                isLoading: false,
                error: null
            })
        } catch (error) {
            set({ 
                error: error.response?.data?.message || error.message,
                isLoading: false 
              });
            throw error
        }
    }
}))