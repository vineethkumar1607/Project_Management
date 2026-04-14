import { Suspense, lazy, useState, memo, useEffect } from "react";
import { Plus } from "lucide-react";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import StatsGridSkeleton from "~/components/ui/StatsGridSkeleton";
import RecentActivitySkeleton from "~/components/ui/RecentActivitySkeleton";
import TaskSummarySkeleton from "~/components/ui/TaskSummarySkeleton";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspaces } from "~/store/workspaceThunk";
import type { AppDispatch, RootState } from "~/store/store";
import { fetchProjects } from "~/store/projectThunk";

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

  const currentWorkspaceId = useSelector(
    (state: RootState) => state.workspace.currentWorkspaceId
  );
  //  Fetch data from 
  useEffect(() => {
    dispatch(fetchWorkspaces());

    if (currentWorkspaceId) {
      dispatch(fetchProjects(currentWorkspaceId));
    }
  }, [dispatch, currentWorkspaceId]);

  if (!isLoaded) {
    return (
      <main className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse mb-2" />
          <div className="h-3 w-64 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse" />
        </div>
      </main>
    );
  }

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