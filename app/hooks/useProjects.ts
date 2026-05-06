import { useEffect } from "react";
import { fetchProjects } from "~/store/projectThunk";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const STALE_TIME = 5 * 60 * 1000;

export const useProjects = () => {
   const dispatch = useAppDispatch();

   const workspaceId = useAppSelector(
      (state) => state.workspace.currentWorkspaceId
   );

   const projectData = useAppSelector((state) =>
      workspaceId
         ? state.project.projectsByWorkspace[workspaceId]
         : null
   );

   const projects = projectData?.data ?? [];

   const loading =
      !projectData ||
      projectData.status === "loading";

   const error = projectData?.error ?? null;

   useEffect(() => {
      if (!workspaceId) return;

      const isStale =
         projectData?.lastFetched &&
         Date.now() - projectData.lastFetched > STALE_TIME;

      const shouldFetch =
         !projectData ||
         projectData.status === "idle" ||
         isStale;

      if (shouldFetch) {
         dispatch(fetchProjects(workspaceId));
      }
   }, [workspaceId, projectData, dispatch]);

   return {
      workspaceId,
      projects,
      loading,
      error,
   };
};