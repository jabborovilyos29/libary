import { configureStore } from "@reduxjs/toolkit";
import { fakeApi } from "./features/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersListReducer } from "./features/slices";

export const store = configureStore({
  reducer: {
    [fakeApi.reducerPath]: fakeApi.reducer,
    usersList: usersListReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
