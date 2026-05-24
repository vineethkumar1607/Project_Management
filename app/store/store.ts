import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "~/store/api/baseApi";
import { rootReducer } from "~/store/rootReducer";

export const store = configureStore({
  reducer: rootReducer,

  //RTK Query uses middleware for caching, invalidation, polling, and other features.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

/*
  RootState represents the entire Redux state tree.
  It is used only for TypeScript typing.
*/
export type RootState = ReturnType<typeof store.getState>;

/*
  AppDispatch represents the dispatch type.
  Helps with typed dispatch.
*/
export type AppDispatch = typeof store.dispatch;
