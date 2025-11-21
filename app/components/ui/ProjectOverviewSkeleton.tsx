const ProjectOverviewSkeleton = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-200 dark:bg-zinc-800 animate-pulse h-64">
      <div className="h-5 w-40 bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default ProjectOverviewSkeleton;
