import { useAppSelector } from "~/store/hooks";

const EMPTY_PROJECTS: [] = [];

// Custom hook to access projects data from the Redux store. It retrieves the current workspace ID and then selects the corresponding projects data, including the list of projects, loading state, and any errors. This hook abstracts away the logic for accessing project data, allowing components to easily consume it without needing to know about the underlying Redux structure.
export const useProjectsData = () => {
   const workspaceId = useAppSelector(
      state => state.workspace.currentWorkspaceId
   );

   const projectData = useAppSelector(
      state =>
         workspaceId
            ? state.project.projectsByWorkspace[workspaceId]
            : null
            
   );

   return {
      projects: projectData?.data ?? EMPTY_PROJECTS,
      loading:
         !projectData ||
         projectData.status === "loading",
      error: projectData?.error ?? null,
   };
};
