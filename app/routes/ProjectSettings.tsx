// ProjectSettings.tsx

import EmptyState from "~/components/common/EmptyState";
import ErrorState from "~/components/common/ErrorState";
import ProjectDetailsForm from "~/features/projects/ProjectDetailsForm";
import ProjectMembers from "~/features/projects/ProjectMembers";
import LayoutSkeleton from "~/components/skeletons/LayoutSkeleton";
import { TextSkeleton } from "~/components/skeletons/TextSkeleton";
import { useCurrentProject } from "~/features/projects/hooks/useCurrentProject";
import { useWorkspaceMembers } from "~/features/workspace/hooks/useWorkspaceMembers";

const ProjectSettings = () => {
  const { project, loading: isLoading, error, } = useCurrentProject();
  const { members: workspaceMembers } = useWorkspaceMembers();

  if (isLoading) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <TextSkeleton className="h-6 w-48" />
          <TextSkeleton className="h-4 w-72" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-md border p-4 space-y-4"
            >
              <div className="space-y-2">
                <TextSkeleton className="h-5 w-32" />
                <TextSkeleton className="h-4 w-48" />
              </div>

              <div className="space-y-3">
                <TextSkeleton className="h-10 w-full rounded-md" />
                <TextSkeleton className="h-10 w-full rounded-md" />
                <TextSkeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load project settings"
        description="We couldn't load project settings right now."
      />
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The requested project does not exist or was removed."
      />
    );
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