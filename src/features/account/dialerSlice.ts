import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DialerSlice {
  loading: boolean;
  error: any;
  isSelected: null | number;
  dialers: any[];
}

// Define the initial state using that type
const initialState: DialerSlice = {
  loading: false,
  error: false,
  dialers: [],
  isSelected: null,
};

export const dialerSlice = createSlice({
  name: "dialers",
  initialState,
  reducers: {
    setDialers: (state, action: PayloadAction<any[]>) => {
      state.dialers = [...action.payload];
    },
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDialers, setIsSelected } = dialerSlice.actions;
export const dialersReducer = dialerSlice.reducer;
