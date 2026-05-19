const ProjectCardSkeleton = () => {
  return (
    <div className="border rounded-xl p-6 space-y-4 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded bg-muted" />

        <div className="h-4 w-full rounded bg-muted" />

        <div className="h-4 w-5/6 rounded bg-muted" />
      </div>

      {/* Status + Priority */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-20 rounded bg-muted" />

        <div className="h-4 w-24 rounded bg-muted" />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-muted" />

          <div className="h-4 w-10 rounded bg-muted" />
        </div>

        <div className="h-2 w-full rounded bg-muted" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;