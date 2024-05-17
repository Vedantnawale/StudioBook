import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosinstance.js";

const initialState = {
    studioData: []
}

export const getAllStudios = createAsyncThunk("/studio/get", async () => {
    try {
        const response = axiosInstance.get("/studios");
        toast.promise(response, {
            loading: "loading studio data...",
            success: "Studio loaded successfully",
            error: "Failed to get the studio",
        });

        return (await response).data.studios;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});  

export const createNewStudio = createAsyncThunk("/studio/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("location", data?.location);
        formData.append("price", data?.price);
        formData.append("description", data?.description);
        formData.append("mobileNumber", data?.mobileNumber);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
        data.services.forEach((service) => formData.append("services", service));
        data.specialities.forEach((speciality) => formData.append("specialities", speciality));
        data.languages.forEach((languages) => formData.append("languages", languages));
        data.albums.forEach((albums) => formData.append("albums", albums));
        data.packages.forEach((packages) => formData.append("packages", packages));
        data.packagesOptional.forEach((packagesOptional) => formData.append("packagesOptional", packagesOptional));
        // formData.append("thumbnail", data?.images);
        data.images.forEach((image) => formData.append("images", image));

        const response = axiosInstance.post("/studios", formData);
        toast.promise(response, {
            loading: "Creating new studio",
            success: "Studio created successfully",
            error: "Failed to create Studio"
        });

        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const studioSlice = createSlice({
    name: "studios",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStudios.fulfilled, (state, action) => {
            if(action.payload) {
                state.studioData = [...action.payload];
            }
        })
    }
})

export default studioSlice.reducer;