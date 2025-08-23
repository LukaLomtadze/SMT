import axios from "axios";
import { create } from "zustand";

const API_URL = `http://localhost:4040/api/auth`

export const useCommentStore = create((set) => ({
    isOpen: false,
    comments: [],
    isLoading: false,
    error: null,

    toggleOpen: (state) => {
        set({isOpen: !state})
    },

    getComments: async(id) => {
        set({isLoading: true, error: null})

        try{
            const response = await axios.get(`${API_URL}/getComments/${id}`, {withCredentials: true})
            set({
                isLoading: false,
                comments: response.data.data,
                error: null
            })
        }catch(error){
            set({isLoading:false, error: error.data.error})
        }
    }
}))