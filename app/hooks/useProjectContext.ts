import { useOutletContext } from "react-router";
import type { Project, ProjectMember } from "~/types/workspace";

// Context type for project-related data passed to nested routes like analytics, calendar, settings, etc. Includes project details and optionally members if needed by child routes.

type ProjectContextType = {
  project?: Project;
  projectId?: string;
  // members?: ProjectMember[];
};

export const useProjectContext = () => {
  return useOutletContext<ProjectContextType>();
};