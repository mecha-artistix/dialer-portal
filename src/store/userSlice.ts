import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import axios from "axios";

// Define a type for the slice state
interface UserSlice {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
}

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
    // login: {
    //   prepare(data: LoginSchemaType) {
    //     const validatedFields = LoginSchema.safeParse(data);
    //     if (!validatedFields.success) {
    //       return { payload: { error: "Invalid fields!" } };
    //     }
    //     console.log({ valid: validatedFields.data });
    //     const { username, password } = validatedFields.data;
    //     return { payload: { username, password } };
    //   },
    //   reducer(state, action) {
    //     console.log(action.payload);
    //     state.isAuthenticated = true;
    //   },
    // },
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
export const { logout } = userSlice.actions;

// Thunk for logging in

export const login = createAsyncThunk("user/login", async (data: LoginSchemaType, { rejectWithValue }) => {
  try {
    const response = await axios.post(import.meta.env.VITE_FLASK_API + "/auth/login", data);
    console.log(response);
    // Check if login was successful based on the API response
    if (response.status === 200) {
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

// export function loginUser(data: LoginSchemaType) {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.post(import.meta.env.VITE_FLASK_API + "/auth/login", data);
//       console.log({ response });
//       if (response.data.staus == 200) dispatch({ type: "user/login" });
//     } catch (error) {
//       dispatch(dispatch({ type: "user/logout" }));
//     }
//   };
// }

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;