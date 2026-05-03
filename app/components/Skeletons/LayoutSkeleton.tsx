const LayoutSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
                ))}
            </div>
        </div>
    );
};
export default LayoutSkeleton;