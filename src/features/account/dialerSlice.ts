import { TDialer } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DialerSlice {
  loading: boolean;
  error: any;
  isSelected: null | number;
  dialers: TDialer[];
  isEditing: boolean;
  isAddingDialer: boolean;
}

// Define the initial state using that type
const initialState: DialerSlice = {
  loading: false,
  error: false,
  dialers: [],
  isSelected: null,
  isEditing: false,
  isAddingDialer: false,
};

export const dialerSlice = createSlice({
  name: "dialers",
  initialState,
  reducers: {
    setIsAddingDialer: (state, action) => {
      state.isAddingDialer = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setDialers: (state, action) => {
      state.dialers = [...action.payload];
    },
    addDialer: (state, action) => {
      state.dialers.push(action.payload);
    },
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDialers, setIsSelected, setIsEditing, addDialer } = dialerSlice.actions;
export const dialersReducer = dialerSlice.reducer;
