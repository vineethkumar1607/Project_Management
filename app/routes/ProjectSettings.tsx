// ProjectSettings.tsx
import { useEffect } from "react";
import { useParams } from "react-router";
import ProjectDetailsForm from "~/components/ProjectDetailsForm";
import ProjectMembers from "~/components/ProjectMembers";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchProjects } from "~/store/projectThunk";

const ProjectSettings = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  const { projects, loading } = useAppSelector((state) => state.project);

  const workspaceId = useAppSelector(
    (state) => state.workspace.currentWorkspaceId
  );

  // Find project from Redux store
  const project = projects.find((p) => p.id === projectId);

  /**
   * Fallback: If project not found (refresh / deep link)
   * fetch projects again
   */
  useEffect(() => {
    if (!projects.length && workspaceId) {
      dispatch(fetchProjects(workspaceId));
    }
  }, [projects.length, workspaceId, dispatch]);

  if (loading && !project) {
    return <p>Loading project...</p>;
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
        <h1 className="text-2xl font-semibold">
          {project.name}
        </h1>
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

          <ProjectMembers />
        </div>

      </div>
    </section>
  )
}

export default ProjectSettings