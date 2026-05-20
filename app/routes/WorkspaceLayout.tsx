import { Outlet } from "react-router";

// This component serves as a layout for all workspace-related routes. It can include common UI elements like a sidebar or header that are shared across all workspace pages. The <Outlet /> component renders the matched child route component. 
const WorkspaceLayout = () => {
  return <Outlet />;
};

export default WorkspaceLayout;