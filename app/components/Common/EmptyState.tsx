import type { ReactNode } from "react";

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

export default function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="w-full text-center border rounded-xl p-6 sm:p-8 bg-card shadow-sm">
            <div className="mx-auto mb-4">{icon}</div>

            <p className="text-lg sm:text-xl font-semibold">{title}</p>

            <p className="text-muted-foreground text-sm mt-2">
                {description}
            </p>

            {action && (
                <div className="mt-6 flex justify-center">
                    {action}
                </div>
            )}
        </div>
    );
}