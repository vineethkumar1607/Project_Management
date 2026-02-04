import React from 'react'

const StatsGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9 animate-pulse">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                >
                    <div className="p-6 py-4 flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            <div className="h-8 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
                            <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
                        </div>

                        <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsGridSkeleton
