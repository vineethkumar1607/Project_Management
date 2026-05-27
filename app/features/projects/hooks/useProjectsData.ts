import { useAppSelector } from "~/store/hooks";

import { useActiveWorkspace } from
   "~/features/workspace/hooks/useActiveWorkspace";

const EMPTY_PROJECTS: [] = [];

/**
 * Projects data derived from
 * Clerk active workspace
 */
export const useProjectsData = () => {

   const { currentWorkspaceId: workspaceId } = useActiveWorkspace();

   const projectData = useAppSelector((state) =>
      workspaceId ? state.project.projectsByWorkspace[workspaceId] : null
   );

   return {
      projects: projectData?.data ?? EMPTY_PROJECTS,

      loading: !projectData || projectData.status === "loading",

      error: projectData?.error ?? null,
   };
};