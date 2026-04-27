import { configureStore } from "@reduxjs/toolkit"
import workspaceReducer from "./workspaceSlice"
import projectReducer from "./projetSlice";
import themeReducer from "./themeSlice"
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
 


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