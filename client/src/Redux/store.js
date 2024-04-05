import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice.js';
import  StudioSliceReducer from './Slices/StudioSlice.js';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        studio: StudioSliceReducer
    },
    devTools: true
})

export default store;