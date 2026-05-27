import { Outlet, useParams } from "react-router";
import { useEffect } from "react";

import { useClerk, useOrganization } from "@clerk/clerk-react";

import { useProjectsFetcher } from "~/features/projects/hooks/useProjectsFetcher";
import { useActiveWorkspace } from "~/features/workspace/hooks/useActiveWorkspace";

const WorkspaceLayout = () => {
  const { workspaceId } = useParams();

  const { organization } = useOrganization();

  const { setActive } = useClerk();
  const {
    currentWorkspace,
    workspaces,
  } = useActiveWorkspace();
  console.log("URL workspaceId:", workspaceId);
  console.log(
    "Clerk organization.id:",
    organization?.id
  );
  console.log(
    "currentWorkspace:",
    currentWorkspace
  );

  /**
   * Sync Clerk active organization
   * with URL workspace id
   */


  /**
 * Auto select first workspace
 * if no Clerk org is active
 */
// useEffect(() => {

//   if (
//     organization ||
//     workspaces.length === 0
//   ) {
//     return;
//   }

//   console.log(
//     "AUTO SELECTING WORKSPACE:",
//     workspaces[0].id
//   );

//   setActive({
//     organization: workspaces[0].id,
//   });

// }, [
//   organization,
//   workspaces,
//   setActive,
// ]);


  useEffect(() => {
    if (!workspaceId) return;

    /**
     * Already synced
     */
    if (organization?.id === workspaceId) return;

    /**
     * Update Clerk active org
     */
    setActive({ organization: workspaceId, });
  }, [workspaceId, organization?.id, setActive,]);

  /**
   * Fetch projects only when
   * Clerk org and URL match
   */
  const isWorkspaceReady = organization?.id === workspaceId
  console.log(
    "isWorkspaceReady:",
    isWorkspaceReady
  );

  useProjectsFetcher(isWorkspaceReady ? workspaceId : undefined);

  return <Outlet />;
};

export default WorkspaceLayout;
