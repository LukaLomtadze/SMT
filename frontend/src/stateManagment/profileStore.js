import { create } from "zustand";
import axios from "axios";

export const useProfileStore = create((set) => ({
    user: null,
    error: null,
    isLoading: false,
    defaultPic: "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg",

    updateProfilePicture: async(pic) => {
        
    }
}))