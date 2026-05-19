interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 5,
  columns = 6,
}: TableSkeletonProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="border-b">
            <div className="grid grid-cols-6 gap-4 px-4 py-3">
              {Array.from({ length: columns }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 rounded bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-4 gap-4 px-4 py-4"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="h-4 rounded bg-muted animate-pulse"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}