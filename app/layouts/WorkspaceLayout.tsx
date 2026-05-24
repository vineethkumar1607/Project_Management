import { Outlet, useParams } from "react-router";
import { useEffect } from "react";
import { useProjectsFetcher } from "~/features/projects/hooks/useProjectsFetcher";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setCurrentWorkspace } from "~/store/slices/workspaceSlice";
// This layout component is responsible for setting the current workspace in the Redux store based on the workspaceId URL parameter. It renders an <Outlet /> for nested routes. 
const WorkspaceLayout = () => {
  const { workspaceId } = useParams();
  const dispatch = useAppDispatch();
  const currentWorkspaceId = useAppSelector(
    (state) => state.workspace.currentWorkspaceId
  );

  useEffect(() => {
    if (!workspaceId || workspaceId === currentWorkspaceId) return;

    dispatch(setCurrentWorkspace(workspaceId));
  }, [currentWorkspaceId, dispatch, workspaceId]);

  const isWorkspaceReady = workspaceId === currentWorkspaceId;

  useProjectsFetcher(isWorkspaceReady ? workspaceId : undefined);

  return <Outlet />;
};

export default WorkspaceLayout;
