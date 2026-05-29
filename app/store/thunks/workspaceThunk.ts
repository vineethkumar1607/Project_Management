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
            const data =
                await workspaceApi.getAll();

            return data;

        } catch (error: any) {

            console.error(
                "FETCH WORKSPACES ERROR:",
                error
            );

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
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
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);
