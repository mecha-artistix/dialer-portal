import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userSlice";
import { recordingsReducer } from "@/features/recordings/recordingsSlice";
import { dialersReducer } from "@/features/account/dialerSlice";
// Configure persist settings
const persistConfig = {
  key: "root",
  storage, // uses localStorage by default
  whitelist: ["user"], // specify reducers you want to persist (e.g., 'user')
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  recordings: recordingsReducer,
  dialers: dialersReducer,
});

// Apply persistence to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
