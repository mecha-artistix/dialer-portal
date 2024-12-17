import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedReducer from "./rootReducer";

import { userReducer } from "./userSlice";
import { recordingsReducer } from "@/features/recordings/recordingsSlice";
import { dialersReducer } from "@/features/dashboard/dialerSlice";
import { recordingsReducerV1 } from "@/features/recordings/recordingsSliceV2";
// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    user: userReducer,
    recordings: recordingsReducer,
    dialers: dialersReducer,
    recordingsV1: recordingsReducerV1,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export { store, persistor };
