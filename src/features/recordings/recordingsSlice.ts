import { NonAgentApiSchemaType } from "@/schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface RecordingsSlice {
  loading: boolean;
  error: any;
  queryData: NonAgentApiSchemaType | null;
  pagination: { page: number; per_page: number };
  filter: string[];
  recordings: any[];
  pageCount: number;
}

// Define the initial state using that type
const initialState: RecordingsSlice = {
  loading: false,
  error: false,
  queryData: null,
  pagination: { page: 1, per_page: 50 },
  filter: [],
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
    addFilterOption: (state, action) => {
      if (!state.filter.includes(action.payload)) {
        state.filter.push(action.payload);
      }
    },
    removeFilterOption: (state, action) => {
      state.filter = state.filter.filter((option) => option !== action.payload);
    },
    setFilterOptions: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addFilterOption,
  removeFilterOption,
  setFilterOptions,
  setRecordings,
  setQueryData,
  setPerPage,
  setPrevPage,
  setNextPage,
  setPageCount,
} = recordingsSlice.actions;
export const recordingsReducer = recordingsSlice.reducer;
