import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0,
    viewCounts: 0 
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response, {
            loading: "Getting the stats...",
            success: (data) => data?.data?.message,
            error: "Failed to load data stats"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
            state.viewCounts = action?.payload?.viewCounts; 
        });
    }
});

export default statSlice.reducer;
