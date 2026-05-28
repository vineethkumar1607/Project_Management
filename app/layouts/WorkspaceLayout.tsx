
import { Outlet } from "react-router";
import { useProjectsFetcher } from "~/features/projects/hooks/useProjectsFetcher";
import { useWorkspaceSync } from "~/features/workspace/hooks/useWorkspaceSync";
import WorkspaceLoader from "~/components/skeletons/WorkspaceLoader";

const WorkspaceLayout = () => {
  const { isReady, workspaceId, workspaceExists, } = useWorkspaceSync();

  useProjectsFetcher(
    isReady ? workspaceId : undefined
  );


  if (!workspaceExists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Workspace not found
      </div>
    );
  }

  if (!isReady) {
    return <WorkspaceLoader />;
  }

  return <Outlet />;
};

export default WorkspaceLayout;
