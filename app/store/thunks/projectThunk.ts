import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectApi } from "~/store/api/projectApi";
import type { Project } from "~/types/workspace";
import type { CreateProjectPayload } from "~/types/workspace";
import type { RootState } from "~/store/store";


// Thunks for project-related actions: fetching projects, creating a project, updating a project, adding/removing members, and fetching project members.

// Fetch projects for a workspace - This is used to load the list of projects when the user navigates to the Projects page. It takes the workspace ID as an argument and returns an array of projects. The condition function prevents duplicate requests if a fetch is already in progress for the same workspace.
export const fetchProjects = createAsyncThunk<
  Project[],
  string,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "project/fetchProjects",

  async (workspaceId, thunkAPI) => {
    try {
      const data = await projectApi.getByWorkspace(workspaceId);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  },

  {
    condition: (workspaceId, { getState }) => {
      const state = getState();

      const existingProjects =
        state.project.projectsByWorkspace[workspaceId];

      // Prevent duplicate requests
      if (existingProjects?.status === "loading") {
        return false;
      }

      return true;
    },
  }
);

// Create a new project in a workspace - payload includes project details and team members - This is used when creating a new project from the UI.
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
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


// Update project details - This is used when editing a project's information from the UI. The payload can include any updatable fields of the project.
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Delete a project - This is used when deleting a project from the UI. It takes the workspace ID and project ID as arguments to identify which project to delete.

export const deleteProject = createAsyncThunk("project/deleteProject",
  async ({ workspaceId, projectId, }: { workspaceId: string; projectId: string; },
    thunkAPI) => {
    try {
      await projectApi.delete(projectId);

      return {
        workspaceId,
        projectId,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete project");
    }
  }
);

// Add a member to a project - This is used when adding a new member to a project from the UI. It takes the project ID, member's email, and a temporary member object for optimistic updates.
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Remove a member from a project - This is used when removing a member from a project in the UI. It takes the project ID, member ID, and an optional backup member object for optimistic updates.
export const removeProjectMember = createAsyncThunk(
  "project/removeProjectMember",
  async (
    { workspaceId, projectId, memberId, }: { workspaceId: string; projectId: string; memberId: string; backupMember?: any; },
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


// FETCH PROJECT MEMBERS - This is used to fetch the members of a project, especially after adding or removing members to ensure the state is up-to-date.
export const fetchProjectMembers = createAsyncThunk(
  "project/fetchProjectMembers",
  async (projectId: string, { rejectWithValue }) => {
    try {

      console.log("FETCHING PROJECT MEMBERS", projectId);
      const data = await projectApi.getProjectMembers(projectId);
      console.log("PROJECT MEMBERS API RESPONSE", data);
      return { projectId, data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);
