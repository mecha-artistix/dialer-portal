import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./counterSlice";
import { userReducer } from "./userSlice";
import { recordingsReducer } from "@/features/recordings/recordingsSlice";
// Configure persist settings
const persistConfig = {
  key: "root",
  storage, // uses localStorage by default
  whitelist: ["user"], // specify reducers you want to persist (e.g., 'user')
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  recordings: recordingsReducer,
});

// Apply persistence to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
