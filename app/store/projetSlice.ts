import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, createProject, updateProject, addProjectMember } from "./projectThunk";
import type { Project } from "~/types/workspace";

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
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
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // API success
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;

            })

            // API failed
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createProject.fulfilled, (state, action) => {
                console.log("REDUX ADD:", action.payload);
                state.projects.push(action.payload);
            })

            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.projects.findIndex(
                    (p) => p.id === action.payload.id
                );

                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })

            .addCase(addProjectMember.fulfilled, (state, action) => {
                const { projectId, newMember } = action.payload;

                const project = state.projects.find(p => p.id === projectId);

                if (project) {
                    project.members = project.members || [];

                    project.members.push(newMember);
                }
            });
    },
});

export default projectSlice.reducer;