const TaskSummarySkeleton = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-200 dark:bg-zinc-800 animate-pulse h-80">
      <div className="h-5 w-36 bg-gray-300 dark:bg-zinc-700 rounded mb-6"></div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TaskSummarySkeleton;
