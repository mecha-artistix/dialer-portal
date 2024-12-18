import { ViciFilterParamsType, ViciRequiredParamsType } from "@/schemas";
import { TRecording } from "@/types/recordings";
import { TPagination } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface RecordingsSlice {
  loading: boolean;
  error: any;
  requiredParams: ViciRequiredParamsType;
  filterParams: ViciFilterParamsType;
  isFilterPopoverOpen: boolean;
  pagination: TPagination;
  recordings: TRecording[];
  pageCount: number;
  dialer: string | null;
}

// Define the initial state using that type
const initialState: RecordingsSlice = {
  loading: false,
  error: false,
  requiredParams: { dialer_url: "", user: "", pass: "", date: "" },
  // filterParams: { date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0] },
  filterParams: {},
  isFilterPopoverOpen: false,
  pagination: { page: 1, per_page: 50 },
  pageCount: 0,
  dialer: null,
  recordings: [],
};

export const recordingsSlice = createSlice({
  name: "recordingsV1",
  initialState,
  reducers: {
    setRequiredParams: (state, action) => {
      state.requiredParams = { ...state.requiredParams, ...action.payload };
    },
    setIsFilterPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterPopoverOpen = action.payload;
    },
    setFilterParams: (state, action) => {
      state.filterParams = { ...state.filterParams, ...action.payload };
    },
    setPerPage: (state, action) => {
      state.pagination = { ...state.pagination, per_page: action.payload };
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setNextPage: (state) => {
      const { page } = state.pagination;
      state.pagination = { ...state.pagination, page: Math.min(state.pageCount, page + 1) };
    },
    setPrevPage: (state) => {
      const { page } = state.pagination;
      state.pagination = { ...state.pagination, page: Math.max(1, page - 1) };
    },
    setDialer: (state, action) => {
      state.dialer = action.payload;
    },
    setRecordings: (state, action: PayloadAction<any[]>) => {
      state.recordings = [...action.payload];
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addStatusFilter: (state, action) => {
      if (!state?.filterParams?.status?.includes(action.payload)) {
        state?.filterParams?.status?.push(action.payload);
      }
    },
    setDateFilter: (state, action) => {
      state.filterParams = { ...state.filterParams };
    },
    removeStatusFilter: (state, action) => {
      state.filterParams.status = state?.filterParams?.status?.filter((option) => option !== action.payload);
    },

    resetStatusFilter: (state, action) => {
      state.filterParams.status = action.payload;
    },
  },
});

export const {
  addStatusFilter,
  removeStatusFilter,
  resetStatusFilter,
  setRecordings,
  setRequiredParams,
  setFilterParams,
  setPerPage,
  setPrevPage,
  setNextPage,
  setPageCount,
  setDialer,
  setDateFilter,
  setIsFilterPopoverOpen,
} = recordingsSlice.actions;
export const recordingsReducerV1 = recordingsSlice.reducer;
