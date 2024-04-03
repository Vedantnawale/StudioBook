import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js"
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem('data') !== undefined ? JSON.parse(localStorage.getItem('data')) : {}  // jeva first time login kart aaho tr data object chya form madhe yet aahe an jeva refresh kel tr data string format madhe yete mhnun aapn JSON.parse use kel aahe aata data object form madhech rahnar.
}

// read thunk redux in docs
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to create account"
        });


        // getting response resolved here
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        let res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to login"
        });


        // getting response resolved here
        res = await res;
        return res.data;
        console.log(res.data);
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        let res = axiosInstance.post("/user/logout");

        await toast.promise(res, {
            loading: "Wait! LogOut in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out",
        });

        // getting response resolved here
        res = await res;
        console.log(res.data);
        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// refresh karav n lagl pahije mhanun
export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", action?.payload?.success);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = action?.payload?.success;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            // for user logout
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.data = {};
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role
            });
    }
});

// export const {} = authSlice.actions
export default authSlice.reducer;