import { useMemo } from "react";
import { useOrganization } from "@clerk/clerk-react";

import { useAppSelector } from "~/store/hooks";

export const useActiveWorkspace = () => {
   const { organization } = useOrganization();

   const workspaces = useAppSelector(
      (state) => state.workspace.workspaces
   );

   console.log("CLERK ORG ID:", organization?.id);
   console.log(
      "WORKSPACE IDS:",
      workspaces.map(w => ({
         id: w.id,
         name: w.name
      }))
   );

   const currentWorkspace = useMemo(() => {
      return workspaces.find(
         (workspace) =>
            workspace.id === organization?.id
      );
   }, [workspaces, organization?.id]);

   console.log(
      "MATCHED WORKSPACE:",
      currentWorkspace
   );

   return {
      currentWorkspace,
      currentWorkspaceId: organization?.id ?? null,
      workspaces,
   };
};
