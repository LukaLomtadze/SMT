import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:4040/api/auth"

export const usePostStore = create((set) => ({
    posts: [],
    isLoading: false,
    error: null,

    createPost: async (content, images) => {
        set({isLoading: true, error: null})
        try{
            const response = await axios.post(`${API_URL}/newPost`, {content, images: images || []}, {withCredentials: true})

            const newPost = response.data.data;
            if (!newPost) throw new Error("No post returned from backend");

            set((state) => ({
                isLoading: false,
                posts: [newPost, ...state.posts],
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
    },
    deletePost: async(id) => {
        set({isLoading: true, error: null})

        try{
            await axios.delete(`${API_URL}/deletePost/${id}`, {withCredentials: true})
            set((state) => ({isLoading: false,
                posts: state.posts.filter(post => post._id !== id),
                error: null
            }))
        }
        catch(error){
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
              });
              throw error;
        }
    },

    getUserPosts: async(id) => {
        set({isLoading: true})

        try{
            const response = await axios.get(`${API_URL}/getAuthorPosts/${id}`, {withCredentials: true})

            set({
                isLoading: false,
                posts: response.data.data,
                error: null
            })
        }catch(error){
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
              });
            throw error;
        }
    }
}))