import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../lib/analyticsTypes";

interface TypePieChartProps {
    data: ChartData[];
}

const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
];

/**
 * Displays distribution of task types.
 * Fully responsive, semantic and accessible.
 */
const TypePieChart: React.FC<TypePieChartProps> = ({
    data,
}) => {

    const CustomTooltip = ({ active, payload }: any) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-zinc-800 dark:text-white">
                    {payload[0].name}
                </p>
                <p className="text-blue-500 font-semibold">
                    {payload[0].value} tasks
                </p>
            </div>
        );
    };

    return (
        <section
            aria-labelledby="type-chart-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
        >
            <header className="mb-4">
                <h2
                    id="type-chart-title"
                    className="text-lg font-semibold text-zinc-900 dark:text-white"
                >
                    Tasks by Type
                </h2>
            </header>

            {/* Semantic wrapper for accessibility */}
            <figure
                role="img"
                aria-labelledby="type-chart-title"
                className="w-full h-[300px]"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                            isAnimationActive
                            animationDuration={600}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

                {/* Screen reader description */}
                <figcaption className="sr-only">
                    Pie chart representing distribution of tasks grouped
                    by type.
                </figcaption>
            </figure>
        </section>
    );
};

export default React.memo(TypePieChart);