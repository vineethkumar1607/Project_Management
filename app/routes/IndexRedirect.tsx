import { Navigate } from "react-router";
import { useCurrentWorkspace } from "~/hooks/useCurrentWorkspace";

const IndexRedirect = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();

  if (!currentWorkspaceId) {
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