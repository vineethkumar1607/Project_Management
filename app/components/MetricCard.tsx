import React from "react";

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description?: string;
}

/**
 * Reusable KPI metric card.
 * Displays a title, value, and icon.
 */
const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    icon,
    color,
    description,
}) => {
    return (
        <article
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            aria-label={title}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm text-zinc-500 dark:text-zinc-400">
                        {title}
                    </h3>

                    <p className={`text-2xl font-bold ${color}`}>
                        {value}
                    </p>

                    {description && (
                        <p className="text-xs text-zinc-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>

                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    {icon}
                </div>
            </div>
        </article>
    );
};

export default React.memo(MetricCard);