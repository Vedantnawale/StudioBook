import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../Helpers/axiosinstance.js";

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await axiosInstance.get('/reviews');
  return response.data;
});

export const createReview = createAsyncThunk('reviews/createReview', async (review) => {
  const response = await axiosInstance.post('reviews', review);
  return response.data;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async ({ id, review }) => {
  const response = await axiosInstance.put(`reviews/${id}`, review);
  return response.data;
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (id) => {
  await axiosInstance.delete(`reviews/${id}`);
  return id;
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex((review) => review._id === action.payload._id);
        state.reviews[index] = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
