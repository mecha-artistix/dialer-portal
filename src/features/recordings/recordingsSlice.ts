import { ViciAllRecordsSchema } from "@/schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

// Define a type for the slice state
interface RecordingsSlice {
  loading: boolean;
  error: any;
  queryData: z.infer<typeof ViciAllRecordsSchema> | null;
  pagination: { page: number; per_page: number };
  statusFilter: string[];
  recordings: any[];
  pageCount: number;
}

// Define the initial state using that type
const initialState: RecordingsSlice = {
  loading: false,
  error: false,
  queryData: null,
  pagination: { page: 1, per_page: 50 },
  statusFilter: [],
  recordings: [],
  pageCount: 0,
};

export const recordingsSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    setQueryData: (state, action) => {
      state.queryData = { ...state.queryData, ...action.payload };
    },
    setRecordings: (state, action: PayloadAction<any[]>) => {
      state.recordings = [...action.payload];
    },
    setPerPage: (state, action) => {
      state.pagination = { ...state.pagination, per_page: action.payload };
    },
    setPrevPage: (state) => {
      const { page } = state.pagination;
      state.pagination = { ...state.pagination, page: Math.max(1, page - 1) };
    },
    setNextPage: (state) => {
      const { page } = state.pagination;
      state.pagination = { ...state.pagination, page: Math.min(state.pageCount, page + 1) };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    addStatusFilterOption: (state, action) => {
      if (!state.statusFilter.includes(action.payload)) {
        state.statusFilter.push(action.payload);
      }
    },
    removeStatusFilterOption: (state, action) => {
      state.statusFilter = state.statusFilter.filter((option) => option !== action.payload);
    },
    setStatusFilterOptions: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
});

export const {
  addStatusFilterOption,
  removeStatusFilterOption,
  setStatusFilterOptions,
  setRecordings,
  setQueryData,
  setPerPage,
  setPrevPage,
  setNextPage,
  setPageCount,
} = recordingsSlice.actions;
export const recordingsReducer = recordingsSlice.reducer;
