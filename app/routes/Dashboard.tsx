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
  const workspaceId = organization?.id;


  //  Fetch projects when workspace changes
  useEffect(() => {
    if (!workspaceId) return;

    console.log("Fetching projects for:", workspaceId);

    dispatch(fetchProjects(workspaceId));
  }, [workspaceId]);

  /**
   * Loading state
   */
  if (!isLoaded) return null;

  return (
    <main className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">
            Welcome, {user?.fullName || user?.firstName || "User"}
          </h1>
          <p className="text-sm text-gray-500">
            Here’s what’s happening with your projects today.
          </p>
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-blue-600 text-white"
        >
          <Plus size={16} />
          New Project
        </button>

        {isDialogOpen && (
          <Suspense fallback={<div />}>
            <CreateProjectDialogBox setIsDialogOpen={setIsDialogOpen} />
          </Suspense>
        )}
      </header>

      {/* Stats */}
      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsGrid />
      </Suspense>

      {/* Content */}
      <section className="grid lg:grid-cols-3 gap-8 mt-6">
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
    </main>
  );
};

export default memo(Dashboard);