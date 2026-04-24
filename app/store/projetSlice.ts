import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, createProject, updateProject, addProjectMember, removeProjectMember } from "./projectThunk";
import type { Project } from "~/types/workspace";

interface ProjectState {
    projectsByWorkspace: {
        [key: string]: {
            data: Project[];
            status: "idle" | "loading" | "succeeded" | "failed";
            lastFetched?: number;
        };
    };
    error: string | null;
}

const initialState: ProjectState = {
    projectsByWorkspace: {},
    error: null,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        //  reducers
    },

    extraReducers: (builder) => {
        builder
            // API started
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
                    workspace.data.unshift(action.payload); // add on top
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

    },
});

export default projectSlice.reducer;