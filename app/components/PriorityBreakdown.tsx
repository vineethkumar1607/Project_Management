import React from "react";
import type  { PriorityChartData } from "../lib/analyticsTypes";

interface PriorityBreakdownProps {
    data: PriorityChartData[];
}

const PRIORITY_STYLES: Record<string, string> = {
    LOW: "bg-blue-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-red-500",
};

/**
 * Displays task priority distribution with progress bars.
 */
const PriorityBreakdown: React.FC<PriorityBreakdownProps> = ({
    data,
}) => {
    return (
        <section
            aria-labelledby="priority-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
        >
            <header className="mb-4">
                <h2
                    id="priority-title"
                    className="text-lg font-semibold text-zinc-900 dark:text-white"
                >
                    Tasks by Priority
                </h2>
            </header>

            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize text-zinc-700 dark:text-zinc-300">
                                {item.name.toLowerCase()}
                            </span>
                            <span className="text-zinc-500">
                                {item.value} tasks ({item.percentage}%)
                            </span>
                        </div>

                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${PRIORITY_STYLES[item.name]}`}
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default React.memo(PriorityBreakdown);