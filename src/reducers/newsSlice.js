// reducers/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "6c5629ca53c84d20be747bea9016615a";

// Create async thunk for top news
export const fetchTopNews = createAsyncThunk(
  "articles/top-news",
  async ({ country, category }, { rejectWithValue }) => {
    console.log("In fetchTopNews");
    console.log(category);
    try {
      const response = await axios.get(
        `/v2/top-headlines?country=${country}${
          category ? `&category=${category}` : ""
        }&apiKey=${API_KEY}`
      );

      return response.data;
    } catch (error) {
      // Return error data using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetArticlesState = (state) => {
  state.error = null;
};

// Initial state
const initialState = {
  articles: [],
  totalResults: 0,
  loading: true,
  categoryFetchingLoading: false,
  error: null,
  previousCategory: null, // Track the previous category
};

// Create articlesSlice
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder
      // Reducer for fetchTopNews
      .addCase(fetchTopNews.pending, (state, action) => {
        state.loading = true;
        // If the category changes from the previous one, set categoryFetchingLoading to true
        if (state.previousCategory !== action.meta.arg.category) {
          state.categoryFetchingLoading = true;
        }
      })
      .addCase(fetchTopNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        state.categoryFetchingLoading = false; // Reset categoryFetchingLoading
        state.previousCategory = action.meta.arg.category; // Update previousCategory
      })
      .addCase(fetchTopNews.rejected, (state, action) => {
        state.error = action.payload?.error?.message;
        state.loading = false;
        state.categoryFetchingLoading = false; // Reset categoryFetchingLoading
      });
  },
});
export const { resetNotificationState } = articlesSlice.actions;

export default articlesSlice.reducer;
