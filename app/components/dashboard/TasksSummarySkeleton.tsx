import React from 'react'

const TasksSummarySkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                            <div className="flex-1 flex justify-between">
                                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                                <div className="h-5 w-8 bg-zinc-300 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 space-y-2"
                            >
                                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TasksSummarySkeleton
