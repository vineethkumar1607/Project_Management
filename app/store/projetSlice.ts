import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, createProject, updateProject, addProjectMember, removeProjectMember, fetchProjectMembers } from "./projectThunk";
import type { ProjectState } from "~/types/workspace";


// This slice manages the state related to projects, including the list of projects for each workspace and the members of each project. It handles actions for fetching projects, creating/updating projects, and adding/removing project members, with support for optimistic updates and error handling.

// Initial state for the project slice, with empty data and null error.
const initialState: ProjectState = {
    projectsByWorkspace: {},
    projectMembersByProject: {},
    error: null,
};

// Create the project slice using createSlice from Redux Toolkit. This defines the reducers and extraReducers to handle the various actions related to projects and their members.
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        //  reducers
    },

    extraReducers: (builder) => {
        builder
            // Handle the pending, fulfilled, and rejected states of fetching projects by workspace. This updates the projectsByWorkspace state with the appropriate data and status based on the action.
            .addCase(fetchProjects.pending, (state, action) => {
                const workspaceId = action.meta.arg;
                const existing = state.projectsByWorkspace[workspaceId];

                state.projectsByWorkspace[workspaceId] = {
                    data: existing?.data || [],
                    status: "loading",
                    lastFetched: existing?.lastFetched,
                };
            })

            .addCase(fetchProjects.fulfilled, (state, action) => {
                const workspaceId = action.meta.arg;

                state.projectsByWorkspace[workspaceId] = {
                    data: action.payload,
                    status: "succeeded",
                    lastFetched: Date.now(),
                };
            })

            .addCase(fetchProjects.rejected, (state, action) => {
                const workspaceId = action.meta.arg;
                const existing = state.projectsByWorkspace[workspaceId];

                state.projectsByWorkspace[workspaceId] = {
                    data: existing?.data || [],
                    status: "failed",
                    lastFetched: existing?.lastFetched,
                };
            })

            .addCase(createProject.fulfilled, (state, action) => {
                const { workspaceId } = action.meta.arg;

                const workspace = state.projectsByWorkspace[workspaceId];

                if (workspace) {
                    workspace.data.unshift(action.payload); // Add new project to the beginning of the list
                }
            })

            .addCase(updateProject.fulfilled, (state, action) => {
                const updated = action.payload;

                Object.values(state.projectsByWorkspace).forEach((workspace) => {
                    const index = workspace.data.findIndex(
                        (p) => p.id === updated.id
                    );

                    if (index !== -1) {
                        workspace.data[index] = updated;
                    }
                });
            })

            .addCase(addProjectMember.pending, (state, action) => {
                const { projectId, tempMember } = action.meta.arg;

                Object.values(state.projectsByWorkspace).forEach((workspace) => {
                    const project = workspace.data.find(p => p.id === projectId);

                    if (project) {
                        project.members = project.members || [];
                        project.members.push(tempMember);
                    }
                });
            })

            .addCase(addProjectMember.fulfilled, (state, action) => {
                const { workspaceId, projectId, newMember, tempId } = action.payload;

                const workspace = state.projectsByWorkspace[workspaceId];
                if (!workspace) return;

                const project = workspace.data.find(p => p.id === projectId);

                if (project && project.members) {
                    project.members = project.members.map(m =>
                        m.id === tempId ? newMember : m
                    );
                }
            })

            .addCase(addProjectMember.rejected, (state, action) => {
                const { workspaceId, projectId, tempMember } = action.meta.arg;

                const workspace = state.projectsByWorkspace[workspaceId];
                if (!workspace) return;

                const project = workspace.data.find(p => p.id === projectId);

                if (project && project.members) {
                    project.members = project.members.filter(
                        m => m.id !== tempMember.id
                    );
                }
            })


            .addCase(removeProjectMember.pending, (state, action) => {
                const { workspaceId, projectId, memberId } = action.meta.arg;

                const workspace = state.projectsByWorkspace[workspaceId];
                if (!workspace) return;

                const project = workspace.data.find(p => p.id === projectId);

                if (project && project.members) {
                    project.members = project.members.filter(
                        m => m.user.id !== memberId
                    );
                }
            })


            .addCase(removeProjectMember.fulfilled, (state, action) => {
                const { workspaceId, projectId, memberId } = action.payload;

                const workspace = state.projectsByWorkspace[workspaceId];
                if (!workspace) return;

                const project = workspace.data.find(p => p.id === projectId);

                if (project && project.members) {
                    project.members = project.members.filter(
                        (m: any) => m.user?.id !== memberId
                    );
                }
            })

            .addCase(removeProjectMember.rejected, (state, action) => {
                const { workspaceId, projectId, backupMember } = action.meta.arg;

                const workspace = state.projectsByWorkspace[workspaceId];
                if (!workspace) return;

                const project = workspace.data.find(p => p.id === projectId);

                if (project) {
                    project.members = project.members || [];
                    project.members.push(backupMember);
                }
            })

            .addCase(fetchProjectMembers.pending, (state, action) => {
                const projectId = action.meta.arg;

                state.projectMembersByProject[projectId] = {
                    data: [],
                    status: "loading",
                };
            })

            .addCase(fetchProjectMembers.fulfilled, (state, action) => {
                const { projectId, data } = action.payload;

                state.projectMembersByProject[projectId] = {
                    data,
                    status: "succeeded",
                };
            })

            .addCase(fetchProjectMembers.rejected, (state, action) => {
                const projectId = action.meta.arg;

                state.projectMembersByProject[projectId] = {
                    data: [],
                    status: "failed",
                };
            });

    },
});

export default projectSlice.reducer;