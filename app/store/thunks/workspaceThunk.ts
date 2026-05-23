import { createAsyncThunk } from "@reduxjs/toolkit";
import { workspaceApi } from "~/store/api/workspaceApi";
import type { Workspace } from "~/types/workspace";
import type { RootState } from "~/store/store";

/**
 Workspace type (reusing same interface or exporting it from slice)
 */

export const fetchWorkspaces = createAsyncThunk<
    Workspace[],
    void,
    { rejectValue: string; state: RootState }
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
    },
    {
        condition: (_, { getState }) => {
            const { workspace } = getState();
            return !workspace.loading;
        },
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
