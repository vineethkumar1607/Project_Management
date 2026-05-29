import { useParams } from "react-router";
import { useAppSelector } from "~/store/hooks";


const EMPTY_PROJECTS: [] = [];

export const useProjectsData = () => {
   const { workspaceId } = useParams();

   const projectData = useAppSelector((state) =>
      workspaceId
         ? state.project.projectsByWorkspace[workspaceId]
         : null
   );

   return {
      projects: projectData?.data ?? EMPTY_PROJECTS,
      loading: !projectData || projectData.status === "loading",
      error: projectData?.error ?? null,
   };
};