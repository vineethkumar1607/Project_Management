import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectApi } from "~/api/projectApi";
import type { Project } from "~/types/workspace";
import type { CreateProjectPayload } from "~/types/workspace";



export const fetchProjects = createAsyncThunk<
  Project[],
  string,
  { rejectValue: string }
>(
  "project/fetchProjects",
  async (workspaceId, thunkAPI) => {
    try {
      const data = await projectApi.getByWorkspace(workspaceId);

      console.log("FETCHED PROJECTS:", data);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const createProject = createAsyncThunk(
  "project/createProject",
  async (
    {
      workspaceId,
      payload,
    }: { workspaceId: string; payload: CreateProjectPayload },
    thunkAPI
  ) => {
    try {
      const data = await projectApi.create(workspaceId, payload);
      console.log("CREATED PROJECT:", data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

