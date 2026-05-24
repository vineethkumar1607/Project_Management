import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "~/store/api/baseApi";
import projectReducer from "~/store/slices/projectSlice";
import taskReducer from "~/store/slices/taskSlice";
import themeReducer from "~/store/slices/themeSlice";
import workspaceReducer from "~/store/slices/workspaceSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  workspace: workspaceReducer,
  project: projectReducer,
  task: taskReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
