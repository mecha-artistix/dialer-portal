import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./userSlice";
import { dialersReducer } from "@/features/dashboard/dialerSlice";
import { recordingsReducer } from "@/features/recordings/recordingsSlice";
// import { persistStore } from "redux-persist";
// import persistedReducer from "./rootReducer";
// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    user: userReducer,
    dialers: dialersReducer,
    recordings: recordingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export { store, persistor };
