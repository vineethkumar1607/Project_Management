// workspaceActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentWorkspace, deleteWorkspace } from "./workspaceSlice";

/**
 * Set workspace + persist to localStorage
 */
export const setWorkspaceWithPersistence = createAsyncThunk(
    "workspace/setWorkspaceWithPersistence",
    async (workspaceId: string, thunkAPI) => {
        try {
            //  Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("currentWorkspaceId", workspaceId);
            }

            // Dispatch reducer
            thunkAPI.dispatch(setCurrentWorkspace(workspaceId));

            return workspaceId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



export const deleteWorkspaceWithCleanup = createAsyncThunk(
    "workspace/deleteWorkspaceWithCleanup",
    async (workspaceId: string, thunkAPI) => {
        try {
            // remove from localStorage if needed
            if (typeof window !== "undefined") {
                const currentId = localStorage.getItem("currentWorkspaceId");

                if (currentId === workspaceId) {
                    localStorage.removeItem("currentWorkspaceId");
                }
            }

            thunkAPI.dispatch(deleteWorkspace(workspaceId));

            return workspaceId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);