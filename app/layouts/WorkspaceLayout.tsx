
import { Navigate, Outlet } from "react-router";
import { useProjectsFetcher } from "~/features/projects/hooks/useProjectsFetcher";
import { useWorkspaceSync } from "~/features/workspace/hooks/useWorkspaceSync";
import WorkspaceLoader from "~/components/skeletons/WorkspaceLoader";
import { useAppSelector } from "~/store/hooks";


const WorkspaceLayout = () => {
  const { isReady, workspaceId, workspaceExists, workspaceLoading, hasWorkspaceAccess, } = useWorkspaceSync();
  const workspaces = useAppSelector(
    (state) => state.workspace.workspaces
  );


  useProjectsFetcher(
    isReady ? workspaceId : undefined
  );

  if (workspaceLoading || !isReady) {
    return <WorkspaceLoader />;
  }

  if (!workspaceExists) {
    const fallbackWorkspace =
      workspaces[0];

    if (!fallbackWorkspace) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          No workspace found
        </div>
      );
    }
    if (!hasWorkspaceAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Access denied
        </div>
      );
    }

    return (
      <Navigate
        to={`/workspace/${fallbackWorkspace.id}`}
        replace
      />
    );
  }






  return <Outlet />;
};

export default WorkspaceLayout;
