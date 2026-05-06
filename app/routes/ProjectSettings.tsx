// ProjectSettings.tsx

import ProjectDetailsForm from "~/components/ProjectDetailsForm";
import ProjectMembers from "~/components/ProjectMembers";
import { useCurrentProject } from "~/hooks/useCurrentProject";
import { useWorkspaceMembers } from "~/hooks/useWorkspaceMembers";

const ProjectSettings = () => {
  const { project, loading: isLoading, error, } = useCurrentProject();
  const { members: workspaceMembers } = useWorkspaceMembers();

  if (isLoading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>Failed to load project</p>;
  }
  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <section className="space-y-6">

      {/* -------- Header (Same Pattern as Tasks) -------- */}
      <header>
        <h2 className="text-lg font-semibold">Project Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage project configuration and team members
        </p>

      </header>

      {/* -------- Main Layout -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* -------- General Settings -------- */}
        <div className="rounded-md border p-4 space-y-4 ">
          <div className="mb-4">
            <h3 className="text-md font-semibold">General</h3>
            <p className="text-sm text-muted-foreground">
              Update project information
            </p>
          </div>

          <ProjectDetailsForm project={project} />
        </div>

        {/* -------- Members Section -------- */}
        <div className="rounded-md border p-4">
          <div className="mb-4">
            <h3 className="text-md font-semibold">Members</h3>
            <p className="text-sm text-muted-foreground">
              Manage project team members and roles
            </p>
          </div>

          <ProjectMembers project={project} workspaceMembers={workspaceMembers}
          />
        </div>

      </div>
    </section>
  )
}

export default ProjectSettings