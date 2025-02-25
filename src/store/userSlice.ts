import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchemaType, RegisterSchemaType } from "@/schemas";
import axios from "axios";

// Define a type for the slice state
interface UserSlice {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  userId: string | null;
  username: string | null;
}

//  Thunk For Registering
export const register = createAsyncThunk("user/register", async (data: RegisterSchemaType, { rejectWithValue }) => {
  try {
    const response = await axios.post(import.meta.env.VITE_FLASK_API + "/auth/register", data);
    console.log({ regsiterResponse: response });
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      return rejectWithValue("Registering user failed");
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue("An error occurred while processing request");
  }
});

// Thunk for logging in

export const login = createAsyncThunk("user/login", async (data: LoginSchemaType, { rejectWithValue }) => {
  try {
    const response = await axios.post(import.meta.env.VITE_FLASK_API + "/auth/login", data);
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
  userId: null,
  username: null,
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
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = undefined;
        state.userId = action.payload.user.user_id;
        state.username = action.payload.user.username;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = undefined;
        state.userId = action.payload.user.user_id;
        state.username = action.payload.user.username;
      })
      .addCase(register.rejected, (state, action) => {
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
