import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import { fetchWorkspaceMembers, fetchWorkspaces } from "../thunks/workspaceThunk";
import type { Workspace } from "~/types/workspace";


/**
 * Defines Redux state structure for workspace
 */

interface WorkspaceState {
    workspaces: Workspace[];
    membersByWorkspace: {
        [key: string]: {
            data: any[];
            status: "idle" | "loading" | "succeeded" | "failed";
            lastFetched?: number;
        };
    };

    loading: boolean;
    error: string | null;
}

/**
 * Safely read from localStorage
 
 * localStorage is only available in browser (window object)
 * This prevents crashes in SSR / Node environments
 */


/**
 * Initial state
 */
const initialState: WorkspaceState = {
    workspaces: [],
    membersByWorkspace: {},

    loading: false,
    error: null,
};

/**
 * Workspace Slice
 */
const workspaceSlice = createSlice({
    name: "workspace",
    initialState,

    /**
     * Synchronous reducers
     * Used for direct UI-driven updates
     */
    reducers: {

        // Replace entire workspace list (e.g. after fetching from API)
        setWorkspaces(state, action: PayloadAction<Workspace[]>) {
            state.workspaces = action.payload;
        },
        /// Add a new workspace to the list
        addWorkspace(state, action: PayloadAction<Workspace>) {
            state.workspaces.push(action.payload);
        },

        // Update an existing workspace by matching ID
        updateWorkspace(state, action: PayloadAction<Workspace>) {
            state.workspaces = state.workspaces.map((w) =>
                w.id === action.payload.id ? action.payload : w
            );
        },

        // Remove a workspace by ID
        deleteWorkspace(state, action: PayloadAction<string>) {
            state.workspaces = state.workspaces.filter(
                (w) => w.id !== action.payload
            );
        }
    },

    // Handle async thunks for fetching workspaces and members
    extraReducers: (builder) => {
        builder

            // API call started
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // API success
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                state.loading = false;
                const workspaces = action.payload || [];
                state.workspaces = workspaces;
            })

            // API failed
            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchWorkspaceMembers.pending, (state, action) => {
                const workspaceId = action.meta.arg;
                const existing = state.membersByWorkspace[workspaceId];

                state.membersByWorkspace[workspaceId] = {
                    data: existing?.data || [],
                    status: "loading",
                    lastFetched: existing?.lastFetched, // preserve
                };
            })

            .addCase(fetchWorkspaceMembers.fulfilled, (state, action) => {
                const workspaceId = action.meta.arg;

                state.membersByWorkspace[workspaceId] = {
                    data: action.payload,
                    status: "succeeded",
                    lastFetched: Date.now(),
                };
            })

            .addCase(fetchWorkspaceMembers.rejected, (state, action) => {
                const workspaceId = action.meta.arg;
                const existing = state.membersByWorkspace[workspaceId];
                state.membersByWorkspace[workspaceId] = {
                    data: existing?.data || [], //  keep old data
                    status: "failed",
                    lastFetched: existing?.lastFetched,
                };
            });

    },

});

// Export actions for use in components
export const { setWorkspaces, addWorkspace, updateWorkspace, deleteWorkspace, } = workspaceSlice.actions;


export default workspaceSlice.reducer;
