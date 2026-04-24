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

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (
    { projectId, payload }: { projectId: string; payload: any },
    thunkAPI
  ) => {
    try {
      const data = await projectApi.update(projectId, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addProjectMember = createAsyncThunk(
  "project/addProjectMember",
  async (
    { workspaceId, projectId, email, tempMember }: { workspaceId: string; projectId: string; email: string; tempMember: any; },
    thunkAPI) => {
    try {
      const data = await projectApi.addMember(projectId, email);

      return {
        workspaceId, //  REQUIRED
        projectId,
        newMember: data.newMember,
        tempId: tempMember.id,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to add member");
    }
  }
);


export const removeProjectMember = createAsyncThunk(
  "project/removeProjectMember",
  async (
    { workspaceId, projectId, memberId, backupMember }: { workspaceId: string; projectId: string; memberId: string; backupMember?: any; },
    thunkAPI
  ) => {
    try {
      await projectApi.removeMember(projectId, memberId);

      return {
        workspaceId,
        projectId,
        memberId,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove member"
      );
    }
  }
);

