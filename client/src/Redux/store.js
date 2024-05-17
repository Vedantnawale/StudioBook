import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice.js';
import  StudioSliceReducer from './Slices/StudioSlice.js';
import razorpaySliceReducer from './Slices/RazorpaySlice.js';
import statSliceReducer from './Slices/StatSlice.js';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        studio: StudioSliceReducer,
        razorpay: razorpaySliceReducer,
        stat: statSliceReducer
    },
    devTools: true
})

export default store;