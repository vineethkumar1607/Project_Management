import { Suspense, lazy, useState, memo, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import StatsGridSkeleton from "~/components/ui/StatsGridSkeleton";
import RecentActivitySkeleton from "~/components/ui/RecentActivitySkeleton";
import TaskSummarySkeleton from "~/components/ui/TaskSummarySkeleton";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspaces } from "~/store/workspaceThunk";
import type { AppDispatch, RootState } from "~/store/store";
import { fetchProjects } from "~/store/projectThunk";
import { setCurrentWorkspace } from "~/store/workspaceSlice";
import { Button } from "~/components/ui/button";
import PrimaryButton from "~/components/Common/PrimaryButton";

// Lazy components
const StatsGrid = lazy(() => import("../components/dashboard/StatsGrid"));
const ProjectOverview = lazy(() => import("../components/ProjectOverview"));
const RecentActivity = lazy(() => import("../components/RecentActivity"));
const TasksSummary = lazy(() => import("../components/dashboard/TasksSummary"));
const CreateProjectDialogBox = lazy(() => import("../components/CreateProjectDialogBox"));

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // Clerk organization
  const { organization } = useOrganization();
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.currentWorkspaceId
  );

  const projectsData = useSelector((state: RootState) =>
    workspaceId
      ? state.project.projectsByWorkspace[workspaceId]
      : null
  );


  //  Fetch projects when workspace changes
  useEffect(() => {
    if (!workspaceId) return;

    const STALE_TIME = 5 * 60 * 1000;

    const isStale =
      projectsData?.lastFetched &&
      Date.now() - projectsData.lastFetched > STALE_TIME;

    if (!projectsData || projectsData.status === "failed" || isStale) {
      dispatch(fetchProjects(workspaceId));
    }
  }, [workspaceId, dispatch]);

  /**
   * Loading state
   */
  if (!isLoaded) return null;

  return (
    <div className="space-y-8">

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {user?.fullName || user?.firstName || "User"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here’s what’s happening with your projects today.
          </p>
        </div>

        <PrimaryButton
          onClick={() => setIsDialogOpen(true)}
          icon={<Plus className="size-4" />}
        >
          New Project
        </PrimaryButton>
      </header>

      <section>
        <Suspense fallback={<StatsGridSkeleton />}>
          <StatsGrid />
        </Suspense>
      </section>

      <section
        aria-label="Dashboard content"
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<ProjectOverviewSkeleton />}>
            <ProjectOverview />
          </Suspense>

          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>

        <aside>
          <Suspense fallback={<TaskSummarySkeleton />}>
            <TasksSummary />
          </Suspense>
        </aside>
      </section>

    </div>
  );
};

export default memo(Dashboard);