import { create } from "zustand";
import axios from "axios";
import { FaS } from "react-icons/fa6";

const API_URL = "http://localhost:4040/api/auth";

axios.defaults.withCredentials = true; 

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

    verifyEmail : async (code) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code})
            set({user: response.data.user, isLoading: false, isAuthenticated: true})
            return response.data
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email" , isLoading: false})
            throw error
        }
    },

    login: async(password, email) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`, {password, email})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || "Error loging in", isLoading: false})
            throw error
        }
    },

    logout: async() => {
        set({isLoading: true, error: null})
        try{
            await axios.post(`${API_URL}/logout`)
            set({isAuthenticated: false, isLoading:false, user: null, error: null})
        }catch(error){
            set({error: null, isLoading: false, isAuthenticated: false})
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true }); // <-- important here
            set({
                user: response.data.user,
                isAuthenticated: true,  
                isLoading: false,
                isCheckingAuth: false
            });
        } catch {
            set({
                user: null,
                isLoading: false,
                isCheckingAuth: false,
                isAuthenticated: false,
            })
            
        }
    },  
}));
