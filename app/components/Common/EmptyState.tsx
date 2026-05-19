import type { ReactNode } from "react";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export default function EmptyState({ icon, title, description, action, className = "", }: EmptyStateProps) {
    return (
        <section
            role="status"
            aria-live="polite"
            className={` w-full px-6 py-10 sm:px-8 sm:py-12 flex flex-col items-center justify-center text-center${className}`}>
            {/* Icon */}
            {icon && (
                <div
                    aria-hidden="true"
                    className=" mb-5 flex items-center justify-center rounded-full bg-muted/50 p-4">
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className="max-w-md">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                    {title}
                </h2>

                {description && (
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Action */}
            {action && (
                <div className="mt-6 flex items-center justify-center">
                    {action}
                </div>
            )}
        </section>
    );
}