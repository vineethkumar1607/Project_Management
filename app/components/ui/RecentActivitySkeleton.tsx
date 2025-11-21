const RecentActivitySkeleton = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-200 dark:bg-zinc-800 animate-pulse h-72">
      <div className="h-5 w-48 bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gray-300 dark:bg-zinc-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitySkeleton;
