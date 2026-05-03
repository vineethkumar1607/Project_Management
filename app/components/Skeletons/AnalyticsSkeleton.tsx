const AnalyticsSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[300px] bg-muted rounded-xl animate-pulse" />
                <div className="h-[300px] bg-muted rounded-xl animate-pulse" />
            </div>
        </div>
    );
};

export default AnalyticsSkeleton;