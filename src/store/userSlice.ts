import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { LoginSchemaType } from "@/schemas";
import { apiFlask } from "@/lib/interceptors";
import axios from "axios";

// Define a type for the slice state
interface UserSlice {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
}

// Thunk for logging in

export const login = createAsyncThunk("user/login", async (data: LoginSchemaType, { rejectWithValue }) => {
  try {
    const response = await axios.post(import.meta.env.VITE_FLASK_API + "/login", data);
    console.log({ response });
    // Check if login was successful based on the API response
    if (response.status === 200) {
      console.log({ thunk: response.data });
      localStorage.setItem("token", response.data.token);
      return response.data; // Return full response data for use in the reducer
    } else {
      // Return a rejection if login fails
      return rejectWithValue("Login failed. Please check your credentials.");
    }
  } catch (error) {
    // Handle network or server errors
    return rejectWithValue("An error occurred while trying to log in.");
  }
});

// Define the initial state using that type
const initialState: UserSlice = {
  loading: false,
  error: false,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => (state.isAuthenticated = action.payload),
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { login, logout } = userSlice.actions;

export const { logout, setIsAuthenticated } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice.reducer;
