const StatsGridSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-lg"
        ></div>
      ))}
    </div>
  );
};

export default StatsGridSkeleton;
