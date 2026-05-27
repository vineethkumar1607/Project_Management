import { Navigate } from "react-router";

import { useAppSelector } from "~/store/hooks";

const IndexRedirect = () => {

  const workspaces = useAppSelector(
    (state) => state.workspace.workspaces
  );

  const loading = useAppSelector(
    (state) => state.workspace.loading
  );

  /**
   * Wait until workspaces load
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading workspace...
      </div>
    );
  }

  /**
   * No workspace available
   */
  if (workspaces.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No workspace found
      </div>
    );
  }

  /**
   * Redirect to first workspace
   */
  return (
    <Navigate
      to={`/workspace/${workspaces[0].id}`}
      replace
    />
  );
};

export default IndexRedirect;