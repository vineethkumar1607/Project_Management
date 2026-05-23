import { Navigate } from "react-router";
import { useCurrentWorkspace } from "~/features/workspace/hooks/useCurrentWorkspace";

const IndexRedirect = () => {
  const { currentWorkspaceId, loading, error } = useCurrentWorkspace();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-lg font-semibold">Unable to load workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !currentWorkspaceId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading workspace...
      </div>
    );
  }

  return (
    <Navigate
      to={`/workspace/${currentWorkspaceId}`}
      replace
    />
  );
};

export default IndexRedirect;
