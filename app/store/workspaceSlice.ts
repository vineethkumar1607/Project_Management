import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchWorkspaceMembers, fetchWorkspaces } from "./workspaceThunk";
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
    currentWorkspaceId: string | null;
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
    currentWorkspaceId: null,
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
        /**
          Set active workspace
         We persist it so user doesn't lose selection after refresh
         */
        setCurrentWorkspace(state, action: PayloadAction<string>) {
            state.currentWorkspaceId = action.payload;
        },

        /**
         * Replace entire workspace list
         * Typically used after API fetch
         */
        setWorkspaces(state, action: PayloadAction<Workspace[]>) {
            state.workspaces = action.payload;
        },

        /**
         * Add new workspace
         * Automatically selects it
         */
        addWorkspace(state, action: PayloadAction<Workspace>) {
            state.workspaces.push(action.payload);
            state.currentWorkspaceId = action.payload.id;
        },

        /**
         * Update workspace
         */
        updateWorkspace(state, action: PayloadAction<Workspace>) {
            state.workspaces = state.workspaces.map((w) =>
                w.id === action.payload.id ? action.payload : w
            );
        },

        /**
         * Delete workspace
         * Also clears selection if deleted workspace was active
         */
        deleteWorkspace(state, action: PayloadAction<string>) {
            state.workspaces = state.workspaces.filter(
                (w) => w.id !== action.payload
            );

            if (state.currentWorkspaceId === action.payload) {
                state.currentWorkspaceId = null;
            }
        }
    },

    /**
     * Async reducers 
     * Handles loading, success, error states
     */
    extraReducers: (builder) => {
        builder

            // API call started
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // API success
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                console.log("REDUX UPDATED:", action.payload);
                state.loading = false;
                const workspaces = action.payload || [];

                state.workspaces = workspaces;

                if (workspaces.length > 0) {
                    const savedId =
                        typeof window !== "undefined"
                            ? localStorage.getItem("currentWorkspaceId")
                            : null;

                    if (savedId) {
                        const exists = action.payload.find((w) => w.id === savedId);

                        if (exists) {
                            state.currentWorkspaceId = savedId;
                        } else {
                            state.currentWorkspaceId = action.payload[0].id;
                        }
                    } else {
                        state.currentWorkspaceId = action.payload[0].id;
                    }
                }
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

/**
 * Export actions
 */
export const {
    setCurrentWorkspace,
    setWorkspaces,
    addWorkspace,
    updateWorkspace,
    deleteWorkspace,
} = workspaceSlice.actions;

/**
 * Export reducer
 */
export default workspaceSlice.reducer;