
import { useMemo } from "react";
import { useOrganization } from "@clerk/clerk-react";

import type { Workspace } from "~/types/workspace";

import { useAppSelector } from "~/store/hooks";

type UseActiveWorkspaceReturn = {
   currentWorkspace?: Workspace;
   currentWorkspaceId: string | null;
   workspaces: Workspace[];
};

export const useActiveWorkspace =
   (): UseActiveWorkspaceReturn => {

      const { organization } = useOrganization();

      const workspaces = useAppSelector(
         (state) => state.workspace.workspaces
      );

      const currentWorkspace = useMemo(() => {
         return workspaces.find(
            (workspace) =>
               workspace.id === organization?.id
         );
      }, [workspaces, organization?.id]);

      return {
         currentWorkspace,
         currentWorkspaceId:
            organization?.id ?? null,
         workspaces,
      };
   };

