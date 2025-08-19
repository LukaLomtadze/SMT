import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:4040/api/auth"

export const useAdminStore = create((set) => ({
    users: [],
    error: null,
    isLoading: false,
    pagination: {
        totalUsers: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
    },

    getAllUsers: async (page = 1, limit= 10) => {
        set({isLoading:true, error:null})
        try{
            const response = await axios.get(`${API_URL}/getAllUsers?page=${page}&limit=${limit}`)
            set({isLoading: false, error: null, users: response.data.data, pagination:response.data.pagination})
        }catch(error){
            set({isLoading: false, error: error.response?.data?.error})
            throw error;
        }
    },
    deleteUser: async(id) => {
        set({isLoading:true, error:null})

        try {
            await axios.delete(`${API_URL}/deleteUser/${id}`, {withCredentials: true})
            set((state) => ({
                isLoading: false,
                error:null,
                users: state.users.filter((user) => user?._id !== id),
            }))
            
        } catch (error) {
            set({isLoading: false, error: "error deleting user"})
            throw error
        }
    },
    makeUserAdmin: async(id) => {
        set({isLoading:true, error:null})

        try{
            const response = await axios.put(`${API_URL}/makeUserAdmin/${id}`, {withCredentials: true})

            const updatedUsers = response.data.user;

            set((state) => ({isLoading:false,
                error:null,
                users: state.users.map(user => user._id === updatedUsers._id ? updatedUsers: user)
            }))
        }catch(err){
            console.error(err);
            set({ isLoading: false, error: "error making user admin" });
            throw err;
        }
    },
    makeUserBadged: async(id) => {
        set({isLoading:true, error:null})

        try{
            const response = await axios.put(`${API_URL}/makeUserBadged/${id}`, {withCredentials: true})

            const updatedUsers = response.data.user;

            set((state) => ({isLoading:false,
                error:null,
                users: state.users.map(user => user._id === updatedUsers._id ? updatedUsers: user)
            }))
        }catch(err){
            console.error(err);
            set({ isLoading: false, error: "error making user badged" });
            throw err;
        }
    }

}))