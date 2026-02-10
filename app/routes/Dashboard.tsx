import { Suspense, lazy, useState, memo } from "react";
import { Plus } from "lucide-react";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import StatsGridSkeleton from "~/components/ui/StatsGridSkeleton";
import RecentActivitySkeleton from "~/components/ui/RecentActivitySkeleton";
import TaskSummarySkeleton from "~/components/ui/TaskSummarySkeleton";

// Lazy-load heavy components 
const StatsGrid = lazy(() => import("../components/dashboard/StatsGrid"));
const ProjectOverview = lazy(() => import("../components/ProjectOverview"));
const RecentActivity = lazy(() => import("../components/RecentActivity"));
const TasksSummary = lazy(() => import("../components/dashboard/TasksSummary"));
const CreateProjectDialogBox = lazy(() => import("../components/CreateProjectDialogBox"));

// Types
interface User {
  fullName: string;
}

const Dashboard = () => {
  const user: User = { fullName: "User" };
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <main
      className="max-w-6xl mx-auto"
      aria-labelledby="dashboard-heading"
      role="main"
    >
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1
            id="dashboard-heading"
            className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1"
          >
            Welcome, {user.fullName}
          </h1>

          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Here’s what’s happening with your projects today.
          </p>
        </div>

        {/* New Project Button */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-linear-to-br from-blue-500 to-blue-600 text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Create new project"
        >
          <Plus size={16} aria-hidden="true" />
          New Project
        </button>

        {/* Dialog */}
        {isDialogOpen && (
          <Suspense fallback={<div />}>
            <CreateProjectDialogBox
              setIsDialogOpen={setIsDialogOpen}
            />
          </Suspense>
        )}
      </header>

      {/* Stats Section */}
      <section
        aria-label="Project statistics"
        className="mb-10"
      >
        <Suspense fallback={<StatsGridSkeleton />}>
          <StatsGrid />
        </Suspense>
      </section>

      {/* Main Content Grid */}
      <section
        aria-label="Dashboard content"
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<ProjectOverviewSkeleton />}>
            <ProjectOverview />
          </Suspense>

          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>

        <aside aria-label="Tasks summary">
          <Suspense fallback={<TaskSummarySkeleton />}>
            <TasksSummary />
          </Suspense>
        </aside>
      </section>
    </main>
  );
};

export default memo(Dashboard);
