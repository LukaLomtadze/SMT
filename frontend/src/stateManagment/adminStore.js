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
    }
}))