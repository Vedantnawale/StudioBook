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
        formData.append("specialities", data?.specialities);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
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