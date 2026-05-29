import { Navigate } from "react-router";
import { useOrganization } from "@clerk/clerk-react";

import { useAppSelector } from "~/store/hooks";

const IndexRedirect = () => {
  const { organization } = useOrganization();

  const workspaces = useAppSelector(
    (state) => state.workspace.workspaces
  );

  const loading = useAppSelector(
    (state) => state.workspace.loading
  );

  console.log("INDEX REDIRECT", {
    organizationId: organization?.id,
    workspaceIds: workspaces.map(w => w.id),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading workspace...
      </div>
    );
  }

  // Clerk is source of truth
  const matchingWorkspace =
    workspaces.find(
      workspace => workspace.id === organization?.id
    );

  if (organization?.id && matchingWorkspace) {
    return (
      <Navigate
        to={`/workspace/${organization.id}`}
        replace
      />
    );
  }

  if (organization?.id && !matchingWorkspace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Creating workspace...
      </div>
    );
  }

  // Fallback if Clerk has no active org yet
  if (workspaces.length > 0) {
    return (
      <Navigate
        to={`/workspace/${workspaces[0].id}`}
        replace
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      No workspace found
    </div>
  );
};

export default IndexRedirect;
