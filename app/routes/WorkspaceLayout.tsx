import { Outlet, useParams } from "react-router";
import { useEffect } from "react";

import { useAppDispatch } from "~/store/hooks";
import { setCurrentWorkspace } from "~/store/workspaceSlice";
// This layout component is responsible for setting the current workspace in the Redux store based on the workspaceId URL parameter. It renders an <Outlet /> for nested routes. 
const WorkspaceLayout = () => {
  const { workspaceId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspaceId) return;

    dispatch(setCurrentWorkspace(workspaceId));
  }, [dispatch, workspaceId]);

  return <Outlet />;
};

export default WorkspaceLayout;