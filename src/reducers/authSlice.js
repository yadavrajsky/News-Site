// reducers/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create async thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create async thunk for user signup
export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // const dispatch = useDispatch();
    const response = await axios.post('/api/auth/logout'); // Replace with the actual endpoint for logout
    toast.success(response.data.message); // Display success message
    localStorage.removeItem("persist:root");
    return response.data;
  } catch (error) {
    // Display an error message if the request fails
    toast.error(error.response.error);
    return rejectWithValue(error.response.error);
  }
});

export const resetAuthState = (state) => {
  state.error = null;
  state.message = null;
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null
};

// Create authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer for loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Reducer for signupUser
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Reducer for logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = null;
        
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = null;
      });
  },
});
export const { resetNotificationState } = authSlice.actions;

export default authSlice.reducer;
