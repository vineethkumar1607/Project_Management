import { createAsyncThunk } from "@reduxjs/toolkit";
import { workspaceApi } from "~/api/workspaceApi";
import type { Workspace } from "~/types/workspace";

/**
 Workspace type (reusing same interface or exporting it from slice)
 */

export const fetchWorkspaces = createAsyncThunk<
    Workspace[],
    void,
    { rejectValue: string }
>(
    "workspace/fetchWorkspaces",
    async (_, thunkAPI) => {
        try {
            const data = await workspaceApi.getAll();

            console.log("FETCHED WORKSPACES:", data);

            return data;
        } catch (error: any) {
            console.log("FETCH ERROR:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchWorkspaceMembers = createAsyncThunk(
    "workspace/fetchMembers",
    async (workspaceId: string, thunkAPI) => {
        try {
            const data = await workspaceApi.getMembers(workspaceId);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);