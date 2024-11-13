import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface RecordingsSlice {
  loading: boolean;
  error: any;
  recordings: any[];
}

// Define the initial state using that type
const initialState: RecordingsSlice = {
  loading: false,
  error: false,
  recordings: [],
};

export const recordingsSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    setRecordings: (state, action: PayloadAction<any[]>) => {
      state.recordings = [...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRecordings } = recordingsSlice.actions;
export const recordingsReducer = recordingsSlice.reducer;
