import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, } from "recharts";
import type { ChartData } from "~/types/workspace";

interface StatusBarChartProps {
    data: ChartData[];
}

// Semantic color mapping
const STATUS_COLORS: Record<string, string> = {
    TODO: "#f59e0b",
    IN_PROGRESS: "#3b82f6",
    DONE: "#10b981",
};

/**
 * Displays task count grouped by status.
 * Future-safe (no deprecated Cell usage).
 */
const StatusBarChart: React.FC<StatusBarChartProps> = ({ data }) => {
    //  Add fill dynamically to data to avoid deprecated Cell usage

    const optimizedData = [...data]
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);


    const coloredData = optimizedData.map((item) => ({
        ...item,
        fill: STATUS_COLORS[item.name] || "#8884d8",
    }));

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

    if (!data || data.length === 0) {
        return <div className="h-[300px]" />;
    }

    return (
        <section
            aria-labelledby="status-chart-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
        >
            <header className="mb-4">
                <h2
                    id="status-chart-title"
                    className="text-lg font-semibold text-zinc-900 dark:text-white"
                >
                    Tasks by Status
                </h2>
            </header>

            <figure
                role="img"
                aria-label="Bar chart displaying tasks grouped by status"
                className="w-full h-[300px]"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coloredData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />

                        {/* Recharts automatically reads `fill` from data */}
                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            isAnimationActive
                            animationDuration={600}
                        />
                    </BarChart>
                </ResponsiveContainer>

                <figcaption className="sr-only">
                    Bar chart showing number of tasks grouped by status.
                </figcaption>
            </figure>
        </section>
    );
};

export default React.memo(StatusBarChart);