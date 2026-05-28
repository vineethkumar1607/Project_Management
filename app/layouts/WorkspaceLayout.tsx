
import { Outlet } from "react-router";
import { useProjectsFetcher } from "~/features/projects/hooks/useProjectsFetcher";
import { useWorkspaceSync } from "~/features/workspace/hooks/useWorkspaceSync";
import WorkspaceLoader from "~/components/skeletons/WorkspaceLoader";

const WorkspaceLayout = () => {
  const { isReady, workspaceId, workspaceExists, workspaceLoading, } = useWorkspaceSync();

  useProjectsFetcher(
    isReady ? workspaceId : undefined
  );

  if (workspaceLoading || !isReady) {
    return <WorkspaceLoader />;
  }

  if (!workspaceExists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Workspace not found
      </div>
    );
  }


  return <Outlet />;
};

export default WorkspaceLayout;
